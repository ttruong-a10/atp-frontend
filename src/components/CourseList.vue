<template>
<div class="course-list">

  <div class="container">
    <el-table
      ref="courseTable"
      v-loading="loading"
      :data="filteredCourses"
      :default-sort = "{prop: 'created_at', order: 'descending'}"
      @selection-change="selectionHandler"
      style="width: 100%">

      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        property="name"
        sortable
        label="Course Name" />
      <el-table-column
        property="total_pods"
        sortable
        label="Total Pods" />
      <el-table-column
        sortable
        prop="created_at"
        label="Created At" >
        <template slot-scope="scope">{{ scope.row.created_at | moment("DD MMM YYYY") }}</template>
      </el-table-column>
      <el-table-column
        property="owner"
        sortable
        label="Owner" />
      <el-table-column
        label="Status" >
        <template slot-scope="scope">
          {{ scope.row.pod_statuses.started }} / {{ scope.row.pod_statuses.stopped }} / {{ scope.row.pod_statuses.processing }} / {{ scope.row.pod_statuses.undeployed }}
        </template>
      </el-table-column>

    </el-table>

  </div>

</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'CourseList',

  data() {
    return {
      coursePolling: null,
      courseTable:  this.$refs.courseTable
    }
  },

  props: ['search', 'loading'],

  methods: {
    ...mapMutations({
      selectionHandler: 'SELECT_COURSES',
      updateTable: 'UPDATE_TABLE',
    }),
    ...mapActions([
      'updateCourses'
    ]),
  },

  computed: {
    ...mapGetters([
      'courses',
    ]),
    filteredCourses() {
      let search = this.search
      return this.courses.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())) || null
    }
    
  },
  
  mounted() {
    this.updateTable(this.$refs.courseTable)
  },

  created() {
    this.updateCourses()
    this.coursePolling = setInterval(() => {
      // console.log('polling')
      this.updateCourses()
    }, 30*1000)
  },

  beforeDestroy() {
    clearInterval(this.coursePolling)
  },
}
</script>

<style lang="scss">
.course-list {
  .container {
    max-width: 80rem;
    margin: 3rem auto;
  }
}
</style>