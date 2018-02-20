<?php
namespace App\Helpers;

class Utilities 
{

    public function __construct()
    {
        # code...
    }

    public function nameMonth($date)
    {
        $day = substr($date,0,2);
        $month = substr($date,3,2);
        $year = substr($date,6);
        $name_month = "";
        switch($month){
            case '01':
                $name_month = 'Enero';
                break;
            case '02':
                $name_month = 'Febrero';
                break;
            case '03':
                $name_month = 'Marzo';
                break;
            case '04':
                $name_month = 'Abril';
                break;
            case '05':
                $name_month = 'Mayo';
                break;
            case '06':
                $name_month = 'Junio';
                break;
            case '07':
                $name_month = 'Julio';
                break;
            case '08':
                $name_month = 'Agosto';
                break;
            case '09':
                $name_month = 'Septiembre';
                break;
            case '10':
                $name_month = 'Octubre';
                break;
            case '11':
                $name_month = 'Noviembre';
                break;
            case '12':
                $name_month = 'Diciembre';
                break;
        }
        return $day.'-'.$name_month.'-'.$year;
    }
}
