<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Cotisation;
use Barryvdh\DomPDF\PDF;
use Illuminate\Support\Facades\App;

//number_format("12199.99",2,".",",")

class PdfController extends Controller
{

    public function getPdf($cotizacion_id)
    {
        $cotizacion = Cotisation::where('id',$cotizacion_id)->first();
        $params = json_decode($cotizacion->params,true);
        $pdf = App::make('dompdf.wrapper');
        $pdf->loadView('pdfCotizacion',$params)->setPaper('letter', 'portrait');
        return $pdf->stream();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
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
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
