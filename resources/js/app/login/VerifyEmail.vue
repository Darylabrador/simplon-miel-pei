<template>
    <v-container class="d-flex justify-center align-center" style="height:80vh; width: 100%;">
        <v-card class="mx-auto" width="500">
            <v-card-text>
                <h3 class="font-weight-medium text-center" :class="isVerified ? 'red--text' : 'green--text' "> {{ message }} </h3>
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
                <v-btn small class="mr-2 btnColor" :to="loginPath"> Retour </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script src="./js/verifyEmail.js"></script>