
<template>
  <div class="home">
    <Header></Header>
    <Loader v-if="loading" />
    <div class="clients-list" v-else>
      <div class="filter-input">
        <input
          v-on:keyup="filterClients"
          type="text"
          class="tb-filter-clients"
          placeholder="Filter clients"
        />
      </div>
      <div v-if="!filtering">
        <div v-if="connectedClients.length > 0">
          <ClientListItem
            v-for="client in connectedClients"
            v-bind:key="client.id"
            v-bind:client="client"
          ></ClientListItem>
        </div>
        <div v-else class="no-results">
          No Connected Clients
        </div>
      </div>
      <div v-else>
        <div v-if="filteredClients.length > 0">
          <ClientListItem
            v-for="client in filteredClients"
            v-bind:key="client.id"
            v-bind:client="client"
          ></ClientListItem>
        </div>
        <div class="no-results" v-else>No Results</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.clients-list {
  max-width: 20%;
  width: 20%;
  position: absolute;
  top: 60px;
  left: 0;
  height: calc(100% - 65px);
  border-right: 1px solid rgb(69, 72, 77);
  padding: 20px 15px 0 15px;
  background-image: url("../assets/bg-texture-black.jpg");
  background-repeat: repeat;
  overflow-y: auto;

  .filter-input {
    margin-bottom: 20px;
    text-align: center;

    .tb-filter-clients {
      border-radius: 5px;
      width: 95%;
      border: none;
      height: 20px;
      padding: 0 3px;
    }
  }

  .no-results {
    text-align: center;
    font-weight: bold;
    text-decoration: underline;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Client } from "../../../weaver-common/src/common/client";
import { ApiManager } from "../common/api/api-manager";
import { ApiVersion } from "../common/api/api-version";
import Loader from "../components/loader/Loader.vue";
import ClientListItem from "../components/client/ClientListItem.vue";
import Header from "../components/header/Header.vue";
import io from "socket.io-client";
import {
  CONNECT,
  WANT_CLIENTS,
  POST_WANT_CLIENTS,
  NEW_CLIENT_REGISTERED,
  CLIENT_DISCONNECTED
} from "../../../weaver-common/src/common/events";
import { WantClientsRequest } from "../../../weaver-common/src/operations/want-clients/want-clients-request";
import { WantClientsResponse } from "../../../weaver-common/src/operations/want-clients/want-clients-response";
import { DEFAULT_ID } from "../../../weaver-common/src/common/constants";

@Component({
  components: {
    Loader,
    ClientListItem,
    Header
  }
})
export default class Home extends Vue {
  public connectedClients: Client[] = [];
  public filteredClients: Client[] = [];
  public loading: boolean = false;
  public filtering: boolean = false;

  public created() {
    this.getConnectedClients();
  }

  public async getConnectedClients() {
    this.loading = true;

    const socket = io("http://localhost:3000");
    const requestClients = () => {
      socket.emit(WANT_CLIENTS, new WantClientsRequest(DEFAULT_ID));
    };

    socket.on(CONNECT, () => {
      socket.on(POST_WANT_CLIENTS, (response: WantClientsResponse) => {
        this.connectedClients = response.data || [];
        this.loading = false;
      });

      socket.on(NEW_CLIENT_REGISTERED, requestClients);
      socket.on(CLIENT_DISCONNECTED, requestClients);

      this.loading = true;
      requestClients();
    });
  }

  public filterClients(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.trim() === "") {
      this.filtering = false;
      this.filteredClients.length = 0;
    } else {
      this.filtering = true;
      this.filteredClients = this.connectedClients.filter(
        c =>
          c.computerName.includes(value) ||
          c.userPrincipalName.includes(value) ||
          c.id.includes(value)
      );
    }
  }
}
</script>
