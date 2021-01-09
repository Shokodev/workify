<template>
    <div>
        <v-app-bar
        class="appbar"
                id="home-app-bar"
                app
                elevation="1"
                height="60"
        >

            <div>
                <v-toolbar-title
                class="heading info--text font-weight-bold"
                min-width="96"
                >WORKIFY</v-toolbar-title>
            </div>
            <v-spacer />
            <div>
                <v-tabs
                        class="hidden-sm-and-down"
                        optional
                        slider-color="info"
                >
                    <v-tab
                            v-for="(name, i) in items"
                            :key="i"
                            :to="{ name }"
                            :ripple="false"
                            active-class="info--text"
                            class="font-weight-bold white--text"
                            min-width="96"
                            text
                    >
                        {{ name }}
                    </v-tab>
                      <v-tab
                      v-if="auth"
                      :to="'settings'"
                      :ripple="false"
                      active-class="info--text"
                      class="font-weight-bold white--text"
                      min-width="96"
                      text
                  >
                    Settings
                  </v-tab>
                  <v-tab
                      v-if="!auth"
                      :to="'signin'"
                      :ripple="false"
                      active-class="info--text"
                      class="font-weight-bold white--text"
                      min-width="96"
                      text
                  >
                    Sign in
                  </v-tab>
                  <v-tab
                      v-if="!auth"
                      :to="'signup'"
                      :ripple="false"
                      active-class="info--text"
                      class="font-weight-bold white--text"
                      min-width="96"
                      text
                  >
                     Sign up
                  </v-tab>

                  <v-tab
                      v-if="auth"
                      v-on:click="areYouSureAlert = true"
                      :ripple="false"
                      active-class="info--text"
                      class="font-weight-bold white--text"
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
.appbar {
  background-color: var(--v-secondary-base) !important;
}
.v-tab {
  background: var(--v-secondary-base) ;
}

</style>
