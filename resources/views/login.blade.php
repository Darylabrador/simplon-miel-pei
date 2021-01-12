@extends('layouts.guest')

@section('content')
   <div class="container" style="height: 80vh !important; display: flex; flex-content: center; align-items: center;">
       <form id="loginForm" class="mx-auto p-3 rounded" style="min-width: 350px;">
            <h4 class="text-danger text-center fw-bold"> Connexion </h4>
            <div id="error"></div>
            <input type="email" id="loginEmail" class="form-control mb-3 mt-5" placeholder="ex: j.doe@gmail.com">
            <input type="password" id="loginPassword" class="form-control mb-4" placeholder="*****">
            <div class="d-flex justify-content-end">
                <a href="{{ route('inscription') }}" class="btn btn-secondary py-1 mx-2 w-50"> Inscription </a>
                <button type="submit" class="btn btn-primary py-1 mx-2 w-50"> Connexion </button>
            </div>
       </form>
   </div>

    <div class="text-center" style="margin-top: -50px">
        <a href="#" class="btn btn-outline-dark pt-0 pb-0 outline-0 mr-2">Retourner sur le site</a>
        <a href="#" class="btn btn-outline-secondary pt-0 pb-0 outline-0">Mot de passe oublié</a>
    </div>

    <script src="{{ asset("js/account/loginRegister.js") }}"></script>
@endsection
