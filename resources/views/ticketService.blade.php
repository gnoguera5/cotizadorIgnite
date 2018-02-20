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
            <td><b>Cliente</b></td>
            <td>{{ $data->nombre.' '.$data->apellidopaterno.' '.$data->apellidomaterno }}</td>
        </tr>
        <tr>
            <td><b>Equipo:</b></td>
            <td>{{$data->equipo}}</td>
        </tr>
        <tr>
            <td><b>Marca:</b></td>
            <td>{{$data->marca}}</td>
        </tr>
        <tr>
            <td><b>Modelo:</b></td>
            <td>{{$data->modelo}}</td>
        </tr>
         <tr>
            <td><b>Serie:</b></td>
            <td>{{$data->noserie}}</td>
        </tr>
         <tr>
            <td><b>Accesorio:</b></b></td>
            <td>{{$data->accesorios}}</td>
        </tr>
        
        <tr>
        <td><b>Falla:</b></td>
        <td>{{$data->reporte_del_cliente}}</td>
        </tr>
    </table>
    <script type="text/javascript">
        window.onload = function() { window.print(); }
    </script>
</body>
</html>