<template>
    <v-container fluid class="grey lighten-5">
        <section class="mt-10">
            <h2 class="text-center font-weight-medium"> Nos produits locaux </h2>
            <v-divider light class="mx-auto mt-2 dividerStyle"></v-divider>
        </section>

        <section class="mt-13">
            <v-row no-gutters class="mt-8">
                <v-col v-for="miel in miels" :key="miel.id">
                    <v-card :loading="loading" class="mx-auto my-10 p-0" max-width="300">
                        <h3 class="font-weight-light d-flex justify-center py-2 fontShadow2"> {{ miel.name }} </h3>
                        <v-img max-height="150" :src="getImageUrl(miel.image)" class="mx-2"></v-img>
                        <v-card-text class="d-flex justify-end my-0 py-0">
                            <div class="subtitle-1 font-weight-normal text-right">
                                {{ inStock(miel.quantity) }} <br>
                                {{ miel.price }} €
                            </div>
                        </v-card-text>
                        <addToCart :mielInfo="miel" v-if="userRole == 2 || userRole == null" />
                    </v-card>
                </v-col>
            </v-row>
        </section>

    </v-container>
</template>

<script src="./js/miels.js"></script>