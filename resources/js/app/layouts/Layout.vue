<template>
  <v-app>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet"/>

      <div>
        <v-toolbar color="grey darken-1" class="white--text" dark >
          <v-toolbar-title class='font-weight-bold d-flex align-center'>
            <div>
             Miel Péi 
            </div>
            <v-btn icon class="mr-2" color="white" :to="homePath" active-class="no-active"> <v-icon>mdi-home</v-icon></v-btn>
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <div v-if="connected">
            <v-btn text class="mr-2" color="white" :to="panierPath"> <v-icon>mdi-cart</v-icon> mon panier</v-btn>
            <v-btn text class="mr-2" color="white" :to="dashboardPath"> <v-icon>mdi-clipboard-list</v-icon> dashboard </v-btn>
            <v-btn text class="mr-2" color="white" @click="disconnect"> <v-icon>mdi-exit-to-app</v-icon> déconnexion </v-btn>
          </div>

          <div v-else class="d-flex">
            <v-btn text class="mr-2" color="white" :to="panierPath"> <v-icon>mdi-cart</v-icon> mon panier</v-btn>
            <v-btn text class="mr-2" color="white" :to="loginPath"> <v-icon>mdi-account</v-icon> connexion</v-btn>
          </div>
        </v-toolbar>
      </div>

    <v-main>
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