<template lang="pug">
    include ../../tools/mixins.pug
    +b.SECTION.video-section(ref="videoSection")
        +e.H1.title.title__.--dark.--underlined.--centered Кто мы сейчас
        +e.columns
            +e.column(v-for="(item,index) in 12" ref="column" :style="{transform: startScale['col' + index]}")
                p {{startScale[index]}}
        +e.VIDEO-COMPONENT(
            ref="video"
            :source="source"
        ).content
</template>

<script>
    import {isElementInViewport} from '@/mixins/isElementInViewport'
    import {scrollUtils} from '@/mixins/scrollUtils'
    import Video from '@/components/blanks/Video.vue';
    export default {
        mixins: [isElementInViewport,scrollUtils],
        props:['source'],
        data(){
            return{
                startScaleK: [],
                startScaleKBuffer: [],
                startScale: {
                    col0: '',
                    col1: '',
                    col2: '',
                    col3: '',
                    col4: '',
                    col5: '',
                    col6: '',
                    col7: '',
                    col8: '',
                    col9: '',
                    col10: '',
                    col11: '',
                },
            }
        },
        methods:{
             randomScale(){
                 for (let i = 0; i < 12; i++) {
                     let k = Math.random()*(0.7 - 0.2) + 0.2

                     this.startScaleK.push({a: k});
                     this.startScaleKBuffer.push({a: k});
                     this.startScale['col'+ i] = `scaleY(${this.startScaleK[i]})`;
                 }
             },
            onScroll(){

                if(this.isElementInViewport(this.$refs.videoSection)){

                    let k = -this.howMuchCentered(this.$refs.video.$el);

                    if  (k > 1){
                        k = 1
                    }
                    if  (k <= 0){
                        k = 0
                    }


                    for (let i = 0; i < this.startScaleK.length; i++) {
                        let newScale = this.startScaleKBuffer[i].a*k;
                        TweenLite.to(this.startScaleK[i], 1, {
                            a﻿:newScale,
                            onUpdate: (() => {
                               this.startScale['col'+ i] = `scaleY(${this.startScaleK[i].a})`;
                            }),
                        });
                    }
                }
            }
        },
        mounted(){
            this.randomScale();
            window.addEventListener('scroll', this.onScroll)
            this.onScroll();
        },
        destroyed(){
            window.removeEventListener('scroll', this.onScroll)
        },
        components:{
            'video-component': Video,
        }
    }
</script>

<style>

</style>
