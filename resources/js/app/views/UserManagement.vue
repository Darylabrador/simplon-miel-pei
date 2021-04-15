<template>
    <v-container>
        <v-dialog v-model="confirmDialog" max-width="600">
            <v-card class="py-5">
                <div class="title mb-8">
                    <h5 class="text-center"> Voulez-vous vraiment {{ message }} ce compte ? </h5>
                </div>
        
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small class="grey darken-1 mr-3 white--text"  @click="closeConfirm">Annuler</v-btn>
                    <v-btn small class="red white--text" @click="suspend" v-if="isSuspend">Suspendre</v-btn>
                    <v-btn small class="teal darken-1 white--text"  @click="active" v-else>Activer</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>


         <v-dialog v-model="editRoleDialog" max-width="600">
            <v-card class="py-5">
                <v-card-title class="headline mb-1">
                    <v-row no-gutters class="pl-8 mt-1 ml-6">
                        <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                            <h5 class="text-center"> Modifier le role </h5>
                        </v-col>
                        <v-col class="d-flex justify-end align-center">
                        <v-btn icon @click="closeEditRole"> 
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
                        <v-select
                            v-if="editedItem != null"
                            :items="roles"
                            v-model="editedItem.role"
                            flat
                            hide-no-data
                            hide-details
                            solo-inverted
                            return-object
                            item-text="label"
                            item-value="id"
                            :value="editedItem.role.id"
                            color="yellow darken-3"
                        ></v-select>
                    </v-col>
                </v-row>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small class="grey darken-1 mr-3 white--text"  @click="closeEditRole">Annuler</v-btn>
                    <v-btn small class="teal darken-1 white--text"  @click="editRole">Modifier</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>


         <v-dialog v-model="editMailDialog" max-width="600">
            <v-card class="py-5">
                <v-card-title class="headline mb-1">
                    <v-row no-gutters class="pl-8 mt-1 ml-6">
                        <v-col xs="10" sm="10" md="10" lg="10" xl="10">
                            <h5 class="text-center"> Modifier l'adresse mail </h5>
                        </v-col>
                        <v-col class="d-flex justify-end align-center">
                        <v-btn icon @click="closeEditMail"> 
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
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                            v-if="editedItem != null"
                            v-model="editedItem.email"
                            :value="editedItem.email"
                            flat
                            hide-no-data
                            hide-details
                            :rules="emailRules"
                            color="yellow darken-3"
                        ></v-text-field>
                        </v-form>
                    </v-col>
                </v-row>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small class="grey darken-1 mr-3 white--text"  @click="closeEditMail">Annuler</v-btn>
                    <v-btn small class="teal darken-1 white--text"  @click="editMail">Modifier</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

    
        <v-card elevation="6" outlined class="my-10" style="background-color: rgba(255, 255, 255, 0.8);">
            <v-row  no-gutters class="pt-8">
                <v-col cols="11" class="d-flex justify-center">
                    <h2 class="title font-weight-bold "> Gestions des comptes utilisateurs </h2>
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
            :items="users"
            :search="search"
            style="background-color: rgba(255, 255, 255, 0.15);"
            :loading="!isLoading"
            loading-text="chargement en cours..."
            >
                <template v-slot:item.role.label="{ item }">
                    <v-chip
                        :color="getColorRole(item)"
                        dark
                    >
                        {{ item.role.label }}
                    </v-chip>
                </template>

                 <template v-slot:item.suspended="{ item }">
                    <v-chip
                        :color="getColorState(item)"
                        dark
                    >
                        {{ getState(item) }}
                    </v-chip>
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-btn icon small class="transparent blue-grey--text mr-2">
                        <v-icon @click="openEditRole(item, true)">
                            mdi-account-edit
                        </v-icon>
                    </v-btn>

                     <v-btn icon small class="transparent blue--text mr-2">
                        <v-icon @click="openEditMail(item, true)">
                            mdi-email-edit
                        </v-icon>
                    </v-btn>

                    <v-btn icon small class="transparent green--text mr-2" v-if="item.suspended == 1">
                        <v-icon @click="openConfirm(item, true, false, 'activer')">
                            mdi-check
                        </v-icon>
                    </v-btn>

                    <v-btn icon small class="transparent red--text" v-if="item.suspended == 0">
                        <v-icon @click="openConfirm(item, true, true, 'suspendre')">
                            mdi-close
                        </v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script src="./js/userManagement.js"></script>