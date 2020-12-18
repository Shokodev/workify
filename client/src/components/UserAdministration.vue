<template>
  <div>
    <div v-for="user in users" :key="user.nickname">
      {{ user.username }}
      {{ user.nickname }}
      {{ user.createdAt }}
      {{ user.role }}
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
export default {
  data() {
    return {
      users: null,
    };
  },
  methods: {
  },
  async mounted() {
      this.users = await PostService.getUsers();
      console.log(this.users);
  }
};
</script>

<style></style>
