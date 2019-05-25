<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import mixin from './mixins/mixin.js'
export default {
  name: 'App',
  mixins: [mixin],
  mounted: function () {
    // init icons
    setTimeout(function () {
      const feather = require('feather-icons')
      feather.replace()
    }, 1000)

    // auth stuff
    this.auth()
  }
}
</script>

<style>
  body {
    background: #f8f8f8;
  }
</style>
