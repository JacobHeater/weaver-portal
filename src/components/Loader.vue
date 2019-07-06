<template>
  <div class="loader-container">
    <div class="loader"></div>
  </div>
</template>

<style lang="scss">
  @keyframes loader {
    to {
      transform: rotate(360deg);
    }
  }

  .loader:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60px;
    height: 60px;
    margin-top: -30px;
    margin-left: -30px;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: rgba(93,255,176,1);
    animation: loader 0.6s linear infinite;
  }
</style>

