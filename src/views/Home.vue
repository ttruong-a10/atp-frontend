<template>
  <div class="home">
    <Navbar/>

    <div class="container">
      <div class="searchbar">
        <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"/>
      </div>

      <CourseActionbar @loading="setLoading" />
      
    </div>

    <CourseList :search="search" :loading="loading"/>
  </div>
</template>

<script>
/* eslint-disable */
import Navbar from '@/components/Navbar'
import CourseList from '@/components/CourseList'
import CourseActionbar from '@/components/CourseActionbar'

export default {
  name: 'home',
  data() {
    return {
      search: '',
      loading: false
    }
  },
  components: {
    Navbar,
    CourseList,
    CourseActionbar,
  },
  methods: {
    setLoading(val) {
      this.loading = val
    }
  }
    
  
}
</script>

<style lang='scss'>
.home {
  .container {
    display: flex;
    flex-direction: column;
    // justify-content: flex-end;
    align-items: flex-end;
    max-width: 80rem;
    margin: 3rem auto;

    .searchbar {
      display: inline-block;
    }
  }
}
</style>