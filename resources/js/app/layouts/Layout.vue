<template>
  <v-app>
      <div>       
        <navbar />
      </div>

    <v-main class="grey lighten-5">
      <router-view></router-view>
    </v-main>

      <v-footer padless>
      <v-card class="flex navColor" flat tile>
        <v-card-text class="py-2 white--text text-center font-weight-light">
           © Copyright {{ new Date().getFullYear() }} — <strong>Daryl ABRADOR</strong>
        </v-card-text>
      </v-card>
    </v-footer>
    <flashMessage></flashMessage>
  </v-app>
</template>

<script src="./layout.js"></script>