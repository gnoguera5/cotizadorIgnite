<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable=[
        'folio',
        'equipo',
        'marca',
        'modelo',
        'noserie',
        'accesorios',
        'garantia',
        'reporte_del_cliente',
        'respaldar',
        'contrasenia_equipo',
        'trabajo_realizado',
        'status',
        'client_id'
    ];

    public function client()
    {
        return $this->hasOne('App\Client');
    }
}
