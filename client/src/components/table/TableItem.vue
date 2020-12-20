<template>
  <div>
    <v-edit-dialog
      v-if="type === 'select'"
      :return-value.sync="propItem"
      large
      @save="save"
      @cancel="cancel"
    >
      {{ propItem }}
      <template v-slot:input>
        <v-select
          v-model="propItem"
          :items="state"
          :label="label"
          required
        ></v-select>
      </template>
    </v-edit-dialog>
    <v-edit-dialog
      v-if="type === 'text'"
      :return-value.sync="propItem"
      large
      @save="save"
      @cancel="cancel"
    >
      {{ propItem }}
      <template v-slot:input>
        <v-text-field
          v-model="propItem"
          :label="label"
          single-line
        ></v-text-field>
      </template>
    </v-edit-dialog>
        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    item: null,
    state: Array,
    label: String,
    type: null,
  },
  data() {
    return {
      propItem: this.item,
      snack: false,
      snackColor: "",
      snackText: "",
    };
  },
  methods: {
    save() {
      this.$emit("update-item", this.propItem);
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
  },
};
</script>

<style></style>
