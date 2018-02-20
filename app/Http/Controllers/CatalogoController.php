<?php

namespace App\Http\Controllers;

use App\Catalog;
use App\Categorie;
use App\Http\Requests\CatalogosRequest;
use Illuminate\Http\Request;

class CatalogoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $catalogos = Catalog::orderBy('id','desc')
            ->paginate(10);
        $categorias = Categorie::all();


        return view('Catalogos',array('catalogos'=>$catalogos,'categorias'=>$categorias));

    }

    /**
     * getCatalogos
     * Obtiene toda la lista de catalalogos devuelve un json que lo recibe vuejs para realizar
     * una busqueda
     * @return json
     */
    public function getCatalogos(){
        $catalogos = Catalog::orderBy('id','desc')
            ->get();
        foreach ($catalogos as $catalogo){
            $categoria = Categorie::where('id',$catalogo->categoria_id)->first();
            $nombrecategoria = $categoria->categoria;
            $data[] = array('tipo_producto'=>$catalogo->tipo_producto,'descripcion'=>$catalogo->descripcion,
                            'precio_unitario'=>$catalogo->precio_unitario,'id'=>$catalogo->id,
                            'created_at'=>date('Y-m-d',strtotime($catalogo->created_at)),
                            'categoria'=>$nombrecategoria
            );
        }
        return response()->json($data);
    }

    public function getCatalogs($search){
        $catalogos = Catalog::orderBy('id','desc')
            ->where('tipo_producto','like','%'.$search.'%')
            ->get();
        $cont = -1;
        $data = array();
        foreach ($catalogos as $value) {
            $cont=$cont+1;
            $contenido_descripcion = (count($value->descripcion)>100)?substr($value->descripcion,0,100).'..':$value->descripcion;
            $data[] = array('name'=>"$value->tipo_producto - $contenido_descripcion",'posicion'=>$cont,'id'=>$value->id,
                            'tipo_producto'=>$contenido_descripcion,'descripcion'=>$contenido_descripcion,'precio_unitario'=>$value->precio_unitario);
        }
        return response($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categorias = Categorie::all();
        return view('AltaCatalogos',array('categorias'=>$categorias));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CatalogosRequest $request)
    {
        $catalogo = new Catalog($request->except('_token'));
        $catalogo->save();
        return redirect(route('catalogos.index'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $catalogos = Catalog::where('id',$id)->first();
        $categorias = Categorie::all();

        $updatedPrecioUnitario =  number_format($catalogos -> precio_unitario ?: 0, 2, ".", "");
        $catalogos -> precio_unitario = $updatedPrecioUnitario;

        return view(
            'EditarCatalogos',
            array(
                'catalogos' => $catalogos,
                'categorias' => $categorias
            )
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CatalogosRequest $request, $id)
    {
        $catalogos = Catalog::where('id',$id)->first();
        $catalogos->fill($request->except('_token'));

        $catalogos->update();
        return redirect(route('catalogos.index'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Catalog::destroy($id);
        return redirect(route('catalogos.index'));
    }
}
