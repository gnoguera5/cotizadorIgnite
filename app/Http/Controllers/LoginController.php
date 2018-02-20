<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\MessageBag;

class LoginController extends Controller
{
    protected $messageBag;


    function __construct(MessageBag $messageBag)
    {
        $this->messageBag = $messageBag;
    }

    public function authenticate(Request $request)
    {
        $email = $request->email;
        $password = $request->password;
        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            // Authentication passed...
            $id = Auth::user()->id;
            $usuario = User::where('id',$id)->first();
           /* $alias = $usuario->alias;
            $tipoUsuario =$usuario->tipo_usuario;
            $tipoContrato = $usuario->tipo_contrato;


            session(['alias' => $alias]);
            session(['tipoUsuario'=>$tipoUsuario]);
           */ session(['tipoContrato'=>$tipoContrato]);
            return redirect('/');
        }else{
            $this->messageBag->add('password', 'Usuario o contraseña incorrecto');
            return redirect(route('login'))->withErrors($this->messageBag);
        }
    }
}
