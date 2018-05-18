const {ipcRenderer} = require('electron')
const {Howl} = require('howler')
const Vue = require('vue/dist/vue')

let app = new Vue({
  el: '#app',
  data: {
    player: null,
    tracks: [],
    track: {
      name: null,
      playing: false,
      length: 0
    }
  },
  computed: {
    length () {
      return this.player ? this.player.song.length : '0.00'
    },
    name () {
      return this.player ? this.player.song.name : this.track.name
    }
  },
  methods: {
    playMusic () {
      
      if (!this.track.playing) {
        
        if (this.player) {
          this.player.play()
          this.track.playing = true
        }
      }
      else {
        this.track.playing = false
        
        if (this.player) {
          this.player.pause()
        }
      }
    }
  },
  mounted() {
    // listen for events on the renderer process
    ipcRenderer.on('sentMusicTracks', (e, arg) => {
      let playlist = []
      this.tracks = arg.files

      // loop through track-list creating a playlist
      for (let i=0; i < this.tracks.length; i ++) {
        playlist.push({
          title: `${arg.path}/${this.tracks[i]}`,
          file: `${arg.path}/${this.tracks[i]}`,
          howl: null,
          name: this.tracks[i]
        })
      }

      this.player = new Player(this, playlist)

      // copy data from player object to vue instance
      if (this.player) {
        Object.assign(this.$data.track, this.player.song)
      }
    })

    // build the player
    let Player = function (vm, playlist) {
      // initialize the vue instance
      this.vm = vm
      this.song = {}
      this.index = 0
      this.playlist = playlist
    }
    Player.prototype = {
      formatTime (secs) {
        let minutes = Math.floor(secs/60) || 0
        let seconds = (secs - minutes * 60) || 0

        return `${minutes}:${(seconds < 10 ? 0 : '')}${seconds}`
      },
      play (index) {
        let self = this
        let sound = null
        let track = null

        index = typeof index === 'number' ? index : self.index
        track = self.playlist[index]
        Vue.set(self.song, 'name', track.name)
        
        if (track.howl) {
          sound = track.howl
        }
        else {
          sound = track.howl = new Howl({
            src: [track.file],
            html5: true,
            onplay () {
              let duration = 0
              duration = self.formatTime(Math.round(sound.duration()))
              Vue.set(self.song, 'length', duration)
              requestAnimationFrame(self.step.bind(self))
            },
            onend () {
              self.skip('right')
            }
          })
        }
        Object.assign(this, self)
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
        let index = 0

        if (direction === 'prev') {
          index = self.index -1

          if (index < 0) {
            index = self.playlist.length -1
          }
        }
        else if (direction === 'next') {
          index = self.index +1

          if (index == self.playlist.length) {
            index = 0
          }
        }
        self.skipTo(index)
      },
      skipTo (index) {
        let self = this

        if (self.playlist[self.index].howl) {
          self.playlist[self.index].howl.stop()
        }
        self.play(index)
      },
      seek (time) {
        let self = this
        let sound = self.playlist[self.index].howl

        if (sound.playing()) {
          sound.seek(sound.duration() * time)
        }
      },
      step () {
        let self = this
        let sound = self.playlist[self.index].howl
        let seek = sound.seek() || 0
        let progress = this.vm.$refs.progress

        progress.setAttribute('style', `width: ${(((seek / sound.duration()) * 100) || 0)}%`)

        if (sound.playing()) {
          requestAnimationFrame(self.step.bind(self))
        }
      }
    }
  }
})
