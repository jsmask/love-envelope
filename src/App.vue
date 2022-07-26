<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Envelope from './components/Envelope/Envelope.vue'
</script>

<template>
    <Envelope />
</template>

<style lang="scss">
*{
    padding:0;
    margin:0;
    box-sizing:border-box;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
}
#app {
  width: 100%;
  height: 100vh;
  padding: 0px 0 0px;
  overflow: hidden;
  font-size: 14px;
  background-image: repeating-linear-gradient(0deg, hsla(340,87%,75%,0.2) 0px, hsla(340,87%,75%,0.2) 30px,transparent 30px, transparent 60px),repeating-linear-gradient(90deg, hsla(340,87%,75%,0.2) 0px, hsla(340,87%,75%,0.2) 30px,transparent 30px, transparent 60px),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255));
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
