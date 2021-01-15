@extends('layouts.guest')

@section('head')
  
@endsection

@section('content')
  @include('layouts.guestheader')

  @include('layouts.toast')

    <input type="hidden" id="producerId" value="{{ $id ?? null }}">
  
    <section class="mb-5 container-fluid">
      <h5 class="text-center border-bottom w-75 mx-auto mb-4" id="sheetName"> </h5>
      <div id="prodContainer" class="d-flex justify-content-around row"></div>
    </section>

    @include('layouts.guestfooter')

    <div class="modal fade" id="modalCart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ajouter au panier</h5>
                    <button type="button" class="btn-close closeModal" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-body" id="formCart">
                    <input type="hidden" id="prodCartId">
                    <h5 class="text-center mb-3" id="prodCartName"></h5>
                    <div class="row mb-1">
                        <div class="col">
                          <div class="form-control mb-2"> Disponible : <span id="prodCartDispo"></span></div>
                        </div>
                        <div class="col">
                          <input required type="number" step="1" min="1" id="prodCartQuantity" class="form-control mb-2" placeholder="Quantité">
                        </div>
                        <div class="col">
                          <div class="form-control mb-2"> Total : <span id="prodCartTotal"> 0 </span>€</div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-secondary mx-2 closeModal" data-bs-dismiss="modal">Annuler</button>
                        <button type="submit" class="btn btn-primary">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

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

    <script src="{{ asset('js/producersheet.js') }}"></script>
@endsection