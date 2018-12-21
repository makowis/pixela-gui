import { User } from "@/types/user";

interface UserState {
  user: User
}

const state: UserState = {
  user: {
    username: '',
    token: ''
  }
};

// getters
const getters = {
  user: (state: UserState) => {
    return state.user;
  }
};

// actions
const actions = {
  setUser({ commit, state }: { commit(state: string, user :User): void, state: UserState}, user: User) {
    
    commit('setUser', user);
  }
};

// mutations
const mutations = {
  setUser(state: UserState, user: User) {
    state.user.username = user.username;
    state.user.token = user.token;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};