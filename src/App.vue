<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  
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
