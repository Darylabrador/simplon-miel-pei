<template>
    <div>
        <v-img height="200" width="100%" :src="getImageUrl('bandeau.png')"></v-img>

        <v-container fluid class="grey lighten-5">
            <section class="mt-13">
                <h2 class="text-center font-weight-medium"> Les meilleurs ventes du moment </h2>
                <v-divider light class="mx-auto mt-2 dividerStyle"></v-divider>
                <v-row no-gutters class="mt-8">
                    <v-col v-for="product in bestProds" :key="product.id">
                        <v-card :loading="loading" class="mx-auto my-10 p-0" max-width="300">
                            <h3 class="font-weight-light d-flex justify-center py-2 fontShadow2"> {{ product.name }} </h3>
                            <v-img max-height="150" :src="getImageUrl(product.image)" class="mx-2"></v-img>
                            <v-card-text class="d-flex justify-end my-0 py-0">
                                <div class="subtitle-1 font-weight-normal text-right">
                                    {{ product.price }} €
                                </div>
                            </v-card-text>
                            <addToCart :mielInfo="miel" v-if="userRole == 2 || userRole == null" />
                        </v-card>
                    </v-col>
                </v-row>
            </section>

            <section class="mt-10">
                <h2 class="text-center font-weight-medium"> Nos exploitations </h2>
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
        </v-container>
    </div>
</template>

<script src="./js/accueil.js"></script>