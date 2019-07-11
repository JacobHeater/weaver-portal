<template>
  <div class="settings-home">
    <div class="settings-information">
      <div class="settings-text">Settings</div>
      <div class="settings-close">
        <CloseButton v-on:clicked="closeSettings" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.settings-home {
  .settings-information {
    display: grid;
    grid-template-areas: "id button";
    grid-template-columns: 95% 5%;

    .settings-text,
    .settings-close {
      display: flex;
      align-content: center;
    }

    .settings-text {
      font-size: 1.2em;
    }

    .settings-close {
      font-weight: bold;
      justify-content: center;
      cursor: default;
      user-select: none;
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CloseButton from '../components/buttons/close/CloseButton.vue';
import router from '../router';

@Component({
  components: {
    CloseButton
  }
})
export default class Settings extends Vue {
  closeSettings() {
    router.back();
  }
}
</script>
