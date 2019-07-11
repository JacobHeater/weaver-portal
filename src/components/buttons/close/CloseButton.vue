<template>
  <div class="close-button-container">
    <div class="close-button" v-on:click="raiseClickEvent">
      <span class="close-button-content">
        x
      </span>
    </div>
  </div>
</template>

<style lang="scss">
  .close-button-container {
    .close-button {
      cursor: default;
      user-select: none;
      font-weight: bold;
    }
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import router from '../../../router';

@Component
export default class CloseButton extends Vue {
  raiseClickEvent() {
    this.$emit('clicked');
  }
}
</script>
