<template>
    <v-container v-if="isLoaded">
        <clientDatatable :commands="listCommands" v-if="userRole == 2" />
        <producerDatable :commands="listCommands" v-else />
    </v-container>
</template>

<script src="./js/commandes.js"></script>