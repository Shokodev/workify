<template>
  <div v-if="users">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Nickname
            </th>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Role
            </th>
            <th class="text-left">
              Edit
            </th>
            <th class="text-left">
              Reset password
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.nickname">
            <td>{{ user.nickname }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.role }}</td>
            <td>
              <v-btn
                @click="
                  editUser = user;
                  dialog = true;
                "
              >
                <v-icon>
                  mdi-account-edit
                </v-icon></v-btn
              >
            </td>
            <td>
              <v-btn color="error" @click="resetPassword(user)"
                >Reset password</v-btn
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-dialog
      v-if="editUser"
      v-model="dialog"
      persistent
      max-width="600px"
      :retain-focus="false"
    >
      <v-card>
        <v-card-title>
          <span class="headline">User Profile {{ editUser.username }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-text-field v-model="editUser.username"> </v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field v-model="editUser.nickname"> </v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="6">
                <v-select
                v-model="editUser.role"
                  :items="['Admin', 'GECC', 'Planer']"
                  label="Role"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12"><v-divider></v-divider></v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="save(editUser)">Save</v-btn>
          <v-btn text @click="cancel">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PostService from "../PostService";
export default {
  data() {
    return {
      users: null,
      editUser: null,
      dialog: false,
    };
  },
  methods: {
    async save(param) {
      console.log(param);
      PostService.editUser(param);
      this.users = await PostService.getUsers();
      this.dialog = false;
      
    },
    cancel() {
      this.dialog = false;
    },
    resetPassword(user) {
      console.log(user.username + "Reset password");
    },
  },
  async mounted() {
    this.users = await PostService.getUsers();
    console.log(this.users);
  },
};
</script>

<style>
td {
  text-align: left;
}
</style>
