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
                            :ripple="false"
                            active-class="text--primary"
                            class="font-weight-bold"
                            min-width="96"
                            text
                    >
                        {{ name }}
                    </v-tab>
                  <v-tab
                      v-if="!auth"
                      :to="'signin'"
                      :ripple="false"
                      active-class="text--primary"
                      class="font-weight-bold"
                      min-width="96"
                      text
                  >
                    Sign in
                  </v-tab>
                  <v-tab
                      v-if="!auth"
                      :to="'signup'"
                      :ripple="false"
                      active-class="text--primary"
                      class="font-weight-bold"
                      min-width="96"
                      text
                  >
                     Sign up
                  </v-tab>

                  <v-tab
                      v-if="auth"
                      v-on:click="areYouSureAlert = true"
                      :ripple="false"
                      active-class="text--primary"
                      class="font-weight-bold"
                      min-width="96"
                      text
                  >
                    Logout
                  </v-tab>
                </v-tabs>
            </div>
        </v-app-bar>
        <AreYouSureAlert
          v-if="areYouSureAlert" 
          :showDialog="areYouSureAlert"
          @confirm="logout($event)"
        />
    </div>
</template>

<script>
import AreYouSureAlert from "@/components/AreYouSureAlert.vue"
    export default {
        name: 'HomeAppBar',
        data: () => ({
            items: [
                'dashboard',
                'datatable',
                'settings',
            ],
            areYouSureAlert: false,
        }),
      methods: {
        logout (confirm) {
          if(confirm){
            this.$store.dispatch('logout')
          }
            this.areYouSureAlert = false;
        }
      },
      computed: {
          auth () {
            return this.$store.getters.isAuthenticated
          },
      },
      components:{
        AreYouSureAlert,
      }
    }
</script>


<style >

</style>
