<template>
  <div>
    <h1>Create Graph</h1>
    <error-messages v-bind:errors="errors" />
    <label for="username">username</label>
    <input type="text" id="username" v-model="user.username">
    <label for="token">token</label>
    <input type="text" id="token" v-model="user.token">
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
import { Component, Vue } from "vue-property-decorator";
import axios from 'axios';
import ErrorMessages from "@/components/ErrorMessages.vue";
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  components: {
    ErrorMessages
  }
})
export default class CreateGraph extends Vue {
  userParams : UserParams = { 
    username:'',
    token:'',
    };
  graphParams : GraphParams = {
    id: '',
    name: '',
    unit: '',
    type: '',
    color: '',
    timezone:'',
    };
  
  apiResult : ApiResult | null = null;
  errors : string[] = [];
  private createGraphValidater: CreateGraphValidater = new CreateGraphValidater();

  sendParams() {
    let errorHandler = (error: any) => {
      this.errors =  [error.message];
      alert('Not Create Graph!');
    };

    let successHandler = (response: any) => {
      alert('Create Graph!');
    };

    if(!this.createGraphValidater.validate(this.userParams, this.graphParams)) {
      this.errors = this.createGraphValidater.errors
      alert('Params Error');
      return;
    }

    axios.post(
      `https://pixe.la/v1/users/${this.userParams.username}/graphs`, 
      this.graphParams,
      {
        headers: {
          'X-USER-TOKEN': this.userParams.token,
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
</style>
