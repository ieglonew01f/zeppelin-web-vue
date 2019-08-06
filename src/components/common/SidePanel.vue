<template>
  <div class="side-panel">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" v-bind:class="{ active: activeTab === 'paragraphs' }" v-on:click="sideTabClick('paragraphs')" href="javascript:void(0)">Paragraphs</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" v-bind:class="{ active: activeTab === 'toc' }" v-on:click="sideTabClick('toc')" href="javascript:void(0)">Table of Content</a>
      </li>
    </ul>
    <draggable v-show="activeTab === 'paragraphs'" v-model="paragraphs" draggable=".mini-paragraph" class="item-list">
      <div v-bind:key="paragraph.id" v-for="paragraph in paragraphs" class="mini-paragraph">
        <div v-if="getParagraphLoading(paragraph)" class="progress">
          <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 100%"></div>
        </div>
        <MiniParagraph :paragraph="paragraph"/>
      </div>
    </draggable>
    <div v-show="activeTab === 'toc'" class="toc">
      <div v-on:click="jumpTo(index)" v-bind:key="index" v-for="(t, index) in toc" class="toc-content p-2">
        {{t}}
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import MiniParagraph from '../notebooks/paragraphs/MiniParagraph.vue'

export default {
  name: 'side-panel',
  components: {
    Draggable,
    MiniParagraph
  },
  props: [''],
  data () {
    return {
      activeTab: 'paragraphs'
    }
  },
  computed: {
    toc: function () {
      // to generate entire notebook
      // toc
      // 1) get all the paragraphs
      // 2) filter the ones which have outputs and are md paras
      // 3) itrate over those paras
      // 4) detect heading tags
      // 5) make a list using the tags

      let paragraphs = this.$store.getters.getAllParagraphs
      let headings = []

      if (!paragraphs) {
        return
      }

      paragraphs.forEach(paragraph => {
        if (paragraph.results &&
        paragraph.results.msg &&
        paragraph.results.msg[0] &&
        paragraph.results.msg[0].type.toLowerCase() === 'html') {
          var el = document.createElement('html')
          el.innerHTML = paragraph.results.msg[0].data

          let headingTags = el.querySelectorAll('h1, h2, h3, h4, h5, h6')

          if (headingTags) {
            headingTags.forEach(tag => {
              headings.push(tag.innerText)
            })
          }
        }
      })

      return headings
    },
    getParagraphLoading: function () {
      return function (paragraph) {
        const {id} = paragraph
        const isLoading = this.$store.getters.isParagraphLoading(id)

        return isLoading
      }
    },
    paragraphs: {
      get () {
        return this.$store.getters.getAllParagraphs
      },
      set (value) {
        this.$store.dispatch('setParagraphs', {
          paragraphs: value
        })
      }
    }
  },
  methods: {
    sideTabClick: function (tab) {
      this.activeTab = tab
    },
    jumpTo: function (index) {
      let tags = window.$('.md-paragraph h1, .md-paragraph h2, .md-paragraph h3, .md-paragraph h4, .md-paragraph h5, .md-paragraph h6')

      window.$([document.documentElement, document.body]).animate({
        scrollTop: window.$(tags[index]).offset().top - 70
      }, 100)
    }
  },
  mounted: function () {

  },
  updated: function () {
  }
}
</script>

<style scoped>
  .side-panel {
    margin-top: 76px;
    background: #FFF;
    height: 100%;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(255, 255, 255, 0.12), 0 2px 4px -1px rgba(255, 255, 255, 0.4);
    position: fixed;
    float: right;
    width: 23.5%;
    border: 1px solid #dee2e6;
  }

  .nav-link {
    border-color: #fff #dee2e6 #dee2e6 #fff;
  }

  .nav-link.active {
    border-radius: 0;
    border-color: #fff #dee2e6 #fff #fff;
  }

  .nav-tabs .nav-link:hover,
  .nav-tabs .nav-link:focus {
    border-radius: 0;
    border-color: #fff #dee2e6 #dee2e6 #fff;
  }

  .nav-tabs .nav-link.active:hover,
  .nav-tabs .nav-link.active:focus {
    border-radius: 0;
    border-color: #fff #dee2e6 #fff #fff;
  }

  .side-panel .header {
    font-size: 13px;
    border-bottom: 1px solid #e6e6e6;
    background: rgb(236, 236, 236);
  }

  .side-panel .header ul > li {
    cursor: pointer;
    padding: 8px 13px !important;
    margin: 0;
    border-bottom: 2px solid transparent;
  }

  .side-panel .header ul > li.active {
    border-bottom: 2px solid #525252;
  }

  .side-panel .header ul > li:hover {
    border-bottom: 2px solid #525252;
  }

  .side-panel .item-list {
    padding: 10px;
    overflow-y: auto;
    max-height: 100%;
    padding-bottom: 130px;
  }

  .side-panel .mini-paragraph {
    border: 1px dashed #e4e4e4;
    margin-bottom: 5px;
    border-radius: 2px;
    font-size: 13px;
    cursor: pointer;
  }

  .side-panel .mini-paragraph:hover {
    background: #F2FAFF;
  }

  .side-panel .toc {
    padding: 10px;
  }

  .side-panel .toc-content {
    padding: 10px 10px;
    margin-bottom: 5px;
    border-radius: 3px;
    font-size: 13px;
    cursor: pointer;
  }

  .side-panel .toc-content:hover {
    background: #F2FAFF;
  }

  .progress {
    height: 7px;
    width: 43px;
    -webkit-transform: translate(50%, 50%) rotate(90deg);
    transform: translate(50%, 50%) rotate(90deg);
    position: relative;
    display: inline-flex;
    top: 11px;
    float: left;
    right: 50px;
    margin-top: -7px;
  }
</style>
