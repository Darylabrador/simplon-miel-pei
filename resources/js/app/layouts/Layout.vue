<template>
  <v-app>
      <div>       
        <navbar />
      </div>

    <v-main class="grey lighten-5">
      <router-view></router-view>
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