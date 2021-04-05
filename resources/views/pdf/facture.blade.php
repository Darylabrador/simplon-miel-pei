<!DOCTYPE html>
<html lang="fr">
<head>
    <style>
        @page {
            margin: 0cm 0cm;
        }

        body {
            margin-top: 2cm;
            margin-left: 2cm;
            margin-right: 2cm;
            margin-bottom: 2cm;
        }

        .fontStyle{
            font-size: 11px;
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

        header {
            position: fixed;
            top: 0cm;
            left: 0cm;
            right: 0cm;
            height: 2cm;
            border-bottom: 1px solid rgb(135, 131, 131);
        }
    
        footer {
            position: fixed; 
            bottom: 0cm; 
            left: 0cm; 
            right: 0cm;
            height: 0.5cm;
            color: rgb(131, 131, 131);
            text-align: center;
            font-size: 10px;
            border-top: 1px solid rgb(162, 162, 162);
            padding-top: 5px;
        }
    </style>
</head>
<body>
        <header>
            <img src="{{ $_SERVER['DOCUMENT_ROOT']}}/images/pdf/header.png" width="50%" height="60%" style="padding-top:18px;" />
        </header>

        <!-- Wrap the content of your PDF inside a main tag -->
        <main>
            <div style="margin-top: 30px; margin-left: 450px;">
                <table>
                    <tr>
                        <td style="text-align: justify !important; font-size: 11px; margin-bottom: 10px !important;"> <span style="font-weight: bold !important;"> Facturation </span> : <br> {{ ucfirst($orderData->billing) }}</td>
                    </tr>
                    <tr>
                        <td style="text-align: justify !important; font-size: 11px;"> <span style="font-weight: bold !important;"> Livraison </span> : <br> {{ ucfirst($orderData->delivery) }}</td>
                    </tr>
                </table>
            </div>

            <table style="margin-top: 45px !important; margin-left: 10px; width: 100%; padding: 0;" class="fontStyle tableData">
                <thead>
                    <tr style="padding: 0;">
                        <th style="border: 1px solid black;"> Produits </th>
                        <th style="border: 1px solid black;"> Quantités </th>
                        <th style="border: 1px solid black;"> Prix unitaires HT </th>
                        <th style="border: 1px solid black;"> Total HT </th>
                    </tr>
                </thead>
                <tbody>
                @foreach ($invoicelines as $value)
                <tr style="outline: 0;">
                    <td style="border: 1px solid black; padding-left: 5px;"> {{ $value->name }}</td> 
                    <td style="border: 1px solid black; padding-left: 5px; text-align: center !important;"> {{ $value->quantity }}</td> 
                    <td style="border: 1px solid black; padding-left: 5px; text-align: center !important;"> {{ $value->price }}</td> 
                    <td style="border: 1px solid black; padding-left: 5px; text-align: center !important;"> {{ $value->price * $value->quantity }}</td> 
                </tr>
                @endforeach
                </tbody>
            </table>

            <div style="margin-left: 412px; margin-top: 10px;">
                <table class="fontStyle" style="width: 230px;">
                    <tr style="border: 1px solid black; padding-left: 5px;">
                        <th style="text-align: left; border: 1px solid black; padding-left: 5px; width: 34%; font-size: 11px;">Total</th>
                        <td style="border: 1px solid black; padding-left: 5px;font-size: 11px; width: 70%;"> {{ $total }} € </td>
                    </tr>
                </table>
            </div> 
        </main>

        <footer>
            Facture générer le <?php echo date("d/m/Y");?>
        </footer>
</body>
</html>