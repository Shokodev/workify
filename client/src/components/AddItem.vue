<template>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on, attrs}">
                <v-btn
                        class="mx-2"
                        dark
                        color="indigo"
                        v-bind="attrs"
                        v-on="on"
                >
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Editing</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text v-on:click="$emit('add-item', newItem), dialog = false">Save</v-btn>
                    </v-toolbar-items>
                </v-toolbar>

              <div class="pa-3">
              <v-card
                  color="GECC"
                  class="pa-3 mx-auto"
                  max-width="800">
                  <v-subheader
                      class="text-h6">GECC</v-subheader>
                  <v-list-item>
                        <v-list-item-content>
                          <v-text-field
                              v-model="newItem.graphic"
                              :rules="graphicRules"
                              label="Graphic Name"
                              required
                          ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                  <v-list-item>
                        <v-list-item-content>
                          <v-select
                              v-model="newItem.selectType"
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
                              v-model="newItem.regulations"
                              label="Regulations"
                              :rules="numberRules"
                              required
                          ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-menu
                          ref="menu"
                          v-model="date1"
                          :close-on-content-click="false"
                          :return-value.sync="newItem.date"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="newItem.date"
                              label="Date"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="newItem.date" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="date1 = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.date1.save(newItem.date)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-list-item-content>
                    </v-list-item>
                  <v-list-item>
                        <v-list-item-content>
                          <v-text-field
                              v-model="newItem.creator"
                              :rules="creatorRules"
                              label="Creator"
                              required
                          ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                  <v-list-item>
                        <v-list-item-content>
                          <v-select
                              v-model="newItem.selectState"
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
                              v-model="newItem.comments"
                              label="Comments"
                              required
                          ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
              </v-card>
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
                        ref="menu"
                        v-model="date2"
                        :close-on-content-click="false"
                        :return-value.sync="newItem.siemensDate"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="newItem.siemensDate"
                            label="Date"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="newItem.siemensDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="date2 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.date2.save(newItem.siemensDate)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-select
                        v-model="newItem.selectSiemensTested"
                        :items="itemsTested"
                        label="Audit"
                    ></v-select>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-text-field
                        v-model="newItem.siemensAuditor"
                        label="Auditor"
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-text-field
                        v-model="newItem.siemensComments"
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
                        ref="menu"
                        v-model="date3"
                        :close-on-content-click="false"
                        :return-value.sync="newItem.planerDate"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="newItem.planerDate"
                            label="Date"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="newItem.planerDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="date3 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.date3.save(newItem.planerDate)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-select
                        v-model="newItem.selectPlanerTested"
                        :items="itemsTested"
                        label="Audit"
                    ></v-select>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-text-field
                        v-model="newItem.planer"
                        label="Planer"
                    ></v-text-field>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-text-field
                        v-model="newItem.planerComments"
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
        name: "AddItem",
        props: {
            post: {
                type: Object,
            }
        },
        data() {
            return {

            newItem: {

                graphic: '',
                selectType: null,
                selectState: null,
                regulations: "",
                date: new Date().toISOString().substr(0, 10),
                creator: null,
                comments: null,
                siemensDate: null,
                selectSiemensTested: null,
                siemensAuditor: null,
                siemensComments: null,
                planerDate: null,
                selectPlanerTested: null,
                planer: null,
                planerComments: null,

            },
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
                    'No Start',
                    'In Progress',
                    'Finish',
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
    }
</script>

<style scoped>

</style>
