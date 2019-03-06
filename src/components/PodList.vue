<template>
<div class="pod-list">
  <div class="container">
    <el-table
      :data="filteredPods"
      :default-sort = "{prop: 'number', order: 'ascending'}"
      @selection-change="selectionHandler"
      style="width: 100%">

      <el-table-column
      type="selection"
      width="55"/>

      <el-table-column
        sortable
        label="Number">
          <template slot-scope="scope">
            {{ scope.row.number.toString().padStart(2, '0') }}
          </template>
      </el-table-column>
          
      <el-table-column
        sortable
        prop="student"
        label="Student" />

      <el-table-column
        sortable
        prop="hostname"
        label="Host" />

      <el-table-column
        sortable
        prop="public_ip"
        label="IP" />

      <el-table-column
        sortable
        prop="access_token.key"
        label="Token" />
    
      <el-table-column
        sortable
        prop="status"
        label="Status" />

      <el-table-column
        sortable
        prop="next_stop"
        label="Next Stop" />
    </el-table>

    </div>
  </div>
  </template>

  <script>
  import { mapState, mapActions, mapMutations } from 'vuex'
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
    ...mapMutations({
       selectionHandler: 'SELECT_PODS',
    })
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
  }



}
</script>

<style lang='scss'>
.pod-list {
  .container {
    max-width: 80rem;
    margin: 3rem auto;
  }
}
</style>
