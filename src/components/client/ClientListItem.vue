<template>
  <div class="client" v-on:dblclick="doubleClick" v-bind:title="tooltip">
    <div class="id title">
      {{ client.id }}
    </div>
    <div class="computer-name field">
      {{ client.computerName }}/{{ client.userPrincipalName }}
    </div>
  </div>
</template>

<style lang="scss">
  .client {
    border: 1px solid gray;
    border-top: none;
    font-size: .8em;
    background: rgba(0, 0, 0, 0.7);
    cursor: pointer;

    .title {
      font-weight: bold;
      background-color: rgba(219,219,219,1);
      color: black;
      border: 1px solid black;
      padding: 5px 2px;
      text-align: center;
      user-select: none;
    }
    .field {
      padding: 10px 5px;
    }
  }
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Client } from '../../../../weaver-common/src/common/client';

@Component
export default class ClientListItem extends Vue {
  @Prop({
    type: Object as () => Client
  })
  client!: Client;

  get tooltip(): string {
    return `Double click to open client ${this.client.id}`;
  }

  doubleClick(event: Event) {
    this.$emit('open', this.client);
  }
}
</script>
