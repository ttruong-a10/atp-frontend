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

      <CourseActionbar :selection="selection" @loading="setLoading" />
      
    </div>

    <CourseList :search="search" :loading="loading" @selection="setSelection"/>
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
      selection: null,
      loading: false
    }
  },
  components: {
    Navbar,
    CourseList,
    CourseActionbar,
  },
  methods: {
    setSelection(val) {
      this.selection = val
    },
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