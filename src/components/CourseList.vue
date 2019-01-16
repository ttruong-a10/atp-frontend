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
      <el-table-column sortable label="Course Name">
        <template slot-scope="scope">
          <router-link :to="{ name: 'course-detail', params: { courseSlug: scope.row.slug }}">
            {{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>

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
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'CourseList',

  data() {
    return {
      getCoursesInterval: null,
      courseTable:  this.$refs.courseTable
    }
  },

  props: ['search', 'loading'],

  computed: {
    ...mapState({
      courses: state => state.courses.courses
    }),
    filteredCourses() {
      let search = this.search
      return this.courses.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())) || null
    }
  },

   methods: {
    ...mapMutations({
      selectionHandler: 'SELECT_COURSES',
      updateTable: 'UPDATE_TABLE',
    }),
     ...mapActions([
      'getCourses'
    ]),
  },

  created() {
    this.getCourses()
    this.getCoursesInteravl = setInterval(() => {
      this.getCourses()
    }, 30*1000)
  },
  
  mounted() {
    this.updateTable(this.$refs.courseTable)
  },

  beforeDestroy() {
    clearInterval(this.getCoursesInteravl)
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