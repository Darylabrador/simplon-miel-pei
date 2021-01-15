@extends('layouts.guest')

@section('head')

@endsection

@section('content')
  @include('layouts.guestheader')

  @include('layouts.toast')

 

    @include('layouts.guestfooter')

    <script src="{{ asset('js/panier.js') }}"></script>
@endsection