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
  name: 'signin',

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

  }),

  methods: {
    signup () {
      this.$refs.form.validate()
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