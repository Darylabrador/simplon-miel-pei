<template>
    <v-container fluid class="grey lighten-5">
        <section class="mt-10">
            <h3 class="text-center"> Nos exploitations </h3>
            <v-divider light class="mx-auto mt-2 dividerStyle"></v-divider>
            <l-map
                :center="center"
                :zoom="zoom"
                class="map mt-10"
                ref="map"
                @update:zoom="zoomUpdated"
                @update:center="centerUpdated"
            >
                <l-tile-layer :url="url"></l-tile-layer>
                <l-control class="resetControl">
                    <button @click="resetZoom">
                        Reset
                    </button>
                </l-control>
                
                <l-marker v-for="marker in markers" :key="marker.id" :lat-lng="marker.coordinates">
                    <l-popup>
                        <div>
                            <p> 
                                {{ marker.owner }} : <br>
                                {{ marker.description }}
                            </p>
                            <b> {{ marker.address }} </b> <br>
                            <a :href="'/producteur/' + marker.userId"> Voir la fiche producteur </a>
                        </div>
                    </l-popup>
                </l-marker>
            </l-map>
        </section>

        <section class="mt-13">
            <h3 class="text-center"> Les meilleurs ventes du moment </h3>
            <v-divider light class="mx-auto mt-2 dividerStyle"></v-divider>
            <v-row no-gutters class="mt-8">
                <v-col v-for="product in bestProds" :key="product.id">
                    <v-card :loading="loading" class="mx-auto my-10 p-0" max-width="300">
                        <v-card-title> {{ product.produit.name }} </v-card-title>
                        <v-img max-height="150" :src="getImageUrl(product.produit.image)" class="mx-2"></v-img>
                        <v-card-text class="d-flex justify-end">
                            <div class="subtitle-1 font-weight-bold">
                                {{ product.produit.price }} €
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </section>
    </v-container>
</template>

<script src="./accueil.js"></script>