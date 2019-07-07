
<template>
  <div class="home">
    <Header></Header>
    <Loader v-if="loading" />
    <div class="clients-list" v-else>
      <ClientListItem
        v-for="client in connectedClients"
        v-bind:key="client.id"
        v-bind:client="client"
      ></ClientListItem>
    </div>
  </div>
</template>

<style lang="scss">
  .clients-list {
    max-width: 300px;
    width: 300px;
    position: absolute;
    top: 60px;
    left: 0;
    height: 100%;
    border-right: 1px solid gray;
    padding: 0 2px;
    background-color: black;
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Client } from '../../../weaver-common/src/common/client';
import { ApiManager } from '../common/api/api-manager';
import { ApiVersion } from '../common/api/api-version';
import Loader from '../components/loader/Loader.vue';
import ClientListItem from '../components/client/ClientListItem.vue';
import Header from '../components/header/Header.vue';

@Component({
  components: {
    Loader,
    ClientListItem,
    Header
  }
})
export default class Home extends Vue {
  public connectedClients: Client[] = [];
  public loading: boolean = false;

  created() {
    this.getConnectedClients();
  }

  public async getConnectedClients() {
    this.loading = true;

    const api = new ApiManager("http://localhost:3000", ApiVersion.V1);
    const clients = await api.getConnectedClients();

    this.connectedClients = clients;
    this.loading = false;
  }
}
</script>
