<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderProductResource;
use App\Http\Resources\OrderResource;
use App\Models\Invoice;
use App\Models\Invoicelines;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Shoppingcart;
use DateTime;

class OrderController extends Controller
{

    /**
     * Confirm shoppingcart product and create order info with it row
     *
     * @return \Illuminate\Http\Response
     */
    public function confirmShoppingcart(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'billing'  => 'required',
                'delivery' => 'required',
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
        $loggedUserId = $loggedUser->id;

        $billing   = $validator->validated()['billing'];
        $delivery  = $validator->validated()['delivery'];

        $newOrder = Order::create([
            "billing"  => $billing,
            "delivery" => $delivery,
        ]);

        $shoppingcartRow = Shoppingcart::where(['user_id' => $loggedUserId])->get();
        $total = 0;

        $now = new DateTime($newOrder->created_at);
        $nowFormat = $now->format('d-m-Y');
        
        $invoice = Invoice::create([
            "filename"   => "commande-{$nowFormat}",
            "order_id"   => $newOrder->id,
        ]);

        foreach($shoppingcartRow as $info) {
         
            $productSelled = Products::whereId($info->product_id)->first();

            if($productSelled->quantity != 0 && $info->quantity <= $productSelled->quantity ) {
                $lastAmount = (int)  $productSelled->amountSell;
                $productSelled->amountSell = $lastAmount + 1;
                $productSelled->quantity -= $info->quantity;
                $productSelled->save();

                $quantityprod = (int) $info->quantity;
                $prodPrice = (float) $productSelled->price;
                $total += $quantityprod * $prodPrice;

                OrderProduct::create([
                    "quantity"   => $info->quantity,
                    "order_id"   => $newOrder->id,
                    "product_id" => $info->product_id
                ]);

                Invoicelines::create([
                    "name"         => $productSelled->name,
                    "quantity"     => $info->quantity,
                    "price"        => $productSelled->price,
                    "invoice_id"   => $invoice->id,
                ]);
            }

            $info->delete();
        }

        $invoice->total = $total;
        $invoice->save();

        return response()->json([
            'success' => true,
            'message' => 'Panier confirmer'
        ]);
    }


}
