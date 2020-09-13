<template>
    <div>
        <v-app-bar
                id="home-app-bar"
                app
                color="white"
                elevation="1"
                height="60"
                hide-on-scroll
        >

            <div>
                <v-toolbar-title
                class="heading"
                min-width="96"
                >WORKIFY</v-toolbar-title>
            </div>
            <v-spacer />
            <div>
                <v-tabs
                        class="hidden-sm-and-down"
                        optional
                >
                    <v-tab
                            v-for="(name, i) in items"
                            :key="i"
                            :to="{ name }"
                            :exact="name === 'Dashboard'"
                            :ripple="false"
                            active-class="text--primary"
                            class="font-weight-bold"
                            min-width="96"
                            text
                    >
                        {{ name }}
                    </v-tab>
                </v-tabs>
            </div>
        </v-app-bar>

    </div>
</template>

<script>
    export default {
        name: 'HomeAppBar',


        data: () => ({
            items: [
                'dashboard',
                'datatable',
                'settings',
            ],
        }),
    }
</script>


<style >

</style>
