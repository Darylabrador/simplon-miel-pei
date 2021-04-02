<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ProducerResource;
use App\Http\Resources\ProductsResource;

class ProductsController extends Controller
{

    /*
    |--------------------------------------------------------------------------
    | General functions
    |--------------------------------------------------------------------------
    */


    /**
     * Display best product selled.
     *
     * @return \Illuminate\Http\Response
     */
    public function bestProduct() {
        $bestProducts = Products::orderBy("amountSell", "desc")
        ->limit(4)
        ->get();

        return ProductsResource::collection($bestProducts);
    }

    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function productsList() {
        $productList = Products::all();
        return ProductsResource::collection($productList);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showAll()
    {
        $products = Products::all();
        return ProductsResource::collection($products);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function showProducer($id)
    {
        $producteur = User::where(['id' => $id])->first();
        $product = Products::where(['user_id' => $id])->get();
        return response()->json([
            'produits'    => ProductsResource::collection($product),
            'producteur'  => new ProducerResource($producteur)
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | Producer functions
    |--------------------------------------------------------------------------
    */


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $loggedUser   = Auth::user();
        $loggedUserId = (int) $loggedUser->id;

        $products = Products::orderBy('id', 'desc')
            ->where(['user_id' => $loggedUserId])
            ->get();
        return ProductsResource::collection($products);
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name'      => 'required',
                'price'     => 'required',
                'quantity'  => 'required|min:1',
                'image'     => 'nullable|mimes:jpg,jpeg,png|max:5000',
            ],
            [
                'required'  => 'Le champ :attribute est requis',
                'mimes'     => 'Extension invalide',
                'max'       => '5Mb maximum',
                'min'       => 'La quantité : inférieur ou égale à 1'
            ]
        );

        $errors = $validator->errors();
        if (count($errors) != 0) {
            return response()->json([
                'success' => false,
                'message' => $errors->first()
            ]);
        }

        $loggedUser     = Auth::user();
        $loggedUserId   = (int) $loggedUser->id;
        $name           = $validator->validated()['name'];
        $price          = $validator->validated()['price'];
        $quantity       = $validator->validated()['quantity'];
        $imageUploaded  = $validator->validated()['image'];
    
        $product = Products::create([
            "name"     => $name,
            "price"    => $price,
            "quantity" => $quantity
        ]);
       
        if($imageUploaded != null) {
            $extension      = $imageUploaded->getClientOriginalExtension();
            $image          = time() . rand() . '.' . $extension;
            $imageUploaded->move(public_path('images'), $image);

            $product = Products::create([
                "name"     => $name,
                "price"    => $price,
                "quantity" => $quantity,
                "image"    => $image
            ]);
        }

        $producer = new Producer([
            "user_id" => $loggedUserId,
            "product_id" => $product->id
        ]);
        
        $producer->save();
        return response()->json([
            'success' => true,
            'message' => "Produit ajouté avec succès"
        ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name'      => 'required',
                'price'     => 'required',
                'image'     => 'nullable',
            ],
            [
                'required'  => 'Le champ :attribute est requis',
                'mimes'     => 'Extension invalide',
                'max'       => '5Mb maximum'
            ]
        );

        $errors = $validator->errors();
        if (count($errors) != 0) {
            return response()->json([
                'success' => false,
                'message' => $errors->first()
            ]);
        }

        $loggedUser     = Auth::user();
        $loggedUserId   = (int) $loggedUser->id;
        $name           = $validator->validated()['name'];
        $price          = $validator->validated()['price'];

        $product = Products::where(['id' => $id, 'user_id' => $loggedUserId])->first();
        if(!$product) {
            return response()->json([
                'success' => false,
                'message' => "Produit introuvable"
            ]);
        }

        $product->name     = $name;
        $product->price    = $price;

        if ($request->hasFile('image')) {
            $oldImage = $product->image;

            if ($oldImage != "default.jpg") {
                $oldFilePath = public_path('images') . '/' . $oldImage;
                unlink($oldFilePath);
            }

            $imageSend      = $validator->validated()['image'];
            $extension      = $imageSend->getClientOriginalExtension();
            $image          = time() . rand() . '.' . $extension;
            $imageSend->move(public_path('images'), $image);
            $product->image = $image;
        }

        $product->save();
        return response()->json([
            'success' => true,
            'message' => "Mise à jour effectuée"
        ]);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function stock(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'quantity'  => 'required',
            ],
            [
                'required'  => 'Le champ :attribute est requis',
            ]
        );

        $errors = $validator->errors();
        if (count($errors) != 0) {
            return response()->json([
                'success' => false,
                'message' => $errors->first()
            ]);
        }

        $loggedUser     = Auth::user();
        $loggedUserId   = (int) $loggedUser->id;
        $quantity       = $validator->validated()['quantity'];

        $product = Products::where(['id' => $id, 'user_id' => $loggedUserId])->first();
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => "Produit introuvable"
            ]);
        }

        $product->quantity = $quantity;
        $product->save();
        return response()->json([
            'success' => true,
            'message' => "Mise à jour effectuée"
        ]);
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $loggedUser   = Auth::user();
        $loggedUserId = (int) $loggedUser->id;
        $producer = Products::where(['user_id' => $loggedUserId])->first();
        if (!$producer) {
            return response()->json([
                'success' => false,
                'message' => "Action impossible"
            ], 401);
        }
        Products::destroy($id);
        return response()->json([
            'success' => true,
            'message' => "Suppression effectuée"
        ]);
    }
}
