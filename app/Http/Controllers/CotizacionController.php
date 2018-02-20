<?php

namespace App\Http\Controllers;

use App\Catalog;
use App\Client;
use App\Cotisation;
use App\Mail\SendMail;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\PDF;
use Illuminate\Support\Facades\App;
use Illuminate\Mail\Mailer;
use Illuminate\Support\Facades\Hash;
use Underscore\Types\Arrays;

class CotizacionController extends Controller
{
    protected $mailer;
    public function __construct(Mailer $mailer){
        $this->middleware('auth');
        $this->mailer = $mailer;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cotizaciones = Cotisation::all();
        return view('Cotizaciones',array('cotizaciones'=>$cotizaciones));
    }

    public function findCotizacionById($cotizacion_id)
    {
        $cotizacion = Cotisation::where('id',$cotizacion_id)->first();
        $param = json_decode($cotizacion->params);
        $nombre_cliente =  '';
        $cliente_id =  '';
        $cliente_correo =  '';
        $cliente_telefono =  '';
        if(isset($param->cliente->id)){
            $cliente = Client::where('id',$param->cliente->id)->first();
            $nombre_cliente = $cliente->nombre.' '.$cliente->apellidopaterno.' '.$cliente->apellidomaterno;
            $cliente_id =  $cliente->id;
            $cliente_correo= $cliente->correo;
            $cliente_telefono= $cliente->telefono;
        }

        
        $totalCatalogos = $param->data->TotalCotizacion;
        $cantidad=array();
        $descripcion=array();
        $tipo_producto=array();
        $precio_unitario = array();
        $total = array();

        for ($i=0; $i<$totalCatalogos; $i++){
            $ncantidad = 'cantidad'.$i;
            $ndescripcion = 'descripcion'.$i;
            $ntipo_producto = 'tipo_producto'.$i;
            $nprecio_unitario = 'precio_unitario'.$i;
            $ntotal = 'total'.$i;
            $cantidad[] = $param->data->$ncantidad;
            $descripcion[] = $param->data->$ndescripcion;
            $tipo_producto[] = $param->data->$ntipo_producto;
            $precio_unitario[] = isset($param->data->$nprecio_unitario)?$param->data->$nprecio_unitario:'';
            $total[] = $param->data->$ntotal;
        }

        $params = array('cantidad'=>$cantidad,'descripcion'=>$descripcion,
            'tipo_producto'=>$tipo_producto,'precio_unitario'=>$precio_unitario,
            'total'=>$total
            );

        $data = array('nombre'=>$nombre_cliente
        ,'id'=>$cliente_id,'correo'=>$cliente_correo,'telefono'=>$cliente_telefono,
            'logo'=>$param->data->logo*1,'requisicion'=>$param->data->requisicion,
            'empresa'=>$param->data->empresa,'validez'=>$param->data->validez,
            'tiempo_entrega'=>$param->data->tiempo_entrega,'paramsCotizacion'=>$params,
            'totalCatalogos'=>$totalCatalogos,'total'=>$param->data->total,
            'iva'=>$param->data->iva, 'subtotal'=>$param->data->subtotal,
            'forma_de_pago'=>$param->data->forma_de_pago,'garantia'=>$param->data->garantia,
            'contador_elementos'=>$param->data->contador_elementos,
            'TotalCotizacion'=>$param->data->TotalCotizacion,'tipo_moneda'=>isset($param->data->tipo_moneda)?$param->data->tipo_moneda:'',
            'dolar'=>isset($param->data->dolar)?$param->data->dolar:'', 'tipo_precio'=>$param->data->tipo_precio
        );
        return response()->json($data);
    }

    public function getCotizacion(){
        $cotizacion = Cotisation::orderBy('id','desc')->get();
        return response()->json($cotizacion);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data = array('tipoCotizacion'=>1,'cotizaciones_id'=>'');
        return view('AltaCotizaciones',$data);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $totalElementos = $request -> TotalCotizacion * 1;

        /*obtener elementos dimicos de cotizacion*/
        $cantidad = array();
        $precio_unitario = array();
        $total = array();
        $descripcion = array();

        $tipoCotizacion = $request -> tipoCotizacion;
        $cotizacion_id = $request -> cotizacion_id * 1;

        $getCotizacion = Cotisation::orderBy('id', 'desc') -> first();

        if (isset($getCotizacion -> id)) {
            $cotizacion_id_serial = $getCotizacion -> id + 1;
        } else {
            $cotizacion_id_serial = 1;
        }

        if($tipoCotizacion == 1 || $tipoCotizacion == 3) {
            $folio = str_pad($cotizacion_id_serial, 6, "0", STR_PAD_LEFT);
        } else {
            $cotizacionById = Cotisation::where('id', $cotizacion_id) -> first();
            $folio = $cotizacionById -> folio;
        }

        $nombre_unico = substr(md5(time().$folio),0,5);
        $cliente = Client::where('id', $request -> cliente_id) -> first();

        for ($i = 0; $i < $totalElementos; $i++) {
            $cantidad[] = ($_POST["cantidad$i"] !== "") ? (float) $_POST["cantidad$i"] : 0;
            $precio_unitario[] = isset($_POST["precio_unitario$i"]) ? (float) $_POST["precio_unitario$i"] : 0;
            $total[] = ($_POST["total$i"] !== "") ? (float) $_POST["total$i"] : 0;
            $descripcion[] = ($_POST["descripcion$i"] !== "") ? $_POST["descripcion$i"] : '';
        }

        $tipo_pago = '';
        switch ($request -> forma_de_pago) {
            case '2':
                $tipo_pago = 'Transferencia';
                break;
            case '3':
                $tipo_pago = 'Tarjeta de Crédito';
                break;
            default:
                $tipo_pago = 'Efectivo';
                break;
        }

        $data = (
            array(
                'folio' => $folio,
                'descripcion' => $descripcion,
                'cantidad' => $cantidad,
                'precio_unitario' => $precio_unitario,
                'total' => $total,
                'cliente' => $cliente,
                'title' => 'Cotizacion',
                'tipo_pago' => $tipo_pago,
                'data' => $request->all(),
                'isPre' => false
            )
        );

        $nombre = $nombre_unico . '.pdf';

        if ($tipoCotizacion == 1 || $tipoCotizacion == 3) {
            $nCotizacion = new Cotisation();
            $nCotizacion -> folio = $folio;
            $nCotizacion -> nombre_pdf = $nombre;
            $nCotizacion -> params = json_encode($data);
            $nCotizacion -> save();
        } else if ($tipoCotizacion == 2) {
            $nCotizacion = Cotisation::where('id', $cotizacion_id) -> first();
            $nCotizacion -> folio = $folio;
            $nCotizacion -> nombre_pdf = $nombre;
            $nCotizacion -> params = json_encode($data);
            $nCotizacion -> update();
        }

        $pdf = App::make('dompdf.wrapper');
        $pdf -> loadView('pdfCotizacion', $data) -> save(public_path('pdf/' . $nombre));
        $rutapdf = url('pdf/' . $nombre);
        $data['ruta_pdf'] = $rutapdf;
        flash('Elemento guardado') -> important();

        /*Envio de correo*/

        $logo= 'http://ignite31.herokuapp.com/img/logo50.png';
        $nombre_cliente = "juan sosa azcorra" ;
        $correo_cliente= 'manuelsansoresg@gmail.com';
        $link_cotizacion = "http://ignite31.herokuapp.com/pdf/e8d40.pdf";
        $data = array(
            'logo' => $logo,
            'cliente'=>$nombre_cliente,'correo_cliente'=>$correo_cliente,'link_cotizacion'=>$link_cotizacion,
            'subject'=>'Cotizacion'
        );

        //$this->mailer->to($correo_cliente)->send(new SendMail($data));

        return response()->json(['status' => 200, 'data'=>$data]);
    }

    public function sendMailWithId(Request $request, $cotizacion_id)
    {
        $body = $request -> all();
        $custom_email = Arrays::get($body, 'mail');

        $nCotizacion = Cotisation::where('id', $cotizacion_id)->first();

        $logo= 'http://ignite31.herokuapp.com/img/logo50.png';
        $nombre_cliente = "juan sosa azcorra" ;
        $correo_cliente= 'manuelsansoresg@gmail.com';
        $link_cotizacion = "http://ignite31.herokuapp.com/pdf/e8d40.pdf";
        $meta_email = $custom_email or $meta_email = $correo_cliente;

        $data = array(
            'logo' => $logo,
            'cliente' => $nombre_cliente,
            'correo_cliente' => $meta_email,
            'link_cotizacion' => $link_cotizacion,
            'subject' => 'Cotizacion'
        );

        $this -> mailer -> to($correo_cliente) -> send(new SendMail($data));
        return response()->json(['status' => 200, 'data'=>$data]);
        // return redirect(route('cotizaciones.index'));
    }

    public function getPdf($cotizacion_id)
    {
        $cotizacion = Cotisation::where('id',$cotizacion_id)->first();
        $params = json_decode($cotizacion->params,true);
        $pdf = App::make('dompdf.wrapper');
        $pdf->loadView('pdfCotizacion',$params)->setPaper('letter', 'portrait');
        return $pdf->stream();
    }

    public function testpdf(){
        $params= json_decode('{"folio":"000001","descripcion":["dd","test","dd","dd"],"cantidad":[1,1,1,1],"precio_unitario":[500,100,500,500],"total":[500,100,500,500],"cliente":{"nombre":"lorena","apellidopaterno":"sosa","apellidomaterno":"iuit","correo":"test@gmail.com","telefono":"9999999","id":1,"created_at":"2017-09-09 18:57:13","updated_at":"2017-09-09 18:57:13","padre_id":1},"title":"Cotizacion","tipo_pago":"Efectivo","data":{"_token":"US5CewSxXt9FYbCk3kyqAKDLFi5AoKeSkTqOnu4n","cliente_id":"1","nombre_cliente":"lorena sosa iuit","logo":"2","requisicion":null,"empresa":"imagixel","validez":"2 d\u00edas","tiempo_entrega":"2 d\u00edas","forma_de_pago":"1","garantia":"1 a\u00f1o","tipo_precio":"0","tipoCotizacion":"2","cotizacion_id":"1","cantidad0":"1","descripcion0":"dd","tipo_producto0":"tipo producto","precio_unitario0":"500.00","total0":"500.00","cantidad1":"1","descripcion1":"test","tipo_producto1":"null","precio_unitario1":"100.00","total1":"100.00","cantidad2":"1","descripcion2":"dd","tipo_producto2":"tipo producto","precio_unitario2":"500.00","total2":"500.00","cantidad3":"1","descripcion3":"dd","tipo_producto3":"dd","precio_unitario3":"500.00","total3":"500.00","subtotal":"1600.00","iva":"256.00","total":"1856.00","TotalCotizacion":"4","contador_elementos":"3"},"isPre":false}',true);
        //$params = (array)$params;
        $pdf = App::make('dompdf.wrapper');
        $pdf->loadView('pdfCotizacion',$params)->setPaper('letter', 'portrait');
        return $pdf->stream();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Cotisation  $cotizacion
     * @return \Illuminate\Http\Response
     */
    public function show(Cotisation $cotizacion)
    {
        $data='{"cantidad":[12,2],"precio_unitario":[100,200],"total":[112,202],"title":"Cotizacion","data":{"_token":"J1m6sY2o03X8UMjoeEQnCXantcT0x9cV08nBdOt0","cliente":"1","logo":"1","cantidad0":"12","precio_unitario0":"100","total0":"112","cantidad1":"2","precio_unitario1":"200","total1":"202","TotalCotizacion":"2"}}';

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Cotisation  $cotizaciones_id
     * @return \Illuminate\Http\Response
     */
    public function edit($cotizaciones_id)
    {
        $data = array('tipoCotizacion' => 2, 'cotizaciones_id' => $cotizaciones_id);
        return view('AltaCotizaciones', $data);
    }

    public function usarCotizacion($cotizaciones_id)
    {
        $data = array('tipoCotizacion'=>3,'cotizaciones_id'=>$cotizaciones_id);
        return view('AltaCotizaciones',$data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Cotisation  $cotizacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cotisation $cotizacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Cotisation  $cotizacion
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cotizacion = Cotisation::where('id',$id)->first();
        $folio =$cotizacion->folio;
        $archivo ='pdf/'.$folio.'.pdf';
        @unlink($archivo);

        Cotisation::destroy($id);
        return redirect(route('cotizaciones.index'));
    }

    public function testEmail()
    {
        $logo= url('img/logo50.png');
        $cliente =  'Manuel Sansores Gutierrez';
        $correo_cliente= 'test@test.com';
        $link_cotizacion = url('test');
        $data = array(
            'logo' => $logo,
            'cliente' => $cliente,
            'correo_cliente' => $correo_cliente,
            'link_cotizacion' => $link_cotizacion,
            'subject' => 'Cotizacion'
        );

        $this->mailer->to('manuelsansoresg@gmail.com')->send(new SendMail($data));
        //return view('CotizacionEmail');
    }
}
