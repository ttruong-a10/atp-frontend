<template>
  <div id="app">
    <PollBackend/>
    <Navbar v-if="!['login'].includes($route.name)"/>
    <router-view></router-view>
  </div>
</template>

<script>
import PollBackend from '@/components/PollBackend'
import Navbar from '@/components/Navbar'
export default {
  name: 'app',
  components: {
    Navbar,
    PollBackend,
  },
  mounted() {
    
  }
  
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root {
  --ffamily-primary: 'Nunito Sans', sans-serif;
  --ffamily-second: 'Roboto', sans-serif;
}

html,body {
  font-family: var(--ffamily-second);
 
}
</style>
