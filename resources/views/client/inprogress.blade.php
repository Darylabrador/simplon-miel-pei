@extends('layouts.app')

@section('currentButton')
    <button id="backMenuButton" class="btn btn-secondary px-2 py-1"> 
        <i class="fa fa-arrow-left" aria-hidden="true"></i>    
    </button>
@endsection

@section('content')
    @include('layouts.toast')

        <form id="search" class="mb-4">
        <div class="row d-flex align-items-center">
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
                <th> Commande </th>
                <th> Créer le </th>
                <th> Total </th>
                <th> Actions </th>
            </tr>
        </thead>
        <tbody id="dataList"></tbody>
    </table>
    
    <script src="{{ asset('js/client/inprogress.js') }}"></script>
@endsection

