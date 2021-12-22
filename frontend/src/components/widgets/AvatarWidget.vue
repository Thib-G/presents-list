<template>
  <b-avatar
    :variant="variant"
    :text="initials"
    v-b-tooltip.hover
    :title="title"
    class="pointer"
  />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    variant: {
      type: String,
      default: 'secondary',
    },
    personId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters('presents', ['personById', 'isOfferedHidden']),
    person() {
      return this.personById(this.personId);
    },
    initials() {
      if (this.isOfferedHidden) {
        return null;
      }
      const initials = `${this.person.first_name.slice(0, 1)}${this.person.last_name.slice(0, 1)}`;
      return initials.toUpperCase();
    },
    title() {
      if (this.isOfferedHidden) {
        return 'Secret';
      }
      return `${this.person.first_name} ${this.person.last_name}`;
    },
  },
};
</script>
