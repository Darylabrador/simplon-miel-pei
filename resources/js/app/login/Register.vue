<template >
    <v-container class="d-flex justify-center align-center" style="height:85vh; width: 100%;">
        <v-card class="mx-auto" width="500">
            <v-card-text class="mt-4">
                <h2 class="font-weight-black text-center red--text"> Inscription </h2>
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                        <v-col cols="5">
                            <v-text-field v-model="identity" :rules="identityRules"  label="Nom Prénom*" required></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="email" :rules="emailRules"  label="Ex: j.doe@gmail.com*" required></v-text-field>
                        </v-col>
                    </v-row>

                    <v-select v-model="role" :items="items" label="Vous êtes un :" item-text="label" item-value="id" required></v-select>
                   
                    <v-text-field type="password" v-model="password" :rules="passwordRules" label="Mot de passe*" required style="margin-bottom: 0px! important;"></v-text-field>
                    <p class="red--text font-weight-light text-caption my-0 py-0">{{ message }}</p>
                    <password v-model="password" :strength-meter-only="true"  @score="showScore" />

                    <v-text-field type="password" v-model="passwordConfirm" :rules="passwordConfirmRules" label="Confirmation mot de passe*" required></v-text-field>

                    <div class="d-flex justify-end mt-5 mb-2 w-100">
                        <v-btn small color="blue-grey" class="mr-2 white--text" :to="loginPath"> Retour </v-btn>
                        <v-btn small color="primary" @click="validate"> Inscription </v-btn>
                    </div>
                </v-form>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script src="./js/register.js"></script>