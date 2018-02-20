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
                <div id="app">

                    <h4>Seleccione un cliente</h4>
                    <hr>
                    <div class="input-group col-md-4">
                        <input type="text" id="search_cliente" class="col-md-12" placeholder="Buscar..">
                        <span class="input-group-addon" style="cursor:pointer" data-toggle="modal" data-target="#m_clientes">
                            <i class="fa fa-search"></i>
                        </span>
                        <input type="button" value="+" data-toggle="modal" data-target="#m_add_clientes" class="btn btn-primary">
                    </div>
                    <br>

                    <h4>Clientes agregado</h4>
                    <input type="hidden" id="base_url_pdf" value="{{url('/pdf' )}}"> 
                    {!! Form::open(['','method'=>'POST','class'=>'form-horizontal','id'=>'frm_cliente']) !!}
                    <u>
                        <h4 id="pnombre_cliente"> </h4>
                    </u>
                    <input type="hidden" id="cliente_id" name="cliente_id">
                    <input type="hidden" id="nombre_cliente" name="nombre_cliente"> {!! Form::close() !!}

                    <hr>
                    <h4>Seleccione un logotipo</h4>

                    {!! Form::open(['','method'=>'POST','class'=>'form-horizontal','id'=>'frm_logo']) !!}
                    <div class="text-center">
                        <div class="form-group col-md-6">

                            <input type="radio" name="logo" value="1" checked="checked"> &nbsp;
                            <img src="{{asset('img/logo1.png')}}" class=" col-md-4 img-responsive">
                        </div>
                        <div class="form-group">
                            <input type="radio" name="logo" value="2">&nbsp;
                            <img src="{{asset('img/logo2.png')}}" class="col-md-2 img-responsive">
                        </div>
                    </div>
                    {!! Form::close() !!}


                    <hr> {!! Form::open(['','method'=>'POST','class'=>'','id'=>'frm_requisicion']) !!}
                    <div class="row">
                        <div class="form-group col-md-4">
                            <label for="exampleInputEmail1">Número de requisición</label>
                            <input type="text" name="requisicion" id="requisicion" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-4">
                            <label for="exampleInputEmail1">Nombre de empresa</label>
                            <input type="text" name="empresa" id="empresa" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-4">
                            <label for="exampleInputEmail1">Validez de la cotización</label>
                            <input type="text" name="validez" id="validez" value="2 días" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-4">
                            <label for="exampleInputEmail1">Tiempo de Entrega</label>
                            <input type="text" name="tiempo_entrega" value="2 días" id="tiempo_entrega" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-4">
                            <label for="exampleInputEmail1">Forma de Pago</label>
                            <select name="forma_de_pago" id="forma_de_pago" class="form-control">
                                <option value="1">Efectivo</option>
                                <option value="2">Transferencia</option>
                                <option value="3">Tarjeta de Crédito</option>
                                <option value="4">Paypal</option>
                                <option value="5">Mercado Libre</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-4">
                            <label for="exampleInputEmail1">Garantía</label>
                            <input type="text" name="garantia" value="{{isset($garantia)?$garantia:'1 año'}}" id="garantia" class="form-control">
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-4">
                            <label for="exampleInputEmail1">Valor global</label>
                            <select name="tipo_precio" id="tipo_precio" class="form-control">
                                <option value="0">Precio unitario</option>
                                <option value="1">Precio global</option>
                            </select>
                        </div>
                    </div>

                    {!! Form::close() !!}

                    <h4>Agregue elementos del catálogo</h4>
                    <hr>
                    <!-- <div class="input-group col-md-4">
                            <input type="text" v-model="searchCatalogos" class="form-control " placeholder="Buscar..">
                            <span class="input-group-addon"><i class="fa fa-search"></i></span>
                        </div> <br> -->
                    <div class="input-group col-md-4">
                        <input type="text" name="getCatalogo" id="getCatalogo" class="col-md-12 " placeholder="Buscar..">
                        <span class="input-group-addon" style="cursor: pointer;" data-toggle="modal" data-target="#m_catalogos">
                            <i class="fa fa-search"></i>
                        </span>
                        <input type="button" value="+" onclick="agregarElementoVacio()" class="btn btn-primary">
                    </div>
                    <br>

                    <!-- <div class="table-responsive">
                            <table  class="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th>Categoría</th>
                                    <th colspan="3"></th>
                                </tr>
                                </thead>
                                <tbody>

                                    <tr v-for="dataCatalogos in resultCatalogos">
                                        <td>@{{ dataCatalogos.tipo_producto}}</td>
                                        <td>
                                            <input type="button" @click="selectProducto(dataCatalogos.tipo_producto,dataCatalogos.descripcion)" value="Agregar"  class="btn btn-s btn-primary">
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div> -->

                    <h4>Cotización</h4>

                    <hr>
                    <div class="table-responsive">
                        {{-- @{{$data}} --}} {!! Form::open(['','method'=>'POST','class'=>'form-horizontal','id'=>'frm_cotizacion']) !!}
                        <input type="hidden" name="tipoCotizacion" id="tipoCotizacion" value="{{$tipoCotizacion}}">
                        <input type="hidden" name="cotizacion_id" id="cotizacion_id" value="{{$cotizaciones_id}}">
                        <table class="table table-striped table-bordered" id="table_catalogs">
                            <thead>
                                <tr>
                                    <td>Cantidad</td>
                                    <td>Descripción</td>
                                    <td>P.unitario</td>
                                    <td>Total</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <div id="elementsProducts">
                                    </div>
                                </tr>

                                <tr v-for="(row_cotizacion, index) in rows_cotizacion">
                                    <td>
                                        <input type="text" @change="getTotalRow(index),getTotal()" :id="'cantidad'+index" :name="'cantidad'+index"
                                            :value="row_cotizacion.cantidad">
                                    </td>
                                    <td>
                                        <input type="hidden" :id="'descripcion'+index" :name="'descripcion'+index" :value="row_cotizacion.descripcion">
                                        <input type="hidden" :id="'tipo_producto'+index" :name="'tipo_producto'+index" :value="row_cotizacion.tipo_producto"> @{{row_cotizacion.descripcion}}
                                    </td>
                                    <td>
                                        <input type="text" @change="getTotalRow(index),getTotal()" :id="'precio_unitario'+index" :name="'precio_unitario'+index"
                                            :value="row_cotizacion.precio_unitario">
                                    </td>

                                    <td>
                                        <input type="text" :id="'total'+index" @change="getTotal()" :name="'total'+index" :value="row_cotizacion.precio_unitario">
                                    </td>
                                    <td>
                                        <input type="button" @click="quitarProducto(index),getTotal()" value="Quitar" class="btn btn-s">
                                    </td>
                                </tr>


                            </tbody>
                            <tfoot id="tfoot" style="display: none">
                                <tr id="row_subtotal">
                                    <td align="right" colspan="3">
                                        Subtotal
                                    </td>
                                    <td colspan="2">
                                        <input type="text" id="subtotal" name="subtotal">
                                    </td>
                                </tr>
                                <tr id="row_iva">
                                    <td align="right" colspan="3">
                                        IVA
                                    </td>
                                    <td colspan="2">
                                        <input type="text" id="iva" name="iva">
                                    </td>
                                </tr>
                                <tr id="row_total">
                                    <td align="right" colspan="3">
                                        Total
                                    </td>
                                    <td colspan="2">
                                        <input type="text" id="total" name="total">
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <input type="hidden" id="TotalCotizacion" name="TotalCotizacion" value="0">

                        <input type="hidden" value="-1" id="contador_elementos" name="contador_elementos"> {!! Form::close() !!}
                        <div class="col-md-7 pull-right">
                            <div class="input-group">
                                <div id="loadspinner" style="display:none">
                                    <div class="loader"></div>
                                    <p class="f12">Espere un momento..</p>
                                </div>
                            </div>
                            <input type="button" @click="guardarContrato()" value="Guardar" class="btn btn-s text-center btn-primary">
                        </div>
                    </div>

                    
                    <!-- Modal -->
                    <div class="modal fade" id="m_clientes" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel">Clientes</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="input-group col-md-4">
                                        <input type="text" v-model="search" class="form-control " placeholder="Buscar..">
                                        <span class="input-group-addon">
                                            <i class="fa fa-search"></i>
                                        </span>
                                    </div>
                                    <br>
                                    <div class="table-responsive">
                                        <table id="data-table" class="table table-striped table-bordered ">
                                            <thead>
                                                <tr>
                                                    <th>Nombre</th>
                                                    <th>Correo</th>
                                                    <th>Teléfono</th>
                                                    <th colspan="3"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="data in result">
                                                    <td>@{{data.nombre}} @{{data.apellidopaterno}} @{{data.apellidomaterno}}
                                                        </td>
                                                    <td>@{{data.correo}}</td>
                                                    <td>@{{data.telefono}}</td>
                                                    {{--
                                                    <td>@{{data.created_at}}</td> --}}
                                                    <td>
                                                        <input type="button" value="Seleccionar" @click="selectUserById(data.id,data.nombre+' '+data.apellidopaterno+' '+data.apellidomaterno)"
                                                            class="btn btn-s btn-primary">
                                                    </td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {{-- modal alta de cliente --}}
                    <div class="modal fade" id="m_add_clientes" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel">Alta de Clientes</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="container">
                                        {!! Form::open(['','method'=>'POST','class'=>'form-horizontal','id'=>'frm_add_cliente']) !!}
                                        <div class="col-md-10" v-if="errors">
                                            <div class="alert alert-danger col-md-6">
                                                <ul>
                                                    <li v-for="error in msgErrors">@{{ error }}</l>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="col-md-10">
                                            <input type="hidden" id="_token" value="{{csrf_token()}}">
                                            <div class="form-group">
                                                <label class="col-md-2 control-label ">Nombre</label>
                                                <div class="col-md-4">
                                                    {!! Form::text('nombre',null,['class'=>'form-control']); !!}
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-2 control-label ">Apellido Paterno</label>
                                                <div class="col-md-4">
                                                    {!! Form::text('apellidopaterno',null,['class'=>'form-control']); !!}
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-2 control-label ">Apellido Materno</label>
                                                <div class="col-md-4">
                                                    {!! Form::text('apellidomaterno',null,['class'=>'form-control']); !!}
                                                </div>
                                            </div>
    
                                            <div class="form-group f12">
                                                <label class="col-md-2 control-label ">Correo</label>
                                                <div class="col-md-4">
                                                    {!! Form::email('correo',null,['class'=>'form-control']); !!}
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-2 control-label ">Teléfono</label>
                                                <div class="col-md-4">
                                                    {!! Form::text('telefono',null,['class'=>'form-control']); !!}
                                                </div>
                                            </div>
                                            
                                            <div class="form-group">
                                                    <label class="col-md-2 control-label "></label>
                                                    <div class="col-md-4">
                                                           <div class="pull-right">
                                                               <input type="button" @click="save_client()" value="Guardar" class="btn btn-sm btn-primary">
                                                           </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>


                                    {!! Form:: close() !!}

                                </div>

                            </div>
                        </div>
                    </div>

                    {{--modal2--}}
                    <div class="modal fade" id="m_catalogos" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel">Catalogos</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="input-group col-md-4">
                                        <input type="text" v-model="search" class="form-control " placeholder="Buscar..">
                                        <span class="input-group-addon">
                                            <i class="fa fa-search"></i>
                                        </span>
                                    </div>
                                    <br>
                                    <div class="table-responsive">
                                        <table class="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Categoría</th>
                                                    <th>Descripción</th>
                                                    <th colspan="2">Fecha</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr v-for="data in catalogos">
                                                    <td>@{{ data.tipo_producto}}</td>
                                                    <td>@{{ data.descripcion}}</td>
                                                    <td>@{{ data.created_at}}</td>
                                                    <td>
                                                        <input type="button" class="btn btn-primary" @click="selectonCatalogos(data.tipo_producto,data.descripcion,data.precio_unitario);hideProducts()"
                                                            value="Seleccionar">
                                                    </td>

                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

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
<script src="{{asset('js/cotizacion.js')}}"></script>
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
                    $('#cliente_id').val(index);
                    $('#nombre_cliente').val(nombre);
                    $('#pnombre_cliente').html(nombre);
                    $('#search_cliente').val('');
                },
                onClickEvent: function () {
                    var index = $("#search_cliente").getSelectedItemData().id;
                    var nombre = $("#search_cliente").getSelectedItemData().name;
                    $('#cliente_id').val(index);
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