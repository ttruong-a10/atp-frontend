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

        <el-form-item label="Instances" prop="instances">
          <el-input-number v-model="form.instances" :min="1" :max="50"></el-input-number>
        </el-form-item>

        <el-form-item label="Region" prop="region">
          <el-select v-model="form.region" 
            filterable 
            @change="location => getImages(location)"
            placeholder="Search regions">

            <el-option
              v-for="region in form.regionList"
              :key="region.value"
              :label="region.label"
              :value="region.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Image Source" prop="image_src">
          <el-select ref="imageSelect" 
            v-model="form.image_src" 
            filterable 
            :loading="loading.image"
            placeholder="Search images">
            <el-option
              v-for="image in form.imageList"
              :key="image.id"
              :label="image.name"
              :value="image.name">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Internet Access" prop="allow_internet_access">
          <el-switch
            v-model="form.allow_internet_access"
            active-text="Allow Outbound" />
        </el-form-item>

        <el-form-item label="Time Zone" prop="time_zone">
          <el-select v-model="form.time_zone" filterable placeholder="Search time zone">
            <el-option
              v-for="tz in form.time_zone_list"
              :key="tz.value"
              :label="tz.label"
              :value="tz.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="Student Access" prop="student_access">
          <el-date-picker
            v-model="form.student_access"
            type="datetimerange"
            size="large"
            format="MMM d, HH:mm"
            :picker-options="{ step: '00:15' }"
            align="center"
            range-separator="--"
            :unlink-panels="true"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            :default-time="['07:00:00', '18:00:00']"
            />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="loading.course">Submit</el-button>
          <el-button @click="$router.go(-1)">Cancel</el-button>
        </el-form-item>

      </el-form>
    </el-col>

  </div>
</template>

<script>
import axios from 'axios'
// import { mapGetters } from 'vuex';
/* eslint-disable */ 

export default {
  data() {
    var checkCourseNameExists = (rule, value, callback) => {

      // if empty
      if(!value) {
        return callback(new Error('Enter a course name.'));
      }

      // if not alphanumerics
      const pattern = /^[0-9a-zA-Z_-]*$/
      if (!pattern.test(value)) {
        return callback(new Error('Accepts only alphanmeric, underscore, or hypen characters.'));
      }

      const post_data = { name: value }
      const url = '/courses/checkExists/'
      axios.post(url, post_data)
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
      loading: {
        course: false,
        image: false,
      },
      form: {
        name: '',
        instances: 1,
        region: '',
        regionList: [ 
          { label: 'US West', value: 'westus' },
          { label: 'US East', value: 'eastus' },
          { label: 'Europe West', value: 'westeurope' },
        ],
        image_src: '',
        imageList: [], 
        allow_internet_access: false,
        time_zone: 'America/Los_Angeles',
        time_zone_list: [
          { label: 'Africa/Abidjan', value: 'afecabj' },
          { label: 'Europe/Paris', value: 'paris' },
          { label: 'America/New_York', value: 'adsfxzv' },
          { label: 'America/Los_Angeles', value: 'angeles' },
        ],
        student_access: '',
      },
      rules: {
        name: [
          { 
            validator: checkCourseNameExists, 
            required: true,
            trigger: 'blur' 
          },
        ],
        instances: [
          { 
            required: true, 
          },
        ],
        region: [
          { 
            required: true, 
            trigger: 'blur' 
          },
        ],
      },
    }
  },
  
  methods: {
    async addCourse() {
      try {
        this.loading.course = true
        const url = '/courses/'

        await axios.post(url, this.form)
        this.$router.push({ name: 'home'})
      }
      catch(error) {
        const response = error.response
        this.$notify({
          title: 'Add Course Failed',
          message: `${response.status} ${response.statusText}`,
          type: 'error',
          duration: 0
        })
      }
      finally {
        this.loading.course = false
      } 
    },

    async getImages(location) {
      try {
        this.loading.image = true
        console.log(this.$refs.imageSelect)
        this.form.image_src = ''
        if(!location) location = ''
        // clear 
        const url = `/images/${location}/`
        let resp= await axios.get(url)
        this.form.imageList = resp.data
      }
      catch(error) {
        const response = error.response
        this.$notify({
          title: 'Get image failed',
          message: `${response.status} ${response.statusText}`,
          type: 'error',
          duration: 0
        })
      }
      finally {
        this.loading.image = false
      } 
    },

    onSubmit() {
      console.log(this.$refs.form)
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.addCourse()
        } else {
          return false;
        }
      });
    },
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
