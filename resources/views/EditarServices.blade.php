@extends('template.Principal') @section('content')
<style>
    .loader {
        border: 5px solid #f3f3f3;
        -webkit-animation: spin 1s linear infinite;
        animation: spin 1s linear infinite;
        border-top: 5px solid #555;
        border-radius: 50%;
        width: 50px;
        height: 50px;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
<style type="text/css">
    .bs-example {
        font-family: sans-serif;
        position: relative;
        margin: 100px;
    }


    .tt-query {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
    }

    .tt-hint {
        color: #999999;
    }

    .tt-menu {
        background-color: #FFFFFF;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        margin-top: 12px;
        padding: 8px 0;
        width: 422px;
    }

    .tt-suggestion {
        font-size: 22px;
        /* Set suggestion dropdown font size */
        padding: 3px 20px;
    }

    .tt-suggestion:hover {
        cursor: pointer;
        background-color: #0097CF;
        color: #FFFFFF;
    }

    .tt-suggestion p {
        margin: 0;
    }
</style>
<link href="{{asset('js/EasyAutocomplete/easy-autocomplete.css')}}" rel="stylesheet">
<!-- begin breadcrumb -->
<ol class="breadcrumb pull-right">
    {{--
    <li>
        <a href="javascript:;">Home</a>
    </li>--}} {{--
    <li class="active">Dashboard</li>--}}
</ol>

<h1 class="page-header">Cotizaciones
    <small></small>
</h1>
<div class="row">
    <!-- begin col-12 -->
    <div class="col-md-12">
        <!-- begin panel -->
        <div class="panel panel-inverse">
            <div class="panel-heading">

                <h4 class="panel-title">Alta Cotizaciones</h4>
            </div>
            <div class="panel-body">
                @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
                @endif
                <div id="app">
                    {!! Form::open(['route' => ['service.update',$service->id], 'method' => 'PUT', 'class' => 'form-horizontal']) !!}
                    <div class="form-group">
                        <label class="col-md-2 control-label">Buscar Cliente</label>
                        <div class="input-group col-md-4">
                            <input type="text" id="search_cliente" class="col-md-12" placeholder="Buscar..">
                            <span class="input-group-addon" style="cursor:pointer" data-toggle="modal" data-target="#m_clientes">
                                <i class="fa fa-search"></i>
                            </span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label">Cliente</label>
                        <div class="input-group col-md-4">
                            <u>
                                <h4 id="pnombre_cliente"> {{ $client->nombre.' '.$client->apellidopaterno.' '.$client->apellidomaterno  }} </h4>
                            </u>
                            <input type="hidden" id="client_id" name="client_id" value="{{$client->id}}">
                            <input type="hidden" id="nombre_cliente" name="nombre_cliente" value="{{ $client->nombre.' '.$client->apellidopaterno.' '.$client->apellidomaterno  }}" >
                        </div>
                    </div>

                    <br>
                    <div class="form-group">
                        <label class="col-md-2 control-label">Equipo</label>
                        <div class="input-group col-md-4">
                            {!! Form::select('equipo', ['telefono'=>'Teléfono','tablet'=>'Tablet','pc'=>'PC','otros'=>'Otros'],$service->equipo, ['class'=>'form-control
                            col-md-12']); !!}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label">Marca</label>
                        <div class="input-group col-md-4">
                            {!! Form::text('marca', $service->marca, ['class'=>'form-control col-md-4']); !!}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label">Modelo</label>
                        <div class="input-group col-md-4">
                            {!! Form::text('modelo', $service->modelo, ['class'=>'form-control col-md-4']); !!}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label">No. serie</label>
                        <div class="input-group col-md-4">
                            {!! Form::text('noserie', $service->noserie, ['class'=>'form-control col-md-4']); !!}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label">Accesorios</label>
                        <div class="input-group col-md-4">
                            {!! Form::textarea('accesorios', $service->accesorios, ['class'=>'form-control col-md-4']); !!}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label">Servicios de garantia</label>
                        <div class="input-group col-md-4">
                            @if($service->garantia==1)
                                Si {!! Form::checkbox('garantia', 1,true); !!} 
                                No {!! Form::checkbox('garantia', 2,false); !!}
                            @else
                                Si {!! Form::checkbox('garantia', 1,false); !!} 
                                No {!! Form::checkbox('garantia', 2,true); !!}
                            @endif
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label">Reporte del cliente</label>
                        <div class="input-group col-md-4">
                            {!! Form::textarea('reporte_del_cliente', $service->reporte_del_cliente, ['class'=>'form-control col-md-4']); !!}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label">Respaldar</label>
                        <div class="input-group col-md-4">
                            {!! Form::textarea('respaldar', $service->respaldar, ['class'=>'form-control col-md-4']); !!}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label">Contraseña del equipo </label>
                        <div class="input-group col-md-4">
                            {!! Form::text('contrasenia_equipo', $service->contrasenia_equipo, ['class'=>'form-control col-md-4']); !!}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label">Trabajo realizado</label>
                        <div class="input-group col-md-4">
                            {!! Form::textarea('trabajo_realizado', $service->trabajo_realizado, ['class'=>'form-control col-md-4']); !!}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label">Estatus</label>
                        <div class="input-group col-md-4">
                            {!! Form::select('status', ['recibido'=>'Recibido','realizado'=>'Realizado','entregado'=>'Entregado'],$service->status, ['class'=>'form-control
                            col-md-12']); !!}
                        </div>
                    </div>
                    <div class="col-md-8 pull-left">
                        <br>
                        <button type="submit" class="btn btn-sm btn-primary">Guardar</button>
                    </div>
                    {!! Form:: close() !!} {{--{{ $contratos->links() }}--}}
                </div>
            </div>
        </div>

    </div>
    <!-- end panel -->
</div>
<!-- end col-12 -->
</div>



@endsection @section('addjs')
<script src="{{asset('js/vuejs.js')}}"></script>
<script src="{{asset('js/vue-resource.min.js')}}"></script>
<script src="{{asset('js/bootstrap3-typeahead.min.js')}}"></script>

<script src="{{asset('js/fuse.min.js')}}"></script>
<script src="{{asset('js/EasyAutocomplete/jquery.easy-autocomplete.js')}}"></script>
<script>
    $(document).ready(function () {

        var options = {
            url: "/getClients",

            getValue: function (element) {

                return element.name;
            },
            list: {
                match: {
                    enabled: true
                },
                onKeyEnterEvent: function () {
                    var index = $("#search_cliente").getSelectedItemData().id;
                    var nombre = $("#search_cliente").getSelectedItemData().name;
                    $('#client_id').val(index);
                    $('#nombre_cliente').val(nombre);
                    $('#pnombre_cliente').html(nombre);
                    $('#search_cliente').val('');
                },
                onClickEvent: function () {
                    var index = $("#search_cliente").getSelectedItemData().id;
                    var nombre = $("#search_cliente").getSelectedItemData().name;
                    $('#client_id').val(index);
                    $('#nombre_cliente').val(nombre);
                    $('#pnombre_cliente').html(nombre);
                    $('#search_cliente').val('');


                }

            },

            theme: "plate-dark"
        };

        $("#search_cliente").easyAutocomplete(options);

        var options = {
            //url: "/getCatalogs/"+$("#getCatalogo").val(),
            url: function (phrase) {
                return "/getCatalogs/" + phrase;
            },
            getValue: function (element) {

                return element.name;
            },
            list: {
                match: {
                    enabled: true
                },
                onKeyEnterEvent: function () {
                    var index = $("#getCatalogo").getSelectedItemData().posicion;
                    var id = $("#getCatalogo").getSelectedItemData().id;
                    var nombre = $("#getCatalogo").getSelectedItemData().name;
                    var descripcion = $("#getCatalogo").getSelectedItemData().descripcion;
                    var tipo_producto = $("#getCatalogo").getSelectedItemData().tipo_producto;
                    var precio_unitario = $("#getCatalogo").getSelectedItemData().precio_unitario;

                    var contador_elementos = $('#contador_elementos').val() * 1;
                    var TotalCotizacion = $('#TotalCotizacion').val() * 1;

                    contador_elementos = contador_elementos + 1
                    TotalCotizacion = TotalCotizacion + 1
                    $('#contador_elementos').val(contador_elementos);
                    $('#TotalCotizacion').val(TotalCotizacion);
                    $('#getCatalogo').val('');
                    agregarElementos(contador_elementos, descripcion, tipo_producto, precio_unitario, 1);
                },
                onClickEvent: function () {
                    var index = $("#getCatalogo").getSelectedItemData().posicion;
                    var id = $("#getCatalogo").getSelectedItemData().id;
                    var nombre = $("#getCatalogo").getSelectedItemData().name;
                    var descripcion = $("#getCatalogo").getSelectedItemData().descripcion;
                    var tipo_producto = $("#getCatalogo").getSelectedItemData().tipo_producto;
                    var precio_unitario = $("#getCatalogo").getSelectedItemData().precio_unitario;
                    var contador_elementos = $('#contador_elementos').val() * 1;
                    var TotalCotizacion = $('#TotalCotizacion').val() * 1;

                    contador_elementos = contador_elementos + 1
                    TotalCotizacion = TotalCotizacion + 1
                    $('#contador_elementos').val(contador_elementos);
                    $('#TotalCotizacion').val(TotalCotizacion);

                    agregarElementos(contador_elementos, descripcion, tipo_producto, precio_unitario, 1);
                    getTotalRow(contador_elementos);
                    getTotal();
                    $('#getCatalogo').val('');

                }

            },

            theme: "plate-dark"
        };

        $("#getCatalogo").easyAutocomplete(options);



    });

</script> @endsection