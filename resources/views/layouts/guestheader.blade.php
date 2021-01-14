
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light py-1">
      <div class="container-fluid">
        <a class="navbar-brand font-weight-bold" href="{{ route('accueil') }}">Miel Péi</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end w-100">
            <li class="nav-item">
              <button class="mr-3 btn btn-outline-secondary py-0 defaultItem d-none">
                <a class="nav-link" href="{{ route('inscription') }}">Inscription</a>
              </button>
            </li>
            <li class="nav-item">
              <button  class="btn btn-outline-secondary py-0 defaultItem d-none">
                <a class="nav-link" href="{{ route('connexion') }}">Connexion</a>
              </button>
            </li>

            <li class="nav-item mr-3">
              <button id="cartLink" class="btn btn-outline-secondary py-0 d-none">
                <a class="nav-link" href="#">Mon panier</a>
              </button>
            </li>

            <li class="nav-item">
              <button id="menuLink" class="btn btn-outline-secondary py-0 d-none">
                <a class="nav-link" href="{{ route('dashboard') }}">Dashboard</a>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>