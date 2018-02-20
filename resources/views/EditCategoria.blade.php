@extends('template.Principal')

@section('content')
    <!-- begin breadcrumb -->
    <ol class="breadcrumb pull-right">
        {{--<li><a href="javascript:;">Home</a></li>--}}
        {{--<li class="active">Dashboard</li>--}}
    </ol>
    <h1 class="page-header">Categorías <small></small> </h1>
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
                    <h4 class="panel-title">Editar Categoría</h4>
                </div>
                <div class="panel-body">
                    {!! Form::open(['route'=>['categorie.update',$categoria->id],'method'=>'PUT','class'=>'form-horizontal']) !!}
                    @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                    <div class="form-group">
                        <label class="col-md-2 control-label ">Nombre Categoría</label>
                        <div class="col-md-4">
                            {!! Form::text('categoria',$categoria->categoria,['class'=>'form-control']); !!}
                        </div>
                    </div>
                    <div class="col-md-8 pull-left">
                        <br>
                        <button type="submit" class="btn btn-sm btn-primary">Guardar</button>
                    </div>
                    {!! Form:: close() !!}
                </div>
            </div>
        </div>
    </div>
@endsection