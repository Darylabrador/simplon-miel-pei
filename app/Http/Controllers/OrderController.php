<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderProductProducerResource;
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
            "user_id"  => $loggedUserId
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
                    "product_id" => $info->product_id,
                    "user_id"    => $productSelled->user_id
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


    /**
     * Confirm shoppingcart product and create order info with it row
     *
     * @return \Illuminate\Http\Response
     */
    public function listCommandes() {

        $loggedUser     = Auth::user();
        $loggedUserId = $loggedUser->id;

        if($loggedUser->role_id == 2) {
            $listCommandes = Order::orderBy('id','desc')->where(["user_id" => $loggedUserId])->get();
            return OrderResource::collection($listCommandes);
        } else {
            $listCommandes = OrderProduct::orderBy('id', 'desc')
                ->join('orders', 'order_products.order_id', '=', 'orders.id')
                ->join('products', 'order_products.product_id', '=', 'products.id')
                ->where(["products.user_id" => $loggedUserId])
                ->select('order_products.*')
                ->get();
            return OrderProductProducerResource::collection($listCommandes);
        }
    }


    /**
     * Confirm command from producer account
     *
     * @return \Illuminate\Http\Response
     */
    public function producerConfirm(Request $request){
        $validator = Validator::make(
            $request->all(),
            [
                'orderRowId.*'      => 'required',
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
        $loggedUserId   = $loggedUser->id;
        $orderRowId     = $validator->validated()['orderRowId'];

        $id = "";

        foreach ($orderRowId as $rowInfo) {
            $orderRow     = OrderProduct::where(['id' => $rowInfo])->first();
            $productOwner = Products::where(['id' => $orderRow->product_id, 'user_id' => $loggedUserId])->first();
            $id = $orderRow->order_id;

            if($productOwner && $orderRow) {
                $orderRow->confirmed = 1;
                $orderRow->save();
            }
        }

        $counter      = OrderProduct::where(['order_id' => $id, "confirmed" => 0])->get()->count();
        $order        = Order::where(['id' => $id])->first();

        if ($counter == 0) {
            $order->state     = 'termine';
            $order->finished_at = now();
            $order->save();
        } else {
            $order->state       = 'en cours';
            $order->save();
        }

        return response()->json([
            'success' => true,
            'message' => "Commande confirmer"
        ]);
    }
}
