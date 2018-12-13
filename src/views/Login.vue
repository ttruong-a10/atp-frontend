<template>
<div class="login">
  <el-row type="flex" justify="center">
    <el-col :xs="16" :sm="16" :md="8">
      <div class="login--box">
        <h2>Please login</h2>

        <el-alert
          class="alert"
          :title="errors.code"
          :description="errors.message"
          type="error"
          show-icon
          @close="showAlert = false"
          v-show="showAlert"/>

        <el-input
          :class="{ 'input-error': $v.username.$error }"
          size="large"
          type="text"
          placeholder="username"
          prefix-icon="fas fa-user"
          v-model.trim="$v.username.$model"/>
        <div class="form-error" v-if="$v.username.$error">Username is required</div>

        <el-input
          :class="{ 'input-error': $v.password.$error }"
          size="large"
          type="password"
          placeholder="password"
          prefix-icon="fas fa-key"
          v-model.trim="$v.password.$model"
          @keyup.enter.native="onSubmit" />
        <div class="form-error" v-if="$v.password.$error">Password is required</div>

        <div class="content-center" >
          <el-button type="primary" class="btn-login" @click="onSubmit">Login</el-button>
        </div>



      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      showAlert: false,
      errors: {
        code: '',
        message: ''
      },
    }
  },
  validations: {
    username: { required },
    password: { required }
  },
  methods: {
    onSubmit() {
      const formData = {
        username: this.username,
        password: this.password,
        email: 'ttruong@gmail.com'
      }
      const url = 'http://127.0.0.1:8000/rest-auth/login/'

      this.$v.$touch()
      if (!this.$v.$invalid) {
        alert('posted!')
        axios.post(url, formData)
          .then(res => {
            // Authenticate
            let token = res.data.key
            this.$store.commit('authenticate', { token: token })
            console.log(this.$store.state.authenticated)

            // Redirect
            this.$router.replace(this.$route.query.from)
          })
          // .catch(error => console.log(error.response))
          .catch(error => {
              if(error.response) {
                let code = `Login failed: ${error.response.status} ${error.response.statusText}`
                this.showAlert = true
                this.errors.code = code 
                if (error.response.data.non_field_errors) {
                  this.errors.message = error.response.data.non_field_errors.join(' ')
                } else { this.errors.message = ''}
              }
          })
      }
    }
  },
  mounted() {
    console.log(this.$store.state.authenticated)
  }
}
</script>

<style lang='scss'>
.login {
  // background: #4e54c8;  /* fallback for old browsers */
  // background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
  // background: linear-gradient(to left, #8f94fb, #4e54c8);
  background-image: url('https://images.pexels.com/photos/953214/pexels-photo-953214.jpeg');
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;

  &--box {
    background: inherit;
    border-radius: 0.2rem;
    margin-top: 20vh;
    padding: 2rem;
    position: relative;
    overflow: hidden;

    &:before {
       content: '';
      background: inherit; 
      position: absolute;
      left: 0;  //giving minus -25px left position
      right: 0;
      top: 0;   //giving minus -25px top position 
      bottom: 0;
      box-shadow: inset 0 0 0 200px rgba(255,255,255,0.3);
      // filter: blur(10px);
    }
  }
  input {
    font-family: var(--ffamily-second);
    font-size: 1rem;
  }

  h2 {
    // color: #2c2d30;
    color: #fff;
    text-align: center;
    margin-bottom: 2rem;
    font-family: var(--ffamily-primary);
    font-weight: 500;
    font-size: 1.6rem;

  }

  .alert {
    margin: 1rem 0;
  }

  .form-error {
    color: #70000e;
    font-size: 0.9em;
    font-weight: 800;
    padding-left: 0.2rem;
    padding: 0.3rem 0.5rem;
    font-family: var(--ffamily-primary);

  }

  .input-error {
    border: 2px solid red;
    border-radius: 0.3rem;
  }

  .el-input {
    margin-top: 1rem;
    z-index: 2;

    &--prefix .el-input__inner {
      padding-left: 40px;
    }
    &__icon {
      color: #047AB4;
    }
  }

  .btn-login {
    margin-top: 2rem;
    z-index: 2;
  }

  .content-center {
    display: flex;
    justify-content: center;
  }

}
</style>