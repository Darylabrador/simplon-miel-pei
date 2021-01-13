@extends('layouts.app')

@section('currentButton')
    <button type="button" class="btn btn-primary p-1" data-bs-toggle="modal" data-bs-target="#modalAddProduct">
        Ajouter un produit
    </button>
@endsection

@section('content')
    <div id="errorInterface"> </div>

     <form id="search" class="mb-4" novalidate>
        <div class="row d-flex align-items-center">
            <div class="col mt-2">
                <input id="searchedWord" type="text" placeholder="Rechercher par mots-clés" class="form-control">
            </div>
            <div class="col-2 mt-2">
                <div class="form-control">
                    Page n° <span id="compteur"></span>
                </div>
            </div>
            <div class="col-1 mt-2 d-flex" id="pagination"></div>
        </div>
    </form> 

    <table class="table table-hover">
        <thead>
            <tr>
                <th> Images </th>
                <th> Produits </th>
                <th> Prix </th>
                <th> Stock </th>
                <th> Actions </th>
            </tr>
        </thead>
        <tbody id="productList"></tbody>
    </table>

    <div class="modal fade" id="modalAddProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ajouter un produit</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-body" id="formAddProduct" enctype="multipart/form-data">
                    <input required type="text" id="addProductName" class="form-control mb-3" placeholder="Nom du produit">
                    <div class="row">
                        <div class="col">
                            <input required type="number" step="0.01" min="0.01" id="addProductPrice" class="form-control mb-3" placeholder="Prix">
                        </div>  
                        <div class="col">
                            <input required type="number" step="1" min="1" id="addProductQuantity" class="form-control mb-3" placeholder="Quantité">
                        </div>
                    </div>
                    
                    <input type="file" id="addProductFile" class="form-control mb-4">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-secondary mx-2" data-bs-dismiss="modal">Annuler</button>
                        <button type="submit" class="btn btn-primary">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalEditProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modification du produit</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-body" id="formEditProduct" enctype="multipart/form-data">
                    <input type="hidden" id="editProductId">
                    <div class="row">
                        <div class="col">
                            <input type="text" id="editProductName" class="form-control mb-3">
                        </div>  
                        <div class="col">
                            <input type="number" step="0.01" min="0.01" id="editProductPrice" class="form-control mb-3">
                        </div>
                    </div>
                    <input type="file" id="editProductFile" class="form-control mb-4">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-secondary mx-2" data-bs-dismiss="modal">Annuler</button>
                        <button type="submit" class="btn btn-primary">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalStockProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modification du stock</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-body" id="formStockProduct">
                    <input type="hidden" id="stockProductId">
                    <input required type="number" step="1" min="1" id="stockProductQuantity" class="form-control mb-4" placeholder="Quantité">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-secondary mx-2" data-bs-dismiss="modal">Annuler</button>
                        <button type="submit" class="btn btn-primary">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalDeleteProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-body" id="formDeleteProduct">
                    <input type="hidden" id="deleteProductId">
                    <p class="text-center mb-4"> Voulez-vous vraiment supprimer ce produit  ?</p>
                    <div class="d-flex w-100 justify-content-end">
                        <button type="button" class="btn btn-secondary mx-2" data-bs-dismiss="modal">Non</button>
                        <button type="submit" class="btn btn-danger">Oui</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="{{ asset("js/producer/stock.js") }}"></script>
@endsection