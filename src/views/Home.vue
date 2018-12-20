<template>
  <div class="home">
    <get-graph />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "@/components/LoginForm.vue";
import CreateGraph from "@/components/CreateGraph.vue";
import GetGraph from "@/components/GetGraph.vue";

@Component({
  created() {
    let user = this.$store.getters['user/user'];
    if (!user.username || !user.token) {
      this.$router.replace('/login');
    }

  },
  components: {
    LoginForm,
    CreateGraph,
    GetGraph
  }
})
export default class Home extends Vue {}
</script>
