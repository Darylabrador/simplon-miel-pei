<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('adresses', function (Blueprint $table) {
            $table->id();
            $table->string('delivery');
            $table->string('billing');
            $table->timestamps();
        });

        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('label');
        });

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('identity');
            $table->string('email')->unique();
            $table->string('password');
            $table->boolean('suspended')->default(false);
            $table->foreignId('adress_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('role_id')->nullable()->constrained()->onDelete('cascade');
            $table->rememberToken();
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
        Schema::dropIfExists('adresses');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('users');
    }
}
