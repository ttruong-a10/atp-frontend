<template>
  <div class="add-course">
    <h1>Add Course</h1>

    <el-col :span="10" :offset="6" class="form">
      <el-form 
        ref="form" 
        label-width="150px"
        label-position="left"
        :model="form"
        :rules="rules"
        >
        <el-row :gutter="50">
          <el-col :span="20">
            <el-form-item label="Course Name" prop="name" status-icon>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="Instances" prop="instances" label-width="80px">
              <el-input-number v-model="form.instances" :min="1" :max="50"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="20">
            <el-form-item label="Region" prop="region">
              <el-select v-model="form.region" 
                filterable 
                @change="location => { getImages(location); getVmSizes(location) }"
                placeholder="Search regions">

                <el-option
                  v-for="region in form.regionList"
                  :key="region.value"
                  :label="region.label"
                  :value="region.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="20">
            <el-form-item label="VM Size" prop="vmsize">
              <el-select v-model="form.vmsize" 
                filterable 
                :loading="loading.vmsize"
                placeholder="Search sizes">

                <el-option
                  v-for="size in form.vmSizeList"
                  :key="size.id"
                  :label="size.name"
                  :value="size.name">
                  <el-row>
                    <el-col :span="10">{{ size.name }}</el-col>
                    <el-col :span="7" style="color: #8492a6; font-size: 0.95em">{{ size.vcpu }} vcpu</el-col>
                    <el-col :span="7" style="color: #8492a6; font-size: 0.95em">{{ size.memory_gb }} GB Mem</el-col>
                  </el-row>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="50">
          <el-col :span="20">
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
          </el-col>
        </el-row>

        <el-form-item label="Internet Access" prop="allow_internet_access">
          <el-switch
            v-model="form.allow_internet_access"
            active-text="Allow Outbound" />
        </el-form-item>


        <el-row :gutter="50">
          <el-col :span="20">
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
          </el-col>
        </el-row>


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
          <el-button @click="$router.go(-1)">Cancel</el-button>
          <el-button type="primary" @click="onSubmit" :loading="loading.course">Submit</el-button>
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
      const url = '/courses/checkNameExists/'
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
        vmsize: false,
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
        vmsize: '',
        vmSizeList: [],
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
        region: [
          { 
            required: true, 
            message: 'Region is required.', 
            trigger: 'change' 
          },
        ],
        vmsize: [
          { 
            required: true, 
            message: 'VM Size is required.', 
            trigger: 'change' 
          },
        ],
        image_src: [
          { 
            required: true, 
            message: 'Image Source is required.', 
            trigger: 'change' 
          },
        ],
        student_access: [
          { 
            required: true, 
            message: 'Student Acces Dates are required', 
            trigger: 'change' 
          },
        ],
      },
    }
  },
  
  methods: {
    async addCourse() {
      try {
        this.loading.course = true
        const url_course = '/courses/'
        const url_pod = '/pods/'

        // add course
        let course_postdata = {
          name: this.form.name
        }
        let newCourse = await axios.post(url_course, course_postdata)

        
        // add pods
        for(let i=1; i<=this.form.instances; i++) {
          // pad the number with leading zeroes
          let podNumber = i.toString().padStart(2, '0')
          let podName = `${newCourse.data.name}_POD${podNumber}`

          // add access token
          let token_postdata = {
            name: podName,
            start_date: this.form.student_access[0],
            end_date: this.form.student_access[1]
          }

          let pod_postdata = {
            name: podName,
            course: newCourse.data.id,
            access_token: token_postdata,
          }
          await axios.post(url_pod, pod_postdata)
        }

        this.$router.push({ name: 'home'})
      }
      catch(error) {
        const response = error.response
        console.log(error)
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

    async getVmSizes(location) {
      try {
        this.loading.vmsize = true
        this.form.vmsize = ''
        if(!location) location = ''
        const url = `/sizes/${location}/`
        let resp= await axios.get(url)
        this.form.vmSizeList = resp.data
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
        this.loading.vmsize = false
      } 
    },

    async getImages(location) {
      try {
        this.loading.image = true
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

    .el-row {
      padding: 0.3rem 0;
    }
    .el-input-number {
      width: 160px;
    }
    .el-select {
      width: 100%;
    }
  }
}
</style>
