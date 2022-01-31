<template lang="pug">
    include ../../tools/mixins.pug

    +b.SECTION.service--block(ref="columns")
        grid-component
        +e.columns
            +e.col
                +e.slide--up
                +e.slide--down
            +e.col
                +e.slide--up
                +e.slide--down
            +e.col
                +e.slide--up
                +e.slide--down
            +e.col
                +e.slide--up
                +e.slide--down
            +e.col
                +e.slide--up
                +e.slide--down
            +e.col
                +e.slide--up
                +e.slide--down
            +e.col
                +e.slide--up
                +e.slide--down
            +e.col
                +e.slide--up
                +e.slide--down
            +e.col
                +e.slide--up
                +e.slide--down
            +e.col
                +e.slide--up
                +e.slide--down
            +e.col
                +e.slide--up
                +e.slide--down
            +e.col
                +e.slide--up
                +e.slide--down
        +e.bg--block
            img(:src="content.media.backgroundImage + imgPrefix + '.jpg'" alt="")
            video(muted="muted" autoplay="true" loop="true" ref="video")
                source(:data-src="content.media.backgroundVideo + '.webm'")
                source(:data-src="content.media.backgroundVideo + '.mp4'")
        +e.content--block
            +e.text--block.text--service-block._animated--trf
                h4(
                    :class="{'editable-text': loginIn}"
                    @click="clickTextField($event,content.title,'serviceBlock.title','htmlJson')"
                    @input="editTextJson($event,content.title,'serviceBlock.title')"
                ) {{ content.title }}
                div(
                    v-html="content.description"
                    :class="{'editable-html': loginIn}"
                    @click="clickTextField($event,content.description,'serviceBlock.description','htmlJson')"
                    @input="editHtmlJson($event,content.description,'serviceBlock.description')"
                )
            +e.ROUTER-LINK(:to="content.link.src").button--block.button__.--primary._animated--trf
                span {{ content.link.name }}
                +e.DIV.wrapper
                DIV.ui-arrow
                    span
                        span
                        span
                            span
                            span
</template>

<script>
    import Grid from '@/components/blanks/Grid.vue';

    import {scrollUtils} from '@/mixins/scrollUtils';
    import {throttle} from '@/mixins/throttle';
    import {getImagePrefix} from '@/mixins/getImagePrefix';
    import {loadVideo} from '@/mixins/loadVideo';
    import {fadeInOnScroll} from '@/mixins/fadeInOnScroll';

    import {TweenLite} from 'gsap';
    import {editText} from '@/mixins/admin/editText';

    export default {
        props: ['content'],
        mixins: [editText,scrollUtils,throttle,getImagePrefix,loadVideo,fadeInOnScroll],
        created(){
            if (typeof document !== 'undefined' && window.innerWidth >= 1200) {
                window.addEventListener('scroll', this.scrollAnimations);
            }
        },
        destroyed(){
            if (typeof document !== 'undefined' && window.innerWidth >= 1200) {
                window.removeEventListener('scroll', this.scrollAnimations);
            }
        },
        methods:{
            scrollAnimations(){
               
                this.throttle(this.slidingMedia(this.$refs.columns),50)
                if(this.isElementInViewport(this.$refs.columns)){
                    this.loadVideo(this.$refs.video)
                } else {
                    this.stopVideo(this.$refs.video);
                }

            },
            slidingMedia(el){

                let k = this.howMuchCentered(el),
                    columns = this.$refs.columns.querySelectorAll('.service__col');
                for (let i = 0; i < columns.length;i++){
                    let up = columns[i].querySelector('.service__slide--up'),
                        down = columns[i].querySelector('.service__slide--down'),
                        multiply = 0;

                    if(i === 0) multiply = 0.4;
                    if(i === 1 || i === 2) multiply = 0.6;
                    if(i === 3 || i === 4 || i === 5 || i === 6) multiply = 0.2;
                    if(i === 7 || i === 8) multiply = 0.5;
                    if(i === 9 || i === 10) multiply = 0.35;
                    if(i === 11 ) multiply = 0.45;

                    if(k > 0){
                        TweenLite.to(up, 0.3, {
                            scaleY: k*multiply,
                            overflow: 5,
                            force3D: !0
                        })
                        TweenLite.to(down, 0.3, {
                            scaleY: k*multiply,
                            overflow: 5,
                            force3D: !0
                        })
                        // up.style.transform = 'scaleY(' + (k*multiply) +') translate3d(0,0,0) rotateZ(0)';
                        // down.style.transform = 'scaleY(' + (k*multiply) +') translate3d(0,0,0) rotateZ(0)';
                    } else {
                        TweenLite.to(up, 0.3, {
                            scaleY: -k*multiply,
                            overflow: 5,
                            force3D: !0
                        })
                        TweenLite.to(down, 0.3, {
                            scaleY: -k*multiply,
                            overflow: 5,
                            force3D: !0
                        })
                        // up.style.transform = 'scaleY(' + -(k*multiply) +') translate3d(0,0,0) rotateZ(0)';
                        // down.style.transform = 'scaleY(' + -(k*multiply) +') translate3d(0,0,0) rotateZ(0)';
                    }

                }
            }

        },
        components:{
            'grid-component': Grid
        }
    }
</script>
