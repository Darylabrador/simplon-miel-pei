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
              <h5 class="text-center font-weight-medium"> Modification mot de passe </h5>
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
                    <v-text-field color="yellow darken-3" type="email" v-model="email" :rules="emailRules" label="Votre adresse mail" required clearable></v-text-field>
                    <v-text-field color="yellow darken-3" type="password" v-model="password" :rules="passwordRules" label="Nouveau mot de passe" required clearable></v-text-field>
                    <password v-model="password" :strength-meter-only="true"  @score="showScore" />
                    <v-text-field color="yellow darken-3" type="password" v-model="passwordConfirm" :rules="passwordConfirmRules" label="Confirmation mot de passe" required clearable></v-text-field>
                </v-form>
            </v-col>
        </v-row>
     
        <div class="d-flex justify-center mt-5 pb-8">
            <v-btn color="grey darken-2 white--text mx-5" @click="close">
                Annuler
            </v-btn>
            <v-btn color="btnColor mx-5" @click="validate">
                Modifier
            </v-btn>
        </div>
      </v-card>
    </v-dialog>
</template>

<script src="./js/passwordChange.js"></script>