<!-- begin #sidebar -->
<div id="sidebar" class="sidebar">
    <!-- begin sidebar scrollbar -->
    <div data-scrollbar="true" data-height="100%">
        <!-- begin sidebar user -->
        <ul class="nav">
            <li class="nav-profile">
                <div class="image">
                </div>
                <div class="info">
                    {{ isset(Auth::user()->name) ? Auth::user()->name : Auth::user()->email }}
                    <small>Bienvenido</small>
                </div>
            </li>
        </ul>
        <!-- end sidebar user -->
        <!-- begin sidebar nav -->
        <ul class="nav">
            <li class="nav-header">Navegación</li>
            <li class="has-sub">
                <a href="javascript:;">
                    <b class="caret pull-right"></b>
                    <i class="fa fa-calendar-check-o"></i>
                    <span>Cotizaciones</span>
                </a>
                <ul class="sub-menu">
                    <li>
                        <a href="{{route('cotizaciones.index')}}">
                            Cotizaciones
                        </a></li>
                    <li>
                        <a href="{{route('cotizaciones.create')}}">
                            Alta Cotizaciones
                        </a>
                    </li>
                    <li>
                        <a href="{{route('precotizaciones.index')}}">
                            Precotizaciones
                        </a></li>
                    <li>
                    <li>
                        <a href="{{route('precotizaciones.create')}}">
                            Alta de Precotizaciones
                        </a></li>
                    <li>
                </ul>
            </li>
            <li class="has-sub">
                <a href="javascript:;">
                    <b class="caret pull-right"></b>
                    <i class="fa fa-calendar-check-o"></i>
                    <span>Servicio</span>
                </a>
                <ul class="sub-menu">
                    <li>
                        <a href="{{route('service.index')}}">
                            Servicios
                        </a>
                    </li>
                    <li>
                        <a href="{{route('service.create')}}">
                            Alta Servicios
                        </a>
                    </li>
                </ul>
            </li>

            <li class="has-sub">
                <a href="javascript:;">
                    <b class="caret pull-right"></b>
                    <i class="fa fa-calendar-check-o"></i>
                    <span>Catálogo</span>
                </a>
                <ul class="sub-menu">
                    <li>
                        <a href="{{route('categorie.index')}}">
                            Categorías
                        </a>
                    </li>
                    <li>
                        <a href="{{route('categorie.create')}}">
                            Alta Categorías
                        </a>
                    </li>

                    <li>
                    <li>
                        <a href="{{route('catalogos.index')}}">
                            Catálogos
                        </a></li>
                    <li>
                        <a href="{{route('catalogos.create')}}">
                            Alta Catálogos
                        </a>
                    </li>
                </ul>
            </li>

            @role(['admin'])
            <li class="has-sub">
                <a href="javascript:;">
                    <b class="caret pull-right"></b>
                    <i class="fa fa-users"></i>
                    <span>Empleados</span>
                </a>
                <ul class="sub-menu">
                    <li>
                        <a href="{{route('usuarios.index')}}">
                            Empleados
                        </a></li>
                    <li>
                        <a href="{{route('usuarios.create')}}">
                            Alta Empleados
                        </a>
                    </li>
                </ul>
            </li>
            @endrole
            {{--<li class="has-sub">
                <a href="javascript:;">
                    <b class="caret pull-right"></b>
                    <i class="fa fa-area-chart"></i>
                    <span>Estadisticas Usuarios</span>
                </a>
                <ul class="sub-menu">
                    <li><a href="">Contratos</a></li>
                </ul>
            </li>--}}

            {{--alta cliente--}}
            <li class="has-sub">
                <a href="javascript:;">
                    <b class="caret pull-right"></b>
                    <i class="fa fa-users"></i>
                    <span>Clientes</span>
                </a>
                <ul class="sub-menu">
                    <li>
                        <a href="{{route('clientes.index')}}">
                            Clientes
                        </a></li>
                    <li>
                        <a href="{{route('clientes.create')}}">
                            Alta Clientes
                        </a>
                    </li>
                </ul>
            </li>


            <!-- begin sidebar minify button -->
            <li><a href="javascript:;" class="sidebar-minify-btn" data-click="sidebar-minify"><i class="fa fa-angle-double-left"></i></a></li>
            <!-- end sidebar minify button -->
        </ul>
        <!-- end sidebar nav -->
    </div>
    <!-- end sidebar scrollbar -->
</div>