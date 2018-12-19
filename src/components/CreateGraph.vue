<template>
  <div>
    <h1>Create Graph</h1>
    <label for="username">username</label>
    <input type="text" id="username" v-model="userParams.username">
    <label for="token">token</label>
    <input type="text" id="token" v-model="userParams.token">
    <label for="id">id</label>
    <input type="text" id="id" v-model="graphParams.id">
    <label for="name">name</label>
    <input type="text" id="name" v-model="graphParams.name">
    <label for="unit">unit</label>
    <input type="text" id="unit" v-model="graphParams.unit">
    <label for="type">type</label>
    <input type="text" id="type" v-model="graphParams.type">
    <label for="color">color</label>
    <input type="text" id="color" v-model="graphParams.color">
    <label for="timezone">timezone</label>
    <input type="text" id="timezone" v-model="graphParams.timezone">
    <button type="button" @click="sendParams">Create</button>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from 'axios';

interface UserParams {
  username: string,
  token: string,
}

interface GraphParams {
  id: string,
  name: string,
  unit: string,
  type: string,
  color: string,
  timezone: string,
}

@Component
export default class CreateGraph extends Vue {
  @Prop() private msg!: string;


  userParams : UserParams = {
    username: '',
    token: '',
  }

  graphParams : GraphParams = {
    id: '',
    name: '',
    unit: '',
    type: '',
    color: '',
    timezone: ''
  };

  sendParams() {
    axios.post(
      `https://pixe.la/v1/users/${this.userParams.username}/graphs`, 
      this.graphParams,
      {
        headers: {
          'X-USER-TOKEN': this.userParams.token,
          'Content-Type': 'application/json',
          }
      }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
</script>

<style scoped>
label{
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
  margin-bottom: 15px;
  border: 1px solid black;
}

button {
  border: none;
  cursor: pointer;
  outline: none;
  appearance: none;
  font-weight: bold;
  padding: 5px 10px;
  color: white;
  background-color: rgb(0, 132, 255); 
  font-size: large;
  border-radius: 5px;
}
</style>
