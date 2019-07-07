<template>
  <div class="weaver-header">
    <div class="content">
      Weaver Portal
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
  background-color: rgba(219,219,219,1);
  color: black;
  font-size: 2em;
  z-index: 9999;

  .content {
    padding-left: 20px;
    line-height: 60px;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>
