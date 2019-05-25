<template>
  <div v-on:click="setActive(paragraph)" :id="'paragraph-' + paragraph.id" class="paragraph-main">
    <div class="paragraph mb-3">
      <div class="paragraph-body">
        <h5 v-if="!isHTML">{{paragraph.title}}</h5>
        <Editor :paragraph="paragraph"/>
        <Results :result="result" :paragraph="paragraph"/>
      </div>
    </div>
    <AddParagraph :index="index"/>
  </div>
</template>

<script>
import Results from './Results.vue'
import AddParagraph from './AddParagraph.vue'
import Editor from './Editor.vue'

export default {
  name: 'Paragraph',
  components: {
    'Editor': Editor,
    'Results': Results,
    'AddParagraph': AddParagraph
  },
  props: ['index', 'paragraph', 'note', 'setActive'],
  data () {
    return {
      result: this.$props.paragraph.result
    }
  },
  computed: {
    isHTML: function () {
      const {id} = this.$props.paragraph
      const paragraph = this.$store.getters.getParagraphById(id)

      if (paragraph.result && paragraph.result.type.toLowerCase() === 'html') {
        return true
      }

      return false
    }
  },
  methods: {

  }
}
</script>

<style scoped>
  .paragraph-main {
    padding-top: 70px;
    margin-top: -70px;
  }

  .paragraph {
    padding: 10px;
  }

  .paragraph-main.active .paragraph {
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(255, 255, 255, 0.4);
  }
</style>
