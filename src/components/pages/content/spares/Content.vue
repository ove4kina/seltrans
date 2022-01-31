<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.spares(id="main")
        admin-panel-component(v-show="loginIn" @clicked="onAdminPanelClick")
        +e.H1.title.title--underlined.--dark.--big(
            ref="title"
            :class="{'editable-text': loginIn}"
            @click="clickTextField($event,content.title,'title','textJson')"
            @input="editTextJson($event,content.title,'title',70)"
        ) {{ content.title }}
        spares-navigation-component(v-swiper:slider="swiper.main" class="spares__navigation" :content="content.spares" ref="navigation" :class="{'fixed': navigation.isFixed}" @clicked="onActivateSpare")
        +e.list(ref="list")
            +e.item--big.spare__.--big(v-for="(item,index) in content.spares" ref="spares" :key="index")
                +e.photo--big._animated--trf
                    img(:src="item.photo")
                +e.body
                    +e.H3.title--big._animated--trf(
                        :class="{'editable-text': loginIn}"
                        @click="clickTextField($event,item.title,'spares.' + index + '.title' ,'textJson')"
                        @input="editTextJson($event,item.title,'spares.' + index + '.title' ,70)"
                    ) {{ item.title }}
                    +e.description.text--spare._animated--trf(
                        v-html="item.description"
                        :class="{'active': !checkIndex(button.opened,index),'editable-html': loginIn}"
                        @click="clickTextField($event,item.description,'spares.' + index + '.description','htmlJson')"
                        @input="editHtmlJson($event,item.description,'spares.' + index + '.description')"
                    )
                    +e.BUTTON(type="button" v-on:click="activateSpare(index)" :class="{'active': !checkIndex(button.opened,index)}").toggle.button._animated--trf {{changeButtonText(index)}}
</template>
<script>
    import GridDark from '@/components/blanks/GridDark.vue';
    import SparesNavigation from '@/components/pages/content/spares/SparesNavigation.vue';

    import {scrollUtils} from '@/mixins/scrollUtils';
    import {throttle} from '@/mixins/throttle';
    import {scrollTo} from '@/mixins/scrollTo';
    import {getOffset} from '@/mixins/getOffset';
    import {isElementInViewport} from '@/mixins/isElementInViewport';
    import {fadeInOnScroll} from '@/mixins/fadeInOnScroll';

    import {editText} from '@/mixins/admin/editText';
    import AdminPanel from '@/components/admin/Panel.vue';

    export default {
        mixins: [editText,scrollUtils,throttle,scrollTo,getOffset,isElementInViewport,fadeInOnScroll],
        data(){
            let language = this.$router.currentRoute.meta.language;
            let obj = {
                swiper:{
                    main: {
                        slidesPerView: 'auto',
                        slidesOffsetAfter: 40,
                        spaceBetween: 20,
                        breakpoints: {
                            599: {
                                spaceBetween: 5
                            },
                            1199: {
                                slidesOffsetAfter: 0,
                                spaceBetween: 10
                            },
                            9999:{
                                slidesOffsetAfter: 400,
                            }
                        }
                    }
                },
                button: {
                    opened:[]
                },
                navigation: {
                    height: 0,
                    top: 0,
                    isFixed: false,
                    activeIndex: 0,
                    toggles: [],
                    style: {
                        position: 'relative',
                        top: 'auto',
                        left: 'auto',
                        bottom: 0

                    },
                    disableSwiper: false
                },
                list: {
                    style: {
                        transform: 0
                    }
                },
                currentIndex: 0,
                content: this.$attrs.content.content[language].text,
                toggles: {},
                spares: {}
            };
            if(language === 'en'){
                obj.button.text = {
                    show: 'Show',
                    hide: 'Hide'
                }
            } else if(language === 'ru'){
                obj.button.text = {
                    show: 'Показать',
                    hide: 'Скрыть'
                }
            }
            return obj;
        },
        created(){
            if (typeof document !== 'undefined' ) {
                window.addEventListener('scroll', this.scrollAnimations);
            }
        },
        destroyed(){
            window.removeEventListener('scroll',this.scrollAnimations);
        },
        mounted(){
            this.getOptions();
            this.fixingNavigation();
            this.setActiveToggle();
        },
        updated(){
            // this.slider.updateSlides()
        },
        methods:{
            onActivateSpare(index){
                this.navigation.disableSwiper = true;
                this.activateSpare(index);
            },
            getOptions(){
                this.navigation.height = this.$refs.navigation.$el.getBoundingClientRect().height;
                this.navigation.top = this.getOffset(this.$refs.navigation.$el).top;
                this.navigation.bottom = +(this.getStyle(this.$refs.title,'marginBottom').replace('px',''));

                this.toggles = document.querySelectorAll('.spare--small');
                this.spares = document.querySelectorAll('.spare__body');
            },
            scrollAnimations(){
                this.throttle(this.fixingNavigation(), 50)
                this.throttle(this.setActiveToggle(), 50)
            },
            setActiveToggle(){
                let kUp = 0,
                    kDown = 0;

                if(window.innerWidth < 600){
                    kUp = 0;
                    kDown = -0.2;
                } else if (window.innerWidth >= 600){
                    kUp = 0.07;
                    kDown = -0.13;
                } else if(window.innerWidth >= 1200){
                    kUp = 0;
                    kDown = -0.2;
                }

                for (let i=0; i < this.$refs.spares.length;i++){
                    if(this.isElementInViewport(this.$refs.spares[i])){
                        if(this.howMuchCentered(this.$refs.spares[i]) < kUp && this.howMuchCentered(this.$refs.spares[i]) > kDown){
                            if(!(this.navigation.disableSwiper)){
                                if (!(this.isElementInViewportFull(this.slider.slides[i]))){
                                    this.slider.slideTo(i,300);
                                }
                            }

                            for (let j=0; j < this.toggles.length;j++) {
                                this.toggles[j].classList.remove('active');
                            }
                            this.toggles[i].classList.add('active');
                            setTimeout(()=>{
                                // this.slider.slideTo(i,300);
                                this.navigation.disableSwiper = false;
                            },1000)
                            // this.navigation.activeIndex = i;
                        }

                    }
                }
            },
            toggleElementMobile(index) {
                let spares = this.spares;
                for(let i = 0; i < spares.length; i++){
                    if(index === i) {
                        if(spares[i].childNodes[1].classList.value.indexOf('active') === -1) {
                            spares[i].childNodes[1].classList.add('active');
                            spares[i].childNodes[2].classList.add('active');
                        } else {
                            spares[i].childNodes[1].classList.remove('active');
                            spares[i].childNodes[2].classList.remove('active');
                        }
                    }
                }
            },
            fixingNavigation(){
                if(this.getScroll()[1] > this.navigation.top){
                    this.$refs.navigation.$el.style.position = 'fixed';
                    this.$refs.navigation.$el.style.top = +0;
                    this.$refs.list.style.paddingTop = this.navigation.height + this.navigation.bottom +  'px';
                    this.$refs.navigation.$el.classList.add('fixed');
                    // this.navigation.isFixed = true;
                    // this.slider.update();
                } else {
                    this.$refs.navigation.$el.style.position = 'relative';
                    this.$refs.navigation.$el.style.top = 'auto';
                    // this.navigation.isFixed = false;
                    this.$refs.navigation.$el.classList.remove('fixed');
                    this.$refs.list.style.paddingTop = '0';
                    // this.slider.update();
                }
            },
            activateSpare(index){
                if (this.checkIndex(this.button.opened,index)){
                    let el = this.$refs.spares[index],
                        offset = 0,
                        sparesBetween = +(this.getStyle(document.querySelector('.spare--big'),'marginBottom').replace('px',''));
                    if(window.innerWidth < 600){
                        offset = document.querySelector('.spare--small').getBoundingClientRect().height + sparesBetween;
                        this.scrollTo(el,1000,'easeOutQuint',offset);
                        // setTimeout(()=>{
                            this.navigation.activeIndex = index;
                            // this.button.opened.push(index);
                        // },1000)
                        this.toggleElementMobile(index)
                    } else {
                        offset = document.querySelector('.spare--small').getBoundingClientRect().height + sparesBetween;
                        // offset = (window.innerHeight - document.querySelector('.spare--small').getBoundingClientRect().height - this.$refs.spares[index].getBoundingClientRect().height)/2 + document.querySelector('.spare--small').getBoundingClientRect().height;
                        this.navigation.activeIndex = index;
                        // this.button.opened.push(index);
                        this.scrollTo(el,1000,'easeOutQuint',offset);
                        // if(window.innerWidth >= 1200){
                        //     window.removeEventListener('scroll', this.scrollAnimations);
                        //     this.scrollTo(el,1000,'easeOutQuint',offset);
                        //     setTimeout(()=>{
                        //         window.addEventListener('scroll', this.scrollAnimations);
                        //     },1000)
                        // } else {
                        //
                        // }



                    }
                } else {
                    this.button.opened = this.button.opened.filter(function(number) {
                        return number !== index;
                    });
                }
            },
            checkIndex(mas,index){
                for (let i = 0;i < mas.length; i++){
                    if(mas[i] === index){
                        return false
                    }
                }
                return true
            },
            changeButtonText(index){
                if (this.checkIndex(this.button.opened,index)){
                    return  this.button.text.show
                }
                return  this.button.text.hide
            },
            getStyle(el, styleProp) {
                let value, defaultView = (el.ownerDocument || document).defaultView;
                // W3C standard way:
                if (defaultView && defaultView.getComputedStyle) {
                    // sanitize property name to css notation
                    // (hyphen separated words eg. font-Size)
                    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
                    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
                } else if (el.currentStyle) { // IE
                    // sanitize property name to camelCase
                    styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
                        return letter.toUpperCase();
                    });
                    value = el.currentStyle[styleProp];
                    // convert other units to pixels on IE
                    if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                        return (function(value) {
                            let oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
                            el.runtimeStyle.left = el.currentStyle.left;
                            el.style.left = value || 0;
                            value = el.style.pixelLeft + "px";
                            el.style.left = oldLeft;
                            el.runtimeStyle.left = oldRsLeft;
                            return value;
                        })(value);
                    }
                    return value;
                }
            },
        },
        components:{
            'grid-dark-component': GridDark,
            'spares-navigation-component': SparesNavigation,
            'admin-panel-component': AdminPanel
        },
        computed: {


        }

    }
</script>
