@extends('layouts.app')

@section('head')
     <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
   integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
   crossorigin=""></script>
@endsection

@section('currentButton')
    <button id="startEditingBtn" type="button" class="btn btn-primary p-1">
        Editer votre fiche
    </button>

    <button id="stopEditionBtn" type="button" class="btn btn-secondary p-1 d-none">
        Annuler
    </button>
@endsection

@include('layouts.toast')

@section('content')


    <form id="searchForm" class="mb-4">
        <div class="row no-gutter d-flex align-items-center">
            <div class="col-1 mt-2 text-center">
                <span class="iconify mr-2" data-inline="false" data-icon="fa-solid:map-marked-alt" style="font-size: 24px; color: black;"></span>
            </div>
            <div class="col-lg-4 mt-2">
                <input id="searchLocation" type="text" placeholder="Saisir l'adresse de l'exploitation" class="form-control">
            </div>
            <div class="col-lg-6 mt-2">
                <select id="resultSearch" class="form-select"></select>
            </div>
            <div class="col-lg-1 mt-2">
                <button id="validateBtn" type="submit" class="btn btn-primary px-2 py-1"> Valider </button>
            </div>
        </div>
        <hr>
        <div class="mt-4">
            <label for="description" class="mb-0">Description rapide de vos produits</label>
            <p class="text-muted mt-0" style="font-size: 10px;">Info: max 40 caractères</p>
            <textarea id="description" cols="30" rows="4" class="form-control" maxlength="40"></textarea>
        </div>
    </form> 

    <div id="mapid" style="height: 400px;"></div>

    <script src="{{ asset("js/producer/fiche.js") }}"></script>
@endsection