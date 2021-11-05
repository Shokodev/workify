<template>
        <v-card 
                  class="pa-2"
                  >
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
                          <v-select
                              v-model="newItem.regulations"
                              label="Regulations"
                              :items="[0,1,2,3,4,5]"
                              :rules="numberRules"
                              required
                          ></v-select>
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
                    <v-card-actions>
                  <v-btn 
                  class="error ma-2"
                  @click="close">
                  Cancel
                  </v-btn>
                  <v-btn 
                  class="green lighten-1 ma-2"
                  text
                  :disabled="!valid" 
                  v-on:click="saveItem(newItem)"
                  >Save </v-btn>
              </v-card-actions>
              </v-form>
        </v-card>
</template>

<script>
    export default {
        name: "AddItem",
        props: {
            post: {
                type: Object,
            },
        },
        data() {
            return {
            newItem: {
                graphic: '',
                selectType: null,
                selectState: "Not started",
                regulations: 0,
                iterations: 0,
                creator: null,
                comments: "",
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
              
            }
        },
        created(){
          this.newItem.creator = this.$store.getters.user.nickname;
        },
        methods:{
              saveItem(newItem){
              this.$emit('add-item', newItem);
              this.$refs.form.reset();
              this.close();      
        },
        close(){
          this.$emit('closeAddItem');
        }

      },
    }
</script>

<style scoped>

</style>
