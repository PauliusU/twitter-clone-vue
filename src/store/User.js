export const UserModule = {
    namespaced: true,

    state: {
        user: null,
    },

    // Mutations are function that effect the STATE.
    // I.e. mutation directly change the state.
    mutations: {
        // By convention mutation names are all-caps.
        SET_USER(state, user) {
            state.user = user;
        }
    },

    // Actions are function that you call throughout your application that call mutations.
    actions: {
        setUser({commit}, user) {
            commit('SET_USER', user);
        }
    },
}