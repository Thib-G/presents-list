<template>
  <b-table :items="persons" :fields="fields" />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PersonsTable',
  data() {
    return {
      fields: [
        {
          key: 'first_name',
          label: 'Prénom',
        },
        {
          key: 'last_name',
          label: 'Nom',
        },
        {
          key: 'birthday',
          label: 'Date de naissance',
        },
      ],
    };
  },
  computed: {
    ...mapGetters('presents', {
      persons: 'allPersons',
    }),
  },
};
</script>
