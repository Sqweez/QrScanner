<template>
    <div class="d-flex justify-center align-center">
        <v-btn color="primary" @click="navToWorkspace">Начать сканирование</v-btn>
    </div>
</template>

<script>
export default {
    methods: {
        navToWorkspace() {
            this.$router.push('workspace');
        }
    }
}
</script>

<style scoped>
 div {
     height: calc(100vh - 64px);
 }
</style>