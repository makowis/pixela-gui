<template>
  <div>
    <h1>Create Graph</h1>
    <a href="https://docs.pixe.la/#/post-graph">api reference</a>
    <error-messages v-bind:errors="errors" />
    <label for="id">id</label>
    <input type="text" id="id" v-model="graphParams.id">
    <label for="name">name</label>
    <input type="text" id="name" v-model="graphParams.name">
    <label for="unit">unit</label>
    <input type="text" id="unit" v-model="graphParams.unit">
    <label for="type">type</label>
    <select id="type" v-model="graphParams.type">
      <option disabled value="">Please select one</option>
      <option>int</option>
      <option>float</option>
    </select>
    <label for="color">color</label>
    <select id="color" v-model="graphParams.color">
      <option disabled value="">Please select one</option>
      <option>shibafu</option>
      <option>momiji</option>
      <option>sora</option>
      <option>ajisai</option>
      <option>kuro</option>
    </select>
    <label for="timezone">timezone</label>
    <input type="text" id="timezone" v-model="graphParams.timezone">
    <button type="button" @click="sendParams">Create</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from 'axios';
import ErrorMessages from "@/components/ErrorMessages.vue";

interface UserParams {
  username: string;
  token: string;
}

interface GraphParams {
  id: string;
  name: string;
  unit: string;
  type: string;
  color: string;
  timezone?: string;
}

interface ApiResult {
  message: string,
  isSuccess: boolean,
}

class CreateGraphValidater {
  errors: string[] = [];

  validate(userParams: UserParams, graphParams: GraphParams) {
    this.errors = [];
    if (!userParams.username) {
      this.errors.push('username Required')
    }
    if (!userParams.token) {
      this.errors.push('token Required')
    }

    if (!graphParams.id) {
      this.errors.push('id Required')
    }
    if (!graphParams.name) {
      this.errors.push('name Required')
    }
    if (!graphParams.unit) {
      this.errors.push('unit Required')
    }
    if (!graphParams.type) {
      this.errors.push('type Required')
    }
    if (!graphParams.color) {
      this.errors.push('color Required')
    }
    return this.errors.length == 0;
  }
}

@Component({
  components: {
    ErrorMessages
  }
})
export default class CreateGraph extends Vue {
  created() {
    let user = this.$store.getters['user/user'];
    if (!user.username || !user.token) {
      this.$router.replace('/login');
    }

  }

  graphParams : GraphParams = {
    id: '',
    name: '',
    unit: '',
    type: '',
    color: '',
    timezone:'',
    };

  errors : string[] = [];
  private createGraphValidater: CreateGraphValidater = new CreateGraphValidater();

  sendParams() {
    let errorHandler = (error: any) => {
      this.errors =  [error.message];
      alert('Not Create Graph!');
    };

    let successHandler = (response: any) => {
      this.$router.replace('/');
      alert('Create Graph!');
    };

    let user: any = this.$store.getters['user/user'];

    if(!this.createGraphValidater.validate(user, this.graphParams)) {
      this.errors = this.createGraphValidater.errors
      alert('Params Error');
      return;
    }

    axios.post(
      `https://pixe.la/v1/users/${user.username}/graphs`, 
      this.graphParams,
      {
        headers: {
          'X-USER-TOKEN': user.token,
          'Accept': 'application/json',
          }
      }
      )
      .then(successHandler)
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

a {
  color: green;
}
</style>
