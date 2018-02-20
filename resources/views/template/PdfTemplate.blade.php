<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style>
        <?php include(public_path().'/js/bootstrap/css/bootstrap.min.css');?>
    </style>
    <title>@yield('title')</title>
    <style>
        .borderless td, .borderless th {
            border: none !important;
        }
        .colorOrange{
            background-color: #FE7701;
        }

    </style>
</head>
<body>
    @yield('content')
</body>
</html>