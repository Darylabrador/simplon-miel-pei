  <nav id="sidebar">
    <div class="p-4 pt-5">
        <div class="mb-5 text-center">
            <h4>
                <a href="{{ route('accueil') }}">Miel Péi</a>
            </h4>
            <a href="#" id="profilName"> </a>
        </div>
        <ul class="list-unstyled components mb-5">
            <li class="{!! Request::is('dashboard/profil') || Request::is('dashboard/profil/*') ? 'active' : null !!}">
                <a href="{{ route('profil') }}">
                    <i class="fa fa-cogs mr-2" aria-hidden="true"></i> Mon compte 
                </a>
            </li>
            
            <li class="{!! Request::is('dashboard/utilisateurs') || Request::is('dashboard/utilisateurs/*') ? 'active' : null !!} d-none adm">
                <a href="{{ route('admin.users') }}" >
                    <i class="fa fa-users mr-2" aria-hidden="true"></i> Utilisateurs
                </a>
            </li>


            <li class="{!! Request::is('dashboard/fiche') || Request::is('dashboard/fiche/*') ? 'active' : null !!} d-none prod">
                <a href="{{ route('producer.fiche') }}" >
                    <i class="fa fa-address-card-o mr-2" aria-hidden="true"></i> Ma fiche
                </a>
            </li>

            <li class="{!! Request::is('dashboard/stock') || Request::is('dashboard/stock/*') ? 'active' : null !!} d-none prod">
                <a href="{{ route('producer.stock') }}" >
                    <span class="iconify mr-2" data-inline="false" data-icon="ic:outline-inventory-2"></span> Mon stock
                </a>
            </li>

            <li class="{!! Request::is('dashboard/commandes') || Request::is('dashboard/commandes/*') ? 'active' : null !!} d-none prod">
                <a href="{{ route('producer.order') }}" >
                    <i class="fa fa-cart-arrow-down mr-2" aria-hidden="true"></i> Mes commandes
                </a>
            </li>

            <li class="{!! Request::is('dashboard/client/commandes') || Request::is('dashboard/client/commandes/*') ? 'active' : null !!} d-none cli">
                <a href="{{ route('client.order') }}" >
                    <i class="fa fa-cart-arrow-down mr-2" aria-hidden="true"></i> Mes commandes
                </a>
            </li>

        </ul>
    </div>

    <div class="w-100 d-flex justify-content-center">
        <button class="btn bg-transparent" id="logout">
            <i class="fa fa-sign-out mr-2" aria-hidden="true"></i> Deconnexion
        </button>
    </div>
</nav>