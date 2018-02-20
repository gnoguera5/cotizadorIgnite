<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ticket</title>
</head>
<body>
    <table>
        <tr>
            <td><b>Folio:</b></td>
            <td>{{ $folio_ticket}}</td>
        </tr>
        <tr>
            <td><b>Nombre de la empresa:</b></td>
            <td>{{ $params->empresa }}</td>
        </tr>
        <tr>
            <td><b>Nombre del cliente:</b></td>
            <td>{{ $params->nombre_cliente }}</td>
        </tr>
        <tr>
            <td><b>Fecha:</b></td>
            <td>{{ substr($fecha,0,10) }}</td>
        </tr>

    </table>
    <h4>Datos de la compra:</h4>
    <table>
        <tr>
            <th>Cantidad</th>
            <th>Descripción</th>
            <th>P.unitario</th>
            <th>Total</th>
        </tr>
        @for($i = 0; $i < $params->TotalCotizacion; $i++)
        <tr>
            <td>{{$cantidad[$i]}}</td>
            <td>{{$descripcion[$i]}}</td>
            <td>{{$precio_unitario[$i]}}</td>
            <td>{{$total[$i]}}</td>
        </tr>
        @endfor
        <tr>
            <td align="right" colspan="3">
                Subtotal
            </td>
            <td>{{$params->subtotal}}</td>
        </tr>
        <tr>
            <td align="right" colspan="3">
                IVA
            </td>
            <td>{{$params->iva}}</td>
        </tr>
         <tr>
            <td align="right" colspan="3">
                IVA
            </td>
            <td>{{$params->total}}</td>
        </tr>
    </table>
   
    <script type="text/javascript">
        window.onload = function() { window.print(); }
    </script>
</body>
</html>