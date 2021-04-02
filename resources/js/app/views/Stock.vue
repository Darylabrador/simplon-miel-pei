<template>
    <v-container>
        <v-dialog v-model="deleteProdDialog" max-width="600">
            <v-card class="py-5">
                <div class="title mb-8">
                    <h5 class="text-center"> Voulez-vous vraiment supprimer ce produit ? </h5>
                </div>
        
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small class="grey darken-1 mr-3 white--text"  @click="closeDelete">Annuler</v-btn>
                    <v-btn small class="red white--text" @click="deleteProd">Supprimer</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="addProdDialog" max-width="600">
            <v-card class="py-5">
                <v-card-title class="headline mb-1">
                    <v-row no-gutters class="pl-8 mt-1 ml-6">
                        <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                            <h5 class="text-center"> Ajout d'un produit </h5>
                        </v-col>
                        <v-col class="d-flex justify-end align-center">
                        <v-btn icon @click="closeAddProd"> 
                            <v-icon>mdi-close</v-icon> 
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-title>

               <v-row no-gutters class="pl-8 ml-6">
                    <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                        <v-divider></v-divider>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pl-8 ml-6 my-5">
                    <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                        <v-text-field
                        v-model="prodName"
                        flat
                        hide-no-data
                        hide-details
                        label="Nom du produit"
                        :rules="prodNameRules"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pl-8 ml-6 my-5">
                    <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                        <v-text-field
                        type="number"
                        v-model="prodPrice"
                        flat
                        hide-no-data
                        hide-details
                        min="0"
                        label="Prix"
                        :rules="prodPriceRules"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pl-8 ml-6 my-8">
                    <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                        <v-text-field
                        type="number"
                        v-model="prodQuantity"
                        flat
                        hide-no-data
                        hide-details
                        min="0"
                        label="Quantité"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pl-8 ml-6 mt-3">
                    <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                        <v-file-input
                            v-model="prodImage"
                            :rules="rules"
                            accept="image/png, image/jpeg, image/jpg"
                            label="Selectionner votre image"
                            clearable
                        ></v-file-input>
                    </v-col>
                </v-row>
              
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small class="grey darken-1 mr-3 white--text"  @click="closeAddProd">Annuler</v-btn>
                    <v-btn small class="teal darken-1 white--text"  @click="addProduct">Ajouter</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>



        <v-dialog v-model="editProdDialog" max-width="600">
            <v-card class="py-5">
                <v-card-title class="headline mb-1">
                    <v-row no-gutters class="pl-8 mt-1 ml-6">
                        <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                            <h5 class="text-center"> Modification d'un produit </h5>
                        </v-col>
                        <v-col class="d-flex justify-end align-center">
                        <v-btn icon @click="closeEditProd"> 
                            <v-icon>mdi-close</v-icon> 
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-title>

               <v-row no-gutters class="pl-8 ml-6">
                    <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                        <v-divider></v-divider>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pl-8 ml-6 my-5"  v-if="editedItem != null">
                    <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                        <v-text-field
                        v-model="editedItem.name"
                        :value="editedItem.name"
                        flat
                        hide-no-data
                        hide-details
                        label="Nom du produit"
                        :rules="prodNameRules"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pl-8 ml-6 my-5"  v-if="editedItem != null">
                    <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                        <v-text-field
                        type="number"
                        v-model="editedItem.price"
                        :value="editedItem.price"
                        flat
                        hide-no-data
                        hide-details
                        min="0"
                        label="Prix"
                        :rules="prodPriceRules"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row no-gutters class="pl-8 ml-6 mt-3">
                    <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                        <v-file-input
                            v-model="prodImage"
                            :rules="rules"
                            accept="image/png, image/jpeg, image/jpg"
                            label="Selectionner votre image"
                            clearable
                        ></v-file-input>
                    </v-col>
                </v-row>
              
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small class="grey darken-1 mr-3 white--text"  @click="closeEditProd">Annuler</v-btn>
                    <v-btn small class="teal darken-1 white--text"  @click="editProd">Modifier</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="editStockDialog" max-width="600">
            <v-card class="py-5">
                <v-card-title class="headline mb-1">
                    <v-row no-gutters class="pl-8 mt-1 ml-6">
                        <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                            <h5 class="text-center"> Modification du stock </h5>
                        </v-col>
                        <v-col class="d-flex justify-end align-center">
                            <v-btn icon @click="closeEditStok"> 
                                <v-icon>mdi-close</v-icon> 
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-title>

               <v-row no-gutters class="pl-8 ml-6">
                    <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                        <v-divider></v-divider>
                    </v-col>
                </v-row>

                 <v-row no-gutters class="pl-8 ml-6 my-8">
                    <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                        <v-text-field
                        v-if="editedItem != null"
                        type="number"
                        v-model="editedItem.quantity"
                        :value="editedItem.quantity"
                        flat
                        hide-no-data
                        hide-details
                        min="0"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small class="grey darken-1 mr-3 white--text"  @click="closeEditStok">Annuler</v-btn>
                    <v-btn small class="teal darken-1 white--text"  @click="editStock">Modifier</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <v-card elevation="6" outlined class="my-10" style="background-color: rgba(255, 255, 255, 0.8);">
            <v-row  no-gutters class="pt-8">
                <v-col cols="11" class="d-flex justify-center">
                    <h2 class="title font-weight-bold "> Gestion stock </h2>
                </v-col>
                <v-col class="d-flex justify-center">
                    <v-btn icon small class="transparent green--text mr-2" @click="openAdd()">
                        <v-icon>
                            mdi-plus-circle-outline
                        </v-icon>
                    </v-btn>
                    <v-btn icon small class="transparent blue--text" @click="refresh()">
                        <v-icon >
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
            :items="stock"
            :search="search"
            style="background-color: rgba(255, 255, 255, 0.15);"
            :loading="!isLoading"
            loading-text="chargement en cours..."
            >
                <template v-slot:item.image="{ item }">
                    <v-img max-height="100" max-width="100" :src="getImageUrl(item.image)" class="my-2"></v-img>
                </template>

                <template v-slot:item.price="{ item }">
                    {{ item.price }} €
                </template>

                <template v-slot:item.quantity="{ item }">
                    <v-chip
                        v-if="inStock(item.quantity)"
                        color="blue"
                        dark
                    >
                        {{ item.quantity }}
                    </v-chip>

                    <v-chip
                        v-else
                        color="red"
                        dark
                    >
                        Stock épuisé
                    </v-chip>
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-btn icon small class="transparent blue-grey--text mr-2" @click="openEditProd(item)">
                        <v-icon >
                            mdi-square-edit-outline
                        </v-icon>
                    </v-btn>

                     <v-btn icon small class="transparent blue--text mr-2" @click="openEditStock(item)">
                        <v-icon >
                            mdi-database-edit
                        </v-icon>
                    </v-btn>

                    <v-btn icon small class="transparent red--text" @click="openDelete(item)">
                        <v-icon >
                            mdi-delete
                        </v-icon>
                    </v-btn>
                </template>

            </v-data-table>
        </v-card>
    </v-container>
</template>

<script src="./js/stock.js"></script>