<template>
  <div>
    <v-app-bar class="appbar" id="home-app-bar" app elevation="1" height="60">
      <div>
        <v-toolbar-title
          class="heading info--text font-weight-bold px-5"
          min-width="96"
          >WORKIFY</v-toolbar-title
        >
      </div>
      <v-btn icon @click="toggle_dark_mode">
    <v-icon>mdi-theme-light-dark</v-icon>
</v-btn>
      <v-spacer />
      <div>
        <v-tabs class="hidden-sm-and-down" optional slider-color="info">
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
            v-if="this.$store.getters.userRole === 'Admin'"
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
import AreYouSureAlert from "@/components/AreYouSureAlert.vue";
export default {
  name: "HomeAppBar",
  data: () => ({
    items: ["dashboard", "datatable"],
    areYouSureAlert: false,
  }),
  mounted() {
    const theme = localStorage.getItem("dark_theme");
    if (theme) {
        if (theme === "true") {
            this.$vuetify.theme.dark = true;
        } else {
            this.$vuetify.theme.dark = false;
        }
    } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        this.$vuetify.theme.dark = true;
        localStorage.setItem(
            "dark_theme",
            this.$vuetify.theme.dark.toString()
        );
    }
},
  methods: {
    logout(confirm) {
      if (confirm) {
        this.$store.dispatch("logout");
      }
      this.areYouSureAlert = false;
    },
          toggle_dark_mode: function() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
  },

  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
  },
  components: {
    AreYouSureAlert,
  },
};
</script>

<style>
.appbar {
  background-color: var(--v-secondary-base) !important;
}
.v-tab {
  background: var(--v-secondary-base);
}
</style>
