<template>
    <div class="toolbar">
      <div class="controls-toolbar">
        <span class="left-controls">
          <button type="button" v-on:click="addParagraph(false)" class="btn btn-light btn-sm"><i data-feather="plus-square"></i> Add Code</button>
          <button type="button" v-on:click="addParagraph(true)" class="btn btn-light btn-sm"><i data-feather="plus-square"></i> Add Text</button>
          <span class="divider">|</span>
          <button v-on:click="move('up')" type="button" class="btn btn-light btn-sm"><i data-feather="arrow-up-circle"></i> Up</button>
          <button v-on:click="move('down')" type="button" class="btn btn-light btn-sm"><i data-feather="arrow-down-circle"></i> Down</button>
        </span>
        <span class="right-controls float-right">
          <button v-on:click="connectSparkContext" type="button" class="btn btn-light btn-sm"><i data-feather="link-2"></i> Connect</button>
          <!-- <button type="button" class="btn btn-light btn-sm connected"><i data-feather="save"></i> Saving ...</button> -->
          <button v-on:click="toggleNav" type="button" class="btn btn-light btn-sm"><i class="up" data-feather="chevron-up"></i><i class="down" data-feather="chevron-down"></i></button>
        </span>
      </div>
    </div>
</template>

<script>
import mixin from '../../mixins/mixin.js'
import uuidvtimestamp from 'uuid/v1'

export default {
  name: 'tool-bar',
  data () {
    return {

    }
  },
  mixins: [mixin],
  computed: {
    navState: {
      get () {
        return this.$store.getters.getNavBarState.isOpen
      }
    }
  },
  methods: {
    addParagraph: function (isMd) {
      let activeParagraph = this.$store.getters.getActiveParagraph

      if (!activeParagraph) return

      let paragraphs = this.$store.getters.getAllParagraphs
      let activeParagraphIndex = paragraphs.map(function (p) { return p.id }).indexOf(activeParagraph.id)
      let websocketEvents = this.getWebSocketObject()
      const paragraphId = uuidvtimestamp()

      // add to ui
      this.$store.dispatch('addParagraph', {
        index: activeParagraphIndex + 1,
        paragraphId: paragraphId,
        isMd: isMd
      })

      // for api
      websocketEvents.sendNewEvent({
        op: 'INSERT_PARAGRAPH',
        data: {
          index: activeParagraphIndex + 1,
          id: paragraphId
        }
      })
    },
    toggleNav: function () {
      this.$store.dispatch('setNavBar', {
        isOpen: !this.navState
      })
    },
    move: function (dir) {
      let activeParagraph = this.$store.getters.getActiveParagraph

      if (!activeParagraph) return

      let paragraphs = this.$store.getters.getAllParagraphs
      let activeParagraphIndex = paragraphs.map(function (p) { return p.id }).indexOf(activeParagraph.id)
      let websocketEvents = this.getWebSocketObject()
      let newIndex = null

      if (dir === 'up') {
        newIndex = parseInt(activeParagraphIndex, 10) - 1

        this.$store.dispatch('moveParagraphByIndex', {
          index: parseInt(activeParagraphIndex, 10),
          newIndex: newIndex,
          paragraph: activeParagraph
        })
      } else if (dir === 'down') {
        newIndex = parseInt(activeParagraphIndex, 10) + 1

        this.$store.dispatch('moveParagraphByIndex', {
          index: parseInt(activeParagraphIndex, 10),
          newIndex: newIndex,
          paragraph: activeParagraph
        })
      }

      websocketEvents.sendNewEvent({
        op: 'MOVE_PARAGRAPH',
        data: {
          id: activeParagraph.id,
          index: newIndex
        }
      })
    },
    connectSparkContext: function () {

    }
  }
}
</script>

<style scoped>
  .toolbar {
    position: fixed;
    width: 100%;
    margin-top: 66px;
    background: #f7f7f7;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(255, 255, 255, 0.12), 0 2px 4px -1px rgba(255, 255, 255, 0.4);
    z-index: 999;
    height: 29px
  }

  .controls-toolbar {
    margin-left: 74px;
  }

  .controls-toolbar button {
    border-radius: 0;
    border: 0;
  }

  .controls-toolbar button svg {
    width: 13px;
    height: 18px;
    position: relative;
    top: -1px;
  }

  .controls-toolbar .divider {
    color: #b5b5b5;
  }

  .controls-toolbar .connected {
    color: #2DC76D;
  }

  .controls-toolbar .right-controls .down {
    display: none;
  }
</style>
