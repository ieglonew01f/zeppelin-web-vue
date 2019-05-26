<template>
    <div v-if="getNote" class="notebook">
      <div class="paragraph-container">
        <Paragraph :setActive="setActive" :class="{ active: activeParagraphId === paragraph.id }" :note="getNote" :index="index" :key="paragraph.id" v-for="(paragraph, index) in getParagraphs" :paragraph="paragraph"/>
      </div>
    </div>
</template>

<script>
import Paragraph from './paragraphs/Paragraph.vue'
import AddParagraph from './paragraphs/AddParagraph.vue'

export default {
  name: 'Notebook',
  components: {
    'Paragraph': Paragraph,
    'AddParagraph': AddParagraph
  },
  data () {
    return {
      note: null
    }
  },
  computed: {
    activeParagraphId: function () {
      let activeParagraph = this.$store.getters.getActiveParagraph

      if (!activeParagraph) {
        return
      }

      return activeParagraph.id
    },
    getNote: function () {
      return this.$store.state.notebook
    },
    getParagraphs: function () {
      return this.$store.getters.getAllParagraphs
    }
  },
  mounted: function () {

  },
  methods: {
    setActive: function (paragraph) {
      this.$store.dispatch('setActiveParagraph', paragraph)
    }
  }
}
</script>

<style scoped>
  .notebook {
    margin-top: 76px;
  }

  .paragraph-container {
    padding: 15px;
    background: #FFF;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(255, 255, 255, 0.12), 0 2px 4px -1px rgba(255, 255, 255, 0.4);
  }
</style>
