<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditUserRequest extends FormRequest
{
    public function attributes(){
        return[
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

            'password' => 'nullable|min:3|confirmed',
            'password_confirmation' => 'nullable|min:3',
            'responsable'=>'required',

        ];
    }
}
