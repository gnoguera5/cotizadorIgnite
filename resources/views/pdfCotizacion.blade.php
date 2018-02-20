@extends('template.PdfTemplate') @section('title',$title) @section('content')
<style>
    .table>tbody>tr>td,
    .table>tbody>tr>th,
    .table>tfoot>tr>td,
    .table>tfoot>tr>th,
    .table>thead>tr>td,
    .table>thead>tr>th {
        padding: 2px !important;
    }

    .borderdiv {
        padding: 1px;
        border: 1px solid grey;
    }

    .d9 {
        font-size: 9px;
    }

    .page-break {
        page-break-after: always;
    }

    p {
        font-size: 11.8px !important;
    }

    table {
        font-size: 11px !important;
        padding: 0px !important;
        margin: 0px !important;
    }

    .d11 {
        font-size: 11px !important;
    }

    .d10 {
        font-size: 10px !important;
    }

    .d12 {
        font-size: 14px !important;
    }

    .red {
        border-top: 1px solid red;
    }

    .bgblack {
        background-color: #222222;
    }

    .cwhite {
        color: white !important;
    }

    .flex {
        display: -webkit-box !important;
        display: -ms-flexbox !important;
        display: flex !important;
    }

    .flex-fill {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .flex-row {
        -webkit-box-orient: horizontal !important;
        -webkit-box-direction: normal !important;
        -ms-flex-direction: row !important;
        flex-direction: row !important;
    }

    .align-center {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .justify-center {
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    .justify-space-between {
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }

    .justify-space-around {
        -ms-flex-pack: distribute;
        justify-content: space-around;
    }

    .border-subs {
        border: 0px solid black;
        border-bottom-width: 1px;
        border-left-width: 1px;
    }

    .border-subs-balancer {
        padding-left: 18px;
        border-right-width: 1px;
        margin-right: -1px;
    }

    @page {
        margin: 100px 0px;
    }

    header {
        position: fixed;
        top: -100px;
        left: 0px;
        right: 0px;
        background-color: #222222;
        height: 130px;
    }

    footer {
        position: fixed;
        bottom: -10px;
        left: 0px;
        right: 0px;
    }
</style>
<?php
use App\Helpers\Utilities;
$utilities = new Utilities;
?>
<header>
    <table class="table borderless">
        <tr style="height: 146px;">
                @if($data['logo'] == 1)
                    <td style="padding: 0px 20px !important; padding-top: 30px !important;">
                            <img src="{{public_path('img/logo1.png')}}" alt="" style="width: 380px; height: 80px"> 
                    </td>
                @else
                <td style="padding: 0px 20px !important; padding-top: 14px !important;">
                    <img src="{{public_path('img/ignitewhite.png')}}" style="width: 262px; max-height: 120px"> 
                </td>
                @endif

            </td>

            <td width="150px">&nbsp;</td>

            <td>
                <table class="cwhite d12" style="z-index: 2000; margin-top: 30px !important; text-align: right; font-size: 14px !important; font-weight: 300">
                    <tr>
                        <td>Cotización: {{$folio}}</td>
                    </tr>
                    <tr>
                        <td>
                            <br>
                        </td>
                    </tr>
                    <tr>
                        <td>Requisición No: {{isset($data['requisicion']) ? $data['requisicion'] : ''}}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</header>
<br>
<br>
<div class="row">
    <table>
        <tr>
            <td style="width: 50px"></td>
            <td>
                <p style="font-size: 44px !important; font-style: italic; font-weight: bold;">COTIZACIÓN</p>
            </td>
            <td style="width: 190px"></td>
            <td>
                <p style="margin-right: 18px">Fecha:</p>
            </td>
            <td style="width: 228px">
                <p style="text-align: center; background-color: #CCCCCC">{{ $utilities->nameMonth(date('d-m-Y')) }}</p>
            </td>
        </tr>
    </table>
</div>

<div style=" background-color: #CCCCCC">
    <br>
    <div class="container">
        <table class="table" style="background-color: white">
            <tr>
                <th style='border: 1px solid black; text-align: center;'>Cantidad</th>
                <th style='border: 1px solid black; text-align: center;'>Descripcion</th>
               
                <th style='border: 1px solid black; text-align: center;'>P.unitario</th>
                <th style='border: 1px solid black; text-align: center;'>Total</th>
                
               

            </tr>
            <?php
                    $cantidadIndexRemaining = sizeof($cantidad) < 12 ? 12 - sizeof($cantidad) : sizeof($cantidad);
                ?>
                @foreach($cantidad as $key => $row)
                <tr>
                    @if($data['tipo_precio']!='1')
                  
                        <td style='border: 1px solid black; text-align: center;'>{{$cantidad[$key]}}</td>
                        <td style='border: 1px solid black;'>{{$descripcion[$key]}}</td>
                        <td style='border: 1px solid black; text-align: center;' align="right">$ {{ number_format($precio_unitario[$key],2,".",",") }} MXN</td>
                        <td style='border: 1px solid black; text-align: center;' align="right">$ {{ number_format($total[$key],2,".",",")}} MXN</td>
                        @else
                        <td style='border: 1px solid black; text-align: center;'>{{$cantidad[$key]}}</td>
                        <td style='border: 1px solid black; text-align: center;'> {{$descripcion[$key]}}</td>
                        @if($total[$key]>0)
                        <td style='border: 1px solid black; text-align: center;'>${{ number_format($precio_unitario[$key],2,".",",")   }} MXN</td>
                        <td style='border: 1px solid black; text-align: center;' align="right">${{  number_format($total[$key],2,".",",") }} MXN</td>
                        @else
                        <td align="right" style='border: 1px solid black; text-align: center;'></td>
                        <td style='border: 1px solid black; text-align: center;'></td>
                        @endif 
                    @endif
                </tr>
                @endforeach @for ($i = 0; $i
                < $cantidadIndexRemaining; $i++) <tr>
                    <td style='border: 1px solid black;'>
                        <br />
                    </td>
                    <td style='border: 1px solid black;'>
                        <br />
                    </td>
                    <td style='border: 1px solid black;' align="right">
                        <br />
                    </td>
                    <td style='border: 1px solid black;' align="right">
                        <br />
                    </td>
                    </tr>
                    @endfor
                    <tr class="borderless">
                        <td style='background-color: #CCCCCC'></td>
                        <td style='background-color: #CCCCCC'></td>
                        <td style='background-color: black; color:white' align="right">Subtotal</td>
                        <td style='background-color: black; color:white' align="right">$ {{ number_format($data['subtotal'],2,".",",")}} MXN</td>
                    </tr>
                    <tr class="borderless">
                        <td style='background-color: #CCCCCC'></td>
                        <td style='background-color: #CCCCCC'></td>
                        <td style='background-color: black; color:white' align="right">IVA</td>
                        <td style='background-color: black; color:white' align="right">$ {{ number_format($data['iva'],2,".",",")}} MXN</td>
                    </tr>
                    <tr class="borderless">
                        <td style='background-color: #CCCCCC'></td>
                        <td style='background-color: #CCCCCC'></td>
                        <td style='background-color: black; color:white' align="right">Total</td>
                        <td style='background-color: black; color:white' align="right">$ {{ number_format($data['total'],2,".",",")}} MXN</td>
                    </tr>

        </table>
      
    </div>
    
</div>

<div class="container">
    <table>
        <tr>
            <td>
                <p style="margin-right: 18px">Validez de la Cotización:</p>
            </td>
            <td>
                <p style="width: 200px; text-align: center; background-color: #CCCCCC">{{date('d-m-Y')}}</p>
            </td>
            <td style="width: 100px"></td>
            <td>
                <p style="margin-right: 18px">Cliente:</p>
            </td>
            <td>
                <p style="width: 200px; text-align: center; background-color: #CCCCCC">{{ $data['nombre_cliente'] }}</p>
            </td>
        </tr>
        <tr>
            <td>
                <p style="margin-right: 18px">Tiempo de Entrega:</p>
            </td>
            <td>
                <p style="width: 200px; text-align: center; background-color: #CCCCCC">{{ $data['tiempo_entrega'] }}</p>
            </td>
            <td style="width: 100px"></td>
            <td> <p style="margin-right: 18px">Empresa:</p> </td>
            <td>
                <p style="width: 200px; text-align: center; background-color: #CCCCCC">{{ $data['empresa'] }}</p>
            </td>
        </tr>
        <tr>
            <td>
                <p style="margin-right: 18px">Formas de Pago:</p>
            </td>
            <td>
                <p style="text-align: center;">Efectivo / Transferencia / Tarjeta de Crédito</p>
            </td>
        </tr>
    </table>
    
</div>

<div class="container">
    <div class="row">

        <div class="col-xs-6" style="margin-left: 17px; border: 1px solid grey">

            <table>
                <tr>
                    <td>
                        <p style="font-style: italic;">Datos Físcales</p>

                        <p style="color: #5B5B5C;">
                            NEXT MID S.A. DE
                            <br>C.V NMI141223E9A
                            <br>AV. 50 No. 418 X 55 Y 55C
                            <br>FRACC. FRANCISCO DE
                            <br>MONTEJO C.P.97203
                            <br>MÉRIDA, YUCATÁN.
                        </p>
                    </td>
                    <td style="width: 60px" ></td>
                    <td valign="top">
                        <p style="font-style: italic;">Datos de la Cuenta</p>

                        <p style="color: #5B5B5C;">
                            NEXT MID S.A. DE
                            <br>C.V. SCOTIABANK
                            <br>CLABE 044910170024466347
                            <br>CUENTA 17002446634
                        </p>
                    </td>
                </tr>
            </table>

        </div>

        <div class="col-xs-4" style=" margin-left: 20px; border-top: 1px solid red; ">
            <p style="text-align: right; font-style: italic;">
                Sin más por el momento, quedamos a sus órdenes para cualquier duda o información adicional que requiera.
                <br>
                <br> Atentamente
                <br>
                <br> Germán Noguera
                <br>
                @if($data['logo'] == 2)
                    <b>Ignite Gaming Store</b>
                |@else
                    <b>Tecnomart</b>
                @endif
            </p>
        </div>
    </div>
</div>

<footer>
        <table class="table" style="background-color: black; color: white">
            <tr>
                <td width="20px"></td>
                <td width="200px">
                    Mérida, Yucatán
                    <br> Calle 50 #418 entre Calle 55 y 55C. Fracc.
                    <br> Francisco de Montejo
                    <br>Teléfono: (999) 195 2801
                </td>
                <td width="300px"></td>
                <td>
                    www.gamingstore.com.mx
                    <br> ventas@gamingstore.com.mx
                    @if($data['logo'] == 2)
                        <br> Facebook: IgniteGamingStore
                        @else
                        <br> Facebook: tecnomartmexico
                    @endif
                    <br>
                </td>
            </tr>
            
        </table>
        
    </footer>
<!-- 
<div class="row">
    <div class="container">
        <div class="row" style="margin: 0;">
            <div class="col-xs-7" style="padding: 20px; border: 1px solid black;">
                <div class="col-xs-6">
                    <p style="font-style: italic;">Datos de la Cuenta</p>

                    <p style="color: #5B5B5C;">
                        NEXT MID S.A. DE
                        <br>C.V NMI141223E9A
                        <br>AV. 50 No. 418 X 55 Y 55C
                        <br>FRACC. FRANCISCO DE
                        <br>MONTEJO C.P.97203
                        <br>MÉRIDA, YUCATÁN.
                    </p>
                </div>
                <div class="col-xs-6">
                    <p style="font-style: italic;">Datos</p>

                    <p style="color: #5B5B5C;">
                        NEXT MID S.A. DE
                        <br>C.V. SCOTIABANK
                        <br>CLABE 044910170024466347
                        <br>CUENTA 17002446634
                    </p>
                </div>
            </div>
            <div class="col-xs-offset-1 col-xs-4" style="padding: 20px; border-top: 1px solid black;">
                <p style="text-align: right; font-style: italic;">
                    Sin más por el momento, quedamos a sus órdenes para cualquier duda o información adicional que requiera.
                    <br>
                    <br> Atentamente
                    <br>
                    <br> Germán Noguera
                    <br>
                    <b>Ignite Gaming Store</b>
                </p>
            </div>
        </div>
        <br>
        <footer>
            <table class="table" style="background-color: black; color: white">
                <tr>
                    <td width="20px"></td>
                    <td width="200px">
                        Mérida, Yucatán
                        <br> Calle 50 #418 entre Calle 55 y 55C. Fracc.
                        <br> Francisco de Montejo
                        <br>Teléfono: (999) 195 2801
                    </td>
                    <td width="300px"></td>
                    <td>
                        www.gamingstore.com.mx
                        <br> ventas@gamingstore.com.mx
                        <br> Facebook: IgniteGamingStor
                        <br>
                    </td>
                </tr>
            </table>
        </footer>
    </div>
</div> -->



@endsection