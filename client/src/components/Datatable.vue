<template>
  <div>
    <v-overlay :value="loadingActive">
      <v-progress-circular size="128" indeterminate> </v-progress-circular>
    </v-overlay>
    <v-data-table
      :headers="headers"
      :items="posts"
      item-key="_id"
      :search="search"
      fixed-header
      dense
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn class="mx-2" dark color="indigo" v-on:click="createExcel">
            <v-icon dark>mdi-table</v-icon>
          </v-btn>
          <AddItem v-on:add-item="createPost($event)"></AddItem>
        </v-toolbar>
      </template>

      <template v-slot:[`item.item.graphic`]="{ item }">
        <table-item :type="'text'" :item="item.item.graphic" :label="'Graphic'" v-on:update-item="updateItem"> </table-item>
      </template>
      <template v-slot:[`item.item.selectType`]="{ item }" >
        <table-item :type="'select'" :item="item.item.selectType" :state="['Floor plan', 'Navigation graphic', 'Plant graphic']" :label="'Type'" v-on:update-item="updateItem"> </table-item>
      </template>
      <template v-slot:[`item.item.regulations`]="{ item }">
        <table-item :type="'select'" :item="item.item.regulations" :state="[0, 1, 2, 3, 4, 5]" :label="'Regulations'" v-on:update-item="updateItem"> </table-item>
      </template>
      <template v-slot:[`item.item.selectState`]="{ item }">
        <table-item :type="'select'" :item="item.item.selectState" :state="['Not started', 'In progress', 'Finished', 'Issues']" :label="'State'" v-on:update-item="updateItem"> </table-item>
      </template>
      <template v-slot:[`item.item.creator`]="{ item }">
        <table-item :type="'select'" :item="item.item.creator" :state="['GECC 1', 'GECC 2', 'GECC 3', 'GECC 4']" :label="'Creator'" v-on:update-item="updateItem"> </table-item>
      </template>

      <template v-slot:[`item.item.comments`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-if="item.item.comments"
              small
              class="mx-4"
              v-bind="attrs"
              v-on="on"
            >
              mdi-comment-text
            </v-icon>
          </template>

          <span>{{ item.item.comments }}</span>
        </v-tooltip>
      </template>

      <template v-slot:[`item.item.selectSiemensTested`]="{ item }">
        <table-item :type="'select'" :item="item.item.selectSiemensTested" :state="['OK', 'Faults', 'Todo']" :label="'Tested'" v-on:update-item="updateItem"> </table-item>
      </template>

      <template v-slot:[`item.item.siemensAuditor`]="{ item }">
        <table-item :type="'select'" :item="item.item.siemensAuditor" :state="[
                'Siemens User1',
                'Siemens User2',
                'Siemens User3',
                'Siemens User4',
              ]" :label="'Auditor'" v-on:update-item="updateItem"> </table-item>
      </template>

      <template v-slot:[`item.item.siemensComments`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-if="item.item.siemensComments"
              small
              class="mx-4"
              v-bind="attrs"
              v-on="on"
            >
              mdi-comment-text
            </v-icon>
          </template>
          <span>{{ item.item.siemensComments }}</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.item.planerComments`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-if="item.item.planerComments"
              small
              class="mx-4"
              v-bind="attrs"
              v-on="on"
            >
              mdi-comment-text
            </v-icon>
          </template>
          <span>{{ item.item.planerComments }}</span>
        </v-tooltip>
      </template>

      <template v-slot:[`item.item.selectPlanerTested`]="{ item }">
        <table-item :type="'select'" :item="item.item.selectPlanerTested" :state="['OK', 'Faults', 'Todo']" :label="'Tested'" v-on:update-item="updateItem"> </table-item>
      </template>

      <template v-slot:[`item.item.planer`]="{ item }">
        <table-item :type="'select'" :item="item.item.planer" :state="[
                'Planer User1',
                'Planer User2',
                'Planer User3',
                'Planer User4',
              ]" :label="'Planer'"> </table-item>
      </template>

      <template v-slot:[`item.item.actions`]="{ item }" v-if="isAdmin">
        <EditItem :edit-item="item" v-on:change-item="editItem($event)">
        </EditItem>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

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
import PostService from "@/PostService";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import TableItem from "./table/TableItem";
export default {
  name: "Datatable",
  components: {
    AddItem,
    EditItem,
    TableItem,
  },
  props: {
    posts: {
      type: Array[Object],
    },
  },
  data() {
    return {
      search: "",
      loadingActive: false,
      headers: [
        {
          text: "Graphic",
          value: "item.graphic",
          align: "start",
          class: "GECC",
        },
        { text: "Type", value: "item.selectType", class: "GECC" },
        {
          text: "Regulations",
          value: "item.regulations",
          class: "GECC",
        },
        {
          text: "Date",
          value: "meta.finished_at",
          class: "GECC",
        },
        {
          text: "Creator",
          value: "item.creator",
          class: "GECC",
        },
        {
          text: "State",
          value: "item.selectState",
          class: "GECC",
        },
        {
          text: "Comments",
          value: "item.comments",
          class: "GECC",
        },
        {
          text: "Date",
          value: "item.siemensDate",
          class: "Siemens",
        },
        {
          text: "Tested",
          value: "item.selectSiemensTested",
          class: "Siemens",
        },
        {
          text: "Auditor",
          value: "item.siemensAuditor",
          class: "Siemens",
        },
        {
          text: "Comments",
          value: "item.siemensComments",
          class: "Siemens",
        },
        {
          text: "Date",
          value: "item.planerDate",
          class: "Planer",
        },
        {
          text: "Tested",
          value: "item.selectPlanerTested",
          class: "Planer",
        },
        {
          text: "Planer",
          value: "item.planer",
          class: "Planer",
        },
        {
          text: "Comments",
          value: "item.planerComments",
          class: "Planer",
        },
        {
          text: "Actions",
          value: "item.actions",
          class: "accent",
        },
      ],
      snack: false,
      snackColor: "",
      snackText: "",
    };
  },
  methods: {
    async createPost(item) {
      await PostService.insertPost(item);
      console.log("send new item", item);
      this.posts = await PostService.getPosts();
    },
    async createExcel() {
      this.loadingActive = true;
      await PostService.createExcel();
      this.loadingActive = false;
    },
    async editItem(item) {
      await PostService.editPost(item);
    },
    async save(item) {
      await PostService.editPost(item).then(() => {
        this.snack = true;
        this.snackColor = "success";
        this.snackText = "Data saved";
      });
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },

    async deleteItem(item) {
      await PostService.deletePost(item._id);
      this.loadingActive = true;
      this.posts = await PostService.getPosts();
      this.loadingActive = false;
    },
        updateItem(e) {
        this.snack = true;
        this.snackColor = "success";
        this.snackText = "Data saved";
      console.log(e)
    }
  },
  computed: {
    isAdmin() {
      return this.$store.getters.userRole === "admin";
    },
    isGECC() {
      return this.$store.getters.userRole === "gecc";
    },
    isSiemens() {
      return this.$store.getters.userRole === "simenes";
    },
    isPlaner() {
      return this.$store.getters.userRole === "planer";
    },
  },
};
</script>

<style>
.v-data-table th[role="columnheader"] {
  white-space: nowrap;
}
</style>
