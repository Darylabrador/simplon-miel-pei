<template>
  <v-app>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet"/>

      <div>
        <v-toolbar color="grey lighten-5" class="black--text" dark>
          <v-toolbar-title class='font-weight-bold'>Miel Péi</v-toolbar-title>
          <v-spacer></v-spacer>

          <div v-if="connected">
            <v-btn text class="mr-2" color="black" :to="panierPath"> Mon panier </v-btn>
            <v-btn text class="mr-2" color="black" :to="dashboardPath"> Dashboard </v-btn>
            <v-btn text class="mr-2" color="black" @click="disconnect"> Déconnexion </v-btn>
          </div>

          <div v-else class="d-flex">
            <v-btn text class="mr-2" color="black" :to="panierPath"> Mon panier </v-btn>
            <v-btn text class="mr-2" color="black" :to="loginPath"> Connexion</v-btn>
          </div>
        </v-toolbar>
      </div>

    <v-main>
      <router-view @updateNavbar="updateNavbar" @unathorized="unathorized"></router-view>
    </v-main>

      <v-footer dark padless>
      <v-card class="flex grey lighten-2" flat tile>
        <v-card-text class="py-2 grey--text text-center">
           © Copyright {{ new Date().getFullYear() }} — <strong>Daryl ABRADOR</strong>
        </v-card-text>
      </v-card>
    </v-footer>
    <flashMessage></flashMessage>
  </v-app>
</template>

<script src="./layout.js"></script>