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
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light py-1">
      <div class="container-fluid">
        <a class="navbar-brand font-weight-bold" href="#">Miel Péi</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end w-100">
            <li class="nav-item default">
              <button class="mr-3 btn btn-outline-secondary py-0">
                <a class="nav-link" href="{{ route('inscription') }}">Inscription</a>
              </button>
            </li>
            <li class="nav-item default">
              <button  class="btn btn-outline-secondary py-0 ">
                <a class="nav-link" href="{{ route('connexion') }}">Connexion</a>
              </button>
            </li>
            <li id="" class="nav-item d-none">
              <button  class="btn btn-outline-secondary py-0 ">
                <a class="nav-link" href="{{ route('dashboard') }}">Dashboard</a>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <section class="container mb-5">
    <div id="mapid" style="height: 450px;" class="w-100"></div>
  </section>

  <section class="mb-5 container-fluid">
    <div id="bestProdContainer" class="d-flex justify-content-between"></div>
  </section>

  <footer class="bg-secondary py-1 mt-5">
    <div class="d-flex justify-content-center align-items-center">
        <span class="text-center text-white p-0"> © Copyright Daryl ABRADOR</span>
    </div>
  </footer>
  <script src="{{ asset('js/welcome.js') }}"></script>
@endsection
