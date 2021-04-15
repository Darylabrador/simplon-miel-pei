<template>
    <v-card elevation="6" outlined class="my-10" style="background-color: rgba(255, 255, 255, 0.8);">
        <v-dialog v-model="detailDialog" max-width="600" v-if="selectItem != null">
            <v-card class="py-2" height="500">
                <v-card-title class="headline mb-1">
                    <v-row no-gutters class="pl-8 mt-1 ml-6">
                        <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                            <h5 class="text-center">Details: {{ selectItem.invoice.filename }}  </h5>
                        </v-col>
                        <v-col class="d-flex justify-end align-center">
                        <v-btn icon @click="closeDetail"> 
                            <v-icon>mdi-close</v-icon> 
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-title>

                <v-simple-table
                    fixed-header
                    height="400px"
                >
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left font-weight-medium">
                            Noms
                        </th>
                        <th class="text-left font-weight-medium">
                            Prix
                        </th>
                        <th class="text-left font-weight-medium">
                            Quantités
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="item in selectItem.invoice.lines"
                        :key="item.id"
                        >
                        <td class="font-weight-medium">{{ item.name }}</td>
                        <td class="font-weight-medium">{{ item.price }}</td>
                        <td class="font-weight-medium">{{ item.quantity }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-card>
        </v-dialog>

        <v-row  no-gutters class="pt-8">
            <v-col cols="11" class="d-flex justify-center">
                <h2 class="font-weight-medium"> Mes commandes </h2>
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
                color="yellow darken-3"
            ></v-text-field>
        </v-card-title>
            <v-data-table
            :headers="headers"
            :items="commands"
            :search="search"
            style="background-color: rgba(255, 255, 255, 0.15);"
            >

            <template v-slot:item.actions="{ item }">
                <v-btn icon small class="transparent blue--text mr-1">
                    <v-icon @click="detailCommand(item)">
                        mdi-eye
                    </v-icon>
                </v-btn>

                <v-btn icon small class="transparent red--text">
                    <v-icon @click="getInvoice(item)">
                        mdi-file-pdf
                    </v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-card>
</template>

<script src="./js/clientDatatale.js"></script>