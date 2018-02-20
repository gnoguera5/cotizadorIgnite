@extends('template.Principal')

@section('content')
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right">
        {{--<li><a href="javascript:;">Home</a></li>--}}
        {{--<li class="active">Dashboard</li>--}}
    </ol>
    <h1 class="page-header">Clientes <small></small> </h1>
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
                    <h4 class="panel-title">Alta Clientes</h4>
                </div>
                <div class="panel-body">
                    {!! Form::open(['route'=>['clientes.update',$clientes->id],'method'=>'PUT','class'=>'form-horizontal']) !!}
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
                        <input type="hidden" name="tipo_alta" value="1">
                        <div class="form-group">
                            <label class="col-md-2 control-label ">Nombre</label>
                            <div class="col-md-4">
                                {!! Form::text('nombre',$clientes->nombre,['class'=>'form-control']); !!}
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label ">Apellido Paterno</label>
                            <div class="col-md-4">
                                {!! Form::text('apellidopaterno',$clientes->apellidopaterno,['class'=>'form-control']); !!}
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label ">Apellido Materno</label>
                            <div class="col-md-4">
                                {!! Form::text('apellidomaterno',$clientes->apellidomaterno,['class'=>'form-control']); !!}
                            </div>
                        </div>

                        <div class="form-group f12">
                            <label class="col-md-2 control-label ">Correo</label>
                            <div class="col-md-4">
                                {!! Form::email('correo',$clientes->correo,['class'=>'form-control']); !!}
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label ">Teléfono</label>
                            <div class="col-md-4">
                                {!! Form::text('telefono',$clientes->telefono,['class'=>'form-control']); !!}
                            </div>
                        </div>



                        <div class="col-md-8 pull-left">
                            <br>
                            <button type="submit" class="btn btn-sm btn-primary">Editar</button>
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