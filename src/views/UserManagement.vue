<template>
  <div class="container mt-4">
    <h1 class="mb-4">Gestión de usuarios</h1>

    <!-- Agregar usuario -->
    <div class="input-group mb-3">
      <input v-model="newUser" type="text" class="form-control" />
      <button class="btn btn-primary" @click="addUser">
        Agregar usuario
        <i class="fas fa-plus"></i>
      </button>
    </div>

    <!-- Lista de usuarios -->
    <ul class="list-group">
      <li
        v-for="user in users"
        :key="user.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        (ID: {{ user.id }}) {{ user.name }}
        <button
          class="btn btn-danger btn-sm"
          @click="deleteUser(user.id)"
          title="Eliminar usuario"
        >
          <i class="fas fa-trash"></i>
        </button>
        <button
          class="btn btn-success btn-sm"
          @click="mostrarModalActividadesAsignadas"
          title="Actividades asignadas"
        >
          <i class="fa-solid fa-folder-plus"></i>
        </button>
        <button
          class="btn btn-primary btn-sm"
          @click="mostrarModalActividades(user.id)"
          title="Asignar actividad"
        >
          <i class="fa-solid fa-folder-plus"></i>
        </button>
      </li>
    </ul>
  </div>
  <Modal
    :isVisible="showModal"
    title="Asignación de actividades"
    @close="showModal = false"
  >
  	<slot>
  		<!-- Lista de actividades -->
    	<ul class="list-group">
      		<li
        		v-for="actividad in actividades"
        		:key="actividad.id"
        		class="list-group-item d-flex justify-content-between align-items-center"
      		>
        		(ID: {{actividad.id}}) {{ actividad.nombre_actividad }}
            <button
              class="btn btn-primary btn-sm"
              title="Asignar actividad"
              @click="asignarActividadUsuario(actividad.id)"
            >
              <i class="fa-solid fa-folder-plus"></i>
            </button>
      		</li>
    	</ul>
  	</slot>
  </Modal>
  <Modal
    :isVisible="showModalActividadesAsignadasUsuario"
    title="Actividades asignadas a usuario"
    @close="showModalActividadesAsignadasUsuario = false"
  >
  	<slot>
  		<!-- Lista de actividades -->
    	<ul class="list-group">
      		<li
        		v-for="actividad in actividadesAsignadasUsuario"
        		:key="actividad.id"
        		class="list-group-item d-flex justify-content-between align-items-center"
      		>
        		(ID: {{actividad.id}}) ID usuario: {{ actividad.idUsuario }} ID actividad: {{actividad.idActiviad}}
            <button
              class="btn btn-primary btn-sm"
              title="Asignar actividad"
              @click="asignarActividadUsuario(actividad.id)"
            >
              <i class="fa-solid fa-folder-plus"></i>
            </button>
      		</li>
    	</ul>
  	</slot>
  </Modal>
</template>

<script>
import Modal from './../components/Modal.vue';
// import axios from 'axios';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      actividadesAsignadasUsuario: [],
      showModalActividadesAsignadasUsuario: false,
      idUsuarioAsignarActividad:'',
    	actividades: [],
      showModal: false,
      	/*users: [
        	{
          	id: 1,
          	name: 'test',
        	},
      	],*/
      	newUser: '',
    	};
  	},
  created() {
    //this.fetchUsers();
  },
  mounted() {
  	this.actividades = this.$store.getters.todasActividades;
    this.actividadesAsignadasUsuario = this.$store.getters.todasUsuariosActividades;
  },
  computed: {
    users() {
      return this.$store.getters.allUsers;
    },
  },
  methods: {
    mostrarModalActividadesAsignadas() {
      this.showModalActividadesAsignadasUsuario = true;
    },
    asignarActividadUsuario(actividadId){
        let obejtoAsignarActividadUsuario = {
          id: Date.now(),
          idUsuario: this.idUsuarioAsignarActividad,
          idActiviad: actividadId
        };
        this.$store.dispatch('asignarActividadUsuario', obejtoAsignarActividadUsuario);
    },
    mostrarModalActividades(userId) {
      this.idUsuarioAsignarActividad = userId;
      this.showModal = true;
    },
    async fetchUsers() {
      //const response = await axios.get('http://localhost:3000/users');
      //this.users = response.data;
    },
    addUser() {
      if (this.newUser.trim()) {
        let newUser = {
          id: Date.now(),
          name: this.newUser,
        };
        console.log(typeof newUser.id);
        this.$store.dispatch('addUser', newUser);
        this.newUser = '';
      }
    },
    deleteUser(userId){
    	this.$store.dispatch('deleteUser', userId);
    }
    /*async addUser() {
      //if (!this.newUser.name.trim()) return;
      //const response = await axios.post(
      //  'http://localhost:3000/users',
      //  this.newUser
      //);
      //this.users.push(response.data);
      //this.newUser.name = '';
      this.users = [...this.users, this.newUser];
      this.newUser.name = '';
    },*/
    //async deleteUser(id) {
      //await axios.delete(`http://localhost:3000/users/${id}`);
      //this.users = this.users.filter((user) => user.id !== id);
    //},
  },
};
</script>
