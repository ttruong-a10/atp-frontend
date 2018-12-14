<template>
  <div class="home">
    <Navbar/>
    <CourseList/>
  </div>
</template>

<script>
/* eslint-disable */
import Navbar from '@/components/Navbar'
import CourseList from '@/components/CourseList'

export default {
  name: 'home',
  components: {
    Navbar,
    CourseList,
  },
  methods: {
  }
    
  
}
</script>

<style lang='scss'>
</style>