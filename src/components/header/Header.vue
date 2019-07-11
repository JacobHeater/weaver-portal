<template>
  <div class="weaver-header">
    <div class="content">
      <span v-on:click="handleLogoClick">Weaver Portal</span>
    </div>
    <div class="icon-container">
      <img src="../../assets/cog.png" class="icon" v-on:click="handleSettingsClick" />
    </div>
  </div>
</template>

<style lang="scss">
.weaver-header {
  display: grid;
  grid-template-areas: "logo icon";
  grid-template-columns: 95% 5%;;
  grid-template-rows: 100%;
  width: 100%;
  height: 100%;
  background: rgb(69, 72, 77);
  background: linear-gradient(to bottom, rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%);
  color: white;
  font-size: 2em;
  z-index: 9999;
  border-bottom: 1px solid rgb(69, 72, 77);
  text-shadow: 2px 2px 4px black;

  .content {
    display: flex;
    padding-left: 20px;
    user-select: none;
    cursor: default;
    align-items: center;
  }

  .icon-container {
    display: flex;
    align-items: center;

    .icon {
      height: 20px;
      cursor: pointer;
      
      &:hover {
        filter: drop-shadow(3px 3px 5px black);
      }

      &:active {
        filter: drop-shadow(1px 1px 1px black);
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  handleLogoClick() {
    this.$emit('logoClicked');
  }

  handleSettingsClick() {
    this.$emit('settingsClicked');
  }
}
</script>
