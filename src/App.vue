<template>
  <div class="main">
    <div class="header">
      <Header 
        v-on:logoClicked="goToHome"
        v-on:settingsClicked="goToSettings"></Header>
    </div>
    <div class="sidebar">
      <ClientList></ClientList>
    </div>
    <div class="content">
      <Viewport />
    </div>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Ubuntu&display=swap");

html,
body {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(69, 72, 77, 1) 100%
  );
  color: white;
  font-family: "Ubuntu", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  overflow: hidden;
}

.main {
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-areas:
    "header header"
    "sidebar content";
  grid-template-columns: 22% 78%;
  grid-template-rows: 6% 94%;

  .header {
    display: flex;
    grid-column-start: 1;
    grid-column-end: 3;
    align-items: center;
  }

  .sidebar {
    grid-row-start: 2;
    grid-row-end: 4;
    border-right: 1px solid #45484d;
    background-image: url('./assets/bg-texture-black.jpg');
    background-repeat: repeat;
    box-shadow: 0 0 5px black;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Client } from "../../weaver-common/src/common/client";
import { ApiManager } from "./common/api/api-manager";
import { ApiVersion } from "./common/api/api-version";
import Header from "./components/header/Header.vue";
import Viewport from "./components/viewport/Viewport.vue";
import ClientList from './components/client/ClientList.vue';
import router from './router';

@Component({
  components: {
    Header,
    Viewport,
    ClientList
  }
})
export default class App extends Vue {
  goToHome() {
    router.push({
      path: '/'
    });
  }

  goToSettings() {
    router.push({
      path: '/settings'
    });
  }
}
</script>
