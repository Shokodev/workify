<template>
  <div v-if="users">
    <div v-for="user in users" :key="user.nickname">
      {{ user.username }}
      {{ user.nickname }}
      {{ user.createdAt }}
      {{ user.role }}

      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
        :retain-focus="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">Edit user</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field v-model="user.username"> </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field v-model="user.nickname"> </v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                  <v-select
                    :items="['Admin', 'GECC', 'Planer']"
                    label="Role"
                    required
                  ></v-select>
                </v-col>
                  <v-col cols="12" sm="12" md="6" class="d-flex align-self-center justify-center">
                  <v-btn color="error" @click="resetPassword(user)">Reset password</v-btn>
                </v-col>
                <v-col cols="12"><v-divider></v-divider></v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="save(user)">Save</v-btn>
            <v-btn text @click="cancel">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
export default {
  data() {
    return {
      users: null,
      dialog: false,
    };
  },
  methods: {
    save(param) {
      console.log(param);
      PostService.editUser(param)
      this.dialog = false;
    },
    cancel() {
      this.dialog = false;
    },
    resetPassword(user){
      console.log(user.username + "Reset password")
    }
  },
  async mounted() {
    this.users = await PostService.getUsers();
    console.log(this.users);
  },
};
</script>

<style></style>
