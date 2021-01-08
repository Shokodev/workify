<template>
  <div class="container signin">
    <v-card class="pa-5">
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
              <v-text-field
                  v-model="shortname"
                  :rules="nameRules"
                  label="Short Name"
                  required
                  v-on:keyup.enter="signin"
              ></v-text-field>

              <v-text-field
                  v-model="password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="passwordRules"
                  :type="show ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  counter
                  @click:append="show = !show"
                  v-on:keyup.enter="signin"
              ></v-text-field>


              <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="signin"
              >
                Login
              </v-btn>

              <v-btn
                  color="warning"
                  @click="cancel"
              >
                Cancel
              </v-btn>
            </v-form>
            </v-card>

    <v-divider
    class="my-6"></v-divider>
    <p
        class="font-weight-bold"
    >
      Or create a new Account
    </p>
    <v-btn
        class="text-capitalize"
        :to="'signup'"
    >
      Sign up
    </v-btn>

    <v-snackbar
            v-model="snack"
            :timeout="3000"
            :color="snackColor"
    >
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn
                v-bind="attrs"
                text
                @click="snack = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>

</template>

<script>
export default {
  name: 'signin',

  data: () => ({
    snack: false,
    snackColor: '',
    snackText: '',
    valid: true,
    shortname: '',
    nameRules: [
      v => !!v || 'Name is required',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
    ],
    show: false,

  }),

  methods: {
    signin () {
      this.$refs.form.validate()
      this.$store.dispatch('signin', {
            nickname: this.shortname,
            password: this.password,
      }).then((res => {
        console.log(res)
        this.snack = true;
        this.snackColor = 'success';
        this.snackText = 'Welcome';
      })).catch((error) =>
      {
        this.snack = true;
        this.snackColor = 'error';
        this.snackText = error.response.data.message;
      }

      )
    },
    cancel () {
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style scoped>

.signin {
  margin-top: 80px;
}

</style>