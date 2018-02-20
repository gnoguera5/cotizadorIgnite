<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->increments('id');
            $table->string('folio');
            $table->string('equipo')->nullable();
            $table->string('marca')->nullable();
            $table->string('modelo')->nullable();
            $table->string('noserie')->nullable();
            $table->text('accesorios')->nullable();
            $table->string('garantia')->nullable();
            $table->text('reporte_del_cliente')->nullable();
            $table->text('respaldar')->nullable();
            $table->string('contrasenia_equipo')->nullable();
            $table->text('trabajo_realizado')->nullable();
            $table->string('status')->nullable();

            $table->integer('client_id');
            $table->foreign('client_id')->references('id')->on('clients');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('services');
    }
}
