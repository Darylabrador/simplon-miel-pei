@extends('layouts.guest')

@section('content')

   @include('layouts.toast')

   <div class="container" style="height: 80vh !important; display: flex; flex-content: center; align-items: center;">
        <input type="hidden" name="resetToken" id="resetToken" value="{{ $resetToken ?? "" }}">
        <div id="resetContainer" class="w-100"></div>
   </div>

   <script src="{{ asset("js/account/resetpassword.js") }}"></script>
@endsection
