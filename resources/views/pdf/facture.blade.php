<!DOCTYPE html>
<html lang="fr">
<head>
    <style>
        .fontStyle{
            font-size: 13px;
        }
        .fontBold {
            font-weight: bold;
        }

        table {
            border-collapse: collapse;
        }

        .tableData {
            table-layout:fixed;
            word-wrap: break-word; 
            overflow-wrap: break-word;
        }
    </style>
</head>
<body>
    <div style="margin-top: 30px; margin-left: 500px;">
        <table>
            <tr>
                <td class="fontStyle">Facturation :{{ $orderData->billing }}</td>
            </tr>
            <tr>
                <td class="fontStyle">Livraison :{{ $orderData->delivery }}</td>
            </tr>
        </table>
    </div>

    <table style="margin-top: 45px !important; margin-left: 10px; width: 100%; padding: 0;" class="fontStyle tableData">
        <thead>
            <tr style="padding: 0;">
                <th style="border: 1px solid black;"> Produit </th>
                <th style="border: 1px solid black;"> Quantité </th>
                <th style="border: 1px solid black;"> Prix unitaire HT </th>
                <th style="border: 1px solid black;"> Total HT </th>
            </tr>
        </thead>
        <tbody>
        @foreach ($invoicelineData as $value)
        <tr style="outline: 0;">
            <td style="border: 1px solid black; padding-left: 5px;"> {{ $value->name }}</td> 
            <td style="border: 1px solid black; padding-left: 5px;"> {{ $value->quantity }}</td> 
            <td style="border: 1px solid black; padding-left: 5px;"> {{ $value->price }}</td> 
            <td style="border: 1px solid black; padding-left: 5px;"> {{ $value->price * $value->quantity }}</td> 
        </tr>
        @endforeach
        </tbody>
    </table>

    <div style="margin-left: 485px; margin-top: 10px;">
        <table class="fontStyle" style="width: 218px;">
            <tr style="border: 1px solid black; padding-left: 5px;">
                <th style="text-align: left; border: 1px solid black; padding-left: 5px; width: 40%; font-size: 11px;">Total</th>
                <td style="border: 1px solid black; padding-left: 5px;font-size: 11px;"> {{ $invoiceData->total }} </td>
            </tr>
        </table>
    </div>

</body>
</html>