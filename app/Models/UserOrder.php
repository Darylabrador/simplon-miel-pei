<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserOrder extends Model
{
    use HasFactory;

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_id',
        'producer_id',
        'user_id',
    ];

    public function order()
    {
        return $this->belongsTo('App\Models\Order', 'order_id', 'id');
    }

    public function clientOrder()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }

    public function producerOrder()
    {
        return $this->belongsTo('App\Models\User', 'producer_id', 'id');
    }
}
