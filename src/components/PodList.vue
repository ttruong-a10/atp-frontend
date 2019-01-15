<template>
<div class="pod-list">
  Cowface  {{ course.name }}
</div>
</template>

<script>
import { mapActions, } from 'vuex'
export default {
  props: ['courseName',],

  data() {
    return {
      course: this.getCourse(this.courseName)
    }
  },

  methods: {
    ...mapActions([
      'getCourse',
    ]),
  },

  mounted() {
  }

}
</script>

<style lang='scss'>
.pod-list {
  
}
</style>
