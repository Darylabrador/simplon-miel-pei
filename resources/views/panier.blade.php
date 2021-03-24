@extends('layouts.guest')

@section('head')
    <script src="{{ asset('js/utils/check.js') }}"></script>

@endsection

@include('layouts.toast')

@section('content')
  @include('layouts.guestheader')


    <main class="container mb-5">
      <h5 class="text-center border-bottom w-50 mx-auto mb-4">Récapitulatif de mon panier</h5>

      {{-- panier infos --}}
      <div class="row no-gutters mb-5">
          <div class="col mr-3 mt-2" style="max-height: 200px;" id="prodPanierContainer"></div>

          {{-- info commande --}}
          <div class="col-lg-3 bg-white mr-3 mt-3 h-50">
              <div class="card w-100 filterCard">
                  <div class="card-body">
                      <div class="d-flex justify-content-center border-bottom">
                        <h5 class="card-title text-danger font-weight-bold text-center py-0 my-0">Commandes</h5>
                      </div>
                      <div class="mt-4">
                          <input type="text" class="form-control mt-2" id="billingInfo" placeholder="Adresse de livraison">
                          <input type="text" class="form-control mt-2" id="deliveryInfo" placeholder="Adresse de facturation">
                      </div>
                      <p class="mt-3 text-right">Total : <span id="totalCommand"></span> €</p>
                      <div class="d-flex justify-content-center">
                        <button class="btn btn-primary py-1 px-2" type="button" id="validationCommande"> Valider la commande </button>
                      </div>
                  </div>
              </div>
          </div>
        </div>

    </main>

    <footer class="bg-secondary py-1 mt-5 fixed-bottom">
      <div class="d-flex justify-content-center align-items-center">
          <span class="text-center text-white p-0"> © Copyright Daryl ABRADOR</span>
      </div>
    </footer>

    <div class="modal fade" id="modalEdit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modification : panier</h5>
                    <button type="button" class="btn-close closeModal" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-body" id="formCartEdit">
                    <input type="hidden" id="cartProductId">
                    <input required type="number" step="1" min="1" id="cartQuantity" class="form-control mb-4" placeholder="Quantité">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-secondary mx-2 closeModal" data-bs-dismiss="modal">Annuler</button>
                        <button type="submit" class="btn btn-primary">Modifier</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/panier.js') }}"></script>
@endsection