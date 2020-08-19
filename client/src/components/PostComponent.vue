<template>
  <div class="container">
    <h1>Graphics Management BB12</h1>
    <div class="create-post">
      <label for="create-post">Say Something...</label>
      <input type="text" id="create-post" v-model="text" placeholder="Create a post">
      <button v-on:click.prevent="createPost">Post!</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{error}}</p>

    <v-data-table
      :headers="headers"
      :items="posts"
      item-key="text"
    ></v-data-table>
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
          text: 'Graphic', value: 'graphic',
          align: 'start'
        },
        {text: 'Type', value: 'type'},
        {
          text: 'Regulations', value: 'regulations'
        },
        {
          text: 'Date', value: 'date'
        },
        {
          text: 'Editor', value: 'editor'
        },
        {
          text: 'State', value: 'state'
        },
        {
          text: 'Comments', value: 'comments'
        },
        {
          text: 'Date', value: 'dateSiemens'
        },
        {
          text: 'Tested', value: 'testedSiemens'
        },
        {
          text: 'Editor', value: 'editorSiemens'
        },
        {
          text: 'Comments', value: 'commentsSiemens'
        },
        {
          text: 'Date', value: 'datePlanner'
        },
        {
          text: 'Tested', value: 'testedPlanner'
        },
        {
          text: 'Editor', value: 'editorPlanner'
        },
        {
          text: 'Comments', value: 'commentsPlanner'
        },
        {
          text: 'Edit', value: 'edit'
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
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts()
    },

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
