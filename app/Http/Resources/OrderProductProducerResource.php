<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderProductProducerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'        => $this->id,
            'quantity'  => $this->quantity,
            'product'   => new  ProductsResource($this->product),
            'order'     => $this->order,
            'confirmed' => $this->confirmed
        ];
    }
}
