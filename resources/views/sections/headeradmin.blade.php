<!-- begin #header -->
<div id="header" class="header navbar navbar-default navbar-fixed-top">
    <!-- begin container-fluid -->
    <div class="container-fluid">
        <!-- begin mobile sidebar expand / collapse button -->
        <div class="navbar-header">
            <a href="/" class="navbar-brand"><span>{{--  <img src="{{asset('img/logofuneraria.jpg')}}"  width="20%" >  --}} IGNITE </span></a>
            <button type="button" class="navbar-toggle" data-click="sidebar-toggled">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <!-- end mobile sidebar expand / collapse button -->

        <!-- begin header navigation right -->
        <ul class="nav navbar-nav navbar-right">
            <li class="dropdown navbar-user">
                <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                    {{--<img src="{{asset('img/user-13.jpg')}}" alt="" />--}}
                    <span class="hidden-xs">{{ isset(Auth::user()->name) ? Auth::user()->name : Auth::user()->email }}</span> <b class="caret"></b>
                </a>
                <ul class="dropdown-menu animated fadeInLeft">
                    <li class="arrow"></li>
                    {{--<li><a href="javascript:;">Edit Profile</a></li>--}}
                    {{--<li><a href="javascript:;"><span class="badge badge-danger pull-right">2</span> Inbox</a></li>--}}
                    {{--<li><a href="javascript:;">Calendar</a></li>--}}
                    {{--<li><a href="javascript:;">Setting</a></li>--}}
                    <li class="divider"></li>
                    @if (Auth::guest())
                        <li><a href="{{ route('login') }}">Iniciar Sesión</a></li>
                        <li><a href="{{ route('register') }}">Registrar</a></li>
                    @else
                        <li><a href="{{ route('logout') }}"
                               onclick="event.preventDefault();
                                        document.getElementById('logout-form').submit();">Salir</a></li>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                    @endif

                </ul>
            </li>
        </ul>
        <!-- end header navigation right -->
    </div>
    <!-- end container-fluid -->
</div>
<!-- end #header -->