<template>
  <div id="app">
    <nav id="nav">
      <h1>
        <img src="@/assets/logo.png" alt="ww">
        Pixela GUI
      </h1>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/create">New Graph</router-link></li>
      </ul>
    </nav>
    <main>
      <span style="font-size: 3em; color: Tomato;">
        <i class="fas fa-igloo"></i>
      </span>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
h1 {
  margin: 0;
  margin-bottom: 10;
}

h1 img {
  height: 1em;
  line-height: 1em;
  margin-bottom: -4px;
}

nav {
  color: #69df5a;
  margin-bottom: 20;
  padding: 10px 30px;
  background-color: black; 
  border-bottom: 5px solid #69df5a;
}

nav ul {
  list-style: none;
  display: inline-block;
  padding: 0;
}

nav ul li {
  display: inline-block;
}

nav ul li a {
  color: #69df5a;
  padding-right: 10px;
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
