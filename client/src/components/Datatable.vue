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
            height="600"
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


        <template v-slot:item.item.graphic= "{ item }">
            <v-edit-dialog
                    :return-value.sync="item.item.graphic"
                    large
                    @save="save(item)"
                    @cancel="cancel"
            >
                {{ item.item.graphic }}
                <template v-slot:input>
                    <v-text-field
                            v-model="item.item.graphic"
                            label="Graphic"
                            single-line
                    ></v-text-field>
                </template>
            </v-edit-dialog>
        </template>
        <template v-slot:item.item.selectType= "{ item }">
            <v-edit-dialog
                    :return-value.sync="item.item.selectType"
                    large
                    @save="save(item)"
                    @cancel="cancel"
            >
                {{ item.item.selectType }}
                <template v-slot:input>
                    <v-select
                            v-model="item.item.selectType"
                            :items="['Floor plan', 'Navigation graphic', 'Plant graphic']"
                            label="Type"
                            required
                    ></v-select>
                </template>
            </v-edit-dialog>
        </template>
        <template v-slot:item.item.regulations= "{ item }">
            <v-edit-dialog
                    :return-value.sync="item.item.regulations"
                    large
                    @save="save(item)"
                    @cancel="cancel"
            >
                {{ item.item.regulations }}
                <template v-slot:input>
                    <v-select
                            v-model="item.item.regulations"
                            :items="[0, 1, 2,3,4, 5]"
                            label="Regulations"
                            required
                    ></v-select>
                </template>
            </v-edit-dialog>
        </template>
        <template v-slot:item.item.selectState= "{ item }">
            <v-edit-dialog
                    :return-value.sync="item.item.selectState"
                    large
                    @save="save(item)"
                    @cancel="cancel"
            >
                {{ item.item.selectState }}
                <template v-slot:input>
                    <v-select
                            v-model="item.item.selectState"
                            :items="['Not started', 'In progress', 'Finished','Issues']"
                            label="State"
                            required
                    ></v-select>
                </template>
            </v-edit-dialog>
        </template>
        <template v-slot:item.item.creator= "{ item }">
            <v-edit-dialog
                    :return-value.sync="item.item.creator"
                    large
                    @save="save(item)"
                    @cancel="cancel"
            >
                {{ item.item.creator }}
                <template v-slot:input>
                    <v-select
                            v-model="item.item.creator"
                            :items="['GECC 1', 'GECC 2', 'GECC 3','GECC 4']"
                            label="Creator"
                            required
                    ></v-select>
                </template>
            </v-edit-dialog>
        </template>



      <template v-slot:item.item.comments = "{ item }">
<!--          <v-edit-dialog
                  :return-value.sync="item.item.comments"
                  @save="save(item)"
                  @cancel="cancel"
          >
              {{ item.item.comments }}
              <template v-slot:input>
                  <v-textarea
                          solo
                          name="input-7-4"
                          label="Comments"
                          v-model="item.item.comments"
                  ></v-textarea>
              </template>
          </v-edit-dialog>-->


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

      <v-snackbar
              v-model="snack"
              :timeout="3000"
              :color="snackColor"
      >
          {{ snackText }}

          <template v-slot:action="{ attrs }">
              <v-btn
                      v-bind="attrs"
                      text
                      @click="snack = false"
              >
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
                ],
                snack: false,
                snackColor: '',
                snackText: '',
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
            async save(item) {
                await PostService.editPost(item).then(()=> {
                    this.snack = true;
                    this.snackColor = 'success';
                    this.snackText = 'Data saved';
                })
            },
            cancel () {
                this.snack = true;
                this.snackColor = 'error';
                this.snackText = 'Canceled'
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
