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

class PrecotizacionController extends Controller
{

    protected $mailer;

    public function console_log( $data ){
        echo '<script>';
        echo 'console.log('. json_encode( $data ) .')';
        echo '</script>';
    }

    public function __construct(Mailer $mailer) {
        $this->middleware('auth');
        $this->mailer = $mailer;
    }

    public function index()
    {
        $cotizaciones = Cotisation::all();
        return view('Precotizaciones', array('cotizaciones'=>$cotizaciones));
    }

    public function findPrecotizacionById($cotizacion_id)
    {
        $cotizacion = Cotisation::where('id', $cotizacion_id) -> first();
        $param = json_decode($cotizacion -> params);

        // $cliente = Client::where('id', $param -> cliente -> id)->first();

        $totalCatalogos = 8;
        $exchange = $param -> data -> exchange;
        $componente = array();
        $descripcion = array();
        $total = array();
        $total10 = array();
        $total15 = array();
        $total20 = array();
        $totaldls = array();
        $totaldlsiva = array();

        for ($i = 0; $i < $totalCatalogos; $i++) {
            $descripcion[] = Arrays::get($param, 'descripcion')[$i];
            $componente[] = Arrays::get($param, 'componente')[$i];
            $total[] = Arrays::get($param, 'total')[$i];
            $total10[] = Arrays::get($param, 'total10')[$i];
            $total15[] = Arrays::get($param, 'total15')[$i];
            $total20[] = Arrays::get($param, 'total20')[$i];
            $totaldls[] = Arrays::get($param, 'totaldls')[$i];
            $totaldlsiva[] = Arrays::get($param, 'totaldlsiva')[$i];
        }

        $params = array(
            'descripcion' => $descripcion,
            'componente' => $componente,
            'total' => $total,
            'total10' => $total10,
            'total15' => $total15,
            'total20' => $total20,
            'totaldls' => $totaldls,
            'totaldlsiva' => $totaldlsiva,
        );

        // return response() -> json($param);

        $data = array(
            'exchange' => $exchange,
            'paramsCotizacion' => $params,
            'TotalCotizacion' => $totalCatalogos
        );

        return response() -> json($data);
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
        return view('AltaPrecotizaciones', $data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $totalElementos = $request->TotalCotizacion*1;
        /*obtener elementos dimicos de cotizacion*/

        $cantidad = array();
        $precio_unitario = array();
        $total = array();
        $total10 = array();
        $total15 = array();
        $total20 = array();
        $totaldls = array();
        $totaldlsiva = array();
        $descripcion = array();

        $tipoCotizacion = $request->tipoCotizacion;
        $cotizacion_id = $request->cotizacion_id*1;

        $getCotizacion = Cotisation::orderBy('id','desc')->first();
        if(isset($getCotizacion->id)) {
            $cotizacion_id_serial = $getCotizacion->id + 1;
        } else {
            $cotizacion_id_serial = 1;
        }

        if($tipoCotizacion==1 || $tipoCotizacion==3){
            $folio = str_pad($cotizacion_id_serial, 6, "0", STR_PAD_LEFT);
        }else{
            $cotizacionById = Cotisation::where('id',$cotizacion_id)->first();
            $folio =    $cotizacionById->folio;
        }

        $nombre_unico = substr(md5(time().$folio),0,5);
        $cliente = Client::where('id',$request->cliente_id)->first();

        for ($i=0; $i < $totalElementos; $i++) {
            $total[] = ($_POST["total$i"] !== "") ? (float) $_POST["total$i"] : 0;
            $total10[] = ($_POST["total10$i"] !== "") ? (float) $_POST["total10$i"] : 0;
            $total15[] = ($_POST["total15$i"] !== "") ? (float) $_POST["total15$i"] : 0;
            $total20[] = ($_POST["total20$i"] !== "") ? (float) $_POST["total20$i"] : 0;
            $totaldls[] = ($_POST["totaldls$i"] !== "") ? (float) $_POST["totaldls$i"] : 0;
            $totaldlsiva[] = ($_POST["totaldlsiva$i"] !== "") ? (float) $_POST["totaldlsiva$i"] : 0;
            $componente[] = ($_POST["componente$i"] !== "") ? $_POST["componente$i"] : '';
            $descripcion[] = ($_POST["descripcion$i"] !== "") ? $_POST["descripcion$i"] : '';
        }


        $tipo_pago = '';
        switch ($request->forma_de_pago) {
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
                'componente' => $componente,
                'total' => $total,
                'total10' => $total10,
                'total15' => $total15,
                'total20' => $total20,
                'totaldls' => $totaldls,
                'totaldlsiva' => $totaldlsiva,
                'cliente' => $cliente,
                'title' => 'Cotizacion',
                'data' => $request -> all(),
                'isPre' => true
            )
        );

        $nombre = $nombre_unico . '.pdf';

        if($tipoCotizacion == 1 || $tipoCotizacion == 3) {
            $nCotizacion = new Cotisation();
            $nCotizacion->folio=$folio;
            $nCotizacion->nombre_pdf=$nombre;
            $nCotizacion->params=json_encode($data);
            $nCotizacion->save();
        } else if ($tipoCotizacion == 2){
            $nCotizacion = Cotisation::where('id',$cotizacion_id)->first();
            $nCotizacion->folio=$folio;
            $nCotizacion->nombre_pdf=$nombre;
            $nCotizacion->params=json_encode($data);
            $nCotizacion->update();
        }

        return response()->json(['status' => 200, 'data'=>$nCotizacion]);
    }

    public function sendMailWithId($cotizacion_id)
    {
        $nCotizacion = Cotisation::where('id',$cotizacion_id)->first();

        $logo= 'http://ignite31.herokuapp.com/img/logo50.png';
        $nombre_cliente = "juan sosa azcorra" ;
        $correo_cliente= 'manuelsansoresg@gmail.com';
        $link_cotizacion = "http://ignite31.herokuapp.com/pdf/e8d40.pdf";
        $data = array('logo'=>$logo,'cliente'=>$nombre_cliente,'correo_cliente'=>$correo_cliente,'link_cotizacion'=>$link_cotizacion,
            'subject'=>'Cotizacion'
        );
        $this->mailer->to($correo_cliente)->send(new SendMail($data));
        return redirect(route('cotizaciones.index'));
    }
    public function testpdf(){
        $params= json_decode('{"folio":"000002","descripcion":["ddddddd dddd"],"cantidad":[1],"precio_unitario":[200],"total":[200],"cliente":{"nombre":"lorena","apellidopaterno":"sosa","apellidomaterno":"iuit","correo":"test@gmail.com","telefono":"9999999","id":2,"created_at":"2017-08-18 05:11:27","updated_at":"2017-08-18 05:11:27","padre_id":1},"title":"Cotizacion","data":{"_token":"K7RINCqVyjcSZndWVWdLiaA2si1bMRvq5McaBLXa","cliente_id":"2","nombre_cliente":"lorena sosa iuit","logo":"2","requisicion":"1111","empresa":"imagixel","validez":"2 d\u00edas","tiempo_entrega":"2 d\u00edas","tipoCotizacion":"2","cotizacion_id":"2","cantidad0":"1","descripcion0":"ddddddd dddd","tipo_producto0":"Impresora hp","precio_unitario0":"200","total0":"200","subtotal":"201.00","iva":"32.16","total":"233.16","TotalCotizacion":"1"}}',true);
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
        $data = array('tipoCotizacion'=>2,'cotizaciones_id'=>$cotizaciones_id);
        return view('AltaPrecotizaciones',$data);
    }

    public function usarCotizacion($cotizaciones_id)
    {
        $data = array('tipoCotizacion'=>3,'cotizaciones_id'=>$cotizaciones_id);
        return view('AltaPrecotizaciones',$data);
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
        Cotisation::destroy($id);
        return redirect(route('precotizaciones.index'));
    }

    public function testEmail()
    {
        $logo= url('img/logo50.png');
        $cliente =  'Manuel Sansores Gutierrez';
        $correo_cliente= 'test@test.com';
        $link_cotizacion = url('test');
        $data = array('logo'=>$logo,'cliente'=>$cliente,'correo_cliente'=>$correo_cliente,'link_cotizacion'=>$link_cotizacion,
                    'subject'=>'Cotizacion'
                    );
        $this->mailer->to('manuelsansoresg@gmail.com')->send(new SendMail($data));

        //return view('CotizacionEmail');
    }
}
