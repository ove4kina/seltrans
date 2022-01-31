<template lang="pug">
    include ../../../../tools/mixins.pug
    div
        admin-panel-component(v-show="loginIn" @clicked="onAdminPanelClick")
        rain-component
        +b.SECTION.main(ref="main" id="main")
            grid-component(ref="grid" class="grid--with-columns")
            div(v-swiper:main="swiper.main").main__slider.swiper-container
                .swiper-wrapper
                    +e.slide.swiper-slide.swiper-no-swiping
                        +e.bg
                            img(src="/img/main-slider/1.jpg" alt="")
                            video(autoplay,loop,muted="muted")
                                source(data-src="/video/index/main/1.webm")
                                source(data-src="/video/index/main/1.mp4")
                        +e.content
                            +e.text.text--main
                                h1(
                                    :class="{'editable-text': loginIn}"
                                    @click="clickTextField($event,content.slider[0].title,'slider.0.title','textJson')"
                                    @input="editTextJson($event,content.slider[0].title,'slider.0.title',70)"
                                ) {{ content.slider[0].title }}
                            +e.ROUTER-LINK(:to="content.slider[0].link").button.button__.--primary
                                span {{ content.slider[0].name }}
                                +e.wrapper
                                .ui-arrow
                                    span
                                        span
                                        span
                                            span
                                            span
                    +e.slide.swiper-slide.swiper-no-swiping
                        +e.bg
                            img(src="/img/services/engineering--desktop.jpg" alt="")
                            video(autoplay,loop,muted="muted")
                                source(data-src="/video/index/services/2.webm")
                                source(data-src="/video/index/services/2.mp4")
                        +e.content
                            +e.text.text--main
                                h1(
                                    :class="{'editable-text': loginIn}"
                                    @click="clickTextField($event,content.slider[1].title,'slider.1.title','textJson')"
                                    @input="editTextJson($event,content.slider[1].title,'slider.1.title',70)"
                                ) {{ content.slider[1].title }}
                            +e.ROUTER-LINK(:to="content.slider[1].link").button.button__.--primary
                                span {{ content.slider[1].name }}
                                +e.wrapper
                                .ui-arrow
                                    span
                                        span
                                        span
                                            span
                                            span
                    +e.slide.swiper-slide.swiper-no-swiping
                        +e.bg
                            img(src="/img/slider.jpg" alt="")
                        +e.content
                            +e.text.text--main
                                h1(
                                    v-html="content.slider[2].title"
                                    :class="{'editable-text': loginIn}"
                                    @click="clickTextField($event,content.slider[2].title,'slider.2.title','htmlJson')"
                                    @input="editHtmlJson($event,content.slider[2].title,'slider.2.title',70)"
                                )
                            +e.ROUTER-LINK(:to="content.slider[2].link").button.button__.--primary
                                span {{ content.slider[2].name }}
                                +e.wrapper
                                .ui-arrow
                                    span
                                        span
                                        span
                                            span
                                            span
            +e.benefits.benefits__.--small
                +e(v-for="benefit in content.benefits").item--small
                    +e.img--small
                        img(:src="benefit.src" :alt="benefit.alt")
                    +e.text--small {{ benefit.name }}
            +e.slider-information
                +e.BUTTON(type="button" v-on:click="clearTimeOut").navigation--prev.button--squared
                    .ui-arrow.ui-arrow--no-span
                        span
                            span
                            span
                                span
                                span
                +e.counter-wrapper
                    +e.counter--current(ref="counter")
                        span 1
                        span 2
                        span 3
                    +e.timer
                        span(ref="timer")
                    +e.counter--next
                        span 03
                +e.BUTTON(type="button" v-on:click="clearTimeOut").navigation--next.button--squared
                    .ui-arrow.ui-arrow--no-span
                        span
                            span
                            span
                                span
                                span
            +e.BUTTON(type="button" v-scroll-to="'#about'").to-about.button.--big
                span {{ content.aboutButton.name }}
                .ui-arrow.ui-arrow--rotated
                    span
                        span
                        span
                            span
                            span
            +e.menu--language
                +e.ROUTER-LINK(:to="'/en'" :class="language === 'en' ? 'active' : ''").language En
                +e.ROUTER-LINK(:to="'/'" :class="language === 'ru' ? 'active' : ''").language Ru
        +b#about.SECTION.about
            grid-dark-component
            +e.content
                +e.H3.title.title--dark.--underlined.--centered._animated--trf(:class="{'editable-text': loginIn}" @click="clickTextField($event,content.team.title,'team.title','textJson')" @input="editTextJson($event,content.team.title,'team.title',40)") {{ content.team.title }}
                +e(v-html="content.team.description" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.team.description,'team.description','htmlJson')" @input="editHtmlJson($event,content.team.description,'team.description')").text.text--about._animated--trf
                +e.ROUTER-LINK(:to="content.team.link.src").button.button__.--primary.--blue._animated--trf
                    span {{ content.team.link.name }}
                    +e.DIV.wrapper
                    DIV.ui-arrow
                        span
                            span
                            span
                                span
                                span
            +e.photo._animated--trf(ref="slice")
                +e.photo-wrapper(ref="aboutPhotoWrapper")
                    img(src="/img/team--desktop.jpg")
                +e.photo-overlay
                    +e.slice-column
                        +e.slice-section--top
                        +e.slice-section--bottom
                    +e.slice-column
                        +e.slice-section--top
                        +e.slice-section--bottom
                    +e.slice-column
                        +e.slice-section--top
                        +e.slice-section--bottom
                    +e.slice-column
                        +e.slice-section--top
                        +e.slice-section--bottom
                    +e.slice-column
                        +e.slice-section--top
                        +e.slice-section--bottom
                    +e.slice-column
                        +e.slice-section--top
                        +e.slice-section--bottom
        +b.SECTION.partners
            grid-dark-component
            +e.H3.title.title--underlined.--centered.--dark._animated--trf(:class="{'editable-text': loginIn}" @click="clickTextField($event,content.partners.title,'partners.title','textJson')" @input="editTextJson($event,content.partners.title,'partners.title',40)") {{ content.partners.title }}
            +e(ref="partnetsList").list
                +e.item--rzd._animated--trf
                    img(src='/img/partners/rzd.svg' alt="")
                +e.item--siemens._animated--trf
                    img(src='/img/partners/siemens.svg' alt="")
                +e.item--mlrz._animated--trf
                    img(src='/img/partners/mlrz.jpg' alt="")
                +e.item--ctm._animated--trf
                    img(src='/img/partners/ctm.jpg' alt="")
                +e.item--ul._animated--trf
                    img(src='/img/partners/ul.png' alt="")
                +e.item--msd._animated--trf
                    img(src='/img/partners/msd.png' alt="")
                +e.item--bombardier._animated--trf
                    img(src='/img/partners/bombardier.png' alt="")
                +e.item--evrz._animated--trf
                    img(src='/img/partners/evrz.gif' alt="")
                +e.item--demihovskie._animated--trf
                    img(src='/img/partners/demihovskie.jpg' alt="")
                +e.item--1st._animated--trf
                    img(src='/img/partners/1st.png' alt="")
                +e.item--apatit._animated--trf
                    img(src='/img/partners/apatit.png' alt="")
                +e.item--camozzi._animated--trf
                    img(src='/img/partners/camozzi.png' alt="")
                +e.item--lokotech._animated--trf
                    img(src='/img/partners/lokotech.png' alt="")
                +e.item--infotrans._animated--trf
                    img(src='/img/partners/infotrans.png' alt="")
        +b.SECTION.services(ref="services")
            grid-dark-component
            +e.H3.title.title--underlined.--centered.--dark._animated--trf(:class="{'editable-text': loginIn}" @click="clickTextField($event,content.services.title,'services.title','textJson')" @input="editTextJson($event,content.services.title,'services.title',40)") {{ content.services.title }}
            +e.text.text--services._animated--trf
                p(:class="{'editable-text': loginIn}" @click="clickTextField($event,content.services.description,'services.description','textJson')" @input="editTextJson($event,content.services.description,'services.description')") {{ content.services.description }}
            +e.list
                +e.item.service__._animated--trf
                    grid-component
                    +e.bg--section.--right
                        img(:src="'/img/services/tok--desktop.jpg'" alt="")
                    +e.title-double--right {{ content.services.service[0].title }}
                    +e.content--section.--left
                        +e.text--section.text--service._animated--trf
                            h4(:class="{'editable-text': loginIn}" @click="clickTextField($event,content.services.service[0].title,'services.service.0.title','textJson')" @input="editTextJson($event,content.services.service[0].title,'services.service.0.title')") {{ content.services.service[0].title }}
                            p(:class="{'editable-text': loginIn}" @click="clickTextField($event,content.services.service[0].description,'services.service.0.description','htmlJson')" @input="editTextJson($event,content.services.service[0].description,'services.service.0.description')") {{ content.services.service[0].description }}
                        +e.ROUTER-LINK(:to="content.services.service[0].link.src").button--section.button__.--blue-mobile.--primary._animated--trf
                            span {{ content.services.service[0].link.name }}
                            +e.DIV.wrapper
                            DIV.ui-arrow
                                span
                                    span
                                    span
                                        span
                                        span
                +e.item--engineering.service__
                    grid-component
                    +e.bg--section.--left
                        img(:src="'/img/services/engineering--' + imgPrefix + '.jpg'" alt="")
                        video(ref="engineeringService" loop,muted="muted")
                            source(data-src="/video/index/services/2.webm")
                            source(data-src="/video/index/services/2.mp4")
                    +e.title-double--left {{ content.services.service[1].title }}
                    +e.content--section.--right
                        +e.text--section.text--service._animated--trf
                            h4(:class="{'editable-text': loginIn}" @click="clickTextField($event,content.services.service[1].title,'services.service.1.title','textJson')" @input="editTextJson($event,content.services.service[1].title,'services.service.1.title')") {{ content.services.service[1].title }}
                            DIV(v-html="content.services.service[1].description" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.services.service[1].description,'services.service.1.description','htmlJson')" @input="editHtmlJson($event,content.services.service[1].description,'services.service.1.description')")
                        +e.ROUTER-LINK(:to="content.services.service[1].link.src").button--section.button__.--blue-mobile.--primary._animated--trf
                            span {{ content.services.service[1].link.name }}
                            +e.DIV.wrapper
                            DIV.ui-arrow
                                span
                                    span
                                    span
                                        span
                                        span
                +e.item--modeling.service__
                    grid-component
                    +e.bg--section.--right
                        img(:src="'/img/services/modeling--' + imgPrefix  + '.jpg'" alt="")
                        video(ref="modelingService" loop,muted="muted")
                            source(data-src="/video/index/services/1.webm")
                            source(data-src="/video/index/services/1.mp4")
                    +e.title-double--right {{ content.services.service[2].title }}
                    +e.content--section.--left
                        +e.text--section.text--service._animated--trf
                            h4(:class="{'editable-text': loginIn}" @click="clickTextField($event,content.services.service[2].title,'services.service.2.title','textJson')" @input="editTextJson($event,content.services.service[2].title,'services.service.2.title')") {{ content.services.service[2].title }}
                            DIV(v-html="content.services.service[2].description" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.services.service[2].description,'services.service.2.description','htmlJson')" @input="editHtmlJson($event,content.services.service[2].description,'services.service.2.description')")
                        +e.ROUTER-LINK(:to="content.services.service[2].link.src").button--section.button__.--blue-mobile.--primary._animated--trf
                            span {{ content.services.service[2].link.name }}
                            +e.DIV.wrapper
                            DIV.ui-arrow
                                span
                                    span
                                    span
                                        span
                                        span
        +b.SECTION.to-history
            grid-component
            +e(ref="trainsWrapper").body
                +e.img--left
                    img(src="/img/trains/1.png" alt="")
                +e.content
                    +e.text.text--to-history._animated--trf
                        p(:class="{'editable-text': loginIn}" @click="clickTextField($event,content.history.title,'history.title','textJson')" @input="editTextJson($event,content.history.title,'history.title')") {{ content.history.title }}
                    +e.ROUTER-LINK(:to="content.history.link.src").button.button__.--primary.--gray-mobile._animated--trf
                        span {{ content.history.link.name }}
                        +e.wrapper
                        .ui-arrow
                            span
                                span
                                span
                                    span
                                    span
                +e(ref="train").img--right
                    img(src="/img/trains/2.png" alt="")
        blog-latest-component
        +b.SECTION.contacts
            grid-dark-component
            +e.body._animated--mrgn
                +e.H3.title.title--underlined.--white {{ content.contacts.title }}
                +e.text.text__.--contacts
                    +e.col--contacts
                        p.bold  {{ content.contacts.address }}
                        p(:class="{'editable-text': loginIn}" @click="editConstantJson($event, address, 'address.ru')" @input="editConstantJson($event, address, 'address.ru')") {{ address }}
                        p.bold {{ content.contacts.phone }}
                        a(:href="clearPhone(phone)" :class="{'editable-text': loginIn}" @click="editConstantJson($event, phone, 'phone')" @input="editConstantJson($event, phone, 'phone')") {{ phone }}
                    +e.col--contacts
                        p.bold {{ content.contacts.email }}
                        a(:href="'mailto:' + email" :class="{'editable-text': loginIn}" @click="editConstantJson($event, email, 'email')" @input="editConstantJson($event, email, 'email')") {{ email }}
                +e.BUTTON(type="button" v-on:click="openPopupRecall").button.button__.--primary.--gray-mobile
                    span {{ content.contacts.button.name }}
                    +e.wrapper
                    .ui-arrow
                        span
                            span
                            span
                                span
                                span
            +e.map
                googlemaps-map(
                    :center.sync="map.center"
                    :zoom.sync="map.zoom"
                )
                    googlemaps-marker(
                        title="Софрино"
                        :position="map.point"
                    )
</template>

<script>
    import constants from '../../../../../content/constants.json';
    import BlogLatest from '@/components/blanks/BlogLatest.vue';
    import Grid from '@/components/blanks/Grid.vue';
    import GridDark from '@/components/blanks/GridDark.vue';
    import Rain from '@/components/blanks/Rain.vue';

    import {isElementInViewport} from '@/mixins/isElementInViewport';
    import {getRandomArbitrary} from '@/mixins/getRandomArbitrary';
    import {debounce} from '@/mixins/debounce';
    import {throttle} from '@/mixins/throttle';
    import {scrollUtils} from '@/mixins/scrollUtils';
    import {howManyInViewPort} from '@/mixins/howManyInViewPort';
    import {getImagePrefix} from '@/mixins/getImagePrefix';
    import {getOffset} from '@/mixins/getOffset';
    import {fadeInOnScroll} from '@/mixins/fadeInOnScroll';
    import {phone} from '@/mixins/phone';
    import {loadVideo} from '@/mixins/loadVideo';
    import {googleMap} from '@/mixins/googleMap';

    import {TweenLite,TweenMax,CSSPlugin} from 'gsap';

    import {editText} from '@/mixins/admin/editText';
    import AdminPanel from '@/components/admin/Panel.vue';

    export default {
        mixins: [editText,isElementInViewport,getRandomArbitrary,debounce,throttle,scrollUtils,howManyInViewPort,getImagePrefix,getOffset,phone,loadVideo,googleMap,fadeInOnScroll],
        data() {
            const vue = this;
            let language = this.$router.currentRoute.meta.language,
                obj = {
                    language: language,
                    sliderInited: false,
                    swiper:{
                        prevIndex: 0,
                        timeOutMain: null,
                        timeOutSecondary: null,
                        buttonClicked: false,
                        main: {
                            effect: 'fade',
                            loop: true,
                            navigation: {
                                nextEl: '.main__navigation--next',
                                prevEl: '.main__navigation--prev',
                            },
                            on: {
                                slideChange:function(){
                                    if(vue.sliderInited){
                                        clearTimeout(vue.swiper.timeOutMain);
                                        clearTimeout(vue.swiper.timeOutSecondary);
                                        let time = 0;
                                        if(vue.swiper.buttonClicked){
                                            time = 500
                                        }
                                        if(window.innerWidth < 600){
                                            TweenMax.to(vue.$refs.timer, 0.5, {
                                                css: {
                                                    left: 0,
                                                    right: 0
                                                },
                                                force3D: true,
                                                ease: Power4.easeOut,
                                                overwrite: true
                                            });

                                            setTimeout(()=>{
                                                TweenMax.to(vue.$refs.timer, 0.5, {
                                                    css: {
                                                        left: "100%",
                                                        right: 0
                                                    },
                                                    force3D: true,
                                                    ease: Power4.easeOut,
                                                    overwrite: true
                                                });
                                            },time)

                                        } else {
                                            TweenMax.to(vue.$refs.timer, 0.5, {
                                                css: {
                                                    top: 0,
                                                    bottom: 0
                                                },
                                                force3D: true,
                                                ease: Power4.easeOut,
                                                overwrite: true
                                            });
                                            setTimeout(()=>{
                                                TweenMax.to(vue.$refs.timer, 0.5, {
                                                    css: {
                                                        top: "100%",
                                                        bottom: 0
                                                    },
                                                    force3D: true,
                                                    ease: Power4.easeOut,
                                                    overwrite: true
                                                });
                                            },time)
                                        }



                                        vue.swiper.timeOutMain = setTimeout(()=>{
                                            if(window.innerWidth < 600){
                                                TweenMax.to(vue.$refs.timer, 0, {
                                                    css: {
                                                        left: 0,
                                                        right: "100%"
                                                    },
                                                    force3D: true,
                                                    ease: Power4.easeOut,
                                                    overwrite: true
                                                });
                                            } else {
                                                TweenMax.to(vue.$refs.timer, 0, {
                                                    css: {
                                                        top: 0,
                                                        bottom: "100%"
                                                    },
                                                    force3D: true,
                                                    ease: Power4.easeOut,
                                                    overwrite: true
                                                });
                                            }
                                            if(window.innerWidth < 600){
                                                TweenMax.to(vue.$refs.timer, 5, {
                                                    css: {
                                                        left: 0,
                                                        right: 0
                                                    },
                                                    force3D: true,
                                                    ease: Power0.easeNone,
                                                    overwrite: true

                                                });
                                            } else {
                                                TweenMax.to(vue.$refs.timer, 5, {
                                                    css: {
                                                        top: 0,
                                                        bottom: 0
                                                    },
                                                    force3D: true,
                                                    ease: Power0.easeNone,
                                                    overwrite: true
                                                });
                                            }
                                            vue.swiper.timeOutSecondary = setTimeout(()=>{
                                                this.slideNext(300);
                                                vue.swiper.buttonClicked = false;
                                            },5000)
                                        },1000)
                                    }


                                },
                                slideChangeTransitionEnd: function(){
                                    vue.swiper.prevIndex = this.realIndex;

                                },
                                transitionStart: function(){

                                },
                                slideNextTransitionStart: function() { //вниз, вправо
                                    if(vue.sliderInited){
                                        let counter = vue.$refs.counter.querySelectorAll('span'),
                                            easing = Power1.easeInOut,
                                            index = this.realIndex,
                                            prevIndex = vue.swiper.prevIndex;

                                        if(prevIndex === counter.length - 1){
                                            TweenMax.to(counter[index], 0, {
                                                y: "100%",
                                                ease: easing
                                            });
                                            TweenMax.to(counter[index], 0.7, {
                                                y: "0%",
                                                ease: easing
                                            });
                                            TweenMax.to(counter[prevIndex], 0.7, {
                                                y: "-100%",
                                                ease: easing
                                            });
                                        } else {
                                            TweenMax.to(counter[index], 0, {
                                                y: "100%",
                                                ease: easing
                                            });
                                            TweenMax.to(counter[index], 0.7, {
                                                y: "0%",
                                                ease: easing
                                            });
                                            TweenMax.to(counter[index - 1], 0.7, {
                                                y: "-100%",
                                                ease: easing
                                            });
                                        }
                                    }





                                },
                                slidePrevTransitionStart: function() {
                                    if(vue.sliderInited){
                                        let counter = vue.$refs.counter.querySelectorAll('span'),
                                            easing = Power1.easeInOut,
                                            index = this.realIndex,
                                            prevIndex = vue.swiper.prevIndex;

                                        if(prevIndex === 0){
                                            TweenMax.to(counter[index], 0, {
                                                y: "-100%",
                                                ease: easing
                                            });
                                            TweenMax.to(counter[index], 0.7, {
                                                y: "0%",
                                                ease: easing
                                            });
                                            TweenMax.to(counter[prevIndex], 0.7, {
                                                y: "100%",
                                                ease: easing
                                            });
                                        } else {
                                            TweenMax.to(counter[index], 0, {
                                                y: "-100%",
                                                ease: easing
                                            });
                                            TweenMax.to(counter[index], 0.7, {
                                                y: "0%",
                                                ease: easing
                                            });
                                            TweenMax.to(counter[index + 1], 0.7, {
                                                y: "100%",
                                                ease: easing
                                            });
                                        }
                                    }
                                },
                                slideChangeTransitionStart: function() {
                                    if(this.slides[this.activeIndex].querySelector('video')){
                                        if(this.slides[this.activeIndex].querySelector('video').classList.contains('loaded')){
                                            this.slides[this.activeIndex].querySelector('video').play()
                                        } else {
                                            vue.loadVideo(this.slides[this.activeIndex].querySelector('video'))
                                        }
                                    } else {
                                        this.slides[this.activeIndex].classList.add('zooming')
                                    }

                                    if(this.slides[this.previousIndex].querySelector('video')){
                                        this.slides[this.previousIndex].querySelector('video').pause();
                                    } else {
                                        setTimeout(()=>{
                                            this.slides[this.previousIndex].classList.remove('zooming')
                                        },300)
                                    }

                                },
                                init: function () {
                                    if (vue.$router.pageFromAnimation === 'slice'){
                                        setTimeout(()=>{
                                            vue.loadVideo(this.slides[this.activeIndex].querySelector('video'))
                                        },1000)
                                    } else {
                                        vue.loadVideo(this.slides[this.activeIndex].querySelector('video'))
                                    }

                                    let counter = vue.$refs.counter.querySelectorAll('span');
                                    if(!vue.sliderInited){
                                        for(let i = 0; i < counter.length;i++ ){
                                            if (i === this.realIndex){
                                                TweenLite.to(counter[this.realIndex], 0, {
                                                    y: 0,
                                                    overflow: 5,
                                                    force3D: !0
                                                });
                                            } else {
                                                TweenLite.to(counter[i], 0, {
                                                    y: '100%',
                                                    overflow: 5,
                                                    force3D: !0
                                                })
                                            }
                                        }
                                    }

                                    vue.sliderInited = true;
                                    if(window.innerWidth < 600){
                                        TweenMax.to(vue.$refs.timer, 6, {
                                            css: {
                                                left: 0,
                                                right: 0
                                            },
                                            force3D: true,
                                            ease: Power0.easeNone,
                                            overwrite: 'all'

                                        });
                                    } else {
                                        TweenMax.to(vue.$refs.timer, 6, {
                                            css: {
                                                top: 0,
                                                bottom: 0
                                            },
                                            force3D: true,
                                            ease: Power0.easeNone,
                                            overwrite: 'all'
                                        });
                                    }



                                    vue.swiper.timeOutMain = setTimeout(()=>{
                                        this.slideNext(300);
                                    },6000)

                                }
                            }

                        }
                    },
                    animations: {
                        multiples: [],
                        videos: [],
                        aboutScales:[0.2,0.3,0.25,0.22,0.25,0.15,0.22,0.35,0.25,0.29]
                    },
                    content: this.$attrs.content.content[language].text,

                    email: constants.email,
                    phone: constants.phone,
                    address: language === 'ru'? constants.address.ru : constants.address.en
                };
            return obj;
        },
        created(){
           if (typeof document !== 'undefined' && window.innerWidth >= 1200) {
                window.addEventListener('scroll', this.scrollAnimations);
            }
        },
        destroyed(){
            if (typeof document !== 'undefined' && window.innerWidth >= 1200){
                window.removeEventListener('scroll',this.scrollAnimations);
            }
            clearTimeout(this.swiper.timeOutMain);
            clearTimeout(this.swiper.timeOutSecondary);
        },
        mounted(){
            for(let i=0;i<8;i++) {
                this.animations.multiples.push(this.getRandomArbitrary(0.2,1));
            }
            for(let i = 0; i < document.querySelectorAll('video').length; i++){
                this.animations.videos.push(document.querySelectorAll('video')[i])
            }

            this.loadVideo(this.$refs.modelingService);
            this.loadVideo(this.$refs.engineeringService);
            this.map.status = true;
        },
        methods: {
            clearTimeOut(){
                clearTimeout(this.swiper.timeOutMain);
                clearTimeout(this.swiper.timeOutSecondary);
                this.swiper.buttonClicked = true;
            },
            openPopupRecall(){
                this.$emit('clicked', 'openPopupRecall');
            },
            scrollAnimations(){
                if(this.isElementInViewport(this.$refs.slice)){
                    this.throttle(this.aboutSlide(),50)
                }
                if(this.isElementInViewport(this.$refs.partnetsList)){
                    this.throttle(this.setShadow(this.$refs.partnetsList),100)
                }

                if(this.isElementInViewport(this.$refs.train)){
                    this.throttle(this.horizontalMove(this.$refs.trainsWrapper),100)
                }

                if(this.isElementInViewport(this.$refs.main)){
                    this.throttle(this.slideUp(),100);
                }

                if(this.isElementInViewport(this.$refs.modelingService)){

                } else {
                    // this.stopVideo(this.$refs.modelingService);
                }
                if(this.isElementInViewport(this.$refs.engineeringService)){

                } else {
                    // this.stopVideo(this.$refs.engineeringService);
                }
            },
            aboutSlide(){
                let k =(1 - this.howMuchCentered(this.$refs.slice))/2,
                    scale = 0;
                let section = this.$refs.slice.querySelectorAll('.about__slice-section');
                let deltaHeight = (this.$refs.aboutPhotoWrapper.querySelector('img').getBoundingClientRect().height - this.$refs.aboutPhotoWrapper.getBoundingClientRect().height)/2;

                TweenLite.to(this.$refs.aboutPhotoWrapper, 1.5, {
                    y: -(1 - k)*deltaHeight,
                    overflow: 5,
                    force3D: !0
                })

                for (let i = 0 ; i < section.length; i++) {



                    if(i % 2 === 0) {
                        k = -k + 1
                    }
                    scale = this.animations.aboutScales[i]*k;

                    TweenLite.to(section[i], 0.7, {
                        scaleY: scale,
                        overflow: 5,
                        force3D: !0
                    })
                }

            },
            slideUp(){
                let k = 1 - this.howManyInViewPort(this.$refs.main),
                columns = this.$refs.grid.$el.querySelectorAll('.grid__column');

                for (let i = 0 ; i < columns.length; i++) {
                    TweenLite.to(columns[i], 0.7, {
                        scaleY: k * this.animations.multiples[i],
                        overflow: 5,
                        force3D: !0
                    })
                    // columns[i].style.transform = 'scaleY(' + k * this.animations.multiples[i] + ') scaleX(1) translate3d(0,0,0) rotateZ(0)';
                }
            },
            horizontalMove(el){
                // let k = (this.howMuchCentered(el)),
                //     trf = k*20;
                //     console.log(k,trf)
                // el.style.transition = "none";
                // el.style.transform = 'translate3d(' + trf + '%,0,0) rotateZ(0)';

                let scroll = this.getScroll()[1],
                    vpK = this.howManyInViewPort(el),
                    trf = 40 * vpK - 20,
                    k = (this.howMuchCentered(el)),
                    top = this.getOffset(el).top,
                    height = el.getBoundingClientRect().height;
                if((scroll > top - window.innerHeight) && (vpK <= 0.5 && (scroll < top + height*0.5))){
                    // el.style.transform = 'translate3d(' + trf + '%,0,0) rotateZ(0)';
                    TweenLite.to(el, 2, {
                        x: trf*10,
                        overflow: 5,
                        force3D: !0
                    })
                    
                } else if(scroll > top + height*0.5){
                    trf = (scroll - top - height*0.5)/(height*0.5)*20;
                    TweenLite.to(el, 2, {
                        x: trf*10,
                        overflow: 5,
                        force3D: !0
                    })
                     // el.style.transform = 'translate3d(' + trf + '%,0,0) rotateZ(0)';
                }
            },
            getTranslate(item) {
                let transArr = [];

                if (!window.getComputedStyle) return;
                let style = getComputedStyle(item),
                    transform = style.transform || style.webkitTransform || style.mozTransform || style.msTransform;
                let mat = transform.match(/^matrix3d\((.+)\)$/);
                if (mat) return parseFloat(mat[1].split(', ')[13]);

                mat = transform.match(/^matrix\((.+)\)$/);
                mat ? transArr.push(parseFloat(mat[1].split(', ')[4])) : transArr.push(0);
                mat ? transArr.push(parseFloat(mat[1].split(', ')[5])) : transArr.push(0);

                return transArr;
            },
            setShadow(el){
                if(this.howMuchCentered(el) > -0.3){
                    el.classList.add('active');
                }
                
            },

        },
        components: {
            'blog-latest-component': BlogLatest,
            'grid-component': Grid,
            'grid-dark-component': GridDark,
            'rain-component': Rain,
            'admin-panel-component': AdminPanel
        }
    };
</script>
