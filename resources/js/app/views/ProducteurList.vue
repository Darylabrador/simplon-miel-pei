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
                                <v-card :loading="loading" class="mx-auto my-10 p-0 overflow-hidden" width="350" max-width="350" height="240">
                                    <v-card-title class="d-flex flex-column align-start"> 
                                        <h4 class="font-weight-medium"> {{ producteur.identity }} </h4>
                                        <h6 class="font-weight-light"> {{ producteur.exploitations[0].address }}  </h6>
                                    </v-card-title>
                                    <v-card-text>
                                        <div> Description: <br> {{ producteur.exploitations[0].description }} </div>
                                    </v-card-text>
                                    <div class="d-flex justify-center align-center pb-5 font-weight-light" style="position: absolute; bottom: 0; left: 50%; right: 50%;">
                                        <v-btn class="font-weight-light" small color="primary" dark :to="'/producteur/' + producteur.id"> Voir les produits </v-btn>
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