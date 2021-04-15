<template>
    <v-container class="d-flex justify-center align-center" style="height:80vh; width: 100%;">
        <v-card class="mx-auto" max-width="700" width="100%">
            <v-card-text class="mb-0">
                <h2 class="font-weight-medium text-center mt-4 red--text"> Réinitialiser votre mot de passe </h2>
                <div v-if="!isTokenExist">
                    <p class="text-center mt-6 font-weight-light">
                        Vous avez oublié votre mot de passe ? <br> 
                        Ne vous inquiétez pas, vous pouvez le réinitialiser en indiquant votre adresse e-mail ci-dessous. <br>
                        Un email indiquant la démarche à suivre vous sera envoyer !
                    </p>
                </div>

                <div v-else>
                    <p class="text-center mt-6 font-weight-medium">
                        Réinitialiser votre mot de passe ci dessous.
                    </p>
                </div>
            </v-card-text>

            <div class="d-flex justify-center mb-4">
                <v-form ref="form" v-model="valid" lazy-validation style="width: 80% !important;">
                    <v-text-field color="yellow darken-3" v-model="email" :rules="emailRules"  label="Saisir votre adresse e-mail" required v-if="!isTokenExist"></v-text-field>
                   
                    <div v-else>
                        <v-text-field type="password" v-model="password" :rules="passwordRules" label="Nouveau mot de passe"  required style="margin-bottom: 0px! important;" color="yellow darken-3"></v-text-field>
                        <p class="red--text font-weight-light text-caption my-0 py-0">{{ message }}</p>
                        <password v-model="password" :strength-meter-only="true"  @score="showScore" />
                        <v-text-field type="password" v-model="passwordConfirm" :rules="passwordConfirmRules"  label="Confirmation du nouveau mot de passe" required color="yellow darken-3"></v-text-field>
                    </div>

                    <div class="d-flex justify-end my-2 w-100">
                        <v-btn small color="blue-grey" class="mr-2" :to="loginPath"> Retour </v-btn>
                        <v-btn small class="btnColor" @click="sendEmail" v-if="!isTokenExist"> Réinitialiser</v-btn>
                        <v-btn small class="btnColor" @click="validate" v-else> Réinitialiser</v-btn>
                    </div>
                </v-form>
            </div>
        </v-card>
    </v-container>
</template>

<script src="./js/resetPassword.js"></script>