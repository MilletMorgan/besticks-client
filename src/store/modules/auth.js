/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

import { request } from '@/services/api';

const state = {
  user: {},
};

const getters = {
  getUser: state => state.user,
  isAuthenticated: state => !!state.user,
  isAdmin: state => state?.user?.role === 'admin' || !!state?.user?.role?.find(r => r === 'ROLE_CUSTOMER_PRO'),
};

const actions = {
  async login({ commit }, user) {
    const response = await request({
      endpoint: 'auth/login',
      body: { email: user.get('email'), password: user.get('password') },
      method: 'POST',
    });
    const payload = {
      ...response.auth,
      ...response.user,
    };
    commit('setUser', payload);
  },

  logout({ commit }) {
    commit('setUser', null);
  },
};

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
