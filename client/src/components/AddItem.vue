<template>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on, attrs}">
                <v-btn
                        class="mx-2"
                        fab dark color="indigo"
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
                        <v-btn dark text v-on:click="$emit('add-item', newItem)">Save</v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-list three-line subheader>
                    <v-subheader>Sofia</v-subheader>
                    <v-list-item>
                        <v-list-item-content>
                          <v-text-field
                              v-model="newItem.graphic"
                              :counter="10"
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
                              required
                          ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="newItem.date"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="newItem.date"
                              label="Picker in menu"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="newItem.date" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu.save(newItem.date)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-list-item-content>
                    </v-list-item>
                  <v-list-item>
                        <v-list-item-content>
                          <v-text-field
                              v-model="newItem.editor"
                              :rules="editorRules"
                              label="Editor"
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
                </v-list>
            </v-card>
        </v-dialog>
</template>

<script>
    export default {
        name: "AddItem",
        data() {
            return {

            newItem: {

                graphic: '',
                selectType: null,
                selectState: null,

                regulations: "",
                date: new Date().toISOString().substr(0, 10),
                editor: null,
                comments: null,
            },
                graphicRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                ],
                editorRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length >= 10) || 'Name must be more than 10 characters',
                ],
                itemsType: [
                    'Anlagenbild',
                    'Grundrissbild',
                    'Navigationsbild',
                ],
                itemsState: [
                    'No Start',
                    'In Progress',
                    'Finish',
                    'Issus',
                ],
              valid: true,
              menu: false,
              dialog: false,
            }
        },
    }
</script>

<style scoped>

</style>