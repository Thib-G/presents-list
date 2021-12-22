<template>
  <div id="app">
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('presents/getAllPersons');
  },
};
</script>

<style>
  .pointer {
    cursor: pointer;
  }
</style>
