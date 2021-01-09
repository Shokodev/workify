<template>
        <v-dialog 
          v-model="dialog"
          max-width="600px"
          persistent  
        >
            <template v-slot:activator="{ on, attrs}">
                <v-btn
                        class="mx-2"
                        dark
                        color="info"
                        v-bind="attrs"
                        v-on="on"
                >
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>
            </template>
              
                  <v-card class="pa-2">
                  <v-card-title>
                  New graphic
                  </v-card-title>
                  <v-form ref="form" v-model="valid">
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
                          <v-text-field
                              v-model="newItem.creator"
                              label="Creator"
                              required
                              disabled
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
                    <v-crad-actions>
                  <v-btn 
                  class="error ma-2"
                  @click="dialog = false">
                  Cancle
                  </v-btn>
                  <v-btn 
                  class="green lighten-1 ma-2"
                  text
                  :disabled="!valid" 
                  v-on:click="saveItem(newItem)"
                  >Save </v-btn>
              </v-crad-actions>
              </v-form>
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
                creator: null,
                comments: null,
            },

                graphicRules: [
                    v => !!v || 'Name is required',
                ],
                numberRules: [
                  v => Number.isInteger(Number(v)) || 'The input has to be a number',
                ],
                itemsType: [
                    'Plant graphic',
                    'Floor plan',
                    'Navigation graphic',
                ],
                itemsState: [
                    'Not started',
                    'In progress',
                    'Finished',
                    'Issues',
                ],
                itemsTested:[
                    'OK',
                    'Faults',
              ],
                valid: true,
                dialog: false,
            }
        },
        mounted(){
          this.newItem.creator = this.$store.getters.user.nickname;
        },
        methods:{
              saveItem(newItem){
              this.$emit('add-item', newItem);
              this.dialog = false;
              this.$nextTick(() => this.$refs.form.reset())

        },

      },
    }
</script>

<style scoped>

</style>
