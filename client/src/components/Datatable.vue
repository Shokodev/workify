<template>
  <div>
    <v-overlay :value="loadingActive">
      <v-progress-circular size="128" indeterminate> </v-progress-circular>
    </v-overlay>
    <v-data-table
      v-if="getPosts"
      :headers="headers"
      :items="getPosts"
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

      <template v-slot:[`item.item.graphic`]="{ item }" v-if="isAdmin">
        <table-item
          :type="'text'"
          :propName="'graphic'"
          :item="item.item.graphic"
          :_id="item._id"
          :label="'Graphic'"
          v-on:update-item="updateItem"
        >
        </table-item>
      </template>
      <template v-slot:[`item.item.selectType`]="{ item }" v-if="isAdmin">
        <table-item
          :type="'select'"
          :propName="'selectType'"
          :item="item.item.selectType"
          :_id="item._id"
          :state="['Floor plan', 'Navigation graphic', 'Plant graphic']"
          :label="'Type'"
          v-on:update-item="updateItem"
        >
        </table-item>
      </template>
      <template v-slot:[`item.item.regulations`]="{ item }" v-if="isAdmin">
        <table-item
          :type="'select'"
          :propName="'regulations'"
          :item="item.item.regulations"
          :_id="item._id"
          :state="[0, 1, 2, 3, 4, 5]"
          :label="'Regulations'"
          v-on:update-item="updateItem"
        >
        </table-item>
      </template>
      <template v-slot:[`item.item.selectState`]="{ item }" v-if="isAdmin">
        <table-item
          :type="'select'"
          :propName="'selectState'"
          :item="item.item.selectState"
          :_id="item._id"
          :state="['Not started', 'In progress', 'Finished', 'Issues']"
          :label="'State'"
          v-on:update-item="updateItem"
        >
        </table-item>
      </template>
      <template v-slot:[`item.meta.finished_at`]="{ item }">
        {{ parseDate(item.meta.finished_at) }}
      </template>

      <template v-slot:[`item.item.creator`]="{ item }" v-if="isAdmin">
        <table-item
          :type="'select'"
          :propName="'creator'"
          :item="item.item.creator"
          :_id="item._id"
          :state="['GECC 1', 'GECC 2', 'GECC 3', 'GECC 4']"
          :label="'Creator'"
          v-on:update-item="updateItem"
        >
        </table-item>
      </template>

      <template v-slot:[`item.item.comments`]="{ item }" v-if="isAdmin">
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

      <template
        v-slot:[`item.item.selectSiemensTested`]="{ item }"
        v-if="isAdmin"
      >
        <table-item
          :type="'select'"
          :propName="'selectSiemensTested'"
          :item="item.item.selectSiemensTested"
          :_id="item._id"
          :state="['OK', 'Faults', 'Todo']"
          :label="'Tested'"
          v-on:update-item="updateItem"
        >
        </table-item>
      </template>

      <template v-slot:[`item.meta.okBySiemens_at`]="{ item }">
        {{ parseDate(item.meta.okBySiemens_at) }}
      </template>

      <template v-slot:[`item.item.siemensAuditor`]="{ item }" v-if="isAdmin">
        <table-item
          :type="'select'"
          :propName="'siemensAuditor'"
          :item="item.item.siemensAuditor"
          :_id="item._id"
          :state="[
            'Siemens User1',
            'Siemens User2',
            'Siemens User3',
            'Siemens User4',
          ]"
          :label="'Auditor'"
          v-on:update-item="updateItem"
        >
        </table-item>
      </template>

      <template v-slot:[`item.item.siemensComments`]="{ item }" v-if="isAdmin">
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
      <template v-slot:[`item.item.planerComments`]="{ item }" v-if="isAdmin">
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

      <template
        v-slot:[`item.item.selectPlanerTested`]="{ item }"
        v-if="isAdmin"
      >
        <table-item
          :type="'select'"
          :propName="'selectPlanerTested'"
          :item="item.item.selectPlanerTested"
          :_id="item._id"
          :state="['OK', 'Faults', 'Todo']"
          :label="'Tested'"
          v-on:update-item="updateItem"
        >
        </table-item>
      </template>

      <template v-slot:[`item.meta.closed_at`]="{ item }">
        {{ parseDate(item.meta.closed_at) }}
      </template>

      <template v-slot:[`item.item.planer`]="{ item }" v-if="isAdmin">
        <table-item
          :type="'select'"
          :item="item.item.planer"
          :state="[
            'Planer User1',
            'Planer User2',
            'Planer User3',
            'Planer User4',
          ]"
          :label="'Planer'"
        >
        </table-item>
      </template>

      <template v-slot:[`item.item.actions`]="{ item }" v-if="isAdmin">
        <EditItem :edit-item="item" v-on:change-item="updateItem($event)">
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
import moment from "moment";
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
          text: "Date",
          value: "meta.finished_at",
          class: "GECC",
        },

        {
          text: "Comments",
          value: "item.comments",
          class: "GECC",
        },
        {
          text: "Auditor",
          value: "item.siemensAuditor",
          class: "Siemens",
        },
        {
          text: "Tested",
          value: "item.selectSiemensTested",
          class: "Siemens",
        },
        {
          text: "Date",
          value: "meta.okBySiemens_at",
          class: "Siemens",
        },
        {
          text: "Comments",
          value: "item.siemensComments",
          class: "Siemens",
        },
        {
          text: "Planer",
          value: "item.planer",
          class: "Planer",
        },
        {
          text: "Tested",
          value: "item.selectPlanerTested",
          class: "Planer",
        },

        {
          text: "Date",
          value: "meta.closed_at",
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
      this.$store.dispatch("loadPosts");
    },
    async createExcel() {
      this.loadingActive = true;
      await PostService.createExcel();
      this.loadingActive = false;
    },
    async save(item) {
      await PostService.editPost(item).then(() => {
        this.snack = true;
        this.snackColor = "success";
        this.snackText = "Data saved";
      });
      this.$store.dispatch("loadPosts");
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },

    async deleteItem(item) {
      await PostService.deletePost(item._id);
      this.loadingActive = true;
      this.$store.dispatch("loadPosts");
      this.loadingActive = false;
    },
    async updateItem(item) {
      await PostService.editPost(item);
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
      this.$store.dispatch("loadPosts");
    },
    parseDate(date) {
      if (date === undefined || date === null) {
        return "";
      } else {
        let newDate = new Date(date);
        moment.locale("en-en");
        return new moment(newDate).format("LL");
      }
    },
  },
  computed: {
    isAdmin() {
      return this.$store.getters.userRole === "Admin";
    },
    isGECC() {
      return this.$store.getters.userRole === "GECC";
    },
    isSiemens() {
      return this.$store.getters.userRole === "Siemens";
    },
    isPlaner() {
      return this.$store.getters.userRole === "Planer";
    },
    getPosts() {
      return this.$store.getters.getPosts;
    },
  },
  mounted() {
    this.$store.dispatch("loadPosts");
  },
};
</script>

<style>
.v-data-table th[role="columnheader"] {
  white-space: nowrap;
}
</style>
