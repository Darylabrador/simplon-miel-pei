<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Adress extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'delivery',
        'billing'
    ];


    /**
     * 1 adress row can have 1 user
     */
    public function user()
    {
        return $this->hasOne('App\Models\User');
    }
}
