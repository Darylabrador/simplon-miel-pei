<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Products;
use App\Models\Shoppingcart;
use App\Http\Resources\ShoppingcartResource;

class ShoppingCartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $loggedUser     = Auth::user();
        $shoppingcart = $loggedUser->shoppingcart;
        return ShoppingcartResource::collection($shoppingcart);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function saveCart(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'cart.*'   => 'required',
            ],
            [
                'required'  => 'Le champ :attribute est requis',
                'integer'   => 'Le champ :attribute est invalide',
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
        $loggedUserId   = $loggedUser->id;
        $shoppingCart  = $validator->validated()['cart'];

        foreach ($shoppingCart as $cart) {

            $cartExist   = Shoppingcart::where(['user_id' => $loggedUserId, 'product_id' => $cart['id']])->first();
            $productInfo = Products::where(['id' => $cart['id']])->first();

            if (!$productInfo) {
                return response()->json([
                    'success' => false,
                    'message' => $cart['name'] . ' introuvable'
                ]);
            }

            $productQuantity  = (int) $productInfo->quantity;
            $quantity         = (int) $cart['amountDefault'];

            if ($productQuantity != 0) {
                if ($quantity > $productQuantity) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Quantité trop importante: ' . $cart['name']
                    ]);
                }

                if ($cartExist) {
                    $cartExist->quantity = $quantity;
                    $cartExist->save();
                } else {
                    Shoppingcart::create([
                        "quantity"    => $quantity,
                        "user_id"     => $loggedUserId,
                        "product_id"  => $cart['id']
                    ]);
                }
            }
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param   $id
     * @return \Illuminate\Http\Response
     */
    public function updateOne(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'quantity'  => 'required|integer',
            ],
            [
                'required'  => 'Le champ :attribute est requis',
                'integer'   => 'Le champ :attribute est invalide',
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
        $userId = $loggedUser->id;
        $quantity       = (int) $validator->validated()['quantity'];

        $shoppingCartRow = Shoppingcart::where(['product_id' => $id, "user_id" => $userId])->first();
        if (!$shoppingCartRow) {
            return response()->json([
                'success' => false,
                'message' => 'Un problème est survenu'
            ]);
        }

        $product = Products::whereId($shoppingCartRow->product_id)->first();
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Produit introuvable'
            ]);
        }

        $productInfoQuantity = (int) $product->quantity;
        if ($productInfoQuantity != 0) {
            if ($quantity > $productInfoQuantity) {
                return response()->json([
                    'success' => false,
                    'message' => 'Quantité trop importante'
                ]);
            }

            $quantityEdited =  (int) $shoppingCartRow->quantity - $quantity;

            if ($quantityEdited < 0) {
                $finalQuantity = $productInfoQuantity - $quantity;
                $product->quantity = $finalQuantity;
                $product->save();
            } else {
                $finalQuantity = $productInfoQuantity + $quantityEdited;
                $product->quantity = $finalQuantity;
                $product->save();
            }

            $shoppingCartRow->quantity = $quantity;
            $shoppingCartRow->save();

            return response()->json([
                'success' => true,
                'message' => 'Mise à jour effectuée'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Stock épuisé'
        ]);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param   $id
     * @return \Illuminate\Http\Response
     */
    public function deleteOne($id)
    {
        $loggedUser     = Auth::user();
        $userId = $loggedUser->id;
        $shoppingCartRow = Shoppingcart::where(['product_id' => $id, "user_id" => $userId])->first();

        if (!$shoppingCartRow) {
            return response()->json([
                'success' => false,
                'message' => "Une erreur s'est produite"
            ]);
        }

        $shoppingCartRow->delete();
        return response()->json([
            'success' => true,
            'message' => "Suppression effectuée"
        ]);
    }


    /**
     * Remove all resource from storage.
     *
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        $loggedUser     = Auth::user();
        $userId = $loggedUser->id;
        $shoppingCartRow = Shoppingcart::where(["user_id" => $userId])->get();
        foreach ($shoppingCartRow as $prod) {
            $prod->delete();
        }
        return response()->json([
            'success' => true,
            'message' => "Panier vider !"
        ]);
    }
}