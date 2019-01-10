<template>
<div class="course-actionbar">
  <el-button-group>
    <el-button type="primary" icon="fas fa-play" plain round>Start</el-button>
    <el-button type="primary" icon="fas fa-redo-alt" plain>Restart</el-button>
    <el-button type="primary" icon="fas fa-stop" plain>Stop</el-button>
    <el-button type="primary" icon="fas fa-trash-alt" plain round @click="clickDelete" :loading="loading.delete">Delete</el-button>
  </el-button-group>
</div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import axios from 'axios'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'CourseActionbar',

    computed: {
      ...mapGetters({
        selection: 'courseSelection',
        loading: 'loading',
        courseTable: 'courseTable',
      })
    },

    methods: {
      ...mapActions([
        'updateCourses'
      ]),
      ...mapMutations({
        'deleteCourse': 'DELETE_COURSE',
        'updateLoading': 'UPDATE_LOADING',
        'updateSelection': 'SELECT_COURSES',
      }),

      async clickDelete() {
        this.updateLoading({ el: 'delete', status: true })

        await Object.keys(this.selection).forEach( async key => {
          const id = this.selection[key].id
          // const id = 777
          try {
            await axios.delete(`/courses/${id}/`)
            this.deleteCourse({ id })
          }
          catch(error) {
            const courseName = this.selection[key].name
            const code = error.response.status
            const msg = error.response.statusText
            this.$notify({
              title: `${courseName} - Delete Failed`,
              message: `Delete failed: ${code} ${msg}`,
              type: 'error',
              duration: 0
            })
          }
          finally {
            this.updateLoading({ el: 'delete', status: false })
            // Uncheck checkboxes
            this.courseTable.clearSelection()
          }
        })
      }
    }
}
</script>


<style lang="scss">
.course-actionbar {
  margin: 1rem 0;

  .fas {
    font-size: 0.9em;
    padding-right: 0.5rem;
  }
  
}
</style>