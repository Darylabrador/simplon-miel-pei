<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red" icon v-bind="attrs" v-on="on">
            <v-icon>
                mdi-delete 
            </v-icon>
        </v-btn>
      </template>

      <v-card>
        <h4 class="text-center py-5">Voulez-vous vraiment supprimer ce produit de votre panier ?</h4>
        <div class="d-flex justify-center mt-5 pb-5">
            <v-btn color="grey darken-1 white--text mx-5" @click="dialog = false">
                Annuler
            </v-btn>
            <v-btn color="red darken-1 white--text mx-5" @click="validate">
                Supprimer
            </v-btn>
        </div>
      </v-card>
    </v-dialog>
</template>

<script src="./js/deleteFromCart.js"></script>