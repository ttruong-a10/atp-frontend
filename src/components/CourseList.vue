<template>
<div class="course-list">

  <div class="container">
    <el-table
      ref="courseTable"
      v-loading="loading"
      :data="courses.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      :default-sort = "{prop: 'created_at', order: 'descending'}"
      @selection-change="selectionHandler"
      style="width: 100%">

      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        property="short_name"
        sortable
        label="Name" />
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

export default {
  name: 'CourseList',

  data() {
    return {
      courseInterval: null,
      selection: null,
    }
  },

  props: ['search', 'loading'],

  methods: {
    selectionHandler(val) {
      this.selection = val
      this.$emit('selection', val)
    }
  },

  computed: {
    courses() {
      return this.$store.state.courses
    },
  },

  created() {
    this.$store.dispatch('updateCourses')
    this.courseInterval= setInterval(() => {
      // eslint-disable-next-line 
      this.$store.dispatch('updateCourses')
    }, 30*1000)

  },

  beforeDestroy() {
    clearInterval(this.courseInterval)
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