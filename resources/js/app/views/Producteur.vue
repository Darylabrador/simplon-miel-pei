<template>
    <v-container fluid>
        <section class="mt-10">
            <h3 class="text-center"> {{ producteurIdentity }} <br> {{ producteurAddress }} </h3>
            <v-divider light class="mx-auto mt-2 dividerStyle"></v-divider>
        </section>

        <section class="mt-13">
            <v-row no-gutters class="mt-8">
                <v-col v-for="product in producteur" :key="product.id">
                    <v-card :loading="loading" class="mx-auto my-10 p-0" max-width="300">
                        <v-card-title> {{ product.produit.name }} </v-card-title>
                        <v-img max-height="150" :src="getImageUrl(product.produit.image)" class="mx-2"></v-img>
                        <v-card-text class="d-flex justify-end">
                            <div class="subtitle-1 font-weight-bold text-right">
                                {{ inStock(product.produit.quantity ) }} <br>
                                {{ product.produit.price }} €
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </section>
    </v-container>
</template>

<script src="./producteur.js"></script>