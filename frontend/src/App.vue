<template>
  <div id="app">
    <b-container>
      <router-view />
      <p v-if="isLoggedIn"><a href @click.prevent="logout">Logout</a></p>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
  },
};
</script>

<style>
  .pointer {
    cursor: pointer;
  }
</style>
