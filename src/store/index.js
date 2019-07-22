import Vue from 'vue'
import Vuex from 'vuex'
// import _ from 'underscore'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    notebooks: null,
    notebook: null,
    paragraphs: null,
    nav: {
      isOpen: true
    },
    activeParagraph: null
  },
  getters: {
    getAllNotebooks: (state) => {
      return state.notebooks
    },
    getActiveParagraph: (state) => {
      return state.activeParagraph
    },
    getNavBarState: (state) => {
      return state.nav
    },
    getParagraphById: (state) => (id) => {
      return state.paragraphs.find(p => p.id === id)
    },
    getAllParagraphs: (state) => {
      return state.paragraphs
    },
    isParagraphLoading: (state) => (id) => {
      let paragraph = state.paragraphs.find(p => p.id === id)
      let status = paragraph.status.toLowerCase()

      if (status === 'pending' || status === 'running') {
        return true
      }

      return false
    },
    isParagraphCreating: (state) => (id) => {
      let paragraph = state.paragraphs.find(p => p.id === id)
      let status = paragraph.status.toLowerCase()

      if (status === 'init') {
        return true
      }

      return false
    }
  },
  mutations: {
    mutateActiveParagraph (state, data) {
      state.activeParagraph = data
    },
    mutateNavBar (state, data) {
      state.nav = data
    },
    mutateNotes (state, data) {
      state.notebooks = data.notes
    },
    mutateNotebook (state, data) {
      let note = data.note
      let paragraphs = note.paragraphs

      // set notebook state
      state.notebook = note

      // set paragraphs state
      state.paragraphs = paragraphs
      state.activeParagraph = paragraphs[0]
    },
    setParagraphs (state, data) {
      state.paragraphs = data.paragraphs
    },
    addParagraph (state, data) {
      let paragraphs = state.paragraphs
      paragraphs.splice(data.index, 0, data.paragraph)
      state.paragraphs = paragraphs
    },
    removeParagraph (state, data) {
      let paragraphs = state.paragraphs
      let index = state.paragraphs.map(function (p) { return p.id }).indexOf(data.id)
      paragraphs.splice(index, 1)
      state.paragraphs = paragraphs
    },
    mutateParagraphs (state, data) {
      let id = data.paragraph.id
      let index = state.paragraphs.map(function (p) { return p.id }).indexOf(id)

      let paragraph = state.paragraphs[index]

      // if paragraph do not exist
      // it means it was not added from this context
      // some one else has opened the same notebook and
      // is adding paragraph

      if (!paragraph && data.index) {
        let paragraphs = state.paragraphs
        paragraphs.splice(data.index, 0, data.paragraph)
        state.paragraphs = paragraphs
        return
      }

      if (!paragraph.forceEditorShow) {
        Vue.set(state.paragraphs, index, data.paragraph)
      }
    },
    mutateParagraphsWithNewProps (state, data) {
      let id = data.id
      let index = state.paragraphs.map(function (p) { return p.id }).indexOf(id)
      let paragraph = state.paragraphs.find(p => p.id === id)

      Vue.set(paragraph, data.prop.name, data.prop.value)
      Vue.set(state.paragraphs, index, paragraph)
    },
    moveParagraph (state, data) {
      let newIndex = data.newIndex
      let index = data.index
      let paragraphs = state.paragraphs

      // remove old index
      paragraphs.splice(index, 1)
      paragraphs.splice(newIndex, 0, data.paragraph)

      state.paragraphs = paragraphs
    }
  },
  actions: {
    moveParagraphByIndex (context, data) {
      context.commit('moveParagraph', data)
    },
    setActiveParagraph (context, data) {
      context.commit('mutateActiveParagraph', data)
    },
    setNavBar (context, data) {
      context.commit('mutateNavBar', data)
    },
    setNoteMenu (context, data) {
      context.commit('mutateNotes', data)
    },
    setNotebookContent (context, data) {
      context.commit('mutateNotebook', data)
    },
    setParagraphs (context, data) {
      context.commit('setParagraphs', data)
    },
    setParagraph (context, data) {
      context.commit('mutateParagraphs', data)
    },
    setParagraphProp (context, data) {
      context.commit('mutateParagraphsWithNewProps', data)
    },
    addParagraph (context, data) {
      let paragraph = {
        config: {},
        id: data.paragraphId,
        jobName: '',
        progressUpdateIntervalMs: 1000,
        settings: {
          forms: {},
          params: {}
        },
        status: 'INIT',
        text: '',
        version: 'v0'
      }

      if (data.isMd) {
        paragraph.text = '%md'
        paragraph.forceEditorShow = true
        paragraph.result = {
          type: 'HTML'
        }
      }

      context.commit('addParagraph', {
        index: data.index,
        paragraph: paragraph
      })
    },
    removeParagraph (context, data) {
      context.commit('removeParagraph', data)
    }
  }
})

export default store
