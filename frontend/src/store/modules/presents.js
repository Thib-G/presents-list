import axios from 'axios';

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

// actions
const actions = {
  getAllPresents({ commit }) {
    return axios.get(`${url}/presents`).then((response) => {
      commit('SET_PRESENTS', response.data);
    });
  },
  getAllPersons({ commit }) {
    return axios.get(`${url}/persons`).then((response) => {
      commit('SET_PERSONS', response.data);
    });
  },
  getPresent({ commit }, payload) {
    return axios.get(`${url}/presents/${payload}`).then((response) => {
      commit('SET_CURRENT_PRESENT', response.data);
    });
  },
  createPresent({ dispatch }, payload) {
    return axios.post(`${url}/presents`, payload).then((response) => {
      dispatch('getPresent', response.data.id);
    });
  },
  updatePresent({ dispatch }, payload) {
    return axios.put(`${url}/presents/${payload.id}`, payload).then(() => {
      dispatch('getPresent', payload.id);
    });
  },
  deletePresent({ dispatch }, payload) {
    return axios.delete(`${url}/presents/${payload}`).then(() => {
      dispatch('getAllPresents');
    });
  },
  setOfferedHidden({ commit }, payload) {
    commit('TOGGLE_OFFERED_HIDDEN', payload);
  },
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

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
