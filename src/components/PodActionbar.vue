<template>
<div class="pod-actionbar">
  <el-button-group>
    <el-button :disabled="isActionBtnDisabled" type="primary" icon="fas fa-play" plain round @click="startHandler">Start</el-button>
    <el-button :disabled="isActionBtnDisabled" type="primary" icon="fas fa-redo-alt" plain @click="restartHandler">Restart</el-button>
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
    name: 'PodActionbar',

    computed: {
      ...mapState({
        selection: state => state.pods.podSelection, 
        podTable: state => state.pods.podTable,
      }),
      isActionBtnDisabled() {
        if (!Array.isArray(this.selection) || this.selection.length === 0) {
          return true
        } 
      }
    },

    methods: {
      ...mapActions([
        'deletePod',
        'getPods',
      ]),
      ...mapMutations({
        'updateSelection': 'SELECT_PODS',
      }),

      deleteHandler() {
        this.$confirm(
          `This will delete the following pod(s)! Continue?`,
          'Warning',
          { type: 'warning' }
        ).then(() => {
          Object.keys(this.selection).forEach( async key => {
            const podSlug = this.selection[key].slug
            const podName = this.selection[key].name

            try {
              await this.deletePod(podSlug)
            }
            catch(error) {
              console.log(error)
              const code = error.status
              const codeMsg = error.statusText
              const msg = error.data.join('. ')
              this.$notify({
                title: `${podName} - Delete Failed`,
                message: `${msg} : ${code} ${codeMsg}`,
                type: 'error',
                duration: 0
              })
            }
            finally {
              // Uncheck checkboxes
              this.podTable.clearSelection()
              this.getPods()
            }
          })
        })
        .catch(() => {
        })
      },

      startHandler() {
        Object.keys(this.selection).forEach( async key => {
          const podSlug = this.selection[key].slug
          const podName = this.selection[key].name
          const url = `/pods/${podSlug}/action/start/`

          try {
            await axios.post(url)
            this.$notify({
              title: `${podName} - Start successful`,
              type: 'success',
            })
          }
          catch(error) {
            const code = error.response.status
            const msg = error.response.statusText
            this.$notify({
              title: `${podName} - Start Failed`,
              message: `${code} ${msg}`,
              type: 'error',
              duration: 0
            })
          }
          finally {
            // Uncheck checkboxes
            this.podTable.clearSelection()
          }
        })
      },

      stopHandler() {
        Object.keys(this.selection).forEach( async key => {
          const podSlug = this.selection[key].slug
          const podName = this.selection[key].name
          const url = `/pods/${podSlug}/action/stop/`

          try {
            await axios.post(url)
            this.$notify({
              title: `${podName} - Stop successful`,
              type: 'success',
            })
          }
          catch(error) {
            const code = error.response.status
            const msg = error.response.statusText
            this.$notify({
              title: `${podName} - Stop Failed`,
              message: `${code} ${msg}`,
              type: 'error',
              duration: 0
            })
          }
          finally {
            // Uncheck checkboxes
            this.podTable.clearSelection()
          }
        })
      },

      restartHandler() {
        Object.keys(this.selection).forEach( async key => {
          const podSlug = this.selection[key].slug
          const podName = this.selection[key].name
          const url = `/pods/${podSlug}/action/restart/`

          try {
            await axios.post(url)
            this.$notify({
              title: `${podName} - Restart successful`,
              type: 'success',
            })
          }
          catch(error) {
            const code = error.response.status
            const msg = error.response.statusText
            this.$notify({
              title: `${podName} - Restart Failed`,
              message: `${code} ${msg}`,
              type: 'error',
              duration: 0
            })
          }
          finally {
            // Uncheck checkboxes
            this.podTable.clearSelection()
          }
        })
      }
  }
}
</script>


<style lang="scss">
.pod-actionbar {
  margin: 1rem 0;

  .fas {
    font-size: 0.9em;
    padding-right: 0.5rem;
  }
  
}
</style>