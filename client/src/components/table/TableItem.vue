<template>
<div v-if="item">
  <v-edit-dialog
    :return-value.sync="item"
    large
    @save="save(item)"
    @cancel="cancel"
  >
    {{ item }}
    <template v-slot:input>
      <div v-if="type ==='select'">
            <v-select
                v-model="item"
                :items="state"
                label="label"
                required
            ></v-select>
      </div>
      <div v-if="type==='text'">
        <v-text-field
        v-model="item"
        label="Graphic"
        single-line
        ></v-text-field>
        </div>
    </template>
  </v-edit-dialog>
  </div>
</template>

<script>
    import PostService from "@/PostService";
    export default {
        props:{
            item: null,
            state: Array,
            label: String,
            type: null,
        },
        data() {
            return {

            }
            
        },
                methods: {
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
       },
    };
</script>

<style></style>
