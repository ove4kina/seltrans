<template lang="pug">
    include ../../tools/mixins.pug
    +b.video(:class="{'stoped': statuses.stop, 'unhovered': statuses.unHover}")
        +e.wrapper
            +e.loading( :style="{'transform': 'scaleX('+ volume.loadingScale + ')','opacity': volume.loadingOpacity}")
            +e.settings
                +e.BUTTON.toggle(v-on:click="volumeToggle" :class="{'soundless': volume.soundless}")
                +e.custom-slide
                    svg(xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 15")
                        defs
                            polygon(id="volume-poligon" points="60 15 0 15 60 0")
                        clipPath(id="volume-clipPath")
                            use( overflow="visible" xlink:href="#volume-poligon")
                        rect(width="60" height="15" fill="#f9fdff" clip-path="url(#volume-clipPath)" opacity=".4")
                        rect(width="60" height="15" fill="#fbfdff" clip-path="url(#volume-clipPath)" :style="{width: volume.value + '%'}")
                +e.VUE-SLIDER.volume(v-model="volume.value" v-on:change="changeVolume")
            +e.VIDEO.content(
                :muted="volume.muted"
                ref="video"
                v-on:click="toggleVideo"
                v-on:mouseover="videoOnHover"
            )
                source(:data-src="source + '.webm'" )
                source(:data-src="source + '.mp4'" )
                source(:data-src="source + '.ogg'" )
</template>

<script>
    // import component
    import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
    import 'vue-slider-component/dist-css/vue-slider-component.css'

    // import theme
    import 'vue-slider-component/theme/default.css'

    export default {
        props: ['source'],
        data(){
            return{
                currentVideoTime: 0,
                intervalID: null,
                volume: {
                    loadingScale: 0,
                    loadingOpacity: 1,
                    toggleName:'toggle.svg',
                    value: 50,
                    muted: false,
                    lastValue: 0,
                    soundless: false
                },
                statuses: {
                    stop: true,
                    load: false,
                    unHover: false
                }
            }
        },
        methods:{
            videoOnHover(){
                this.statuses.unHover = false;
            },
            toggleVideo(){
                if(this.$refs.video.paused){
                    this.loadVideo(this.$refs.video);
                    this.statuses.stop = false;
                    this.$refs.video.volume = this.volume.value/100;
                    this.statuses.unHover = true;
                } else {
                    this.currentVideoTime = this.$refs.video.currentTime;
                    this.$refs.video.pause();
                    this.statuses.stop = true;
                    this.statuses.unHover = false;
                }
            },
            volumeToggle(){
                if(this.volume.value !== 0){
                    this.volume.lastValue = this.$refs.video.volume;
                    this.volume.value = 0;
                    this.$refs.video.volume = this.volume.value;
                    this.volume.soundless = true;
                } else {
                    this.volume.value = this.volume.lastValue*100;
                    this.$refs.video.volume = this.volume.value/100;
                    this.volume.soundless = false;
                }
            },
            changeVolume(){
                this.$refs.video.volume = this.volume.value/100;
                this.volume.lastValue = this.$refs.video.volume;
                if(this.$refs.video.volume === 0){
                    this.volume.soundless = true;
                } else {
                    this.volume.soundless = false;
                }
            },
            loadVideo(el){
                let video = el,
                    src = video.querySelectorAll('source'),
                    i = 0,
                    browser = this.checkBrowser();

                if(browser === 'safari'){
                    i = 1;
                }
                let vue = this;
                video.src = src[i].dataset.src;
                if(!this.statuses.load){
                    video.load();
                    this.statuses.load = true
                }
                video.play();
                video.currentTime  = this.currentVideoTime;
                video.addEventListener("timeupdate", function() {
                    if(!isNaN(video.duration)){
                        let progress = video.currentTime / video.duration;
                        vue.volume.loadingScale = progress;
                        if(progress > 0.995){
                            video.currentTime = 0;
                            video.play();
                        }
                    }
                });
            },
            checkBrowser(){
                let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
                    isChrome = !!window.chrome && !!window.chrome.webstore,
                    isIE = /*@cc_on!@*/false || !!document.documentMode,
                    isEdge = !isIE && !!window.StyleMedia,
                    isFirefox = typeof InstallTrigger !== 'undefined';

                if(isSafari){
                    return 'safari'
                } else if(isChrome){
                    return 'chrome'
                } else if(isIE){
                    return 'ie'
                } else  if(isEdge){
                    return 'edge'
                } else  if(isFirefox){
                    return 'firefox'
                } else {
                    return 'other';
                }
            }
        },
        components: {
            VueSlider
        }
    }
</script>

<style>

</style>
