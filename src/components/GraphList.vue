<template>
  <div>
    <table v-if="graphs.length" border="1">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>unit</th>
          <th>type</th>
          <th>color</th>
          <th>timezone</th>
          <th>purgeCacheURLs</th>
          <th>detail</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="graph in graphs" v-bind:key="graph.id">
          <td>{{graph.id}}</td>
          <td>{{graph.name}}</td>
          <td>{{graph.unit}}</td>
          <td>{{graph.type}}</td>
          <td>{{graph.color}}</td>
          <td>{{graph.timezone}}</td>
          <td>{{graph.purgeCacheURLs}}</td>
          <td>
            <a :href="`https://pixe.la/v1/users/${username}/graphs/${graph.id}.html`" target="_blank">
              LINK
            </a>
          </td>
          <td>
            <button v-on:click="deleteGrahp(graph.id)">delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from 'axios';
import { getGraphDefinitions } from "@/api/graphApi";

interface User {
  username: string;
  token: string;
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

@Component
export default class GraphList extends Vue {
  @Prop() private graphs?: Graph[];

  private get user(): User {
    return this.$store.getters["user/user"];
  }

  private get username(): string {
    return this.$store.getters['user/user'].username;
  }

  errors : string[] = [];

  deleteGrahp(id: string) {
    if(!confirm(`Do you really want to delete this graph? [id:${id}]`)) {
      return false;
    }

    let errorHandler = (error: any) => {
      this.errors =  [error.message];
      alert('Not Delete Graph!');
    };

    let successHandler = (response: any) => {      
      getGraphDefinitions(this.user, 
        (response: AxiosResponse<any>) => {
          this.graphs = response.data.graphs;
          alert('Delete Graph!');
        },
        (error: any) => {
          this.errors =  [error.message];
          alert("error");        
        }
      );
    };

    axios.delete(
      `https://pixe.la/v1/users/${this.user.username}/graphs/${id}`, 
      {
        headers: {
          'X-USER-TOKEN': this.user.token,
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
table {
  margin: 10px 5px;
}

th, td {
  padding: 5px 10px;
}
</style>
