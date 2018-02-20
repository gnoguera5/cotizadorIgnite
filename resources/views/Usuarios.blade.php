@extends('template.Principal')

@section('content')
    <h1 class="page-header">Empleados <small></small> </h1>
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
                    <h4 class="panel-title">Lista de Empleados</h4>
                </div>
                <div class="panel-body" id="app">
                    <input type="hidden" id="vista" value="getUsuarios">
                    <div class="input-group col-md-4">
                        <input type="text" v-model="search" class="form-control " placeholder="Buscar..">
                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                    </div> <br>
                
                    <div class="table-responsive">
                        <table id="data-table" class="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th colspan="5">Fecha</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="data in result">
                                    <td>@{{data.name}}</td>
                                    <td>@{{data.email}}</td>
                                    <td>@{{data.created_at}}</td>
                                    <td>
                                        <form method="GET" id="frm-edit" v-on:submit.prevent="edit(data.id,'usuarios')">
                                            <input type="submit" value="Editar"  class="btn btn-s">
                                        </form>
                                    </td>
                                    <td>
                                        <form method="POST" id="frm-delete" v-on:submit.prevent="drop(data.id,'usuarios')">
                                            {{ csrf_field() }}
                                            <input name="_method" type="hidden" value="DELETE">
                                            <input type="submit" value="Borrar" onclick="return confirm('Seguro que desea eliminar?')" class="btn btn-danger">
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
    <script src="{{asset('js/utilities.js')}}"></script>
@endsection