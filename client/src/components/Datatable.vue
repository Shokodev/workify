<template>
  <div>
  <v-overlay
  :value="loadingActive"
  >
    <v-progress-circular
    size="128"
    indeterminate
    >

    </v-progress-circular>
  </v-overlay>
    <v-data-table
            height="800"
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
                <v-btn
                        class="mx-2"
                        dark
                        color="indigo"
                        v-on:click="createExcel"
                >
                    <v-icon dark>mdi-table</v-icon>
                </v-btn>
            <AddItem
                    v-on:add-item="createPost($event)"
            ></AddItem>
            </v-toolbar>
        </template>
      <template v-slot:item.item.comments = "{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs }">
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
          <span>{{item.item.comments }}</span>
        </v-tooltip>
      </template>
      <template v-slot:item.item.siemensComments = "{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs }">
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
          <span>{{item.item.siemensComments }}</span>
        </v-tooltip>
      </template>
      <template v-slot:item.item.planerComments = "{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{on, attrs }">
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
          <span>{{item.item.planerComments }}</span>
        </v-tooltip>
      </template>

        <template v-slot:item.item.actions = "{ item }">
            <EditItem
                :edit-item="item"
                v-on:change-item="editItem($event)"
            >
            </EditItem>
            <v-icon
                    small
                    @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
  </div>
</template>

<script>
    import PostService from "@/PostService";
    import AddItem from "./AddItem";
    import EditItem from "./EditItem";
    export default {
        name: "Datatable",
        components: {
            AddItem,
            EditItem
        },
        props: {
            posts: {
                type: Array[Object],
            }
        },
        data() {
            return {
                search: '',
                loadingActive: false,
                headers: [
                    {
                        text: 'Graphic', value: 'item.graphic',
                        align: 'start', class:'GECC',
                    },
                    {text: 'Type', value: 'item.selectType', class: 'GECC'
                    },
                    {
                        text: 'Regulations', value: 'item.regulations', class:'GECC'
                    },
                    {
                        text: 'Date', value: 'item.date', class:'GECC'
                    },
                    {
                        text: 'Creator', value: 'item.creator', class:'GECC'
                    },
                    {
                        text: 'State', value: 'item.selectState', class:'GECC'
                    },
                    {
                        text: 'Comments', value: 'item.comments', class:'GECC'
                    },
                    {
                        text: 'Date', value: 'item.siemensDate', class:'Siemens'
                    },
                    {
                        text: 'Tested', value: 'item.selectSiemensTested', class:'Siemens'
                    },
                    {
                        text: 'Auditor', value: 'item.siemensAuditor', class:'Siemens'
                    },
                    {
                        text: 'Comments', value: 'item.siemensComments', class:'Siemens'
                    },
                    {
                        text: 'Date', value: 'item.planerDate', class: 'Planer'
                    },
                    {
                        text: 'Tested', value: 'item.selectPlanerTested', class: 'Planer'
                    },
                    {
                        text: 'Planer', value: 'item.planer', class: 'Planer'
                    },
                    {
                        text: 'Comments', value: 'item.planerComments', class: 'Planer'
                    },
                    {
                        text: 'Actions', value: 'item.actions', class: 'accent'
                    },
                ]
            }
        },
        methods: {
            async createPost(item) {
                await PostService.insertPost(item);
                console.log('send new item', item)
                this.posts = await PostService.getPosts();
            },
            async createExcel() {
              this.loadingActive = true;
              await PostService.createExcel();
              this.loadingActive = false;
            },
            async editItem(item){
                await PostService.editPost(item);
            },
            async deleteItem(item){
                await PostService.deletePost(item._id);
                this.loadingActive = true;
                this.posts = await PostService.getPosts();
                this.loadingActive = false;
            },
        }
    }
</script>

<style>
    .v-data-table th[role="columnheader"] {
        white-space: nowrap;
    }

</style>
