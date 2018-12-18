<template>
  <div class="home">
    <CreateGraph msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CreateGraph from "@/components/CreateGraph.vue"; // @ is an alias to /src

@Component({
  components: {
    CreateGraph
  }
})
export default class Home extends Vue {}
</script>
