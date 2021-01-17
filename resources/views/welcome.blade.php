@extends('layouts.guest')

@section('head')
     <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
   integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
   crossorigin=""></script>
@endsection

@section('content')

  @include('layouts.guestheader')

  @include('layouts.toast')

  <section class="container mb-5">
    <h5 class="text-center border-bottom w-50 mx-auto mb-4">Nos exploitations</h5>
    <div id="mapid" style="height: 450px;" class="w-100"></div>
  </section>

  <section class="mb-5 container-fluid">
    <h5 class="text-center border-bottom w-75 mx-auto mb-4">Les meilleurs ventes du moment</h5>
    <div id="bestProdContainer" class="d-flex justify-content-around row"></div>
  </section>

  @include('layouts.guestfooter')
 

    <div class="modal fade" id="modalCommand" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Passez commande dès maintenant !</h5>
                    <button type="button" class="btn-close closeModal" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-body" id="formCommand">
                    <input type="hidden" id="commandProdId">
                    <h5 class="text-center mb-3" id="commandProdName"></h5>
                    <div class="row mb-1">
                        <div class="col">
                          <div class="form-control mb-2"> Disponible : <span id="commandStockDispo"></span></div>
                        </div>
                        <div class="col">
                          <input required type="number" step="1" min="1" id="commandStockQuantity" class="form-control mb-2" placeholder="Quantité">
                        </div>
                        <div class="col">
                          <div class="form-control mb-2"> Total : <span id="commandStockTotal"> 0 </span>€</div>
                        </div>
                    </div>
                    
                    <input required type="text" id="commandDelivery" class="form-control mb-2" placeholder="Adresse de livraison">
                    <input required type="text" id="commandBilling" class="form-control mb-4" placeholder="Adresse de facturation">

                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-secondary mx-2 closeModal" data-bs-dismiss="modal">Annuler</button>
                        <button type="submit" class="btn btn-primary">Commander</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <script src="{{ asset('js/welcome.js') }}"></script>
   
@endsection
