<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoicelineResource;
use App\Http\Resources\InvoiceResource;
use PDF;
use App\Http\Resources\OrderResource;
use App\Models\Invoice;
use App\Models\Invoicelines;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class PDFcontroller extends Controller
{
    public function generateInvoice($id) {
        $order = Order::whereId($id)->first();
        $invoice = Invoice::where(['order_id' => $order->id])->first();
        
        $orderData    = new OrderResource($order);
        $invoiceData  = new InvoiceResource($invoice);
        $invoicelines = $invoiceData->lines;
        $total        = $invoiceData->total;

        $pdf = PDF::loadView('pdf.facture', compact("orderData", "invoiceData", "invoicelines", "total"));
        return $pdf->stream();
    }
}
