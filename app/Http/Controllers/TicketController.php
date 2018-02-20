<?php

namespace App\Http\Controllers;

use App\Ticket;
use Illuminate\Http\Request;
use App\Cotisation;

class TicketController extends Controller
{
    
    public function getTicket($cotizacion_id)
    {
        $getCotizacion = Cotisation::where('id',$cotizacion_id)->first();
        $parametros = '';
        $folio_ticket = '';
        $fecha = '';
        if(count($getCotizacion)>0){ //si existe la cotizacion
            $parametros = json_decode($getCotizacion->params);
            $getTicket = Ticket::where('cotisation_id',$cotizacion_id)->first();
            if(count($getTicket)==0){ //si no tiene ticket
                $ticket = new Ticket();
                //generar folio
                $getTicket = Ticket::orderBy('id', 'desc') -> first();
                
                if (isset($getTicket -> id)) {
                    $ticket_id_serial = $getTicket -> id + 1;
                } else {
                    $ticket_id_serial = 1;
                }
                $folio = str_pad($ticket_id_serial, 6, "0", STR_PAD_LEFT);
                $nombre_unico = substr(md5(time().$folio),0,5);
                $ticket->folio = $nombre_unico;
                $ticket->cotisation_id = $cotizacion_id;
                $ticket->save();

                //obtener datos del registro guardado
                $last_ticket = Ticket::where('folio',$nombre_unico)->first();
                $folio_ticket = $last_ticket->folio;
                $fecha = $last_ticket->created_at;
            }else{ //tiene ticket
                $folio_ticket = $getTicket->folio;
                $fecha = $getTicket->created_at;
            }
        }

        $cantidad = $parametros->cantidad;
        $descripcion = $parametros->descripcion;
        $precio_unitario = $parametros->precio_unitario;
        $total = $parametros->total;
        $data = array('folio_ticket'=>$folio_ticket, 
                    'cantidad'=>$cantidad,'descripcion'=>$descripcion,
                    'precio_unitario'=>$precio_unitario,'total'=>$total,
                    'fecha'=>$fecha, 'params'=>$parametros->data);
        return view('ticketCotizacion',$data);

        // 
        // return response($data);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function show(Ticket $ticket)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ticket $ticket)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ticket $ticket)
    {
        //
    }
}
