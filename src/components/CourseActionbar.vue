<template>
<div class="course-actionbar">
  <el-button-group>
    <el-button type="primary" icon="fas fa-play" plain round>Start</el-button>
    <el-button type="primary" icon="fas fa-redo-alt" plain>Restart</el-button>
    <el-button type="primary" icon="fas fa-stop" plain>Stop</el-button>
    <el-button type="primary" icon="fas fa-trash-alt" plain round @click="deleteCourse" :loading="loading">Delete</el-button>
  </el-button-group>
</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
    name: 'CourseActionbar',

    props: [ 'selection', ],

    data() {
      return{
        loading: false,
      }
    },

    methods: {
      deleteCourse() {
        this.loading = true
        this.$emit('loading', this.loading)
        Object.keys(this.selection).forEach( key => {
          const id = this.selection[key].id
          // const id = 777
          axios.delete(`/courses/${id}/`)
            .then(response => {
              // Update DOM
              this.$store.dispatch('updateCourses')
              console.log(response)
            })
            .catch(error => {
              console.log(error)
            })
            .finally(() => {
              this.loading = false
              this.$emit('loading', this.loading)
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