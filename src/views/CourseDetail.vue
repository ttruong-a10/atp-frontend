<template>
<div class="course-detail">
  Course Detail {{ $route.params.courseName }}
</div>
</template>

<script>
export default {
  props: ['courseName',]

}
</script>

<style>

</style>
