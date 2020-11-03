<template>
  <div>
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
  </div>

</template>

<script>
export default {
  name: 'signin',

  data: () => ({
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
      this.$store.dispatch('login', {
            nickname: this.shortname,
            password: this.password,
      })
    },
    cancel () {
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style scoped>

</style>