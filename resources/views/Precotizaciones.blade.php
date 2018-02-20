@extends('template.Principal')

@section('content')
    <h1 class="page-header">Pre-Cotización<small></small> </h1>
    <div class="row">
        <!-- begin col-12 -->
        <div class="col-md-12">
            <!-- begin panel -->
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    {{--<div class="panel-heading-btn">--}}
                    {{--<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>--}}
                    {{--<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-repeat"></i></a>--}}
                    {{--<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>--}}
                    {{--<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>--}}
                    {{--</div>--}}
                    <h4 class="panel-title">Lista de Precotizaciones</h4>
                </div>


                <div class="panel-body" id="app">
                    @include('flash::message')
                    <input type="hidden" id="base_url_pdf" value="{{url('/pdf' )}}">
                    <input type="button" id="copy_route" style="display: none" onclick="" value="copiar">
                    <input type="hidden" id="vista" value="getCotizacion">
                    <div class="input-group col-md-4">
                        <input type="text" v-model="search" class="form-control " placeholder="Buscar..">
                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                    </div> <br>
                    {{-- @{{$data}}
                     <ul>
                         <li v-for="data in result">
                             @{{ data.tipo_producto}}
                         </li>
                     </ul>--}}

                    <div class="table-responsive">
                        <table  class="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th>Folio</th>
                                <th>Fecha</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr v-for="data in result">
                                <td>@{{ data.folio}}</td>
                                <td>
                                    <form method="GET" id="frm-edit" v-on:submit.prevent="edit(data.id,'precotizaciones')" style="display: inline">
                                        <button type="submit" data-toggle="tooltip" data-placement="bottom" title="Editar"  class="btn btn-s btn-primary">
                                            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                                        </button>
                                    </form>
                                    <form method="POST" id="frm-delete" v-on:submit.prevent="drop(data.id,'precotizaciones')" style="display: inline">
                                        {{ csrf_field() }}
                                        <input name="_method" type="hidden" value="DELETE">
                                        <button type="submit" onclick="return confirm('Seguro que desea eliminar?')" class="btn btn-danger" data-toggle="tooltip" data-placement="bottom" title="Borrar">
                                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                        </button>
                                    </form>
                                </td>
                            </tr>


                            </tbody>
                        </table>
                    </div>
                    {{--{{ $contratos->links() }}--}}
                </div>
            </div>
            <!-- end panel -->
        </div>
        <!-- end col-12 -->
    </div>

@endsection
@section('addjs')
    <script src="{{asset('js/vuejs.js')}}"></script>
    <script src="{{asset('js/vue-resource.min.js')}}"></script>
    <script src="{{asset('js/fuse.min.js')}}"></script>
    <script src="{{asset('js/utilitiesPre.js')}}"></script>
@endsection