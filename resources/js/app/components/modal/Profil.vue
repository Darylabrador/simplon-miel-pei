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
              <h5 class="text-center font-weight-medium"> Votre profil </h5>
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
                    <v-text-field color="yellow darken-3" v-model="identity" :rules="identityRules"  label="Votre identité" required clearable :value="identity" ></v-text-field>
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

<script src="./js/profil.js"></script>