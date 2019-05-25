<template>
  <div class="nb-header mb-3">
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
      <div class="btn-group mr-2" role="group">
        <button type="button" class="btn btn btn-outline-secondary btn-sm">Run All</button>
        <button type="button" class="btn btn btn-outline-secondary btn-sm"><i data-feather="minimize-2"></i></button>
        <button type="button" class="btn btn btn-outline-secondary btn-sm"><i data-feather="book"></i></button>
        <button type="button" class="btn btn btn-outline-secondary btn-sm"><i data-feather="layout"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Paragraph',
  components: {

  },
  props: ['paragraph'],
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
  .nb-header {
    background: #FFF;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
  }
  svg {
    width: 16px;
  }
</style>
