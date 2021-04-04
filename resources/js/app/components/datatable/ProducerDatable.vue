<template>
    <v-card elevation="6" outlined class="my-10" style="background-color: rgba(255, 255, 255, 0.8);">
        <v-row  no-gutters class="pt-8">
            <v-col cols="11" class="d-flex justify-center">
                <h2 class="title font-weight-bold "> Mes commandes </h2>
            </v-col>
            <v-col class="d-flex justify-center">
                <v-btn icon small class="transparent blue--text">
                    <v-icon @click="refresh()">
                        mdi-refresh
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
        
        <v-card-title>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>
            <v-data-table
            :headers="headers"
            :items="commands"
            :search="search"
            style="background-color: rgba(255, 255, 255, 0.15);"
            >
            <!-- <template v-slot:item.deleted_at="{ item }">
                <v-chip
                    :color="getColor(item.deleted_at)"
                    dark
                >
                    {{ getState(item.deleted_at) }}
                </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-btn icon small class="transparent green--text mr-2" v-if="item.deleted_at != null">
                    <v-icon @click="openConfirm(item, false, 'activer')">
                        mdi-check
                    </v-icon>
                </v-btn>

                <v-btn icon small class="transparent red--text" v-else>
                    <v-icon @click="openConfirm(item, true, 'suspendre')">
                        mdi-close
                    </v-icon>
                </v-btn>
            </template> -->
        </v-data-table>
    </v-card>
</template>

<script src="./js/producerDatatable.js"></script>