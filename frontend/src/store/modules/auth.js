import axios from '@/_helpers/axios';

const url = '/myapp/api';

const initialState = {

};

const getters = {
  isLoggedIn: () => !!localStorage.getItem('user'),
};

const mutations = {
  SAVE_USER_LOCAL_STORAGE(state, user) {
    localStorage.setItem('user', JSON.stringify(user));
  },
  REMOVE_USER_LOCAL_STORAGE() {
    localStorage.removeItem('user');
  },
};

const actions = {
  async pairToken({ commit }, payload) {
    try {
      const response = await axios.post(`${url}/token/pair`, payload);
      commit('SAVE_USER_LOCAL_STORAGE', response.data);
    } catch (error) {
      commit('REMOVE_USER_LOCAL_STORAGE');
      console.log('ERROR', error);
    }
  },
  logout({ commit }) {
    commit('REMOVE_USER_LOCAL_STORAGE');
    window.location.reload();
  },
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};
