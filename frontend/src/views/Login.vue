<template>
  <b-container>
    <h1>Login</h1>
    <b-form @submit.prevent="login">
      <label for="input-user">User name:</label>
      <b-form-input
        id="input-user"
        v-model="form.username"
        placeholder="Enter your user name"
        trim
        required
      />
      <label for="input-password">Password:</label>
      <b-form-input
        id="input-password"
        v-model="form.password"
        placeholder="Enter your password"
        type="password"
        trim
        required
      />
      <b-button type="submit" variant="primary" class="mt-2">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    ...mapActions('auth', ['pairToken']),
    login() {
      this.pairToken(this.form)
        .then(() => this.$router.push('/'));
    },
  },
};
</script>

<style>

</style>
