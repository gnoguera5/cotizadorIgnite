@extends('template.Principal')

@section('content')
    <h1 class="page-header">Catálogos <small></small> </h1>
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
                    <h4 class="panel-title">Lista de Catálogos</h4>
                </div>
                <div class="panel-body" id="app">
                    <input type="hidden" id="vista" value="getCatalogos">
                    <form class="form-inline">
                        <div class="form-group">
                            <label for="exampleInputName2">Busqueda: </label>
                            {{--<input type="text" class="form-control" id="exampleInputName2" placeholder="Jane Doe">--}}
                            <input type="text" v-model="search" class="form-control" placeholder="Buscar..">

                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail2">Categoria</label>
                            {{--<input type="email" class="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com">--}}
                            <select name="categorias" id="categorias" v-model="categorias" class="form-control ">
                                @foreach($categorias as $categoria)
                                    <option value="{{$categoria->categoria}}">{{$categoria->categoria}}</option>
                                @endforeach
                            </select>
                        </div>
                    </form>


                    <br>
                    <a href="{{route('catalogos.create')}}" class="btn btn-primary pull-right">Alta Catálogos</a>
                    <br><br><br>
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
                                <th>Precio unitario</th>
                                <th>Descripción</th>
                                <th>Categoria</th>
                                <th colspan="4">Fecha</th>
                            </tr>
                            </thead>
                            <tbody>

                                <tr v-for="data in result">
                                    <td>@{{ data.precio_unitario}}</td>
                                    <td>@{{ data.descripcion}}</td>
                                    <td>@{{ data.categoria }}</td>
                                    <td>@{{ data.created_at}}</td>
                                    <td>
                                        <form method="GET" id="frm-edit" v-on:submit.prevent="edit(data.id,'catalogos')">
                                            <input type="submit" value="Editar"  class="btn btn-s">
                                        </form>
                                    </td>
                                    <td>
                                        <form method="POST" id="frm-delete" v-on:submit.prevent="drop(data.id,'catalogos')">
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