<template>
  <div id="app">
    <Navbar v-if="!['login'].includes($route.name)"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import { mapState } from 'vuex'
export default {
  name: 'app',

  components: {
    Navbar,
  },

  computed: {
    ...mapState({
      authenticated: state => state.auth.authenticated 
    })
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
