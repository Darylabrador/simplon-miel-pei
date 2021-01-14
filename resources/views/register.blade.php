@extends('layouts.guest')

@section('head')
    <script src="{{ asset("js/utils/checkRegister.js") }}"></script>
@endsection

@section('content')

    @include('layouts.toast')

   <div class="container" style="height: 80vh !important; display: flex; flex-content: center; align-items: center;">
       <form id="registerForm" class="w-50 mx-auto p-3 rounded">
            <h4 class="text-danger text-center fw-bold"> Inscription </h4>
              <div class="row">
                <div class="col">
                    <input type="text" id="registerIdentity" class="form-control mt-5 mb-2" placeholder="Nom Prénom">
                </div>
                <div class="col">
                    <input type="email" id="registerEmail" class="form-control mt-5 mb-2" placeholder="ex: j.doe@gmail.com">
                </div>
            </div>
            <select id="registerRole" class="form-select mb-2">
                
            </select>
            <input type="password" id="registerPassword" class="form-control mb-2" placeholder="Mot de passe">
            <input type="password" id="registerPasswordConfirm" class="form-control mb-4" placeholder="Confirmation mot de passe">
            <div class="d-flex justify-content-end">
                <a href="{{ route('connexion') }}" class="btn btn-secondary py-1 mx-2"> Retour </a>
                <button type="submit" class="btn btn-primary py-1 mx-2"> Inscription </button>
            </div>
       </form>
   </div>

   <script src="{{ asset("js/account/loginRegister.js") }}"></script>
@endsection
