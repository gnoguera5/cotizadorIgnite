<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Catalog extends Model
{
    protected $fillable = [
        'tipo_producto', 'descripcion','precio_unitario','categoria_id'
    ];

    public function categorie()
    {
        return $this->hasMany('App\Categorie');
    }
}
