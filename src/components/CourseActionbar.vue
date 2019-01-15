<template>
<div class="course-actionbar">
  <el-button-group>
    <el-button type="primary" icon="fas fa-play" plain round>Start</el-button>
    <el-button type="primary" icon="fas fa-redo-alt" plain>Restart</el-button>
    <el-button type="primary" icon="fas fa-stop" plain>Stop</el-button>
    <el-button type="primary" icon="fas fa-trash-alt" plain round @click="deleteHandler">Delete</el-button>
  </el-button-group>
</div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import axios from 'axios'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: 'CourseActionbar',

    computed: {
      ...mapState({
        selection: state => state.courses.courseSelection, 
        courseTable: state => state.courses.courseTable,
      })
    },

    methods: {
      ...mapActions([
        'updateCourses',
        'deleteCourse',
      ]),
      ...mapMutations({
        'updateSelection': 'SELECT_COURSES',
      }),

      deleteHandler() {
        Object.keys(this.selection).forEach( key => {
          const courseId = this.selection[key].id
          const courseName = this.selection[key].name

          this.$confirm(
            `This will delete course "${courseName}" and all pods in it! Continue?`,
            'Warning',
            { type: 'warning' }
          ).then(async () => {
            // const courseId = 777
            try {
              await this.deleteCourse(courseId)
            }
            catch(error) {
              const code = error.status
              const msg = error.statusText
              this.$notify({
                title: `${courseName} - Delete Failed`,
                message: `Delete failed: ${code} ${msg}`,
                type: 'error',
                duration: 0
              })
            }
            finally {
              // Uncheck checkboxes
              this.courseTable.clearSelection()
            }
          }).catch(() => {
            // this.courseTable.clearSelection()
          })
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