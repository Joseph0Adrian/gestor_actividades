import { createStore } from 'vuex';
const store = createStore({
  state() {
    return {
      users: [
        {
          id: 1,
          name: 'test',
        },
      ],
      actividades:[
      	{
      		id: 1,
      		nombre_actividad: 'actividad 1',
      	}
      ]
    };
  },
  mutations: {
    ADD_USER(state, user) {
      state.users.push(user);
    },
    DELETE_USER(state, userID) {
    	state.users = state.users.filter(user => user.id !== userID);
    },
    AGREGAR_ACTIVIDAD(state, actividad){
    	state.actividades.push(actividad);
    },
    BORRAR_ACTIVIDAD(state, actividadID){
    	state.actividades = state.actividades.filter(actividad  => actividad.id !== actividadID);
    }
  },
  actions: {
    addUser({ commit }, user) {
      commit('ADD_USER', user);
    },
    deleteUser({commit}, userId){
    	commit('DELETE_USER', userId);
    },
    agregarActividad({commit}, actividad){
    	commit('AGREGAR_ACTIVIDAD', actividad);
    },
    borrarActividad({commit}, actividadId){
    	commit('BORRAR_ACTIVIDAD', actividadId);
    },
  },
  getters: {
    allUsers(state) {
      return state.users;
    },
    todasActividades(state){
    	return state.actividades;
    }
  },
});

export default store;
