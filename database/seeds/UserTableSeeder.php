<?php

use App\Profile;
use App\Role;
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Auth;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name='admin';
        $user->email='demo@gmail.com';
        $user->password= bcrypt('abc123');
        $user->save();

        $admin = new Role();
        $admin->name         = 'admin';
        $admin->display_name = 'admin'; // optional
        $admin->description  = 'Usuario admin acceso total'; // optional
        $admin->save();

        $user->attachRole($admin);

        /*$profile = new Profile();
        $user->profile()->save($profile);



        $funeraria = new Role();
        $funeraria->name         = 'funeraria';
        $funeraria->display_name = 'funeraria'; // optional
        $funeraria->description  = 'Usuario funeraria, este usuario podra dar de alta clientes y contratos'; // optional
        $funeraria->save();


        $user->attachRole($admin);*/


    }
}
