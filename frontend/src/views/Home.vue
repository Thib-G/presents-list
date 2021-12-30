<template>
  <b-container>
    <h1>Cadeaux de Noël 2021</h1>
    <h2>Cadeaux</h2>
    <p>
      <b-form-checkbox v-model="isOfferedHiddenLocal">
        Masquer les noms.
      </b-form-checkbox>
    </p>
    <p>
      <b-button variant="primary" to="/present/new">
        <i class="fa fa-gift" aria-hidden="true"></i>
        Nouveau cadeau
      </b-button>
    </p>
    <PresentsTable />
  </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import PresentsTable from '@/components/PresentsTable.vue';

export default {
  name: 'Home',
  created() {
    this.getAllPersons();
    this.getAllPresents();
  },
  computed: {
    ...mapState('presents', ['isOfferedHidden']),
    isOfferedHiddenLocal: {
      get() {
        return this.isOfferedHidden;
      },
      set(newVal) {
        this.setOfferedHidden(newVal);
      },
    },
  },
  methods: {
    ...mapActions('presents', ['getAllPersons', 'getAllPresents', 'setOfferedHidden']),
  },
  components: {
    PresentsTable,
  },
};
</script>
