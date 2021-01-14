@extends('layouts.app')

@section('content')

      @include('layouts.toast')

    <div class="row justify-content-center">
        <form class="card col-10 col-lg-4 m-2 mx-4" id="formIdentity">
            <div class="card-body">
                <h6 class="card-title mb-1 font-weight-bold">
                    Votre identité
                </h6>
                <hr class="mt-0">
                <div class="editContent d-none">
                    <input type="text" class="card-text form-control" id="editIdentity" readonly>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-center pt-0 mt-0 bg-transparent border-0">
                <button type="button" class="btn btn-primary editBtn mx-2"> Modifier </button>
                <button type="button" class="btn btn-secondary cancelBtn d-none mx-2"> Annuler </button>
                <button type="submit" class="btn btn-primary submitBtn d-none mx-2"> Enregistrer </button>
            </div>
        </form>

        <form class="card col-10 col-lg-4 m-2 mx-4" id="formChangePassword">
            <div class="card-body">
                <h6 class="card-title mb-1 font-weight-bold">
                    Votre mot de passe
                </h6>
                <hr class="mt-0">
                <div class="editContent d-none">
                    <input type="email" placeholder="Saisir votre e-mail" class="card-text form-control mt-1" id="emailConfirm" readonly>
                    <input type="password" placeholder="Nouveau mot de passe" class="card-text form-control mt-1" id="newPassword" readonly>
                    <input type="password" placeholder="Confirmation mot de passe" class="card-text form-control mt-1" id="newPasswordConfirm" readonly>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-center pt-0 mt-0 bg-transparent border-0">
                <button type="button" class="btn btn-primary editBtn mx-2"> Modifier </button>
                <button type="button" class="btn btn-secondary cancelBtn d-none mx-2"> Annuler </button>
                <button type="submit" class="btn btn-primary submitBtn d-none mx-2"> Enregistrer </button>
            </div>
        </form>
    </div>
    <script src="{{ asset('js/account/profil.js') }}"></script>
@endsection

