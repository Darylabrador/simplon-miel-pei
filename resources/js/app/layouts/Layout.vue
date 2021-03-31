<template>
  <v-app>
      <profil :dialog.sync="profilDialog" />
      <passwordChange :dialog.sync="passwordChangeDialog" />

      <div>
        <v-toolbar color="grey darken-1" class="white--text" dark >
          <v-toolbar-title class='font-weight-bold d-flex align-center'>
            <div>
             Miel Péi 
            </div>
            <v-btn icon class="mr-2" color="white" :to="homePath" active-class="no-active"> <v-icon>mdi-home</v-icon></v-btn>
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <div v-if="connected" class="d-flex">
            <v-btn text class="mr-2" color="white" :to="produitsPath"> <v-icon class="mr-1">mdi-beehive-outline</v-icon> Nos miels </v-btn>
            <v-btn text class="mr-2" color="white" :to="producersPath"> <v-icon class="mr-1">mdi-clipboard-list</v-icon> Nos producteurs </v-btn>

            <v-btn text class="mr-2" color="white" :to="panierPath" v-if="userRole == 2">
              <v-badge :content="number" class="dark--text font-weight-bold mr-4" color="grey" v-if="number != 0"></v-badge> 
              <v-icon class="mr-1">mdi-cart</v-icon> mon panier
            </v-btn>

            <div class="text-center" v-if="userRole != null">
              <v-menu offset-y left v-if="userRole === 1">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text color="white" v-bind="attrs" v-on="on"> 
                    <v-icon class="mr-1">mdi-clipboard-list</v-icon>
                    Administrations
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item dense class="font-weight-bold" >
                    Gestions comptes
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-menu offset-y :rounded="rounded" left v-if="userRole === 3">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text color="white" v-bind="attrs" v-on="on"> 
                    <v-icon class="mr-1">mdi-clipboard-list</v-icon>
                    Administrations
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item dense class="font-weight-bold" @click="goToCommande" >
                    Les commandes
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>

            <div class="text-center">
              <v-menu offset-y left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text color="white" v-bind="attrs" v-on="on"> 
                    <v-icon class="mr-1">mdi-clipboard-list</v-icon>
                    espace client
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item dense class="font-weight-bold" @click="openProfil">
                    Profils
                  </v-list-item>
                  <v-list-item dense class="font-weight-bold" @click="openPasswordChange">
                    Mot de passe
                  </v-list-item>
                  <v-list-item dense class="font-weight-bold" @click="goToCommande" v-if="userRole === 2">
                    Mes commandes
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>

            <v-btn text class="mr-2" color="white" @click="disconnect"> <v-icon class="mr-1">mdi-exit-to-app</v-icon> </v-btn>
          </div>

          <div v-else class="d-flex">
            <v-btn text class="mr-2" color="white" :to="produitsPath"> <v-icon class="mr-1">mdi-beehive-outline</v-icon> Nos miels </v-btn>
            <v-btn text class="mr-2" color="white" :to="producersPath"> <v-icon class="mr-1">mdi-clipboard-list</v-icon> Nos producteurs </v-btn>
            <v-btn text class="mr-2" color="white" :to="panierPath">
              <v-badge :content="number" class="dark--text font-weight-bold mr-4" color="grey" v-if="number != 0"></v-badge> 
              <v-icon class="mr-1">mdi-cart</v-icon> mon panier
            </v-btn>
            <v-btn text class="mr-2" color="white" :to="loginPath"> <v-icon class="mr-1">mdi-account</v-icon> connexion</v-btn>
          </div>
        </v-toolbar>
      </div>

    <v-main class="grey lighten-5">
      <router-view @updateNavbar="updateNavbar" @unathorized="unathorized"></router-view>
    </v-main>

      <v-footer dark padless>
      <v-card class="flex grey darken-1" flat tile>
        <v-card-text class="py-2 white--text text-center">
           © Copyright {{ new Date().getFullYear() }} — <strong>Daryl ABRADOR</strong>
        </v-card-text>
      </v-card>
    </v-footer>
    <flashMessage></flashMessage>
  </v-app>
</template>

<script src="./layout.js"></script>