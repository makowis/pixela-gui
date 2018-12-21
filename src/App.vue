<template>
  <div id="app">
    <nav id="nav">
      <h1>
        <img src="@/assets/logo.png" alt="ww">
        Pixela GUI
      </h1>
      <ul>
        <li>
          <router-link to="/">
            <font-awesome-icon icon="home" class="icon"/>Home
          </router-link></li>
        <li>
          <router-link to="/create">
            <font-awesome-icon icon="pencil-alt" class="icon"/>New Graph
          </router-link>
        </li>
      </ul>
    </nav>
    <main>
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

.icon {
  font-size: small;
  margin-right: 2px;
}
</style>


<style>
@import url('https://fonts.googleapis.com/css?family=VT323');
body {
  font-family: 'VT323', monospace;
  margin: 0;
  padding: 0;
}

button {
  font-family: 'VT323', monospace;
}
</style>
