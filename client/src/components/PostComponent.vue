<template>
  <div class="container">
    <p class="error" v-if="error">{{error}}</p>
    <h1>Graphics Management BB12</h1>
    <hr>


    <v-data-table
      :headers="headers"
      :items="posts"
      item-key="posts._id"

    >
    </v-data-table>
  </div>

</template>

<script>
import PostService from "../PostService";

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: '',
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
          text: 'Edit', value: 'item.edit'
        },
      ]
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (e) {
      this.error = e.message;
    }
  },
  methods:{
  async deletePost(id) {
    await PostService.deletePost(id);
    this.posts = await PostService.getPosts()
  },
  },
}

// {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.container { max-width: 1400px; margin: 0 auto; }

  p.error { border: 1px solid #ff5b5f; background-color: #ffc5c1; padding: 10px; margin-bottom: 15px; }

  div.post { position: relative; border: 1px solid #5bd658; background-color: 3bcffb8; padding: 10px 10px 30px 10px; margin-bottom: 15px; }

  div.created-at { position: absolute; top: 0; left: 0; padding: 5px 15px 5px 15px; background-color: darkgreen; }

  p.text { font-size: 22px; font-weight: 700; margin-bottom: 0; }
</style>
