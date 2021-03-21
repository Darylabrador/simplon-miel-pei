<template>
    <v-container fluid class="grey lighten-5">
        <section class="mt-10">
            <h3 class="text-center"> Nos producteurs </h3>
            <v-divider light class="mx-auto mt-2 dividerStyle"></v-divider>
        </section>

        <section class="mt-13">
            <v-row no-gutters class="mt-8">
                <v-col v-for="producteur in producers" :key="producteur.id">
                    <v-card :loading="loading" class="mx-auto my-10 p-0" max-width="300">
                        <v-card-title> {{ producteur.identity }} <br> <span class="text-caption"> {{ producteur.exploitations[0].address }} </span> </v-card-title>
                        <v-card-text>
                            <div> Description: <br> {{ producteur.exploitations[0].description }} </div>
                        </v-card-text>
                        <div class="d-flex justify-center align-center pb-5">
                            <v-btn small color="primary" dark :href="'/producteur/' + producteur.id"> Voir les produits </v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </section>
    </v-container>
</template>

<script src="./producteurList.js"></script>