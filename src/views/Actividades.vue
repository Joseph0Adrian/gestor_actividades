<template>
  <div class="container mt-4">
    <h1 class="mb-4">Gestión de actividades</h1>

    <!-- Agregar actividad -->
    <div class="input-group mb-3">
      <input v-model="nuevaActividad" type="text" class="form-control" />
      <button class="btn btn-primary" @click="agregarActividad()">
        Agregar actividad
      </button>
    </div>

    <!-- Lista de actividades -->
    <ul class="list-group">
      <li
        v-for="actividad in actividades"
        :key="actividad.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        (ID: {{actividad.id}}){{ actividad.nombre_actividad }}
        <button
          class="btn btn-danger btn-sm"
          @click="borrarActividad(actividad.id)"
        >
          <i class="fas fa-trash"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      actividades: [],
      nuevaActividad: '',
    };
  },
  created() {
    //this.fetchActividades();
  },
  mounted(){
  	this.actividades = this.$store.getters.todasActividades;
  },
  methods: {
    async fetchActividades() {
      //const response = await axios.get('http://localhost:3000/activities');
      //this.actividades = response.data;
    },
    async agregarActividad() {
      //if (!this.nuevaActividad.nombre.trim()) return;
      //const response = await axios.post(
      //  'http://localhost:3000/activities',
      //  this.nuevaActividad
      //);
      //this.actividades.push(response.data);
      
      console.log('agregarActividad');
      console.log(this.nuevaActividad);
      if (this.nuevaActividad.trim()) {
        let nuevaActividad = {
          id: Date.now(),
          nombre_actividad: this.nuevaActividad,
        };
        this.$store.dispatch('agregarActividad', nuevaActividad);
        this.nuevaActividad = '';
      }
    },
    async borrarActividad(id) {
      //await axios.delete(`http://localhost:3000/activities/${id}`);
      this.actividades = this.actividades.filter(
        (actividad) => actividad.id !== id
      );
    },
  },
};
</script>
