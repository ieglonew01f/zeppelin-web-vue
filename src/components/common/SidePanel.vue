<template>
  <div class="side-panel">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" href="#">Paragraphs</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Table of Content</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Versions</a>
      </li>
    </ul>
    <draggable v-model="paragraphs" draggable=".mini-paragraph" class="item-list">
      <div v-bind:key="paragraph.id" v-for="paragraph in paragraphs" class="mini-paragraph">
        <div v-if="getParagraphLoading(paragraph)" class="progress">
          <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 100%"></div>
        </div>
        <MiniParagraph :paragraph="paragraph"/>
      </div>
    </draggable>
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
    }
  },
  computed: {
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
    overflow-y: scroll;
    max-height: 100%;
    padding-bottom: 130px;
  }

  .side-panel .mini-paragraph {
    padding: 10px 10px;
    border: 1px solid #f9f9f9;
    margin-bottom: 5px;
    background: #f9f9f9;
    border-radius: 3px;
    font-size: 13px;
    cursor: pointer;
  }

  .side-panel .mini-paragraph:hover {
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
