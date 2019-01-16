<template>
<div class="pod-list">
  <div class="container">
    <el-table
      :data="filteredPods"
      :default-sort = "{prop: 'number', order: 'ascending'}"
      style="width: 100%">

      <el-table-column
        sortable
        prop="number"
        label="Number" />
        
      <el-table-column
        sortable
        prop="student"
        label="Student" />

      <el-table-column
        sortable
        prop="access_token.key"
        label="Token" />
     
      <el-table-column
        property="owner"
        sortable
        label="Owner" />
    </el-table>

  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ['courseName',],

  data() {
    return {
      getPodsInterval: null,
    }
  },

  computed: {
    ...mapState({
      course: state => state.courses.course,
      pods: state => state.pods.pods
    }),
    filteredPods() {
      let search = this.search
      return this.pods.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())) || null
    }
  },

  methods: {
    ...mapActions([
      'getCourse',
      'getPods'
    ]),
  },

  created() {
    const slug = this.course.slug
    this.getPods(slug)
    this.getPodsInterval = setInterval(() => {
      this.getPods(slug)
    }, 30*1000)
  },
  

  beforeDestroy() {
    clearInterval(this.getPodsInterval)
  },

  mounted() {
    console.log(this.pods)
  }



}
</script>

<style lang='scss'>
.pod-list {
  
}
</style>
