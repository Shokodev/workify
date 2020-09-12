<template>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on, attrs}">
                    <v-icon
                            v-bind="attrs"
                            v-on="on"
                            small
                            class="mr-2"
                    >mdi-pencil
                    </v-icon>
            </template>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Editing</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text :disabled="!valid" v-on:click="changeItem(post)">Save</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
              <div class="pa-3">
                <v-form ref="form" v-model="valid">
                  <v-card
                  color="GECC"
                  class="pa-3 mx-auto"
                  max-width="800">
                  <v-subheader
                      class="text-h6">GECC</v-subheader>
                  <v-list-item>
                        <v-list-item-content>
                          <v-text-field
                              v-model="post.item.graphic"
                              :rules="graphicRules"
                              label="Graphic Name"
                              required
                          ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                  <v-list-item>
                        <v-list-item-content>
                          <v-select
                              v-model="post.item.selectType"
                              :items="itemsType"
                              :rules="[v => !!v || 'Type is required']"
                              label="Type"
                              required
                          ></v-select>
                        </v-list-item-content>
                    </v-list-item>
                  <v-list-item>
                        <v-list-item-content>
                          <v-text-field
                              v-model="post.item.regulations"
                              label="Regulations"
                              :rules="numberRules"
                              required
                          ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-menu
                          ref="date1"
                          v-model="date1"
                          :close-on-content-click="false"
                          :return-value.sync="post.item.date"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="post.item.date"
                              label="Date"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="post.item.date" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="date1 = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.date1.save(post.item.date)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-list-item-content>
                    </v-list-item>
                  <v-list-item>
                        <v-list-item-content>
                          <v-text-field
                              v-model="post.item.creator"
                              :rules="creatorRules"
                              label="Creator"
                              required
                          ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                  <v-list-item>
                        <v-list-item-content>
                          <v-select
                              v-model="post.item.selectState"
                              :items="itemsState"
                              :rules="[v => !!v || 'Item is required']"
                              label="State"
                              required
                          ></v-select>
                        </v-list-item-content>
                    </v-list-item>
                  <v-list-item>
                        <v-list-item-content>
                          <v-text-field
                              v-model="post.item.comments"
                              label="Comments"
                              required
                          ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
              </v-card>
                </v-form>
              </div>
              <div class="pa-3">
              <v-card
                  color="Siemens"
                  class="mx-auto"
                  max-width="800">
                <v-subheader
                class="text-h6">
                  Siemens Schweiz</v-subheader>
                <v-list-item>
                  <v-list-item-content>
                    <v-menu
                        ref="date2"
                        v-model="date2"
                        :close-on-content-click="false"
                        :return-value.sync="post.item.siemensDate"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="post.item.siemensDate"
                            label="Date"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="post.item.siemensDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="date2 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.date2.save(post.item.siemensDate)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-select
                        v-model="post.item.selectSiemensTested"
                        :items="itemsTested"
                        label="Audit"
                    ></v-select>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-text-field
                        v-model="post.item.siemensAuditor"
                        label="Auditor"
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-text-field
                        v-model="post.item.siemensComments"
                        label="Comments"
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
            </v-card>
              </div>
              <div class="pa-3">
              <v-card
                  color="Planer"
                  class="mx-auto"
                  max-width="800">
                <v-subheader
                    class="text-h6">Planer</v-subheader>
                <v-list-item>
                  <v-list-item-content>
                    <v-menu
                        ref="date3"
                        v-model="date3"
                        :close-on-content-click="false"
                        :return-value.sync="post.item.planerDate"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="post.item.planerDate"
                            label="Date"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="post.item.planerDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="date3 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.date3.save(post.item.planerDate)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-select
                        v-model="post.item.selectPlanerTested"
                        :items="itemsTested"
                        label="Audit"
                    ></v-select>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-text-field
                        v-model="post.item.planer"
                        label="Planer"
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-text-field
                        v-model="post.item.planerComments"
                        label="Comments"
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
              </div>
            </v-card>
        </v-dialog>
</template>

<script>
    export default {
        name: "EditItem",
        props: {
            editItem: Object,
        },
        data() {
            return {
                post: this.editItem,
                graphicRules: [
                    v => !!v || 'Name is required',
                ],
                numberRules: [
                  v => Number.isInteger(Number(v)) || 'The input has to be a number',
                ],
                creatorRules: [
                    v => !!v || 'Name is required',
                ],
                itemsType: [
                    'Plant graphic',
                    'Floor plan',
                    'Navigation graphic',
                ],
                itemsState: [
                    'Not Started',
                    'In Progress',
                    'Finished',
                    'Issues',
                ],
                itemsTested:[
                  'Correct',
                    'Wrong',
                    'Faults',
              ],
                valid: true,
                date1: false,
                date2: false,
                date3: false,
                dialog: false,
            }

        },

      methods:{
          changeItem(post){
            this.$emit('change-item', post);
            this.dialog = false;
            //this.$nextTick(() => this.$refs.form.reset())
          },
      },
    }
</script>

<style scoped>

</style>
