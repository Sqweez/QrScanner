<template>
    <div>
        <v-app-bar
                style="-webkit-app-region: drag"
                color="primary"
                dark
        >

            <v-btn
                    icon
                    style="-webkit-app-region: no-drag;"
                    @click="$router.push('/')"
                    v-if="$route.name !== 'welcome'">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>
                Сканер QR-кодов
            </v-toolbar-title>

            <v-spacer></v-spacer>


            <v-btn icon @click="minimizeApp" style="-webkit-app-region: no-drag;"
            >
                <v-icon>mdi-window-minimize</v-icon>
            </v-btn>
            <v-btn icon @click="closeApp" style="-webkit-app-region: no-drag;"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-app-bar>
    </div>
</template>

<script>
    import {remote} from "electron";

    export default {
        name: 'Toolbar',
        mounted() {
        },
        methods: {
            closeApp() {
                const window = remote.getCurrentWindow();
                window.close();
            },
            minimizeApp() {
                const window = remote.getCurrentWindow();
                window.minimize();
            }
        }
    }
</script>