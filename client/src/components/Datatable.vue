<template>
    <v-data-table
            :headers="headers"
            :items="posts"
            item-key="posts._id"
            dense
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
            <v-toolbar-title>Graphics</v-toolbar-title>
            <v-divider
            class="mx-4"
            vertical
            inset></v-divider>
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
        <template v-slot:item.item.actions = "{item}">
            <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
            >mdi-pencil
            </v-icon>
            <v-icon
                    small
                    @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
    import PostService from "../PostService";
    import AddItem from "./AddItem";
    export default {
        name: "Datatable",
        components: {
            AddItem,
        },


        props: {
            posts: {
                type: Array,
            }
        },
        data() {
            return {
                headers: [
                    {
                        text: 'Graphic', value: 'item.graphic',
                        align: 'start'
                    },
                    {text: 'Type', value: 'item.selectType'},
                    {
                        text: 'Regulations', value: 'item.regulations'
                    },
                    {
                        text: 'Date', value: 'item.date'
                    },
                    {
                        text: 'Editor', value: 'item.editor'
                    },
                    {
                        text: 'State', value: 'item.selectState'
                    },
                    {
                        text: 'Comments', value: 'item.comments'
                    },
                    {
                        text: 'Date', value: 'item.dateSiemens'
                    },
                    {
                        text: 'Tested', value: 'item.testedSiemens'
                    },
                    {
                        text: 'Editor', value: 'item.editorSiemens'
                    },
                    {
                        text: 'Comments', value: 'item.commentsSiemens'
                    },
                    {
                        text: 'Date', value: 'item.datePlanner'
                    },
                    {
                        text: 'Tested', value: 'item.testedPlanner'
                    },
                    {
                        text: 'Editor', value: 'item.editorPlanner'
                    },
                    {
                        text: 'Comments', value: 'item.commentsPlanner'
                    },
                    {
                        text: 'Actions', value: 'item.actions'
                    },
                ]
            }
        },
        methods: {
            async createPost(item) {
                await PostService.insertPost(item);
                console.log('send new item', item)
                //this.posts = await PostService.getPosts()
            },
            async createExcel() {
                await PostService.createExcel();
                //this.posts = await PostService.getPosts()
            },
            editItem(item){
                console.log(item)
            },

            async deleteItem(item){
                console.log(item._id)
                await PostService.deletePost(item._id);
                this.posts = await PostService.getPosts()
            },
        }
    }
</script>

<style scoped>

</style>