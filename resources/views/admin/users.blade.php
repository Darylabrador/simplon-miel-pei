@extends('layouts.app')


@section('content')
    <div id="errorInterface"> </div>

    <form id="search" class="mb-4">
        <div class="row d-flex align-items-center">
            <div class="col-lg-7 mt-2">
                <input id="searchedWord" type="text" placeholder="Rechercher par mots-clés" class="form-control">
            </div>
            <div class="col-lg-2 mt-2">
                <select id="searchedState" class="form-select">
                    <option value=""> Choisir l'état</option>
                    <option value="0"> Activer </option>
                    <option value="1"> Suspendu </option>
                </select>
            </div>

            <div class="col-2 mt-2">
                <div class="form-control">
                    Page n° <span id="compteur"></span>
                </div>
            </div>

            <div class="col-1 mt-2 d-flex" id="pagination"></div>
        </div>
    </form> 

    <table class="table table-hover" id="dataTableTickets">
        <thead>
            <tr>
                <th> Identités </th>
                <th> Adresses mails </th>
                <th> Roles </th>
                <th> Etats </th>
                <th> Actions </th>
            </tr>
        </thead>
        <tbody id="userList"></tbody>
    </table>

    <div class="modal fade" id="modalSuspend" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-body" id="suspendForm">
                    <input type="hidden" id="identSuspend">
                    <p class="text-center mb-4"> Voulez-vous vraiment suspendre le compte  ?</p>
                    <div class="d-flex w-100 justify-content-end">
                        <button type="button" class="btn btn-secondary mx-2" data-bs-dismiss="modal">Non</button>
                        <button type="submit" class="btn btn-primary">Oui</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalActiv" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-body" id="activForm">
                    <input type="hidden" id="identActiv">
                    <p class="text-center mb-4"> Voulez-vous vraiment réactiver le compte ?</p>
                    <div class="d-flex w-100 justify-content-end">
                        <button type="button" class="btn btn-secondary mx-2" data-bs-dismiss="modal">Non</button>
                        <button type="submit" class="btn btn-primary">Oui</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalMail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modification e-mail</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-body" id="modifMailForm">
                    <input type="hidden" id="clientIdEmail">
                    <input type="email" id="clientModifMail" class="form-control mb-3">
                    <div class="d-flex w-100 justify-content-end">
                        <button type="button" class="btn btn-secondary mx-2" data-bs-dismiss="modal">Annuler</button>
                        <button type="submit" class="btn btn-primary">Modifier</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalRole" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modification du rôle</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form class="modal-body" id="modifRoleForm">
                    <input type="hidden" id="clientIdRole">
                    <select id="clientRoleChange" class="form-select mb-3">
                        <option value="2"> Client </option>
                        <option value="3"> Producteur </option>
                    </select>
                    <div class="d-flex w-100 justify-content-end">
                        <button type="button" class="btn btn-secondary mx-2" data-bs-dismiss="modal">Annuler</button>
                        <button type="submit" class="btn btn-primary">Modifier</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <script src="{{ asset('js/admin/userList.js') }}"></script>
@endsection