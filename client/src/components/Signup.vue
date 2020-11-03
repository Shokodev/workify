<template>

      <v-form
      ref="form"
      v-model="valid"
      lazy-validation
  >
    <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
    ></v-text-field>

    <v-text-field
        v-model="shortname"
        :rules="shortnameRules"
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
        hint="At least 8 characters"
        counter
        @click:append="show = !show"
    ></v-text-field>

      <v-text-field
          v-model="confirmPassword"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[confirmPasswordEquality]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          counter
          @click:append="show1 = !show1"
      ></v-text-field>

    <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="signup"
    >
      Signup
    </v-btn>

    <v-btn
        color="warning"
        @click="cancel"
    >
      Cancel
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'signup',

  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
    ],
    shortname: '',
    shortnameRules: [
      v => !!v || 'Short Name is required',
      v => (v && v.length <= 3) || 'Short Name must be less than 3 characters',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must be at least than 8 characters'
    ],
    show: false,
    confirmPassword: '',
    confirmPasswordRules:  [
      v => !!v || 'Password is required',
    ],
    show1: false,

  }),

  methods: {
    signup () {
      this.$refs.form.validate()
      this.$store.dispatch('signup', {
        username: this.name,
        nickname: this.shortname,
        password: this.password,
      })
    },
    cancel () {
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
  },
  computed: {
    confirmPasswordEquality (){
      return this.password === this.confirmPassword || "Password must match"
    },
  },
}
</script>

<style scoped>

</style>
