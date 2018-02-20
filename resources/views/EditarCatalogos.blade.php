@extends('template.Principal')

@section('content')
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right">
        {{--<li><a href="javascript:;">Home</a></li>--}}
        {{--<li class="active">Dashboard</li>--}}
    </ol>
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
                    <h4 class="panel-title">Editar Catálogos</h4>
                </div>
                <div class="panel-body">
                    {!! Form::open(['route'=>['catalogos.update',$catalogos->id],'method'=>'PUT','class'=>'form-horizontal']) !!}
                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                    <input type="hidden" id="_token" value="{{csrf_token()}}">
                    <div class="form-group">
                    <label class="col-md-2 control-label ">Categoria</label>
                    <div class="col-md-4">
                        <select name="categoria_id" id="categoria_id" class="form-control">
                            @foreach($categorias as $categorias)
                                @if($catalogos->categoria_id==$categorias->id)
                                    <option value="{{$categorias->id}}" selected>{{$categorias->categoria}}</option>
                                @else
                                    <option value="{{$categorias->id}}">{{$categorias->categoria}}</option>
                                @endif
                            @endforeach
                        </select>
                    </div>
                    <div class="col-md-1">
                        <input id="addCategory" type="button" value="+" class="btn btn-primary">
                    </div>
                </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label ">Precio unitario</label>
                        <div class="col-md-4">
                            {!! Form::text('precio_unitario',$catalogos->precio_unitario,['class'=>'form-control']); !!}
                        </div>
                    </div>
                    <div class="form-group f12">
                        <label class="col-md-2 control-label ">Descripción</label>
                        <div class="col-md-4">
                            {!! Form::textarea('descripcion',$catalogos->descripcion,['class'=>'form-control']); !!}
                        </div>
                    </div>


                    <div class="col-md-8 pull-left">
                        <br>
                        <button type="submit" class="btn btn-sm btn-primary">Guardar</button>
                    </div>
                    {!! Form:: close() !!}
                    {{--{{ $contratos->links() }}--}}
                </div>
            </div>
            <!-- end panel -->
        </div>
        <!-- end col-12 -->
    </div>
@endsection
@section('addjs')
<script>
        $(document).ready(function(){
            $('#addCategory').click(function() {
                const _token = $("input[name='_token']").val();
                const category = prompt('Ingrese un nombre de categoria para agregar');
                if (!category) return false;

                $.ajax({
                    type: "post",
                    url: "/ajaxStore",
                    data: {category, _token},
                    dataType: "json",
                    success: function(data) {
                        $('#categoria_id').append($('<option>', {
                            value: data.id,
                            text: data.categoria
                        }));
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log({ XMLHttpRequest, textStatus, errorThrown });
                    }
                });
            });
        });
    </script>
@endsection