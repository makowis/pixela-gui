<template>
  <div>
    <h2>Graphs</h2>
    <graph-list v-bind:graphs="graphs" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios,{ AxiosResponse } from 'axios';
import GraphList from "@/components/GraphList.vue";
import ErrorMessages from "@/components/ErrorMessages.vue";

interface UserParams {
  username: string,
  token: string,
}

interface Graph {
  id: string,
  name: string,
  unit: string,
  type: string,
  color: string,
  timezone: string,
  purgeCacheURLs: string,
}

@Component({
  components: {
    GraphList,
    ErrorMessages
  }
})
export default class CreateGraph extends Vue {

  graphs : Graph[] = [];

  created() {
    this.sendParams();
  }

  sendParams() {
    const setResult = (response: AxiosResponse<any>) => {
      this.graphs = response.data.graphs;
    };

    let user: any = this.$store.getters['user/user'];

    axios.get(
      `https://pixe.la/v1/users/${user.username}/graphs`,
      {
        headers: {
          'X-USER-TOKEN': user.token
          }
      }
      )
      .then(setResult)
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
