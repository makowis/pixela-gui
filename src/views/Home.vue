<template>
  <div class="home">
    <create-graph />
    <get-graph />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CreateGraph from "@/components/CreateGraph.vue";
import GetGraph from "@/components/GetGraph.vue";

@Component({
  components: {
    CreateGraph,
    GetGraph
  }
})
export default class Home extends Vue {}
</script>
