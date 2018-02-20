<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/* Route::get('/', function () {
    return view('welcome');
}); */


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/', 'HomeController@index')->name('home');

Route::resource('clientes','ClienteController');
Route::get('getClientes','ClienteController@getClientes');
Route::get('getClients','ClienteController@getClients');


Route::resource('usuarios','UserController');
Route::get('getUsuarios','UserController@getUsuarios');

Route::resource('catalogos','CatalogoController');

Route::get('getCatalogos','CatalogoController@getCatalogos');
Route::get('getCatalogs','CatalogoController@getCatalogs');

Route::get('getCatalogs/{tipo}','CatalogoController@getCatalogs');

Route::resource('cotizaciones','CotizacionController');
Route::resource('precotizaciones','PrecotizacionController');
Route::get('testpdf','CotizacionController@testpdf');
//Route::get('getPdf/{cotizacion_id}','CotizacionController@getPdf');

Route::get('getCotizacion','CotizacionController@getCotizacion');
Route::get('usarCotizacion/{cotizacion_id}','CotizacionController@usarCotizacion');
Route::get('findCotizacionById/{cotizacion_id}','CotizacionController@findCotizacionById');
Route::get('findPrecotizacionById/{cotizacion_id}','PrecotizacionController@findPrecotizacionById');
Route::get('testEmail','CotizacionController@testEmail');

Route::get('sendMailWithId/{cotizacion_id}','CotizacionController@sendMailWithId');

Route::resource('categorie','CategorieController');
Route::get('getCategories','CategorieController@getCategories');
Route::post('ajaxStore', 'CategorieController@ajaxStore');

Route::resource('service', 'ServiceController');
Route::get('getService','ServiceController@getService');
Route::get('getTicketService/{service_id}','ServiceController@getTicketService');
Route::get('getTicket/{cotizacion_id}','TicketController@getTicket');

//Route::resource('pdf','PdfController');
Route::get('getPdf/{cotizacion_id}','PdfController@getPdf');

Route::get('/pdfCotizacion', function () {
    return view(
        'pdfCotizacion', [
            'data' => [
                'logo' => 2,
                'tipo_precio' => 0,
                'subtotal' => 1500.00,
                'iva' => 240.00,
                'total' => 1740.00,
                'nombre_cliente' => 'Jerome Olvera',
                'requisicion' => 'No se que sea'
            ],
            'cliente' => [
                'telefono' => '999 999 9999',
                'correo' => 'jerome.olvera@gmail.com'
            ],
            'title' => 'Cotizacion',
            'folio' => 'T000004est',
            'descripcion' => [
                "procesador amd"
            ],
            "cantidad" => [
                1
            ],
            "precio_unitario" => [
                1500
            ],
            "total" => [
                1500
            ]
        ]);
});
