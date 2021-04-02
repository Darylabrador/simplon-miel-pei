<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'identity',
        'email',
        'password',
        'resetToken',
        'role_id',
        'verified_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function role() 
    {
        return $this->belongsTo('App\Models\Role', 'role_id', 'id');
    }

    public function products() 
    {
        return $this->hasMany('App\Models\Products');
    }

    public function exploitations() 
    {
        return $this->hasMany('App\Models\Exploitation');
    }


    public function shoppingcart()
    {
        return $this->hasMany('App\Models\Shoppingcart');
    }

    public function clientOrders() 
    {
        return $this->hasMany('App\Models\Order', 'user_id', 'id');
    }

    public function producerOrders()
    {
        return $this->hasMany('App\Models\Order', 'producer_id', 'id');
    }

    public function isAdmin() 
    {
        if($this->role->label == 'admin'){
            return true;
        }
        return false;
    }

    public function isClient()
    {
        if ($this->role->label == 'client') {
            return true;
        }
        return false;
    }

    public function isProducer()
    {
        if ($this->role->label == 'producteur') {
            return true;
        }
        return false;
    }
}
