@extends('template.EmailTemplate')

@section('content')
    <table class="head-wrap" bgcolor="#999999" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0; width: 100%;">
        <tbody>
        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
            <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"></td>
            <td class="header container" style="clear: both !important; display: block !important; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0 auto !important; max-width: 600px !important; padding: 0;">

                <div class="content" style="display: block; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0 auto; max-width: 600px; padding: 15px;">
                    <table bgcolor="#999999" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0; width: 100%;">
                        <tbody>
                        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
                            <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"></td>
                            <td align="left" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
                                <img src="{{$logo}}" alt="">

                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </td>
            <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"></td>
        </tr>
        </tbody>
    </table>

    <table class="body-wrap" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0; width: 100%;">
        <tbody>
        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
            <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"></td>
            <td class="container" bgcolor="#FFFFFF" style="clear: both !important; display: block !important; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0 auto !important; max-width: 600px !important; padding: 0;">

                <div class="content" style="display: block; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0 auto; max-width: 600px; padding: 15px;">
                    <table style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0; width: 100%;">
                        <tbody>
                        <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
                            <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
                                <p style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: normal; line-height: 1.6; margin: 0; margin-bottom: 10px; padding: 0;">
                                    Se ha realizado su cotización</p>
                                <p style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: normal; line-height: 1.6; margin: 0; margin-bottom: 10px; padding: 0;">
                                    Nombre: {{$cliente}}</p>
                                <p style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: normal; line-height: 1.6; margin: 0; margin-bottom: 10px; padding: 0;">
                                    Correo: {{$correo_cliente}} </p>
                                <p class="callout" style="background-color: #ECF8FF; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: normal; line-height: 1.6; margin: 0; margin-bottom: 15px; padding: 15px;">
                                    Muchas gracias por su preferencia, para consultar su Cotización, por favor haga clic en el siguiente botón:
                                    <br style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
                                    <a href="{{$link_cotizacion}}" style="color: #2BA6CB; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-weight: bold; margin: 0; padding: 0;">
                                        Ver Cotización
                                    </a>

                                </p>
                                <br style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"><br style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"> Este es un correo
                                de confirmación, favor de no responder a este correo.
                                <br style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
                                <br style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">

                                <!-- social & contact -->
                                <table class="social" width="100%" style="background-color: #ebebeb; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0; width: 100%;">
                                    <tbody>
                                    <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
                                        <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">

                                            <!--- column 1 -->
                                            <table align="left" class="column" style="float: left; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; min-width: 279px; padding: 0; width: 280px;">
                                                <tbody>
                                                <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
                                                    <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 15px;">

                                                        <h5 class="" style="color: #000; font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 17px; font-weight: 900; line-height: 1.1; margin: 0; margin-bottom: 15px; padding: 0;">
                                                            Vísitanos en:</h5>
                                                        <p class="" style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: normal; line-height: 1.6; margin: 0; margin-bottom: 10px; padding: 0;"><a href="#" class="soc-btn fb" style="background-color: #3B5998 !important; color: #FFF; display: block; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 12px; font-weight: bold; margin: 0; margin-bottom: 10px; padding: 3px 7px; text-align: center; text-decoration: none;">Facebook</a>                                      <a href="#" class="soc-btn tw" style="background-color: #1daced !important; color: #FFF; display: block; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 12px; font-weight: bold; margin: 0; margin-bottom: 10px; padding: 3px 7px; text-align: center; text-decoration: none;">Twitter</a>                                      <a href="#" class="soc-btn gp" style="background-color: #DB4A39 !important; color: #FFF; display: block; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 12px; font-weight: bold; margin: 0; margin-bottom: 10px; padding: 3px 7px; text-align: center; text-decoration: none;">
                                                                Página web</a></p>


                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <!-- /column 1 -->

                                            <!--- column 2 -->
                                            <table align="left" class="column" style="float: left; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; min-width: 279px; padding: 0; width: 280px;">
                                                <tbody>
                                                <tr style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
                                                    <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 15px;">

                                                        <h5 class="" style="color: #000; font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif; font-size: 17px; font-weight: 900; line-height: 1.1; margin: 0; margin-bottom: 15px; padding: 0;">
                                                            Información de contacto:</h5>
                                                        <p style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: normal; line-height: 1.6; margin: 0; margin-bottom: 10px; padding: 0;">
                                                            Teléfono: <strong style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
                                                                99998387766</strong><br style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
                                                            Correo: <strong style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"><a href="emailto:hseldon@trantor.com" style="color: #2BA6CB; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">hseldon@trantor.com</a></strong></p>

                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <!-- /column 2 -->

                                            <span class="clear" style="clear: both; display: block; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"></span>

                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <!-- /social & contact -->


                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </td>
            <td style="font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; margin: 0; padding: 0;"></td>
        </tr>
        </tbody>
    </table>
@endsection