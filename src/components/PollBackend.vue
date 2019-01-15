<template>
<div class="poll-backend">

</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PollBackend',

  data() {
    return {
      getCoursesInterval: null,
    }
  },

  computed: {
    ...mapState({
      authenticated: state => state.auth.authenticated,
      courses: state => state.courses.courses,
    }),
  },

  methods: {
    ...mapActions([
      'getCourses'
    ]),
  },

  created() {
    this.getCourses()
    if(this.authenticated) {
      this.getCoursesInteravl = setInterval(() => {
        this.getCourses()
      }, 30*1000)
    }
  },

  beforeDestroy() {
    clearInterval(this.getCoursesInteravl)
  },
}
</script>

<style>

</style>
