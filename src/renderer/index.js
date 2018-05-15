const {ipcRenderer} = require('electron')
const {Howl} = require('howler')
const Vue = require('vue/dist/vue')

let song = null

let app = new Vue({
  el: '#app',
  data: {
    musicSelected: false
  },
  computed: {
    select: {
      get () { return song ? true : false },
      set (v) { return this.musicSelected = v }
    },
    song () {
      return new Howl({
        src: [song]
      }) 
    }
  },
  methods: {
    playMusic () {
      this.song.play()
    }
  }
})

ipcRenderer.on('music-file-path', (e, arg) => {
  song = arg
  app.select = true
})
