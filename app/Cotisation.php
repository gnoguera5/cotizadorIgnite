<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cotisation extends Model
{
    protected $fillable = [
        'folio', 'params'
    ];
}
