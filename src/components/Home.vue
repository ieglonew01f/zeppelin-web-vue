<template>
  <div class="home" :class="{ 'nav-hidden': !nav.isOpen }">
    <Nav></Nav>
    <ToolBar></ToolBar>
    <div class="container-fluid">
      <div class="row">
        <div class="col-9 pr-0">
          <Notebook/>
        </div>
        <div class="col-3">
          <SidePanel/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from './common/Nav.vue'
import SidePanel from './common/SidePanel'
import ToolBar from './common/ToolBar'
import Notebook from './notebooks/Notebook.vue'

export default {
  name: 'Home',
  components: {
    'Nav': Nav,
    'Notebook': Notebook,
    'SidePanel': SidePanel,
    'ToolBar': ToolBar
  },
  data () {
    return {

    }
  },
  computed: {
    nav: {
      get () {
        return this.$store.getters.getNavBarState
      }
    }
  }
}
</script>

<style>
  .home.nav-hidden nav {
    display: none !important;
  }

  .home.nav-hidden .toolbar {
    margin-top: 0;
  }

  .home.nav-hidden .side-panel,
  .home.nav-hidden .notebook {
    margin-top: 45px;
  }

  .home.nav-hidden .toolbar .controls-toolbar .right-controls .up {
    display: none;
  }

  .home.nav-hidden .toolbar .controls-toolbar .right-controls .down {
    display: inline !important;
  }
</style>
