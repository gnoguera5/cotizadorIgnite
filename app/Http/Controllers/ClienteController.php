<?php

namespace App\Http\Controllers;

use App\Client;
use App\Cotisation;
use App\Http\Requests\ClienteRequest;
use App\Http\Requests\EditClientRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        #$user_id = Auth::user()->id;

        $usuarios = Client::orderBy('id','desc')
         #   ->where('padre_id',$user_id)
            ->paginate(10);


        return view('Clientes',array('usuarios'=>$usuarios));
    }


    public function getClientes()
    {
        $clientes = Client::orderBy('id','desc')->get();
        foreach ($clientes as $value) {
            $data[] = array('name'=>"$value->nombre",'email'=>$value->id);
        }
        return response($clientes);
    }
    
    public function getClients(){
        $clientes = Client::orderBy('id','desc')->get();
        foreach ($clientes as $value) {
            $data[] = array('name'=>"$value->nombre $value->apellidopaterno $value->apellidomaterno",'id'=>$value->id);
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
        return view('AltaClientes');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ClienteRequest $request)
    {
        $user_id = Auth::user()->id;
        $user = new Client($request->except('_token'));
        $user->padre_id=$user_id;
        $user->save();
        if (isset($request->tipo_alta)){
            return redirect(route('clientes.index'));
        }else{
            return response()->json(['ok' => true]);
        }
        /*else{
            $data = array('nombre'=>$user->name,'correo'=>$user->email,'padre'=>$user->padre_id,
                'fecha'=>substr(date($user->created_at),0,10),
                'calle'=>$user->calle,
                'numero'=>$user->numero,
                'colonia'=>$user->colonia,
                'delegacion'=>$user->delegacion,
                'cp'=>$user->cp,

            );
            return response()->json(['ok' => true]);
        }*/
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
        $clientes = Client::where('id',$id)->first();
        return view('EditClientes',array('clientes'=>$clientes));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EditClientRequest $request, $id)
    {
        $user = Client::where('id',$id)->first();
        $user->fill($request->except('_token'));

        $user->update();
        return redirect(route('clientes.index'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Client::destroy($id);
        return redirect(route('clientes.index'));
    }
}
