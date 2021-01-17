@extends('layouts.app')


@section('content')
<div class="row justify-content-center">
    <div class="card col-10  col-lg-3 m-2">
        <div class="card-body">
            <h5 class="card-title mb-1">
                <i class="fa fa-history mr-2" aria-hidden="true"></i>
                En attente
            </h5>
            <hr class="mt-0">
            <p class="card-text text-justify">Suivi de vos commandes en attente</p>
        </div>
        <div class="card-footer d-flex justify-content-between pt-0 mt-0 bg-transparent border-0">
            <a href="{{ route('client.order.waiting') }}" class="btn btn-primary">Consulter</a>
        </div>
    </div>

    <div class="card col-10  col-lg-3 m-2">
        <div class="card-body">
            <h5 class="card-title mb-1">
                <i class="fa fa-history mr-2" aria-hidden="true"></i>
                En cours
            </h5>
            <hr class="mt-0">
           <p class="card-text text-justify">Suivi de vos commandes en cours</p>
        </div>
        <div class="card-footer d-flex justify-content-between pt-0 mt-0 bg-transparent border-0">
            <a href="{{ route('client.order.inprogress') }}" class="btn btn-primary">Consulter</a>
        </div>
    </div>

    <div class="card col-10  col-lg-3 m-2">
        <div class="card-body">
            <h5 class="card-title mb-1">
                <i class="fa fa-history mr-2" aria-hidden="true"></i>
                Terminées
            </h5>
            <hr class="mt-0">
            <p class="card-text text-justify">Historique des commandes terminées</p>
        </div>
        <div class="card-footer d-flex justify-content-between pt-0 mt-0 bg-transparent border-0">
            <a href="{{ route('client.order.finish') }}" class="btn btn-primary">Consulter</a>
        </div>
    </div>
</div>
@endsection

