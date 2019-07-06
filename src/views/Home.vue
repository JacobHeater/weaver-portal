
<template>
  <div class="home">
    <div v-if="!loading">
      Number of connected users: {{ nUsers }}
    </div>
    <Loader v-else />
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ApiManager } from "../common/api/api-manager";
import { ApiVersion } from "../common/api/api-version";
import Loader from '../components/Loader.vue';

@Component({
  components: {
    Loader,
  }
})
export default class Home extends Vue {
  public nUsers: number = 0;
  public loading: boolean = false;

  created() {
    this.getNumberOfClients();
  }

  public async getNumberOfClients() {
    this.loading = true;

    const api = new ApiManager("http://localhost:3000", ApiVersion.V1);
    const users = await api.getConnectedClients();

    this.nUsers = users.length;
    this.loading = false;
  }
}
</script>
