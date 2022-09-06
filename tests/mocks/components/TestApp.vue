<template>
  <div id="test">
    <div class="container">
      <router-view :key="$route.name" />
    </div>
  </div>
</template>
<script>
export default {
  name: "TestApp",
};
</script>
