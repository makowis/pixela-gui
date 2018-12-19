<template>
  <div>
    <h1>Create Graph</h1>
    <error-messages v-bind:errors="errors" />
    <p v-if="error != null">{{error}}</p>
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
import ErrorMessages from "@/components/ErrorMessages.vue";

interface UserParams {
  username: string,
  token: string,
}

class GraphParams {
  id: string;
  name: string;
  unit: string;
  type: string;
  color: string;
  timezone?: string;
  errors: string[];

  constructor(
    id: string,
    name: string,
    unit: string,
    type: string,
    color: string,
    timezone?: string
  ) {
    this.id = id;
    this.name = name;
    this.unit = unit;
    this.type = type;
    this.color = color;
    this.timezone = timezone;
    this.errors = [];
  }

  validate() {
    this.errors = [];
    if (!this.id) {
      this.errors.push('id Required')
    }
    if (!this.name) {
      this.errors.push('name Required')
    }
    if (!this.unit) {
      this.errors.push('unit Required')
    }
    if (!this.type) {
      this.errors.push('type Required')
    }
    if (!this.color) {
      this.errors.push('color Required')
    }
    return this.errors.length == 0;
  }
}

interface ApiResult {
  message: string,
  isSuccess: boolean,
}

@Component({
  components: {
    ErrorMessages
  }
})
export default class CreateGraph extends Vue {
  @Prop() private msg!: string;

  userParams : UserParams = {
    username: '',
    token: '',
  };

  graphParams : GraphParams = new GraphParams('','','','','','');
  
  apiResult : ApiResult | null = null;
  errors : string[] = [];

  sendParams() {
    let errorHandler = (error: any) => {
      this.errors =  [error.message];
      alert('Not Create Graph!');
    }

    if(!this.graphParams.validate()) {
      alert('Params');
      this.errors = this.graphParams.errors
      return;
    }

    axios.post(
      `https://pixe.la/v1/users/${this.userParams.username}/graphs`, 
      this.graphParams,
      {
        headers: {
          'X-USER-TOKEN': this.userParams.token
          }
      }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(errorHandler)
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
