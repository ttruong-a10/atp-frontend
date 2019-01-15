<template>
<div class="course-detail">
  <h1 class="title">{{ courseName }}</h1>
  <PodList courseName="courseName" />
</div>
</template>

<script>
import PodList from '@/components/PodList'
export default {
  props: ['courseName',],

  data() {
    return {
    }
  },

  components: {
    PodList,
  } 

}
</script>

<style lang='scss'>
.course-detail {
  .title {
    padding: 1rem 2rem;
    text-decoration: underline;
  }
}

</style>
