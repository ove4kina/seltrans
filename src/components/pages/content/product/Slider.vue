<template lang="pug">
    include ../../../../tools/mixins.pug

    div(ref="fixElement")
        +e.IMG(src="/img/svg-icons/drag.svg").product__mobile-drag
        +e.product__animation-wrapper._animated._animated--trf
            <!--no-ssr-->
                <!--agile(:arrows="false" :dots="false" :infinite="false" ref="slider" :fade="true")-->
                    <!--+e(v-for="(photo,index) in content.gallery").product__photo.product__photo&#45;&#45;page-->
                        <!--img(:src="photo.src" :alt="photo.alt")-->
                    <!--img(v-else class="swiper-lazy" :data-src="photo.src" :alt="photo.alt")-->
            +e.swiper-container(v-swiper:photos="swiper.photos")
                .swiper-wrapper
                    +e(v-for="(photo,index) in content.gallery").product__photo.product__photo--page.swiper-slide
                        img(v-if="index === 0" :src="photo.src" :alt="photo.alt" :class="index === 0 ? '_animated _animated--trf': ''")
                        img(v-else class="swiper-lazy" :data-src="photo.src" :alt="photo.alt")
</template>

<script>
    import NoSSR from 'vue-no-ssr'
    export default {
        props:['content'],
        data(){
            let language = this.$router.currentRoute.meta.language;
            let obj = {
                swiper:{
                    photos: {
                        effect: 'fade',
                        mousewheelControl: true,
                        mousewheelForceToAxis: true,
                        lazy: {
                            loadPrevNext: true,
                            preloadImages: true
                        },
                        breakpoints: {
                            1199: {
                                loop: true
                            }
                        }
                    }
                },
            };
            return obj;
        },
        methods:{

        },

        mounted(){
            // this.photos.update();
            // console.log(this.$refs.f)
        },
        components: {
            'no-ssr': NoSSR
        },
        computed:{

        },


    }
</script>
