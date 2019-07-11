
<template>
  <div class="home">
    <div class="banner">
      <pre>
        <code>
 __      __                                  __________              __         .__   
/  \    /  \ ____ _____ ___  __ ___________  \______   \____________/  |______  |  |  
\   \/\/   // __ \\__  \\  \/ // __ \_  __ \  |     ___/  _ \_  __ \   __\__  \ |  |  
 \        /\  ___/ / __ \\   /\  ___/|  | \/  |    |  (  &lt;_&gt; )  | \/|  |  / __ \|  |__
  \__/\  /  \___  &gt;____  /\_/  \___  &gt;__|     |____|   \____/|__|   |__| (____  /____/
       \/       \/     \/          \/                                         \/      
       </code>
      </pre>
    </div>
    <div class="instructions">
      <pre>
        Doube click on a connected client on the left to get started,
        or filter clients by using the filter control above the connected
        clients list.

        For settings, click the gear icon in the header above, on the top right.
      </pre>
    </div>
  </div>
</template>

<style lang="scss">
.home {
  display: grid;
  grid-template-areas: "banner"
                       "instructions";
  grid-template-columns: 1fr;
  grid-template-rows: 70% 30%;
  height: 100%;

  .banner {
    display: grid;
    height: 100%;
    align-content: center;
    justify-content: center;
    text-shadow: 5px 5px 3px black;
  }

  .instructions {
    display: grid;
    height: 100%;
    align-content: center;
    justify-content: center;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>
