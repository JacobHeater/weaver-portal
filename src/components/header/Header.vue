<template>
  <div class="weaver-header">
    <div class="content">Weaver Portal</div>
    <div class="menu">
      <img src="../../assets/cog.png" class="icon" />
    </div>
  </div>
</template>

<style lang="scss">
.weaver-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: rgb(69, 72, 77);
  background: linear-gradient(to bottom, rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%);
  color: white;
  font-size: 2em;
  z-index: 9999;
  border-bottom: 1px solid rgb(69, 72, 77);

  .content {
    padding-left: 20px;
    line-height: 60px;
    user-select: none;
    cursor: default;
  }

  .menu {
    position: fixed;
    top: 10px;
    right: 20px;

    .icon {
      height: 40px;
      cursor: pointer;
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>
