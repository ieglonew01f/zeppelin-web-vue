<template>
  <div class="add-paragraph mb-1">
    <div class="in"></div>
    <div class="options-x">
      <span v-on:click="addParagraph(false)" class="add-options"><i data-feather="code" class="add-icon"></i> Code</span>
      <span v-on:click="addParagraph(true)" class="add-options"><i data-feather="edit-3" class="add-icon"></i> Text</span>
    </div>
  </div>
</template>

<script>
import mixin from '../../../mixins/mixin.js'
import uuidvtimestamp from 'uuid/v1'

export default {
  name: 'add-paragraph',
  mixins: [mixin],
  components: {

  },
  props: ['index'],
  data () {
    return {

    }
  },
  methods: {
    addParagraph: function (isMd) {
      let index = this.index
      let websocketEvents = this.getWebSocketObject()
      const paragraphId = uuidvtimestamp()

      // add to ui
      this.$store.dispatch('addParagraph', {
        index: index + 1,
        paragraphId: paragraphId,
        isMd: isMd
      })

      // for api
      websocketEvents.sendNewEvent({
        op: 'INSERT_PARAGRAPH',
        data: {
          index: index + 1,
          id: paragraphId
        }
      })
    }
  },
  mounted: function () {

  }
}
</script>

<style scoped>
  .add-paragraph {
    position: relative;
    z-index: 5;
    margin-top: -35px;
    top: 7px;
    text-align: center;
  }

  .add-paragraph:hover .in,
  .add-paragraph:hover .options-x {
    visibility: visible;
  }

  .add-icon {
    color: #007bff;
    position: relative;
    bottom: 1px;
    width: 14px;
  }

  .in {
    border: 1px solid #dfdfdf;
    visibility: hidden;
    margin: auto;
    width: 300px;
    position: relative;
    top: 14px;
    z-index: -1;
  }

  .options-x {
    visibility: hidden;
  }

  .options-x .add-options {
    padding: 4px 10px;
    border: 1px solid #e2e2e2;
    background: #FFF;
    cursor: pointer;
    font-size: 13px;
    border-radius: 3px;
  }

  .options-x .add-options:hover {
    border-color: #1e8aff;
  }
</style>
