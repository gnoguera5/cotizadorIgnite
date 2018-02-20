<!doctype html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
    <meta charset="UTF-8">
    <title>@yield('title')</title>

    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
    <meta content="" name="description" />
    <meta content="" name="author" />



    <!-- ================== BEGIN BASE CSS STYLE ================== -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <link href="{{asset('js/jquery-ui/themes/base/minified/jquery-ui.min.css')}}" rel="stylesheet" />
    <link href="{{asset('js/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet" />
    <link href="{{asset('js/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet" />
    <link href="{{asset('css/animate.min.css')}}" rel="stylesheet" />
    <link href="{{asset('css/style.min.css')}}" rel="stylesheet" />
    <link href="{{asset('css/style-responsive.min.css')}}" rel="stylesheet" />
    <link href="{{asset('css/theme/default.css')}}" rel="stylesheet" id="theme" />
{{--<link href="{{asset('js/fullcalendar/fullcalendar.css')}}" rel="stylesheet" id="theme" />--}}
<!-- ================== END BASE CSS STYLE ================== -->

    <!-- ================== BEGIN PAGE LEVEL STYLE ================== -->
    <link href="{{asset('js/bootstrap-datepicker/css/bootstrap-datepicker.css')}}" rel="stylesheet" />
    <link href="{{asset('js/bootstrap-datepicker/css/bootstrap-datepicker3.css')}}" rel="stylesheet" />
    {{--wizard steps--}}
    <link href="{{asset('js/bootstrap-wizard/css/bwizard.min.css')}}" rel="stylesheet" />
    {{--    <link href="{{asset('js/parsley/src/parsley.css')}}" rel="stylesheet" />--}}
    {{--wizard steps--}}

    {{--<script src="{{asset('js/pace/pace.min.js')}}"></script>--}}

<!-- ================== BEGIN BASE ANGULAR JS ================== -->
    <script src="{{asset('js/angularjs/angular.min.js')}}"></script>
    <script src="{{asset('js/angularjs/angular-ui-route.min.js')}}"></script>
    {{--<script src="assets/plugins/bootstrap-angular-ui/ui-bootstrap-tpls.min.js"> </script>--}}
    <script src="{{asset('js/angularjs/ocLazyLoad.min.js')}}"></script>

    <!-- ================== END BASE ANGULAR JS ================== -->

    <!-- ================== END PAGE LEVEL STYLE ================== -->
</head>
<body>

<!-- begin #page-loader -->
<div id="page-loader" class="fade in"><span class="spinner"></span></div>
<!-- end #page-loader -->

<!-- begin #page-container -->
<div id="page-container" class="fade page-sidebar-fixed page-header-fixed">
    @include('sections.headeradmin')
    @include('sections.sidebaradmin')

    <div class="sidebar-bg"></div>
    <!-- end #sidebar -->

    <!-- begin #content -->
    <div id="content" class="content">


        <div class="row">
            @yield('content')
        </div>



    </div>
    <!-- end #content -->

    <!-- begin theme-panel -->

    <!-- end theme-panel -->

    <!-- begin scroll to top btn -->
    <a href="javascript:;" class="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i class="fa fa-angle-up"></i></a>
    <!-- end scroll to top btn -->
</div>
<!-- end page container -->


<!-- ================== BEGIN BASE JS ================== -->

<script src="{{asset('js/jquery/jquery-1.9.1.min.js')}}"></script>
<script src="{{asset('js/jquery/jquery-migrate-1.1.0.min.js')}}"></script>
<script src="{{asset('js/jquery-ui/ui/minified/jquery-ui.min.js')}}"></script>
<script src="{{asset('js/bootstrap/js/bootstrap.min.js')}}"></script>
<!-- ================== wizard steps JS ================== -->
<script src="{{asset('js/bootstrap-wizard/js/bwizard.js')}}"></script>
<script src="{{asset('js/form-wizards.demo.min.js')}}"></script>

<!--[if lt IE 9]>
<script src="{{asset('js/crossbrowserjs/html5shiv.js')}}"></script>
<script src="{{asset('js/crossbrowserjs/respond.min.js')}}"></script>
<script src="{{asset('js/crossbrowserjs/excanvas.min.js')}}"></script>
<![endif]-->
<script src="{{asset('js/slimscroll/jquery.slimscroll.min.js')}}"></script>
<script src="{{asset('js/jquery-cookie/jquery.cookie.js')}}"></script>
<!-- ================== END BASE JS ================== -->

<script src="{{asset('js/apps.min.js')}}"></script>



<script>
    $(document).ready(function() {
        App.init();
//        $('#datetimepicker1').datetimepicker({
//            format: 'YYYY-MM-DD'
//        });
        FormWizard.init();
//        FormWizardValidation.init();


    });
</script>
{{--carga de scripts plantilla--}}
<script src="{{asset('js/vuejs.js')}}"></script>
<script src="{{asset('js/vue-resource.min.js')}}"></script>
<script>
    $("#wizard").bwizard({backBtnText: "Regresar", nextBtnText:"Siguiente"});

</script>
@yield('addjs')



</body>
</html>