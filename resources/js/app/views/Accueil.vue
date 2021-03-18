<template>
    <v-container fluid>
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
                     <!-- <l-icon
                        class="customicon">
                        <img :src="customicon">
                    </l-icon> -->
                    <l-popup>
                        <div>
                            <p> 
                                {{ marker.owner }} : <br>
                                {{ marker.description }}
                            </p>
                            <b> {{ marker.address }} </b> <br>
                            <a :href="'/fiche/producteur/' + marker.userId"> Voir la fiche producteur </a>
                        </div>
                    </l-popup>
                </l-marker>
            </l-map>
        </section>

        <section class="mt-15">
            <h3 class="text-center"> Les meilleurs ventes du moment </h3>
            <v-divider light class="mx-auto mt-2 dividerStyle"></v-divider>
        </section>
    </v-container>
</template>

<script src="./accueil.js"></script>