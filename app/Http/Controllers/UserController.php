<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

class UserController extends Controller
{

    public function __construct(MessageBag $messageBag)
    {
        $this->messageBag = $messageBag;
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $usuarios = User::orderBy('id','desc')->get();
        return view('Usuarios',array('usuarios'=>$usuarios));
    }

    public function getUsuarios()
    {
        $usuario = User::orderBy('id','desc')->get();
        return response()->json($usuario);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('AltaUsuarios');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        $user = new User($request->except('_token'));
        $user->password= bcrypt($request->password);
        $user->save();
        return redirect(route('usuarios.index'));
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
        $usuarios = User::where('id',$id)->first();
        return view('EditUsuario',array('usuarios'=>$usuarios));
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
        $user = User::where('id',$id)->first();
        $user->name=$request->name;
        $user->telefono=$request->telefono;
        #si el usuario es distinto al de la bd validar que no exista
        if($user->email!=$request->email){
            $totalmail = User::where('email',$request->email)->count();
            if($totalmail>0){
                $this->messageBag->add('email', 'El elemento correo ya está en uso');
                return redirect(route('usuarios.edit',$id))->withErrors($this->messageBag);
            }else{
                $user->email=$request->email;
            }

        }
        #validar si el password no es vacio asignar el nuevo
        if($request->password!=""){
            $user->password= bcrypt($request->password);
        }
        $user->update();
        return redirect(route('usuarios.index'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::destroy($id);
        return redirect(route('usuarios.index'));
    }
}
