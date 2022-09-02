<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
.content-box {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
  padding: 15px;
}

.text-primary{
  color: $color-primary;
}

.text-danger{
  color:$color-danger;
}

.text-success{
  color: $color-success;
}

.text-warning{
  color:$color-warning;
}

.text-info{
  color:$color-info;
}
</style>
