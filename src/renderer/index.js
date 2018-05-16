const {ipcRenderer} = require('electron')
const {Howl} = require('howler')
const Vue = require('vue/dist/vue')

let song = null

let app = new Vue({
  el: '#app',
  data: {
    musicSelected: false,
    player: null,
    trackList: [],
    trackName: null
  },
  computed: {
    select: {
      get () { return song ? true : false },
      set (v) { return this.musicSelected = v }
    },
    song () {
      return new Howl({
        src: [this.audio]
      }) 
    }
  },
  methods: {
    playMusic () {
      this.player.play()
    }
  },
  mounted() {
    // listen for events on the renderer process
    ipcRenderer.on('sentMusicTracks', (e, arg) => {
      let playlist = []
      this.trackList = arg.files

      // loop through track-list creating a playlist
      for (let i=0; i < this.trackList.length; i ++) {
        playlist.push({
          title: `${arg.path}/${this.trackList[i]}`,
          file: `${arg.path}/${this.trackList[i]}`,
          howl: null,
          name: this.trackList[i]
        })
      }

      this.player = new Player(this, playlist)
      this.musicSelected = true
    })

    // build the player
    let Player = function (vm, playlist) {
      // initialize the vue instance
      this.vm = vm
      this.index = 0
      this.playlist = playlist
    }
    Player.prototype = {
      play (index) {
        let self = this
        let sound = null
        let track = null

        index = typeof index === 'number' ? index : self.index
        track = self.playlist[index]
        this.vm.trackName = track
        
        if (track.howl) {
          sound = track.howl
        }
        else {
          sound = track.howl = new Howl({
            src: [track.file],
            html5: true
          })
        }
        sound.play()
        self.index = index
      },
      pause () {
        let self = this
        let sound = self.playlist[self.index].howl
        sound.pause()
      },
      skip (direction) {
        let self = this

      }
    }
  }
})
