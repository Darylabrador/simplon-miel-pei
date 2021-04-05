<template>
    <v-card elevation="6" outlined class="my-10" style="background-color: rgba(255, 255, 255, 0.8);">
        <v-dialog v-model="detailDialog" max-width="600" v-if="selectItem != null">
            <v-card class="py-2" height="500">
                <v-card-title class="headline mb-1">
                    <v-row no-gutters class="pl-8 mt-1 ml-6">
                        <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                            <h5 class="text-center">Confirmez les produits  </h5>
                        </v-col>
                        <v-col class="d-flex justify-end align-center">
                        <v-btn icon @click="closeDetail"> 
                            <v-icon>mdi-close</v-icon> 
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-title>

                <div class="pl-2 my-4">
                    <h6> Adresse de livraison : <span class="font-weight-light"> {{ selectItem[0].order.delivery }} </span>  </h6>
                    <h6> Adresse de facturation : <span class="font-weight-light">  {{ selectItem[0].order.billing }} </span> </h6>
                </div>

                <v-simple-table
                    fixed-header
                    height="400px"
                >
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Impages
                        </th>
                        <th class="text-left">
                            Noms
                        </th>
                        <th class="text-left">
                            Quantités
                        </th>
                        <th class="text-left">
                            Actions
                        </th>
                        </tr>
                    </thead>
                    <tbody v-if="selectItem != null">
                        <tr
                        v-for="item in selectItem"
                        :key="item.id"
                        >
                        <td><v-img class="my-2" width="50" height="50" :src="getImageUrl(item.product.image)"></v-img></td>
                        <td>{{ item.product.name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td> actions </td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-card>
        </v-dialog>

       
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
            <v-data-table
            :headers="headers"
            :items="orders"
            :search="search"
            style="background-color: rgba(255, 255, 255, 0.15);"
            class="mt-5"
            >

            <template v-slot:item.order.id="{ item }">
                Commande n°{{ item.order.id }}
            </template>

            <template v-slot:item.order.created_at="{ item }">
                {{ orderDateFormat(item.order.created_at) }}
            </template>

            <template v-slot:item.actions="{ item }">
                <v-btn icon small class="transparent blue--text mr-1">
                    <v-icon @click="detailCommand(item)">
                        mdi-eye
                    </v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-card>
</template>

<script src="./js/producerDatatable.js"></script>