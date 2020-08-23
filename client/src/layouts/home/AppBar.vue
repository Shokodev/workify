<template>
    <div>
        <v-app-bar
                id="home-app-bar"
                app
                color="white"
                elevation="1"
                height="60"
        >

            <div>
                <v-toolbar-title
                class="heading"
                min-width="96"
                >WORKIFY</v-toolbar-title>
            </div>
        </v-app-bar>

    </div>
</template>

<script>
    export default {
        name: 'HomeAppBar',


        data: () => ({
            items: [
                'Contact',
            ],
        }),
    }
</script>

<style>

</style>
