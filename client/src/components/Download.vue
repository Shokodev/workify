<template>
  <a
    :href="link"
    :download="name + '.png'"
    title="Download as PNG"
    class="Chart__download"
  >
    🖨
  </a>
</template>

<script>
  export default {
    name: 'DownloadButton',
    props: {
      name: {
        type: String,
        default: 'chart'
      },
      link: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
  .Chart__download {
    cursor: pointer;
    border: 1px solid var(--v-info-base);
    border-radius: 5px;
    padding: 5px;
    text-decoration: none;
  }
    .Chart__download:hover {
    border: 1px solid var(--v-accent-base);
  }
</style>
