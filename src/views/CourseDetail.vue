<template>
<div class="course-detail">
  <div class="container">
    <PodActionbar/>
  </div>
  <PodList courseName="courseName" />
</div>
</template>

<script>
import PodList from '@/components/PodList'
import PodActionbar from '@/components/PodActionbar'
export default {
  props: ['courseName',],

  data() {
    return {
    }
  },

  components: {
    PodActionbar,
    PodList
  } 

}
</script>

<style lang='scss'>
.course-detail {
  .title {
    padding: 1rem 2rem;
    text-decoration: underline;
  }

  .container {
    display: flex;
    flex-direction: column;
    // justify-content: flex-end;
    align-items: flex-end;
    max-width: 80rem;
    margin: 3rem auto;
  }
}

</style>
