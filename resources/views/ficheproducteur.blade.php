@extends('layouts.guest')

@section('head')

@endsection

@section('content')
  @include('layouts.guestheader')

  @include('layouts.toast')

    <input type="hidden" id="producerId" value="{{ $id ?? null }}">
  
    <section class="mb-5 container-fluid">
      <h5 class="text-center border-bottom w-75 mx-auto mb-4" id="sheetName"> </h5>
      <div id="prodContainer" class="d-flex justify-content-around row"></div>
    </section>

    @include('layouts.guestfooter')

    <script src="{{ asset('js/producersheet.js') }}"></script>
@endsection