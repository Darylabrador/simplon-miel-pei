<template >
    <v-container class="d-flex flex-column justify-center align-center mt-5" style="height:80vh; width: 100%;">
        <v-card class="mx-auto" width="450">
             <v-card-text class="mt-4">
                <h2 class="font-weight-medium text-center red--text"> Connexion </h2>
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
                <v-form ref="form" v-model="valid" lazy-validation class="formWidth">
                    <v-text-field v-model="email" :rules="emailRules"  label="Adresse e-mail" color="yellow darken-3" required></v-text-field>
                    <v-text-field type="password" v-model="password" :rules="passwordRules" label="Mot de passe" color="yellow darken-3" required></v-text-field>

                    <div class="d-flex justify-end my-2 w-100 pb-4">
                        <v-btn small class="mr-2 yellow darken-2 btnColor " :to="forgottenPath"> Mot de passe oublié </v-btn>
                        <v-btn small class="btnColor" @click="validate"> Connexion</v-btn>
                    </div>
                </v-form>
            </v-card-actions>
        </v-card>

        <v-btn  class="mt-8" text small color="dark" :to="registerPath"> Vous n'avez pas encore de compte ?</v-btn>

    </v-container>
</template>

<script src="./js/login.js"></script>