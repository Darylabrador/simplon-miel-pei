<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <v-card class="w-100">
        <v-card-title class="headline">
          <v-row no-gutters class="mt-1 ml-6">
            <v-col xs="10" sm="10" md="10" lg="10" xl="10">
              <h5 class="text-center"> Connexion </h5>
            </v-col>
            <v-col class="d-flex justify-end align-center">
              <v-btn icon @click="close"> 
                <v-icon>mdi-close</v-icon> 
                </v-btn>
            </v-col>
          </v-row>
        </v-card-title>

        <v-row no-gutters class="pl-8 ml-6 mb-4">
          <v-col xs="10" sm="10" md="10" lg="10" xl="10">
           <v-divider class="divider" > </v-divider>
          </v-col>
        </v-row>

        <v-row no-gutters class="d-flex justify-center">
            <v-col cols="10">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="email" :rules="emailRules"  label="Adresse e-mail" required clearable></v-text-field>
                    <v-text-field type="password" v-model="password" :rules="passwordRules" label="Mot de passe" required clearable></v-text-field>
                </v-form>
            </v-col>
        </v-row>
     
        <div class="d-flex justify-center mt-5 pb-8">
            <v-btn color="grey darken-2 white--text mx-5" @click="close">
                Annuler
            </v-btn>
            <v-btn color="blue-grey darken-2 white--text mx-5" @click="validate">
                Connexion
            </v-btn>
        </div>

        <div class="d-flex justify-center pb-4">
          <v-btn text small class="text-decoration-underline" @click="openRegister"> Vous n'avez pas de compte ? cliquez ici </v-btn>
        </div>
      </v-card>
    </v-dialog>
</template>

<script src="./loginModal.js"></script>