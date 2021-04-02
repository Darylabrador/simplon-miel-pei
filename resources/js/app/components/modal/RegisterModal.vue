<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="550"
    >
      <v-card class="w-100">
        <v-card-title class="headline">
          <v-row no-gutters class="mt-1 ml-6">
            <v-col xs="10" sm="10" md="10" lg="10" xl="10">
              <h5 class="text-center"> Inscription </h5>
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
              <v-row>
                  <v-col cols="5">
                      <v-text-field v-model="identity" :rules="identityRules"  label="Nom Prénom*" required></v-text-field>
                  </v-col>
                  <v-col>
                      <v-text-field v-model="email" :rules="emailRules"  label="Ex: j.doe@gmail.com*" required></v-text-field>
                  </v-col>
              </v-row>

              <v-select v-model="role" :items="items" label="Vous êtes un :" item-text="label" item-value="id" required></v-select>
              
              <v-text-field type="password" v-model="password" :rules="passwordRules" label="Mot de passe*" required style="margin-bottom: 0px! important;"></v-text-field>
              <p class="red--text font-weight-light text-caption my-0 py-0">{{ message }}</p>
              <password v-model="password" :strength-meter-only="true"  @score="showScore" />

              <v-text-field type="password" v-model="passwordConfirm" :rules="passwordConfirmRules" label="Confirmation mot de passe*" required></v-text-field>
            </v-form>
          </v-col>
        </v-row>
     
        <div class="d-flex justify-center mt-5 pb-8">
            <v-btn color="grey darken-2 white--text mx-5" @click="close">
                Annuler
            </v-btn>
            <v-btn color="blue-grey darken-2 white--text mx-5" @click="validate">
                Inscription
            </v-btn>
        </div>
      </v-card>
    </v-dialog>
</template>

<script src="./js/registerModal.js"></script>