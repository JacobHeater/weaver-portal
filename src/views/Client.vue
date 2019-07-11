<template>
  <div class="client-home">
    <div class="client-container" v-if="!loading">
      <div class="client-header">
        <div class="client-identifier">{{ $route.params.id }}</div>
        <div class="client-close">
          <CloseButton v-on:clicked="closeClient" />
        </div>
        <div class="client-name">{{ computerName }}/{{ userPrincipalName }}</div>
      </div>
      <div class="client-terminal">
        <div class="terminal-component" 
          contenteditable
          v-on:keyup="handleTerminalInput">$ </div>
      </div>
    </div>
    <div class="client-loader-container" v-else>
      <Loader />
    </div>
  </div>
</template>

<style lang="scss">
.client-home {
  height: 100%;

  .client-container {
    display: grid;
    grid-template-areas:
      "clientinfo"
      "terminal";
    grid-template-columns: 100%;
    grid-template-rows: 10% 90%;
    height: 100%;

    .client-header {
      display: grid;
      grid-template-areas:
        "id button"
        "name none";
      grid-template-columns: 95% 5%;
      grid-template-rows: 30% 70%;

      .client-identifier,
      .client-close {
        display: flex;
        align-content: center;
      }

      .client-identifier,
      .client-name {
        font-size: 1.2em;
        padding: 3px 5px;
      }

      .client-close {
        font-weight: bold;
        justify-content: center;
        cursor: default;
        user-select: none;
      }
    }

    .client-terminal {
      height: 100%;
      padding: 5px 8px;

      .terminal-component {
        background-color: black;
        color: white;
        height: calc(100% - 35px);
        padding: 10px;
        border: 1px solid white;

        &:focus {
          outline: none;
        }
      }
    }
  }
}

.client-loader-container {
  display: grid;
  grid-template-areas: "loader";
  grid-template-rows: 100%;
  grid-template-columns: 100%;
  align-content: center;
  justify-content: center;
  height: 100%;

  .loader-container {
    display: grid;
    align-content: center;
    justify-content: center;
  }
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import router from "../router";
import CloseButton from "../components/buttons/close/CloseButton.vue";
import io from "socket.io-client";
import { GetClientByIdRequest } from "../../../weaver-common/src/operations/get-clients/get-client-by-id-request";
import { GetClientByIdResponse } from "../../../weaver-common/src/operations/get-clients/get-client-by-id-response";
import {
  GET_CLIENT_BY_ID,
  POST_GET_CLIENT_BY_ID
} from "../../../weaver-common/src/common/events";
import { GetClientsRequest } from "../../../weaver-common/src/operations/get-clients/get-clients-request";
import { StatusCodes } from "../../../weaver-common/src/enums/status-codes";
import { Client as ClientModel } from "../../../weaver-common/src/common/client";
import Loader from "../components/loader/Loader.vue";
import { Keycodes } from '../common/keycodes';

@Component({
  components: {
    CloseButton,
    Loader
  }
})
export default class Client extends Vue {
  @Prop({
    type: String,
    default: 'Test'
  })
  computerName!: string;  
  @Prop({
    type: String,
    default: 'Test'
  })
  userPrincipalName!: string;

  loading: boolean = false;

  created() {
    this.getClientData();
  }

  closeClient() {
    router.back();
  }

  getClientData() {
    this.loading = true;

    const clientId = this.$route.params.id as string;
    const request = new GetClientByIdRequest(clientId, clientId);

    const socket = io('http://localhost:3000');

    socket.on(POST_GET_CLIENT_BY_ID, (response: GetClientByIdResponse) => {
      if (response.status === StatusCodes.Success) {
        const client = response.data as ClientModel;
        
        this.userPrincipalName = client.userPrincipalName;
        this.computerName = client.computerName;
        this.loading = false;
      } else {
        // TODO: Error handling.
        console.error(response);
      }
    });

    socket.emit(GET_CLIENT_BY_ID, request);
  }

  handleTerminalInput(event: KeyboardEvent) {
    const target: HTMLDivElement = event.target as HTMLDivElement;

    switch (event.which) {
      case Keycodes.Enter:
        break;
      case Keycodes.Backspace:
        break;
    }
  }
}
</script>
