<template>
    <nav class="navbar fixed-top p-0">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 p-0">
            <div class="controls-nb">
              <div class="btn-group nb-menu" role="group">
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-secondary btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    File
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">New Notebook</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Open Notebook</a>
                    <a class="dropdown-item" href="#">Upload Notebook</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Export Notebook</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Print</a>
                  </div>
                </div>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-secondary btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Edit
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" v-on:click="toggle('code')" href="javascript:void(0)">Toggle Code</a>
                    <a class="dropdown-item" v-on:click="toggle('lines')" href="javascript:void(0)">Toggle Line Numbers</a>
                    <a class="dropdown-item" v-on:click="toggle('output')" href="javascript:void(0)">Toggle Output</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" v-on:click="clearOutput()" href="javascript:void(0)">Clear All Output</a>
                  </div>
                </div>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-secondary btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Run
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" v-on:click="runAll()" href="javascript:void(0)">Run All</a>
                  </div>
                </div>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-secondary btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Tools
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="javascript:void(0)">Keyboard shortcuts</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="javascript:void(0)">Interpreters</a>
                    <a class="dropdown-item" href="javascript:void(0)">Interpreter bindings</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="javascript:void(0)">Create new interpreter</a>
                  </div>
                </div>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-secondary btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Help
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="javascript:void(0)">Feedback</a>
                    <a class="dropdown-item" href="javascript:void(0)">Report</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="javascript:void(0)">About</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
</template>

<script>
import mixin from '../../mixins/mixin.js'
export default {
  name: 'Nav',
  mixins: [mixin],
  data () {
    return {
      editorToggle: false,
      outputToggle: false,
      lineNumbersToggle: false
    }
  },
  methods: {
    toggle: function (type) {
      const websocketEvents = this.getWebSocketObject()
      let paragraphs = this.$store.getters.getAllParagraphs

      switch (type) {
        case 'code':
          for (let i = 0; i < paragraphs.length; i++) {
            paragraphs[i].config.editorHide = this.editorToggle
          }

          this.editorToggle = !this.editorToggle

          this.$store.dispatch('setParagraphs', {
            paragraphs: paragraphs
          })
          break
        case 'lines':
          for (let i = 0; i < paragraphs.length; i++) {
            paragraphs[i].config.lineNumbers = this.lineNumbersToggle
          }

          this.lineNumbersToggle = !this.lineNumbersToggle

          this.$store.dispatch('setParagraphs', {
            paragraphs: paragraphs
          })
          break
        case 'output':
          for (let i = 0; i < paragraphs.length; i++) {
            paragraphs[i].config.tableHide = this.outputToggle
          }

          this.outputToggle = !this.outputToggle

          this.$store.dispatch('setParagraphs', {
            paragraphs: paragraphs
          })
          break
      }

      for (let i = 0; i < paragraphs.length; i++) {
        websocketEvents.sendNewEvent({
          op: 'COMMIT_PARAGRAPH',
          data: {
            id: paragraphs[i].id,
            title: paragraphs[i].title,
            paragraph: paragraphs[i],
            config: paragraphs[i].config,
            params: paragraphs[i].settings.params
          }
        })
      }
    },
    clearOutput: function () {
      const websocketEvents = this.getWebSocketObject()
      const paragraphs = this.$store.getters.getAllParagraphs

      for (let i = 0; i < paragraphs.length; i++) {
        websocketEvents.sendNewEvent({op: 'PARAGRAPH_CLEAR_OUTPUT', data: {id: paragraphs[i].id}})
      }
    }
  }
}
</script>

<style scoped>
  nav {
    background-color: #FFF !important;
    display: block;
  }

  nav .logo {
    background: #096da9;
    width: 74px;
  }

  nav .logo img {
    width: 69px;
    margin-right: 10px;
  }

  nav button {
    background: white;
    border: 0;
    font-size: 13px;
    padding: 0 10px;
    color: #212428;
    border-radius: 0;
    border: 1px solid transparent !important;
    transition: none !important;
    margin-right: 1px;
    bottom: 5px;
  }

  nav button:hover,
  nav button:active,
  nav button:focus {
    background: #FFF !important;
    color: inherit !important;
    box-shadow: none !important;
    border: 1px solid transparent !important;
  }

  nav .btn-group.show button {
    border: 1px solid #bdbdbd !important;
    border-bottom-color: transparent !important;
    z-index: 1001;
  }

  nav .btn-group.show button:hover,
  nav .btn-group.show button:focus,
  nav .btn-group.show button:active {
    border: 1px solid #bdbdbd !important;
    border-bottom-color: transparent !important;
    z-index: 1001 !important;
  }

  nav h5 {
    position: relative;
    left: 10px;
  }

  nav .controls-nb {
    margin: 5px 0 0 5px;
  }

  nav .nb-menu .dropdown-menu {
    border: 1px solid #bdbdbd !important;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
    transition: none !important;
    border-radius: 0;
    top: 62% !important;
  }

  nav .nb-menu .dropdown-item {
    font-size: 12px;
  }
</style>
