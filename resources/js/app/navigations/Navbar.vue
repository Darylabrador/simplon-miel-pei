<template>
  <v-toolbar class="white--text navColor" dark>

    <passwordChange :dialog.sync="passwordChangeDialog" />
    <profil :dialog.sync="profilDialog" />

    <v-toolbar-title class="font-weight-medium d-flex align-center">
      <div class="font-weight-medium"> Miel Péi</div>
      <v-btn
        icon
        class="mr-2"
        color="white"
        :to="homePath"
        active-class="no-active"
      >
        <v-icon>mdi-home</v-icon></v-btn
      >
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <div v-if="connected" class="d-flex">
      <!-- start desktop menu -->
      <v-btn
        small
        text
        class="mr-2 hidden-sm-and-down font-weight-medium"
        color="white"
        :to="produitsPath"
      >
        <v-icon class="mr-1">mdi-beehive-outline</v-icon> Nos miels
      </v-btn>
      <v-btn
        small
        text
        class="mr-2 hidden-sm-and-down font-weight-medium"
        color="white"
        :to="producersPath"
      >
        <v-icon class="mr-1">mdi-clipboard-list</v-icon> Nos producteurs
      </v-btn>

      <v-btn
        small
        text
        class="mr-2 hidden-sm-and-down"
        color="white"
        :to="panierPath"
        v-if="userRole == 2"
      >
        <v-badge
          :content="number"
          class="dark--text font-weight-medium mr-4"
          color="yellow darken-2"
          v-if="number != 0"
        ></v-badge>
        <v-icon class="mr-1">mdi-cart</v-icon> mon panier
      </v-btn>

      <div class="text-center hidden-sm-and-down" v-if="userRole != null">
        <v-menu offset-y left v-if="userRole === 1">
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="white" v-bind="attrs" v-on="on">
              <v-icon class="mr-1">mdi-clipboard-list</v-icon>
              Administrations
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item dense class="font-weight-medium" @click="goToManagement">
              Gestions comptes
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu
          offset-y
          left
          v-if="userRole === 3"
          style="z-index: 500 !important"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="white" v-bind="attrs" v-on="on"  class="font-weight-medium">
              <v-icon class="mr-1">mdi-clipboard-list</v-icon>
              Administrations
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              dense
              class="font-weight-medium"
              @click="goToExploitation"
            >
              Gestion exploitations
            </v-list-item>
            <v-list-item dense class="font-weight-medium" @click="goToCommande">
              Gestion commandes
            </v-list-item>
            <v-list-item dense class="font-weight-medium" @click="goToStock">
              Gestion stock
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <div class="text-center hidden-sm-and-down">
        <v-menu offset-y left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text color="white" v-bind="attrs" v-on="on" class="font-weight-medium">
              <v-icon class="mr-1">mdi-clipboard-list</v-icon>
              espace client
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item dense class="font-weight-medium" @click="openProfil">
              Profils
            </v-list-item>
            <v-list-item
              dense
              class="font-weight-medium"
              @click="openPasswordChange"
            >
              Mot de passe
            </v-list-item>
            <v-list-item
              dense
              class="font-weight-medium"
              @click="goToCommande"
              v-if="userRole === 2"
            >
              Mes commandes
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-btn
        small
        text
        class="mr-2 hidden-sm-and-down"
        color="white"
        @click="disconnect"
      >
        <v-icon class="mr-1">mdi-exit-to-app</v-icon>
      </v-btn>
      <!-- end desktop menu -->

      <!-- start mobile menu -->
      <div class="hidden-md-and-up">
        <v-menu offset-y left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text color="white" v-bind="attrs" v-on="on">
              <v-icon class="mr-1">mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item dense class="font-weight-medium" :to="produitsPath">
              <v-icon class="mr-1">mdi-beehive-outline</v-icon> Nos miels
            </v-list-item>
            <v-list-item dense class="font-weight-medium" :to="producersPath">
              <v-icon class="mr-1">mdi-clipboard-list</v-icon> Nos producteurs
            </v-list-item>
            <v-list-item
              dense
              class="font-weight-medium"
              :to="panierPath"
              v-if="userRole == 2"
            >
              <v-badge
                :content="number"
                class="dark--text font-weight-medium mr-4"
                 color="yellow darken-2"
                v-if="number != 0"
              ></v-badge>
              <v-icon class="mr-1">mdi-cart</v-icon> Mon panier
            </v-list-item>
            <v-list-item dense class="font-weight-medium">
              <v-menu offset-x left v-if="userRole === 1">
                <template v-slot:activator="{ on, attrs }">
                  <span text v-bind="attrs" v-on="on">
                    <v-icon class="mr-1">mdi-clipboard-list</v-icon>
                    Administrations
                  </span>
                </template>
                <v-list dense>
                  <v-list-item
                    dense
                    class="font-weight-medium"
                    @click="goToManagement"
                  >
                    Gestions comptes
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-menu offset-x left v-if="userRole === 3">
                <template v-slot:activator="{ on, attrs }" class="font-weight-medium">
                  <span text v-bind="attrs" v-on="on">
                    <v-icon class="mr-1">mdi-clipboard-list</v-icon>
                    Administrations
                  </span>
                </template>
                <v-list dense>
                  <v-list-item
                    dense
                    class="font-weight-medium"
                    @click="goToExploitation"
                  >
                    Gestion exploitations
                  </v-list-item>
                  <v-list-item
                    dense
                    class="font-weight-medium"
                    @click="goToCommande"
                  >
                    Gestion commandes
                  </v-list-item>
                  <v-list-item
                    dense
                    class="font-weight-medium"
                    @click="goToStock"
                  >
                    Gestion stock
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item>
            <v-list-item dense class="font-weight-medium" @click="disconnect">
              <v-icon class="mr-1">mdi-exit-to-app</v-icon> Deconnexion
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <!-- end mobile menu -->
    </div>

    <div v-else class="d-flex">
      <!-- start desktop menu -->
      <v-btn
        small
        text
        class="mr-2 hidden-sm-and-down font-weight-medium"
        color="white"
        :to="produitsPath"
      >
        <v-icon class="mr-1">mdi-beehive-outline</v-icon> Nos miels
      </v-btn>
      <v-btn
        small
        text
        class="mr-2 hidden-sm-and-down font-weight-medium"
        color="white"
        :to="producersPath"
      >
        <v-icon class="mr-1">mdi-clipboard-list</v-icon> Nos producteurs
      </v-btn>
      <v-btn
        small
        text
        class="mr-2 hidden-sm-and-down font-weight-medium"
        color="white"
        :to="panierPath"
      >
        <v-badge
          :content="number"
          class="dark--text font-weight-medium mr-4"
          color="yellow darken-2"
          v-if="number != 0"
        ></v-badge>
        <v-icon class="mr-1">mdi-cart</v-icon> mon panier
      </v-btn>
      <v-btn
        small
        text
        class="mr-2 hidden-sm-and-down font-weight-medium"
        color="white"
        :to="loginPath"
      >
        <v-icon class="mr-1">mdi-account</v-icon> connexion</v-btn
      >
      <!-- end desktop menu -->

      <!-- start mobile menu -->
      <div class="hidden-sm-and-up">
        <v-menu offset-y left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text color="white" v-bind="attrs" v-on="on">
              <v-icon class="mr-1">mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item dense class="font-weight-medium" :to="produitsPath">
              <v-icon class="mr-1">mdi-beehive-outline</v-icon> Nos miels
            </v-list-item>
            <v-list-item dense class="font-weight-medium" :to="producersPath">
              <v-icon class="mr-1">mdi-clipboard-list</v-icon> Nos producteurs
            </v-list-item>
            <v-list-item dense class="font-weight-medium" :to="panierPath">
              <v-badge
                :content="number"
                class="dark--text font-weight-medium mr-4"
                color="yellow darken-2"
                v-if="number != 0"
              ></v-badge>
              <v-icon class="mr-1">mdi-cart</v-icon> Mon panier
            </v-list-item>
            <v-list-item dense class="font-weight-medium" :to="loginPath">
              <v-icon class="mr-1">mdi-account</v-icon> Connexion
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <!-- end mobile menu -->
    </div>
  </v-toolbar>
</template>

<script src="./navbar.js"></script>
