<template>
  <div>
    <v-overlay :value="loadingActive">
      <v-progress-circular size="128" indeterminate> </v-progress-circular>
    </v-overlay>
    <v-data-table
      class="mx-10 pa-2 table"
      v-if="getPosts"
      :headers="headers"
      :items="getPosts"
      item-key="_id"
      :search="search"
      fixed-header
      dense
    >
      <template v-slot:top>
        <v-toolbar flat class="toolbar">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            clearable
            style="max-width: 450px"
            outlined
            rounded
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn class="mx-2" dark color="info" v-on:click="createExcel">
            <v-icon dark>mdi-table</v-icon>
          </v-btn>
          <v-btn
            class="mx-2"
            dark
            color="info"
            @click="addItemDialog = true"
            v-if="$store.getters.isAuthenticated"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
          <v-dialog
            v-model="addItemDialog"
            v-if="addItemDialog"
            max-width="600px"
            persistent
          >
            <AddItem
              @closeAddItem="addItemDialog = false"
              v-on:add-item="createPost($event)"
            >
            </AddItem>
          </v-dialog>
        </v-toolbar>
        <v-divider class="mt-5"></v-divider>
      </template>

      <template v-slot:header>
        <thead class="table-header">
          <tr>
            <th
              colspan="8"
              class="text-center parent-header text-uppercase subtitle-1 font-weight-medium"
            >
              <v-divider class=" divider-left" vertical></v-divider>
              GECC
              <v-divider class=" divider-right" vertical></v-divider>
            </th>

            <th
              colspan="4"
              class="text-center parent-header  text-uppercase subtitle-1 font-weight-medium"
            >
              Siemens Schweiz
              <v-divider class="divider-right" vertical></v-divider>
            </th>
            <th
              colspan="4"
              class="text-center parent-header  text-uppercase subtitle-1 font-weight-medium"
            >
              Planer
              <v-divider class=" divider-right" vertical></v-divider>
            </th>
            <th
              v-if="isAdmin"
              colspan="1"
              class="text-center parent-header  text-uppercase subtitle-1 font-weight-medium"
            >
              Actions
              <v-divider class=" divider-right" vertical></v-divider>
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:[`item.item.graphic`]="{ item }" v-if="isGECC">
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

      <template v-slot:[`item.item.selectType`]="{ item }" v-if="isGECC">
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

      <template v-slot:[`item.item.regulations`]="{ item }" v-if="isGECC">
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

      <template v-slot:[`item.item.iterations`]="{ item }" v-if="isGECC">
        {{item.item.iterations}}
        <v-tooltip top color="secondary" >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              small
              icon
              @click="()=>{
                item.item.iterations = item.item.iterations+=1;
                updateItem(item)
              }"
            >
              mdi-plus
            </v-icon>
            <v-icon
              class="mx-1"
              v-bind="attrs"
              v-on="on"
              small
              icon
              @click="()=>{
                if(item.item.iterations !== 0){
                item.item.iterations = item.item.iterations-=1;
                updateItem(item)
                }
              }"
            >
              mdi-minus
            </v-icon>
          </template>
          <span>Iterations</span>
        </v-tooltip>
      </template>

      <template v-slot:[`item.item.selectState`]="{ item }" v-if="isGECC">
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

      <template v-slot:[`item.item.comments`]="{ item }" v-if="isGECC">
        <CommentDialog
          :item="item"
          :propName="'comments'"
          @update-item="updateItem($event)"
          :label="'GECC Comments'"
        />
      </template>

      <template
        v-slot:[`item.item.selectSiemensTested`]="{ item }"
        v-if="isSiemens"
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

      <template v-slot:[`item.item.siemensAuditor`]="{ item }" v-if="isSiemens">
        <v-tooltip top color="secondary" v-if="!item.item.siemensAuditor">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              small
              icon
              @click="updateAuditor(item, 'siemensAuditor')"
            >
              mdi-plus
            </v-icon>
          </template>
          <span>start auditing</span>
        </v-tooltip>
        <p
          style="margin-top: 7px; margin-bottom:5px;"
          v-if="item.item.siemensAuditor"
        >
          {{ item.item.siemensAuditor }}
        </p>
      </template>

      <template
        v-slot:[`item.item.siemensComments`]="{ item }"
        v-if="isSiemens"
      >
        <CommentDialog
          :item="item"
          :propName="'siemensComments'"
          @update-item="updateItem($event)"
          :label="'Siemens Comments'"
        />
      </template>
      <template v-slot:[`item.item.planerComments`]="{ item }" v-if="isPlaner">
        <CommentDialog
          :item="item"
          :propName="'planerComments'"
          @update-item="updateItem($event)"
          :label="'Planer Comments'"
        />
      </template>

      <template
        v-slot:[`item.item.selectPlanerTested`]="{ item }"
        v-if="isPlaner"
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

      <template v-slot:[`item.item.planer`]="{ item }" v-if="isPlaner">
        <v-tooltip top color="secondary" v-if="!item.item.planer">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              small
              icon
              @click="updateAuditor(item, 'planer')"
            >
              mdi-plus
            </v-icon>
          </template>
          <span>Add me as auditor</span>
        </v-tooltip>
        <p style="margin-top: 7px; margin-bottom:5px;" v-if="item.item.planer">
          {{ item.item.planer }}
        </p>
      </template>

      <template v-slot:[`item.item.actions`]="{ item }" v-if="isAdmin">
        <EditItem v-if="false" :edit-item="item" v-on:change-item="updateItem($event)">
        </EditItem>
        <v-icon small @click="setToDeleteItem(item)">
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
    <AreYouSureAlert
      v-if="areYouSureAlert"
      :showDialog="areYouSureAlert"
      @confirm="deleteItem($event)"
    />
  </div>
</template>

<script>
import moment from "moment";
import PostService from "@/PostService";
import AreYouSureAlert from "@/components/AreYouSureAlert";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import TableItem from "./table/TableItem";
import CommentDialog from "@/components/table/CommentDialog";

export default {
  name: "Datatable",
  components: {
    AddItem,
    EditItem,
    TableItem,
    AreYouSureAlert,
    CommentDialog
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
      areYouSureAlert: false,
      toDeleteItem: null,
      addItemDialog: false,
      headers: [
        {
          text: "Graphic",
          value: "item.graphic",
          align: "start",
        },
        { text: "Type", value: "item.selectType" },
        {
          text: "Regulations",
          value: "item.regulations",
        },
        {
          text: "Iterations",
          value: "item.iterations",
        },
        {
          text: "Creator",
          value: "item.creator",
        },
        {
          text: "State",
          value: "item.selectState",
        },
        {
          text: "Date",
          value: "meta.finished_at",
        },

        {
          text: "Comments",
          value: "item.comments",
        },
        {
          text: "Auditor",
          value: "item.siemensAuditor",
        },
        {
          text: "Tested",
          value: "item.selectSiemensTested",
        },
        {
          text: "Date",
          value: "meta.okBySiemens_at",
        },
        {
          text: "Comments",
          value: "item.siemensComments",
        },
        {
          text: "Planer",
          value: "item.planer",
        },
        {
          text: "Tested",
          value: "item.selectPlanerTested",
        },

        {
          text: "Date",
          value: "meta.closed_at",
        },
        {
          text: "Comments",
          value: "item.planerComments",
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
    setToDeleteItem(item) {
      this.toDeleteItem = item;
      this.areYouSureAlert = true;
    },
    async deleteItem(confirm) {
      if (confirm) {
        await PostService.deletePost(this.toDeleteItem._id);
        this.loadingActive = true;
        this.$store.dispatch("loadPosts");
        this.loadingActive = false;
      }
      this.toDeleteItem = null;
      this.areYouSureAlert = false;
    },
    async updateItem(item) {
      await PostService.editPost(item);
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
      this.$store.dispatch("loadPosts");
    },
    updateAuditor(item, propName) {
      this.updateItem({
        item: {
          [propName]: this.$store.getters.user.nickname,
        },
        _id: item._id,
      });
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
      return (
        this.$store.getters.userRole === "GECC" ||
        this.$store.getters.userRole === "Admin"
      );
    },
    isSiemens() {
      return (
        this.$store.getters.userRole === "Siemens" ||
        this.$store.getters.userRole === "Admin"
      );
    },
    isPlaner() {
      return (
        this.$store.getters.userRole === "Planer" ||
        this.$store.getters.userRole === "Admin"
      );
    },
    getPosts() {
      return this.$store.getters.getPosts;
    },
  },
  mounted() {
    this.$store.dispatch("loadPosts");
    if(this.isAdmin){
      this.headers.push({
          text: "Actions",
          value: "item.actions",
        })
    }
  },
};
</script>

<style>
.v-data-table th[role="columnheader"] {
  white-space: nowrap;
  background-color: var(--v-background-lighten1) !important;
}
.td p {
  margin-bottom: 0;
}
.table {
  margin-top: 80px;
  background-color: var(--v-background-lighten1) !important;
  border-radius: 10px;
  box-shadow: 0 15px 30px 0 rgba(33, 33, 33, 0.11),
    0 5px 15px 0 rgba(17, 27, 39, 0.08);
}
.toolbar {
  background-color: var(--v-background-lighten1) !important;
}

.divider-right {
  float: right;
}
.divider-left {
  float: left;
}
.table-header th {
  background-color: var(--v-background-lighten1) !important;
  padding: 0 !important;
  color: gray;
}
</style>
