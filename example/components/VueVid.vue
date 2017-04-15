<template>
    <div>
        <div class="VueVid" v-if="sources" ref="videoWrap">
            <!-- Main Video Element Wrap -->
            <div class="VueVid__video">
                <!-- If User pass few mime-types then loop over them and assign correct to each source element -->
                <video 
                    v-if="Array.isArray(sources)"
                    @timeupdate="handleProgress" 
                    @click="togglePlay" 
                    ref="videoEl"
                    :poster="poster"
                >
                    <source v-for="source in sources" :src="source" :type="'video/' + getType(source)"></source>
                </video>
                <!-- In case user pass video from other service as String, just assign src attribute to video -->
                <video 
                    v-else
                    :src="sources"
                    @timeupdate="handleProgress" 
                    @click="togglePlay" 
                    ref="videoEl"
                    :poster="poster"
                >
                </video> 

            </div>
            <!-- Video Controls -->
            <div class="VueVid__controls">
                <div 
                    class="Progress" 
                    ref="progress" 
                    @click="scrub($event)" 
                    @mousemove="isMouseDown && scrub($event)" 
                    @mousedown="isMouseDown = true" 
                    @mouseup="isMouseDown = false"
                >
                    <div class="Progress__filled" :style="{ 'flex-basis':  progressActivity + '%'  }"></div>
                </div>
                <button class="VueVid__button toggle" title="Toggle Play" @click="togglePlay">
                    <span v-if="isPlaying">
                        <span class="fa fa-pause"></span>
                    </span>
                    <span v-else>
                        <span class="fa fa-play"></span>
                    </span>
                </button>
                <input 
                    type="range" 
                    @change="handleRangeUpdate('volume', volumeValue)" 
                    class="VueVid__slider" 
                    min="0" 
                    max="1" 
                    step="0.05" 
                    v-model="volumeValue"
                >
                <input 
                    type="range" 
                    @change="handleRangeUpdate('playbackRate', playbackRateValue)" 
                    class="VueVid__slider" 
                    min="0.5" 
                    max="2" 
                    step="0.1" 
                    v-model="playbackRateValue"
                >
                <button @click="skip(skipBackward)" class="VueVid__button skip--back">
                    <span class="fa fa-backward"></span> {{ Math.abs(skipBackward) }}s
                </button>
                <button @click="skip(skipForward)" class="VueVid__button" id="skip-for">
                    {{ skipForward  }}s <span class="fa fa-forward"></span>
                </button>
                <button @click="toggleFullScreen" class="VueVid__button">
                    <span class="fa fa-arrows-alt"></span>
                </button>
    
            </div>
        </div>
    </div>
</template>

<script> 
    
    export default {
        
        name: 'VueVid',
   
        props: {
            sources: {
                type: [String, Array]
            },
            skipBackward: {
                type: Number,
                default: -10
            },
            skipForward: {
                type: Number,
                default: 25
            },
            poster: String,
            autoPlay: {
                type: Boolean,
                default: false
            }
        },

        mounted() {
            if(this.autoPlay) {
                this.togglePlay()  
            } 
        },

        data() {
            return {
                isPlaying: false,
                progressActivity: 0,
                volumeValue: 1,
                playbackRateValue: 1,
                isMouseDown: false
            }
        },

        methods: {
            togglePlay() {
                this.$refs.videoEl.paused ? this.$refs.videoEl.play() : this.$refs.videoEl.pause()
                this.updateButton()
            },
            updateButton() {
                this.isPlaying = !this.isPlaying
            },
            skip(value) { 
                this.$refs.videoEl.currentTime += parseFloat(value)
            },
            handleProgress() {
                if (this.$refs.videoEl.currentTime) {  
                    const percent = (this.$refs.videoEl.currentTime / this.$refs.videoEl.duration) * 100
                    this.progressActivity = percent 
                }
            },
            handleRangeUpdate(name, value) {
                this.$refs.videoEl[name] = value
            },
            scrub(e) {
                const scrubTime = (e.offsetX / this.$refs.progress.offsetWidth) * this.$refs.videoEl.duration
                this.$refs.videoEl.currentTime = scrubTime
            },
            toggleFullScreen() {
                if(this.$refs.videoWrap.mozRequestFullScreen) {
                    this.$refs.videoWrap.mozRequestFullScreen()
                } else {
                    this.$refs.videoWrap.webkitRequestFullScreen()
                } 
            },
            getType(path) {
                const pattern = /\.[0-9a-z]+$/i
                return path.match(pattern)[0].slice(1)
            }
        }

    }

</script>

<style>
    .VueVid {
        max-width:750px;
        border:5px solid rgba(0,0,0,0.2);
        box-shadow:0 0 20px rgba(0,0,0,0.2);
        position: relative;
        font-size: 0;
        overflow: hidden;
    }
    .VueVid:fullscreen {
        max-width:none;
        width:100%;
        border:0;
    }
    .VueVid:-webkit-full-screen {
        max-width:none;
        width:100%;
    }
    .VueVid__video  video {
        width:100%;
        object-fit:cover;
    }
    .VueVid__button {
        background:none;
        border:0;
        line-height:1;
        color:white;
        text-align: center;
        outline:0;
        padding: 0;
        cursor:pointer;
        max-width:50px;
     }
     .VueVid__button:focus {
        border-color:#ffc600;    
     }
     .VueVid__slider {
        width:10px;
        height: 30px;
     }
    .VueVid__replay {
        display:flex;
        position:absolute;
        top:0;
        bottom:0;
        flex-wrap:wrap;
        background:rgba(0,0,0,0.7);
        width:100%;
     }
     .VueVid__controls {
         display:flex;
         position:absolute;
         bottom:0;
         width: 100%;
         transform:translateY(100%) translateY(-5px);
         transition:all .3s;
         flex-wrap:wrap;
         background:rgba(0,0,0,0.1);
     }
     .VueVid:hover .VueVid__controls {
         transform:translateY(0);
     }
     .VueVid:hover .Progress {
         height:15px;
     }
     .VueVid__controls > *  {
         flex:1;
     }
     .Progress {
        flex:10;
        position: relative;
        display:flex;
        flex-basis:100%;
        height:5px;
        transition:height 0.3s;
        background:rgba(0,0,0,0.5);
        cursor:ew-resize;
     }
     .Progress__filled {
        width:50%;
        background:#41B883;
        flex:0;
        flex-basis:50%;
     }
     input[type=range] {
        -webkit-appearance: none;
        background:transparent;
        width: 100%;
        margin: 0 5px;
     }
     input[type=range]:focus {
        outline: none;
     }
     input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 8.4px;
        cursor: pointer;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
        background: rgba(255,255,255,0.8);
        border-radius: 1.3px;
        border: 0.2px solid rgba(1, 1, 1, 0);
     }
     input[type=range]::-webkit-slider-thumb {
        height: 15px;
        width: 15px;
        border-radius: 50px;
        background: #41B883;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -3.5px;
        box-shadow:0 0 2px rgba(0,0,0,0.2);
     }
     input[type=range]:focus::-webkit-slider-runnable-track {
        background: #41B883;
     }
     input[type=range]::-moz-range-track {
        width: 100%;
        height: 8.4px;
        cursor: pointer;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
        background: #ffffff;
        border-radius: 1.3px;
        border: 0.2px solid rgba(1, 1, 1, 0);
     }
     input[type=range]::-moz-range-thumb {
        box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(13, 13, 13, 0);
        height: 15px;
        width: 15px;
        border-radius: 50px;
        background: #fff;
        cursor: pointer;
     }
</style>
