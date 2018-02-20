<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceRequest;
use Illuminate\Http\Request;
use App\Service;
use App\Client;

class ServiceController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getTicketService($service_id)
    {
        $service = Service::where('services.id',$service_id)
                        ->join('clients','clients.id','=','services.client_id')
                        ->first();

        $cliente = $service->nombre.' '.$service->apellidopaterno.' '.$service->apellidomaterno;
        
        $data = array('data'=>$service);
        return view('ticketService',$data);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('Services');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('AltaServices');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ServiceRequest $request)
    {
        // generar cotizacion
        $getServices = Service::orderBy('id', 'desc') -> first();
        
        if (isset($getServices -> id)) {
            $service_id_serial = $getServices -> id + 1;
        } else {
            $service_id_serial = 1;
        }
        $folio = str_pad($service_id_serial, 6, "0", STR_PAD_LEFT);
        $nombre_unico = substr(md5(time().$folio),0,5);

        $service = new Service($request->except('_token'));
        $service->folio = $nombre_unico;
        $service->save();

        return redirect(route('service.index'));
    }

    public function getService()
    {
        $data = array();
        $services = Service::orderBy('id','desc')->get();
        foreach ($services as $value) {
            $client_id = $value->client_id;
            
            $client = Client::where('id',$client_id)->first();
            $nombre = "$client->nombre $client->apellidopaterno $client->apellidomaterno";
            $data[] = array('name'=>"$nombre", 'status'=>$value->status, 'folio'=> $value->folio, 'id'=>$value->id,'created_at'=>date('Y-m-d',strtotime($value->created_at)));
        }
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $service = Service::where('id',$id)->first();
        $client = Client::where('id',$service->client_id)->first();
        
        $data = array('service'=>$service,'client'=>$client);
        return view('EditarServices',$data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ServiceRequest $request, $id)
    {
        $service = Service::where('id',$id)->first();
        $service->fill($request->except('_token'));
        $service->update();
        return redirect(route('service.index'));

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Service::destroy($id);
        return redirect(route('service.index'));
    }
}
