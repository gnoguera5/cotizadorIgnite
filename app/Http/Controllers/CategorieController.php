<?php

namespace App\Http\Controllers;

use App\Categorie;
use App\Http\Requests\CategoriesRequest;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('Categories');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {


        return view('AltaCategorias');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoriesRequest $request)
    {
        $categorie = new Categorie($request->except('_token'));
        $categorie->save();
        return redirect(route('categorie.index'));
    }

    public function ajaxStore(Request $request)
    {
        $categoryData = array('categoria' => $request -> category);
        $categorie = new Categorie($categoryData);
        $categorie -> save();
        return response() -> json($categorie);
    }

    public function getCategories()
    {
        $categorias = Categorie::orderBy('id','desc')->get();
        foreach ($categorias as $value) {
            $data[] = array('name'=>"$value->categoria",'id'=>$value->id,'created_at'=>date('Y-m-d',strtotime($value->created_at)));
        }
        return response($data);
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
        $categoria = Categorie::where('id',$id)->first();
        return view('EditCategoria',array('categoria'=>$categoria));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $categoria = Categorie::where('id',$id)->first();
        $categoria->fill($request->except('_token'));

        $categoria->update();
        return redirect(route('categorie.index'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Categorie::destroy($id);
        return redirect(route('categorie.index'));
    }
}
