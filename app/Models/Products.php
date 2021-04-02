<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'price',
        'quantity',
        'image',
        'amountSell',
        'user_id'
    ];

    public function producer()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }


    public function orderRow() 
    {
        return $this->hasMany('App\Models\OrderProduct');
    }

    public function shoppingCart()
    {
        return $this->hasMany('App\Models\Shoppingcart');
    }
}
