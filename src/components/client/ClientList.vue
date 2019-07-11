<template>
  <div class="client-list-container">
    <div class="filter-input">
      <FilterTextBox
        v-on:inputReceived="handleFilterInputReceived"
        v-on:buttonClicked="handleFilterButtonClick"
        tooltip="Filters clients by matching the value using OR condition against the client id, user name, or computer name."
        watermark="Filter clients"
      />
    </div>
    <div class="client-list">
      <div v-if="!filtering">
        <div v-if="clients.length > 0">
          <div class="client-container">
            <ClientListItem
              v-for="client in clients"
              v-bind:key="client.id"
              v-bind:client="client"
              v-on:open="openClient"
            ></ClientListItem>
          </div>
        </div>
        <div v-else-if="loading">
          <Loader />
        </div>
        <div v-else class="no-results">No Connected Clients</div>
      </div>
      <div v-else>
        <div v-if="filteredClients.length > 0">
          <div class="client-container">
            <ClientListItem
              v-for="client in filteredClients"
              v-bind:key="client.id"
              v-bind:client="client"
            ></ClientListItem>
          </div>
        </div>
        <div class="no-results" v-else>No Results</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.client-list-container {
  .filter-input {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 15px 0;

    .textbox {
      width: 90%;
    }
  }

  .client-list {
    display: grid;
    grid-template-areas: "client";
    grid-template-columns: 100%;

    .client-container {
      .client {
        display: table;
        margin: 0 auto;
        width: 95%;
      }
    }

    .no-results,
    .load-results {
      display: table;
      margin: 0 auto;
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ClientListItem from "./ClientListItem.vue";
import { Client } from "../../../../weaver-common/src/common/client";
import router from "../../router";
import {
  GET_CLIENTS,
  CONNECT,
  POST_GET_CLIENTS,
  NEW_CLIENT_REGISTERED,
  CLIENT_DISCONNECTED
} from "../../../../weaver-common/src/common/events";
import { DEFAULT_ID } from "../../../../weaver-common/src/common/constants";
import { GetClientsRequest } from "../../../../weaver-common/src/operations/get-clients/get-clients-request";
import { GetClientsResponse } from "../../../../weaver-common/src/operations/get-clients/get-clients-response";
import Loader from "../loader/Loader.vue";
import io from "socket.io-client";
import FilterTextBox from "../textboxes/FilterTextBox.vue";
import { FilterTextBoxEventArgs } from "../../common/event-arguments/filter-text-box-event-args";

@Component({
  components: {
    ClientListItem,
    Loader,
    FilterTextBox
  }
})
export default class ClientList extends Vue {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  filtering: boolean = false;
  loading: boolean = false;

  filterClients(
    args: FilterTextBoxEventArgs<HTMLDivElement | HTMLInputElement>
  ): void {
    const value = args.filterValue;

    if (value.trim() === "") {
      this.filtering = false;
      this.filteredClients.length = 0;
    } else {
      this.filtering = true;

      if (args.regexEnabled) {
        let flags = "";

        if (!args.caseSensitive) {
          flags += "i";
        }

        const regex = new RegExp(value, flags);

        this.filteredClients = this.clients.filter(
          c =>
            regex.test(c.computerName) ||
            regex.test(c.userPrincipalName) ||
            regex.test(c.id)
        );
      } else {
        this.filteredClients = this.clients.filter(
          c =>
            (args.caseSensitive ? c.computerName : c.computerName.toLowerCase()).includes(value) ||
            (args.caseSensitive ? c.userPrincipalName : c.userPrincipalName.toLowerCase()).includes(value) ||
            (args.caseSensitive ? c.id : c.id.toLowerCase()).includes(value)
        );
      }
    }
  }

  openClient(client: Client) {
    router.push({
      path: `/client/${client.id}`
    });
  }

  mounted() {
    this.getConnectedClients();
  }

  getConnectedClients() {
    this.loading = true;

    const socket = io("http://localhost:3000");
    const requestClients = () => {
      socket.emit(GET_CLIENTS, new GetClientsRequest(DEFAULT_ID));
    };

    socket.on(CONNECT, () => {
      socket.on(POST_GET_CLIENTS, (response: GetClientsResponse) => {
        this.clients = response.data || [];
        this.loading = false;
      });

      socket.on(NEW_CLIENT_REGISTERED, requestClients);
      socket.on(CLIENT_DISCONNECTED, requestClients);

      this.loading = true;

      requestClients();
    });
  }

  handleFilterButtonClick(args: FilterTextBoxEventArgs<HTMLDivElement>) {
    this.filterClients(args);
  }

  handleFilterInputReceived(args: FilterTextBoxEventArgs<HTMLInputElement>) {
    this.filterClients(args);
  }
}
</script>
