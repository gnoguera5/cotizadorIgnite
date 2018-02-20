<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function attributes(){
        return[
            'email'=>'correo',
            'name'=>'nombre',
            'password'=>'Contraseña',
            'password_confirmation'=>'Repetir Contraseña'
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'=>'required',
            'email'=>'required|unique:users',
            'password' => 'required|min:3|confirmed',
            'password_confirmation' => 'required|min:3',

        ];
    }
}
