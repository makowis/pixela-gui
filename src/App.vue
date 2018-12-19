<template>
  <div id="app">
    <nav id="nav">
      <h1>Pixela GUI</h1>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
h1 {
  color: white;
  margin: 0;
}

nav {
  background-color: rgb(29, 197, 6);
  margin-bottom: 20;
  padding: 20px;
}

main {
  padding: 0px 20px;
}
</style>


<style>
body {
  margin: 0;
  padding: 0;
}
</style>
