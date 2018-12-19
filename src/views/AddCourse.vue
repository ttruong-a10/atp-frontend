<template>
  <div class="add-course">
    <h1>Add Course</h1>

    <el-col :span="10" :offset="6" class="form">
      <el-form 
        ref="form" 
        label-width="120px"
        label-position="left"
        status-icon
        :model="form"
        :rules="rules"
        >
        <el-form-item label="Course Name" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">Submit</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>

      </el-form>
    </el-col>

  </div>
</template>

<script>
import axios from 'axios'
/* eslint-disable */ 

export default {
  data() {
    var checkCourseNameExists = (rule, value, callback) => {

      if(!value) {
        return callback(new Error('Enter a course name.'));
      }

      const post_data = { name: value }
      axios.post('/courses/checkExists/', post_data)
        .then(response => {
          let exists = response.data
          if(exists) {
            return callback(new Error('This name already exists.'));
          } else callback()
        })
        .catch(error => {
          let response = error.response
          this.$notify({
            title: 'Validation failed',
            message: `Checking course name failed: ${response.status} ${response.statusText}`,
            type: 'error',
            duration: 0
          });
          return callback(new Error('Error during validation process.'));
        })
    }

    return {
      form: {
        name: '',
      },
      rules: {
        name: [
          { validator: checkCourseNameExists, trigger: 'blur' },
        ],
      },
    }
  },
}
</script>

<style lang='scss'>
.add-course {
  .form {
    margin-top: 3rem;
  }
}
</style>
