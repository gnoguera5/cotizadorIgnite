<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    protected $fillable = [
        'categoria', 'status'
    ];

    public function catalog()
    {
        return $this->belongsTo('App\Catalog');
    }
}
