<template>
    <v-container fluid class="grey lighten-5">

        <loginModal :dialog.sync="loginDialog" @openRegister="openRegister" />
        <registerModal :dialog.sync="registerDialog" />

        <section class="mt-10">
            <h3 class="text-center"> Mon panier </h3>
            <v-divider light class="mx-auto mt-2 dividerStyle"></v-divider>
        </section>

        <section class="my-13" v-if="isLoaded">
            <v-row no-gutters v-if="productArray.length != 0">
                <v-col class="my-2">
                    <v-row v-for="prod in productArray" :key="prod.id">
                        <v-col>
                            <v-card
                                class="mx-auto"
                                max-width="600"
                                max-height="150"
                            >
                                <v-row no-gutters>
                                    <v-col cols="5">
                                        <v-img height="150px" max-height="150" max-width="250"  :src="getImageUrl(prod.image)" class="p-2"> </v-img>
                                    </v-col>
                                    <v-col>
                                        <v-row no-gutters class="mt-5 d-flex align-center">
                                            <v-col class="text-center font-weight-bold" cols="10" >
                                                {{ prod.name }} 
                                            </v-col>
                                            <v-col cols="1" class="text-left">
                                                <deleteFromCart :mielInfo="prod" />
                                            </v-col>
                                        </v-row>
                                        <v-row no-gutters class="mt-10 mr-4">
                                            <v-col class="text-center mt-2">
                                                Prix : {{ prod.price }} €
                                            </v-col>
                                            <v-col cols="4" class="text-left" v-if="inStock(prod.maxQuantity)">
                                                <v-text-field v-model="prod.amountDefault" required type="number" label="Quantité" dense outlined :value="prod.amountDefault" :max="prod.maxQuantity" min="0" @input="changeQuantity()"> </v-text-field>
                                            </v-col>
                                             <v-col class="text-left red--text font-weight-bold" v-else>
                                               Stock épuisé
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            
                <v-col class="my-2">
                    <v-card
                        class="mx-auto"
                        max-width="344"
                    >
                        <v-card-text class="mb-5">
                            <h2 class="font-weight-bold text-center">Commandes</h2>
                        </v-card-text>
                        <div class="px-3">
                            <v-text-field outlined clearable v-model="billing" :rules="billingRules"  label="Adresse de livraison" required class="mb-2"></v-text-field>
                            <v-text-field outlined clearable v-model="delivery" :rules="deliveryRules"  label="Adresse de facturation" required></v-text-field>
                        </div>
                        
                        <h4 class="text-center mb-5 font-weight-bold"> Total TTC : {{ totalTTC }} € </h4>
                        
                        <div  class="d-flex justify-center pb-4">
                            <v-btn color="grey darken-1" class="white--text" @click="validate" :disabled="!valid"> Passer commande </v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
            <div v-else>
                <h3 class="text-center headline font-weight-medium text-uppercase"> Votre panier est vide !</h3>
            </div>
        </section>
    </v-container>
</template>

<script src="./js/panier.js"></script>