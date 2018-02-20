@extends('template.PdfTemplate')
@section('title',$title)
@section('content')
    <style>
        .table > tbody > tr > td,
        .table > tbody > tr > th,
        .table > tfoot > tr > td,
        .table > tfoot > tr > th,
        .table > thead > tr > td,
        .table > thead > tr > th {
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
        }

        footer {
          position: fixed;
          bottom: -60px;
          left: 0px;
          right: 0px;
        }
    </style>
    <header>
        <div class="container">
            <table class="table borderless bgblack">
                <tr style="height: 146px;">
                    <td style="padding: 0px 20px !important; padding-top: 14px !important;">
                        @if($data['logo'] == 1)
                            <img src="{{public_path('img/logo1.png')}}" alt="" style="width: 262px; max-height: 120px">
                        @else
                            <img src="{{public_path('img/ignitewhite.png')}}" style="width: 262px; max-height: 120px">
                        @endif
                    </td>

                    <td width="150px">&nbsp;</td>

                    <td>
                        <table class="cwhite d12" style="z-index: 2000; margin-top: 30px !important; text-align: right; font-size: 14px !important; font-weight: 300">
                            <tr>
                                <td>Cotización: {{$folio}}</td>
                            </tr>
                            <tr>
                                <td><br></td>
                            </tr>
                            <tr>
                                <td>Requisición No: {{isset($data['requisicion']) ? $data['requisicion'] : ''}}</td>
                            </tr>
                            <!--
                            <tr>
                                <td><b>Fecha:</b> {{date('d-m-Y')}} </td>
                            </tr>
                             -->
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </header>
    <br>
    <div class="row">
        <div class="container">
            <div style="padding: 0px 16px;" class="flex flex-row align-center justify-space-between">
                <div>
                    <p style="font-size: 44px !important; font-style: italic; font-weight: bold;">COTIZACIÓN</p>
                </div>
                <div style="font-size: 14px !important; font-weight: 300;" class="flex flex-row align-center">
                    <p style="margin-right: 18px">Fecha:</p>
                    <p style="width: 228px; text-align: center; background-color: #CCCCCC">{{date('d-m-Y')}}</p>
                </div>
            </div>
            <br>
            <div style="background-color: #CCCCCC; padding: 24px 16px;">
                <table class="table" style="background-color: white">
                    <tr>
                        <th style='border: 1px solid black; text-align: center;'>Cantidad</th>
                        <th style='border: 1px solid black; text-align: center;'>Descripcion</th>
                        @if($data['tipo_precio']!='1')
                            <th style='border: 1px solid black; text-align: center;'>P.unitario</th>
                            <th style='border: 1px solid black; text-align: center;'>Total</th>
                            @else
                            <th style='border: 1px solid black; text-align: center;' colspan="2">Total</th>
                        @endif

                    </tr>

                    <?php
                        $cantidadIndexRemaining = sizeof($cantidad) < 16 ? 16 - sizeof($cantidad) : sizeof($cantidad);
                    ?>

                    @foreach($cantidad as $key => $row)
                        <tr>
                            @if($data['tipo_precio']!='1')
                                <?php
                                    setlocale(LC_MONETARY, 'en_US');
                                    $p_unitario = money_format('%(#10n', $precio_unitario[$key]);
                                ?>
                                    <td style='border: 1px solid black; text-align: center;'>{{$cantidad[$key]}}</td>
                                    <td style='border: 1px solid black;'>{{$descripcion[$key]}}</td>
                                    <td style='border: 1px solid black; text-align: center;' align="right">{{$p_unitario}} MXN</td>
                                    <td style='border: 1px solid black; text-align: center;' align="right">${{$total[$key]}} MXN</td>
                            @else
                                <td>{{$cantidad[$key]}}</td>
                                <td>{{$descripcion[$key]}}</td>
                                @if($total[$key]>0)
                                    <td align="right" colspan="2">${{$total[$key]}} MXN</td>
                                @else
                                    <td align="right" colspan="2"></td>
                                @endif
                            @endif
                        </tr>
                    @endforeach
                    @for ($i = 0; $i < $cantidadIndexRemaining; $i++)
                        <tr>
                            <td style='border: 1px solid black;'><br /></td>
                            <td style='border: 1px solid black;'><br /></td>
                            <td style='border: 1px solid black;' align="right"><br /></td>
                            <td style='border: 1px solid black;' align="right"><br /></td>
                        </tr>
                    @endfor

                    <!--
                    <tr>
                        <td style="background-color: #CCCCCC"></td>
                        <td style="background-color: #CCCCCC"></td>
                        <td class="borderless" colspan="2" valign="top" align="left">
                            FORMA DE PAGO: {{isset($tipo_pago)?$tipo_pago:''}} <br>
                            GARANTÍA:{{isset($garantia)?$garantia:''}}<br>
                            RECIBÍ : _____________________________
                            {{--<table class="borderless" width="200px" style="background-color: transparent !important;">
                                <tr>
                                    <td>FORMA DE PAGO:</td>
                                    <td>

                                    </td>
                                </tr>
                                <tr>
                                    <td>GARANTÍA:</td>
                                    <td>{{isset($garantia)?$garantia:''}}</td>
                                </tr>
                            </table>--}}
                        </td>

                        <td colspan="2" style="background-color: #CCCCCC; padding: 0 !important;">
                            <div style="margin-left: 72px; background-color: white; font-size: 11px">
                                <div class="flex flex-row">
                                    <div class="flex flex-fill justify-center border-subs">Subtotal</div>
                                    <div class="flex flex-fill justify-center border-subs border-subs-balancer">Subtotal</div>
                                </div>
                                <div class="flex flex-row">
                                    <div class="flex flex-fill justify-center border-subs">I.V.A</div>
                                    <div class="flex flex-fill justify-center border-subs border-subs-balancer"></div>
                                </div>
                                <div class="flex flex-row">
                                    <div class="flex flex-fill justify-center border-subs">Total</div>
                                    <div class="flex flex-fill justify-center border-subs border-subs-balancer"></div>
                                </div>
                            </div>
                        </td>

                        <td valign="top" align="right">
                            Subtotal <br>
                            IVA$ <br>
                            Total
                            {{--<table class="d12"  width="320px">
                                <tr>
                                    <td align="right"></td>
                                    <td  align="right"></td>
                                </tr>
                                <tr>
                                    <td align="right"></td>
                                    <td align="right"></td>
                                </tr>
                                <tr>
                                    <td align="right"></td>
                                    <td align="right"></td>
                                </tr>
                            </table>--}}
                        </td>
                        <td valign="top">
                            ${{$data['subtotal']}} MXN <br>
                            ${{$data['iva']}} MXN <br>
                            ${{$data['total']}} MXN

                        </td>
                    </tr>
                     -->
                </table>
            </div>
            <div class="row">
                <div class="col-xs-7">
                    <div style="font-size: 14px !important; font-weight: 300;" class="flex flex-row align-center">
                        <p style="margin-right: 18px">Validez de la Cotización:</p>
                        <p style="width: 200px; text-align: center; background-color: #CCCCCC">{{date('d-m-Y')}}</p>
                    </div>
                    <div style="font-size: 14px !important; font-weight: 300;" class="flex flex-row align-center">
                        <p style="margin-right: 18px">Tiempo de Entrega:</p>
                        <p style="width: 200px; text-align: center; background-color: #CCCCCC">{{date('d-m-Y')}}</p>
                    </div>
                    <div style="font-size: 14px !important; font-weight: 300;" class="flex flex-row align-center">
                        <p style="margin-right: 18px">Formas de Pago:</p>
                        <p style="text-align: center;">Efectivo / Transferencia / Tarjeta de Crédito</p>
                    </div>
                </div>
                <div class="col-xs-5">
                    <div style="font-size: 14px !important; font-weight: 300;" class="flex flex-row align-center">
                        <p style="margin-right: 18px">Cliente:</p>
                        <p style="width: 200px; text-align: center; background-color: #CCCCCC">{{date('d-m-Y')}}</p>
                    </div>
                    <div style="font-size: 14px !important; font-weight: 300;" class="flex flex-row align-center">
                        <p style="margin-right: 18px">Empresa:</p>
                        <p style="width: 200px; text-align: center; background-color: #CCCCCC">{{date('d-m-Y')}}</p>
                    </div>
                </div>
            </div>
            <br>
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
                        <br><br>
                        Atentamente
                        <br><br>
                        Germán Noguera<br>
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
                            Mérida, Yucatán <br>
                            Calle 50 #418 entre Calle 55 y 55C. Fracc. <br>
                            Francisco de Montejo
                            <br>Teléfono: (999) 195 2801
                        </td>
                        <td width="300px"></td>
                        <td >
                            www.gamingstore.com.mx <br>
                            ventas@gamingstore.com.mx <br>
                            Facebook: IgniteGamingStor <br>
                        </td>
                    </tr>
                </table>
            </footer>
        </div> <!-- div container !-->
    </div>




@endsection