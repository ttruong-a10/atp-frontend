<template>
<div class="course-actionbar">
  <el-button-group>
    <el-button :disabled="isActionBtnDisabled" type="primary" icon="fas fa-play" plain round @click="startHandler">Start</el-button>
    <el-button :disabled="isActionBtnDisabled" type="primary" icon="fas fa-redo-alt" plain>Restart</el-button>
    <el-button :disabled="isActionBtnDisabled" type="primary" icon="fas fa-stop" plain @click="stopHandler">Stop</el-button>
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
        'deleteCourse',
        'getCourses',
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
              console.log(error)
              const code = error.status
              const codeMsg = error.statusText
              const msg = error.data.join('. ')
              this.$notify({
                title: `${courseName} - Delete Failed`,
                message: `${msg} : ${code} ${codeMsg}`,
                type: 'error',
                duration: 0
              })
            }
            finally {
              // Uncheck checkboxes
              this.courseTable.clearSelection()
              this.getCourses()
            }
          })
        })
        .catch(() => {
        })
      },

      startHandler() {
        Object.keys(this.selection).forEach( async key => {
          const courseSlug = this.selection[key].slug
          const courseName = this.selection[key].name
          const url = `/courses/${courseSlug}/action/start/`

          try {
            await axios.post(url)
            this.$notify({
              title: `${courseName} - Start successful`,
              type: 'success',
            })
          }
          catch(error) {
            const code = error.response.status
            const msg = error.response.statusText
            this.$notify({
              title: `${courseName} - Start Failed`,
              message: `${code} ${msg}`,
              type: 'error',
              duration: 0
            })
          }
          finally {
            // Uncheck checkboxes
            this.courseTable.clearSelection()
          }
        })
      },

      stopHandler() {
        Object.keys(this.selection).forEach( async key => {
          const courseSlug = this.selection[key].slug
          const courseName = this.selection[key].name
          const url = `/courses/${courseSlug}/action/stop/`

          try {
            await axios.post(url)
            this.$notify({
              title: `${courseName} - Stop successful`,
              type: 'success',
            })
          }
          catch(error) {
            const code = error.response.status
            const msg = error.response.statusText
            this.$notify({
              title: `${courseName} - Stop Failed`,
              message: `${code} ${msg}`,
              type: 'error',
              duration: 0
            })
          }
          finally {
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