<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu&display=swap');

html,
body {
  background: rgb(0, 0, 0);
  background: linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(69,72,77,1) 100%);
  color: white;
  font-family: "Ubuntu", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  padding: 0;
  min-height: 100vh;
  overflow: hidden;
}
</style>
