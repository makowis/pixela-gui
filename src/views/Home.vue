<template>
  <div class="home">
    <h2>Graphs</h2>
    <graph-list :graphs="graphs" :username="user.username" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import { getGraphDefinitions } from "@/api/graphApi";
import GraphList from "@/components/GraphList.vue";
import ErrorMessages from "@/components/ErrorMessages.vue";
import { User } from "@/types/user";

interface Graph {
  id: string;
  name: string;
  unit: string;
  type: string;
  color: string;
  timezone: string;
  purgeCacheURLs: string;
}

@Component({
  components: {
    GraphList,
    ErrorMessages
  }
})
export default class Home extends Vue {
  graphs: Graph[] = [];

  private get user(): User {
    return this.$store.getters["user/user"];
  }

  created() {
    if (!this.user.username || !this.user.token) {
      this.$router.replace("/login");
    } else {
      this.sendParams();
    }
  }

  sendParams() {
    const setResult = (response: AxiosResponse<any>) => {
      this.graphs = response.data.graphs;
    };

    const errorHandler = (error: any) => {
      alert("error");
    };

    getGraphDefinitions(this.user, setResult, errorHandler);
  }
}
</script>

<style scoped>
label {
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
