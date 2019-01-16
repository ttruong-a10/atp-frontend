<template>
<div class="course-actionbar">
  <el-button-group>
    <el-button :disabled="isActionBtnDisabled" type="primary" icon="fas fa-play" plain round>Start</el-button>
    <el-button :disabled="isActionBtnDisabled" type="primary" icon="fas fa-redo-alt" plain>Restart</el-button>
    <el-button :disabled="isActionBtnDisabled" type="primary" icon="fas fa-stop" plain>Stop</el-button>
    <el-button :disabled="isActionBtnDisabled" type="primary" icon="fas fa-trash-alt" plain round @click="deleteHandler">Delete</el-button>
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
      }),
      isActionBtnDisabled() {
        if (!Array.isArray(this.selection) || this.selection.length ===0) {
          return true
        } 
      }
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
        this.$confirm(
          `This will delete course the following courses and all pods in it! Continue?`,
          'Warning',
          { type: 'warning' }
        ).then(() => {
          Object.keys(this.selection).forEach( async key => {
            const courseName = this.selection[key].name
            const courseSlug = this.selection[key].slug

            // const courseName = 'doesnotexister'
            try {
              await this.deleteCourse(courseSlug)
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
          })
        })
        .catch(() => {
          // this.courseTable.clearSelection()
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