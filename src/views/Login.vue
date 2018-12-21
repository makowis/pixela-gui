<template>
  <div class="login">
    <h2>Login</h2>
    <error-messages v-bind:errors="errors" />
    <label for="username">username</label>
    <input type="text" id="username" v-model="userParams.username">
    <label for="token">token</label>
    <input type="password" id="token" v-model="userParams.token">
    <button type="button" @click="sendParams">Login</button>
    <p class="pixela-link">
      <a href="https://pixe.la/" target="_blank">getting started & create user</a>
    </p>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios,{ AxiosResponse } from 'axios';
import ErrorMessages from "@/components/ErrorMessages.vue";

interface UserParams {
  username: string,
  token: string,
}

@Component({
  components: {
    ErrorMessages
  }
})
export default class Login extends Vue {

  userParams : UserParams = {
    username: '',
    token: '',
  }

  errors: string[] = [];

  checkForm(e: any) {
    if(this.userParams.username && this.userParams.token) {
      return true;
    }

    this.errors = [];

    if(!this.userParams.username) {
      this.errors.push("username Required");
    }

    if(!this.userParams.token) {
      this.errors.push("token Required");
    }

    e.preventDefault();
    return false;
  }

  sendParams(e: any) {
    if(!this.checkForm(e)) {
      return false;
    }

    const setResult = (response: AxiosResponse<any>) => {
      this.$store.dispatch('user/setUser', this.userParams);
      this.$router.replace('/');
    };

    axios.get(
      `https://pixe.la/v1/users/${this.userParams.username}/graphs`,
      {
        headers: {
          'X-USER-TOKEN': this.userParams.token
          }
      }
      )
      .then(setResult)
      .catch(function (error) {
        alert('Not Login');
      });
  }
}
</script>

<style scoped>
.pixela-link a {
  color: green;
}

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
