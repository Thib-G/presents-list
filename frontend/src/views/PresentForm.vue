<template>
  <div>
    <h1>Ajouter ou modifier un cadeau</h1>
    <p v-if="isNew">Nouveau cadeau</p>
    <p v-else>Cadeau numéro {{ id }}:</p>
    <p>
      <b>
        <span v-if="requested_by">{{ requested_by.first_name }}</span>
        <span v-else>?</span>
      </b>
      demande
      <b>
        <span v-if="form.description">{{ form.description }}</span>
        <span v-else>?</span>
      </b>
      offert par
      <b>
        <span v-if="form.offered_by.length > 0">
          {{ offered_by.map((p) => p.first_name).join(', ') }}
        </span>
        <span v-else>personne</span>
      </b>
    </p>
    <b-form @submit.prevent="updatePresent">
      <b-row>
        <b-col>
          <b-form-group
            id="input-group-description"
            label="Description"
            label-for="input-description"
            description="Décrivez votre cadeau"
          >
            <b-form-input
              id="input-description"
              v-model="form.description"
              type="text"
              placeholder="Description du cadeau"
              required
            >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
            id="input-group-requested_by"
            label="Demandé par"
            label-for="input-requested_by"
            description="Qui demande le cadeau?"
          >
            <b-form-select
              id="input-requested_by"
              v-model="form.requested_by"
              :options="options"
              placeholder="Choisissez une personne"
              required
            >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-offered"
            label="Offert par"
            label-for="input-offered_by"
            description="Qui offre le cadeau?"
          >
            <b-form-select
              id="input-offered_by"
              v-model="form.offered_by"
              :options="options"
              placeholder="Choisissez une ou plusieurs personnes (CTRL+clic)"
              multiple
            >
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button type="submit" variant="primary">
            <span v-if="isNew">Créer</span>
            <span v-else>Modifier</span>
          </b-button>
          <b-button to="/" variant="outline-secondary" class="ml-2">Retour</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        id: null,
        description: null,
        requested_by: null,
        offered_by: [],
      },
    };
  },
  created() {
    if (!this.isNew) {
      this.getPresent(this.id);
    }
    if (this.persons.length === 0) {
      this.getAllPersons();
    }
  },
  watch: {
    present(newVal) {
      this.form = { ...newVal };
      if (this.isNew && this.form.id) {
        this.$router.push(`/present/${this.form.id}`);
      }
    },
  },
  computed: {
    ...mapState({
      present: (state) => state.presents.currentPresent,
    }),
    ...mapGetters('presents', ({
      persons: 'allPersons',
    })),
    isNew() {
      return this.$route.params.id === 'new';
    },
    id() {
      const id = +this.$route.params.id;
      if (Number.isInteger(id) && id > 0) {
        return id;
      }
      return -1;
    },
    options() {
      return this.persons.map((p) => ({
        value: p.id,
        text: `${p.first_name} ${p.last_name}`,
      }));
    },
    requested_by() {
      return this.persons.find((p) => this.form.requested_by === p.id);
    },
    offered_by() {
      return this.persons.filter((p) => this.form.offered_by.includes(p.id));
    },
  },
  methods: {
    ...mapActions('presents', ['getPresent', 'getAllPersons']),
    updatePresent() {
      if (this.isNew) {
        const payload = {
          description: this.form.description,
          requested_by_id: this.form.requested_by,
          offered_by_ids: this.form.offered_by,
        };
        this.$store.dispatch('presents/createPresent', payload);
      } else {
        const payload = {
          id: this.form.id,
          description: this.form.description,
          requested_by_id: this.form.requested_by,
          offered_by_ids: this.form.offered_by,
        };
        this.$store.dispatch('presents/updatePresent', payload);
      }
    },
  },
};
</script>

<style>

</style>
