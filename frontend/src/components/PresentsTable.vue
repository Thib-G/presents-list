<template>
  <b-table :items="presents" :fields="fields" small>
    <template #cell(description)="data">
      <router-link :to="`/present/${data.item.id}`">{{ data.value }}</router-link>
    </template>
    <template #cell(offered_by)="data">
      <Avatar
        v-for="person in data.item.offered_by"
        :key="person.id"
        :person-id="person.id"
        class="mr-1"
      />
    </template>
    <template #cell(delete)="data">
      <span class="text-danger pointer" @click.prevent="deletePresent(data.item.id)">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </span>
    </template>
  </b-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Avatar from '@/components/widgets/AvatarWidget.vue';

export default {
  name: 'PresentsTable',
  data() {
    return {
      fields: [
        {
          key: 'requested_by',
          label: 'Demandé par',
          sortable: true,
          formatter: (value) => value.first_name,
        },
        {
          key: 'description',
          sortable: true,
          label: 'Description du cadeau',
        },
        {
          key: 'offered_by',
          label: 'Offert par',
        },
        {
          key: 'delete',
          label: ' ',
        },
      ],
    };
  },
  computed: {
    ...mapGetters('presents', {
      presents: 'allPresents',
    }),
  },
  methods: {
    ...mapActions('presents', ['deletePresent']),
  },
  components: {
    Avatar,
  },
};
</script>
