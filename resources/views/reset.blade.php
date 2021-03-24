@extends('layouts.guest')

@include('layouts.toast')

@section('content')


   <div class="container" style="height: 80vh !important; display: flex; flex-content: center; align-items: center;">
        <input type="hidden" name="resetToken" id="resetToken" value="{{ $resetToken ?? "" }}">
        <div id="resetContainer" class="w-100"></div>
   </div>

   <script src="{{ asset("js/account/resetpassword.js") }}"></script>
@endsection
