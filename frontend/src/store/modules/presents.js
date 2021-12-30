import axios from '@/_helpers/axios';
import authHeader from '@/_helpers/authHeader';

const url = '/myapp/api';

// initial state
const initialState = () => ({
  allPresentsRaw: [],
  allPersons: [],
  currentPresent: undefined,
  isOfferedHidden: true,
});

// getters
const getters = {
  allPresents: (state) => state.allPresentsRaw.map((present) => ({
    ...present,
    requested_by: state.allPersons.find((person) => person.id === present.requested_by),
    offered_by: state.allPersons.filter((person) => present.offered_by.includes(person.id)),
  })),
  allPersons: (state) => state.allPersons,
  personById: (state) => (id) => state.allPersons.find((p) => p.id === id),
  presentById: (state) => (id) => state.allPresentsRaw.find((p) => p.id === id),
  isOfferedHidden: (state) => state.isOfferedHidden,
};

// mutations
const mutations = {
  SET_PRESENTS(state, presents) {
    state.allPresentsRaw = presents;
  },
  SET_PERSONS(state, persons) {
    state.allPersons = persons;
  },
  SET_CURRENT_PRESENT(state, present) {
    state.currentPresent = present;
  },
  TOGGLE_OFFERED_HIDDEN(state, val) {
    state.isOfferedHidden = val;
  },
};

// actions
const actions = {
  async getAllPresents({ commit }) {
    try {
      const response = await axios.get(`${url}/presents`, { headers: authHeader() });
      commit('SET_PRESENTS', response.data);
    } catch (error) {
      console.log('ERROR', error);
    }
  },
  async getAllPersons({ commit }) {
    try {
      const response = await axios.get(`${url}/persons`, { headers: authHeader() });
      commit('SET_PERSONS', response.data);
    } catch (error) {
      console.log('ERROR', error);
    }
  },
  async getPresent({ commit }, payload) {
    try {
      const response = await axios.get(`${url}/presents/${payload}`, { headers: authHeader() });
      commit('SET_CURRENT_PRESENT', response.data);
    } catch (error) {
      console.log('ERROR', error);
    }
  },
  async createPresent({ dispatch }, payload) {
    try {
      const response = await axios.post(`${url}/presents`, payload, { headers: authHeader() });
      dispatch('getPresent', response.data.id);
    } catch (error) {
      console.log('ERROR', error);
    }
  },
  async updatePresent({ dispatch }, payload) {
    try {
      await axios.put(`${url}/presents/${payload.id}`, payload, { headers: authHeader() });
      dispatch('getPresent', payload.id);
    } catch (error) {
      console.log('ERROR', error);
    }
  },
  async deletePresent({ dispatch }, payload) {
    try {
      await axios.delete(`${url}/presents/${payload}`, { headers: authHeader() });
      dispatch('getAllPresents');
    } catch (error) {
      console.log('ERROR', error);
    }
  },
  setOfferedHidden({ commit }, payload) {
    commit('TOGGLE_OFFERED_HIDDEN', payload);
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
