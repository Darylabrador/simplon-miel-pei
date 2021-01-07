<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            "id"        => $this->id,
            "identity"  => $this->identity,
            "email"     => $this->email,
            "suspended" => $this->suspended,
            "address"   => new AdressResource($this->adress_id),
            "role"      => new RoleRessource($this->role_id),
        ];
    }
}
