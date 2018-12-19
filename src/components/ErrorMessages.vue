<template>
  <div>
    <ul v-if="errors.length">
      <li v-for="error in errors" v-bind:key="error.id">
        {{error}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ErrorMessages extends Vue {
  @Prop() private errors?: string[];

}
</script>

<style scoped>
ul {
  border: 1px solid red;
}

li {
  margin: 5px;
  margin-left: -0.5em;
  color: red;
}
</style>
