<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

::-webkit-scrollbar{
  background: black;
  width: 0px;
  height: 10px;
}
::-webkit-scrollbar-thumb{
   background-image: url('https://i.pinimg.com/originals/b6/1a/6c/b61a6cf83ad7755c1e377888b1d75943.gif');
   background-size: cover;
  border-radius: 50px;
}
</style>
