<template>
    <v-container fluid class="grey lighten-5">
        <section class="mt-10">
            <h3 class="text-center"> Nos producteurs </h3>
            <v-divider light class="mx-auto mt-2 dividerStyle"></v-divider>
        </section>

        <section class="mt-13">
             <v-row class="justify-center">
                <v-row class="justify-center">
                    <v-col cols="10">
                        <v-row class="mt-0 w-100 justify-center">
                            <v-col cols="12" lg="4" md="4" sm="5" v-for="producteur in producers" :key="producteur.id" class="d-flex justify-center">
                                <v-card :loading="loading" class="mx-auto my-10 p-0 overflow-hidden" max-width="350" height="200">
                                    <v-card-title> {{ producteur.identity }} <br> <span class="text-caption"> {{ producteur.exploitations[0].address }} </span> </v-card-title>
                                    <v-card-text>
                                        <div> Description: <br> {{ producteur.exploitations[0].description }} </div>
                                    </v-card-text>
                                    <div class="d-flex justify-center align-center pb-2" style="position: absolute; bottom: 0; left: 50%; right: 50%;">
                                        <v-btn small color="primary" dark :to="'/producteur/' + producteur.id"> Voir les produits </v-btn>
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-row>
        </section>
    </v-container>
</template>

<script src="./js/producteurList.js"></script>