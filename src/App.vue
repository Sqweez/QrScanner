<template>
    <v-app app>
        <Toolbar/>
        <router-view/>
    </v-app>
</template>

<script>
    import Toolbar from "./components/toolbar";

    export default {
        components: {
            Toolbar
        },
    };
</script>
<style>
    #app {
        -webkit-user-select: none;
    }
</style>