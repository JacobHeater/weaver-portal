<template>
  <div class="viewport">
    <router-view />
  </div>
</template>

<style lang="scss">
  .viewport {
    width: 100%;
    height: 100%;
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Viewport extends Vue {

}
</script>

