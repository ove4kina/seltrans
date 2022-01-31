<template lang="pug">
    include ../../tools/mixins.pug
    +b.HEADER(:class="[isDark ? 'header--dark' : 'header--white', hideLanguage ? '' : 'header--language-show', classScrolled ? 'scrolled' : '', menuStatus ? 'active header--language-show' : '' , popupSearch ? 'header--hidden' : '']").header
        +e.left
            +e.logo(:style="style")
                +e.ROUTER-LINK(v-if="!mainPage" :to="language === 'ru' ? '/' : '/en'").logo-main
                    svg(class="header__logo--main" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 34")
                        path(fill="#fff" d="M53.8 19.9l3.8 1.1c-6 5.2-12.9 7.1-19.4 7.2-12.3 0-23-6.9-22.6-12V16c.1-1 .8-2.3 1.4-3 1.7-1.9 5.8-3.9 11.5-6.1 2.4-.9 4.3-1.4 6.7-1.4h1.4c6.6 0 12.8 1.2 18.9 3.2.5.1.9.3 1.3.4l.2.7-9.8 4.1-4.2 1.4c-6.8-2.9-12.1-4.1-15.2-2.9-.1 1.2.1 2.5.9 3.5.5.5 1 1 1.5 1.4 3 2.4 7.3 4.2 12.6 5.5 2.1-.9 3.5-1.5 5.5-2.5l5.5-.4M80 17c0 9.4-17.9 17-40 17S0 26.4 0 17 17.9 0 40 0s40 7.6 40 17m-7.8 0C72.2 9.3 56.4 3 37 3 17.6 3 1.9 9.3 1.9 17S17.6 31 37 31c19.4 0 35.2-6.3 35.2-14m5.7 0c0-4.9-6.7-8.5-10.4-10.1-1.5-.6-3-1.2-4.6-1.7 4.8 2 11.4 5.8 11.4 11.8 0 6-6.5 9.8-11.4 11.8 1.6-.5 3.1-1 4.6-1.7 3.8-1.6 10.4-5.2 10.4-10.1" fill-rule="evenodd" clip-rule="evenodd")
                    p {{ text.logo }}
                +e.DIV(v-if="mainPage").logo-main
                    svg(class="header__logo--main" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 34")
                        path(fill="#fff" d="M53.8 19.9l3.8 1.1c-6 5.2-12.9 7.1-19.4 7.2-12.3 0-23-6.9-22.6-12V16c.1-1 .8-2.3 1.4-3 1.7-1.9 5.8-3.9 11.5-6.1 2.4-.9 4.3-1.4 6.7-1.4h1.4c6.6 0 12.8 1.2 18.9 3.2.5.1.9.3 1.3.4l.2.7-9.8 4.1-4.2 1.4c-6.8-2.9-12.1-4.1-15.2-2.9-.1 1.2.1 2.5.9 3.5.5.5 1 1 1.5 1.4 3 2.4 7.3 4.2 12.6 5.5 2.1-.9 3.5-1.5 5.5-2.5l5.5-.4M80 17c0 9.4-17.9 17-40 17S0 26.4 0 17 17.9 0 40 0s40 7.6 40 17m-7.8 0C72.2 9.3 56.4 3 37 3 17.6 3 1.9 9.3 1.9 17S17.6 31 37 31c19.4 0 35.2-6.3 35.2-14m5.7 0c0-4.9-6.7-8.5-10.4-10.1-1.5-.6-3-1.2-4.6-1.7 4.8 2 11.4 5.8 11.4 11.8 0 6-6.5 9.8-11.4 11.8 1.6-.5 3.1-1 4.6-1.7 3.8-1.6 10.4-5.2 10.4-10.1" fill-rule="evenodd" clip-rule="evenodd")
                    p {{ text.logo }}
                +e.ROUTER-LINK(:to="text.historyLink").logo-anniversary
                    svg(v-if="language === 'ru'" class="header__logo--anniversary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.4 29.4")
                        path(fill="#7dc0f5" d="M.7 23.7v-1.1c.7-.7 1.4-1.4 2-2.1.6-.6 1.1-1.2 1.5-1.8s.7-1.1 1-1.5c.2-.5.3-.9.3-1.3 0-.6-.2-1-.5-1.3s-.7-.4-1.3-.4c-.4 0-.8.2-1.1.4-.3.3-.7.6-1 .9-.4-.3-.7-.7-1.1-1.1.5-.5 1-1 1.5-1.3s1.2-.5 1.9-.6c.5 0 1 0 1.4.1s.8.3 1.1.5.5.6.7.9c.2.4.2.8.2 1.3s-.1 1-.3 1.5-.5 1.1-.8 1.6c-.4.5-.8 1.1-1.2 1.7l-1.5 1.8c.3 0 .6-.1.9-.2.3-.1.6-.1.9-.1.9-.1 1.8-.2 2.6-.3V23c-2.4.4-4.8.6-7.2.7zm12.1-1.4c-.9.2-1.6.2-2.2 0-.6-.2-1.1-.4-1.5-.8.3-.5.6-.9.9-1.4.3.2.7.4 1.1.6.4.2.9.2 1.4.1.6-.1 1.1-.4 1.5-.9.4-.4.6-1 .6-1.7 0-.6-.2-1.1-.5-1.4-.4-.3-.8-.3-1.4-.2l-.9.3c-.2.1-.5.4-.8.6-.3-.1-.6-.3-.9-.4l.3-5.4c1.9-.4 3.8-.8 5.7-1.3V12c-1.3.3-2.7.6-4 .9-.1.9-.1 1.8-.2 2.6.2-.2.4-.3.7-.4.2-.1.5-.2.8-.3.5-.1.9-.1 1.3-.1s.8.2 1.1.4c.3.2.5.5.7.9.2.4.3.9.3 1.4 0 .6-.1 1.1-.3 1.6-.2.5-.5 1-.8 1.4s-.7.7-1.2 1c-.8.6-1.2.8-1.7.9zm8.9-2.2c-.3.1-.6.1-.9.1l.3-1.8h.4c.3-.1.5-.2.6-.5.2-.3.3-.7.4-1.2l.3-2.7c.1-.9.2-1.8.3-2.6 1.9-.5 3.7-1 5.6-1.5v8.3c-.6.2-1.3.3-1.9.5V12l-2.1.6-.3 2.1-.3 2.1c-.1 1-.4 1.7-.8 2.3-.3.4-.8.8-1.6 1zm13.1-3.3c-.6.1-1.1.1-1.6 0s-.9-.3-1.3-.6-.7-.7-.9-1.2-.3-1.1-.3-1.8.1-1.3.3-1.9.5-1.1.9-1.6.8-.8 1.2-1.1c.5-.3.9-.5 1.4-.6.6-.1 1.1-.1 1.5 0s.8.3 1.1.6c.3.3.5.7.6 1.1.1.5.2 1 .2 1.5v.5c0 .2 0 .3-.1.4-1.8.3-3.5.6-5.3 1 .1.7.4 1.2.8 1.5.4.3 1 .4 1.7.2.4-.1.7-.2 1-.4l.9-.6c.2.4.4.7.7 1.1-.4.3-.8.6-1.3.9-.4.7-1 .9-1.5 1zm-2.2-4.6c1.2-.3 2.5-.5 3.7-.8 0-.6-.1-1.1-.4-1.4-.3-.3-.7-.4-1.3-.3-.5.1-.9.4-1.3.8s-.6 1-.7 1.7zm8.9 3.4V8.9c-.9.1-1.7.2-2.6.3V7.7c2.4-.4 4.8-.6 7.2-.6v1.5c-.9 0-1.7 0-2.6.1v6.7c-.7 0-1.4.1-2 .2zM5.9 8c-2 .2-3.9.4-5.9.4v1.1c2 0 3.9-.1 5.9-.4V8zm40.5-8c-13 0-25.9 5.9-38.9 7.8v1.1c13-1.9 25.9-7.8 38.9-7.8V0zm-7.5 20.5C26 22.4 13 28.3.1 28.3v1.1c13 0 25.9-5.9 38.9-7.8-.1-.4-.1-.8-.1-1.1zm7.5-.6c-1.9 0-3.9.1-5.8.4v1.1c1.9-.2 3.9-.4 5.8-.4v-1.1z")
                    svg(v-if="language === 'en'" class="header__logo--anniversary" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 46.4 29.4" style="enable-background:new 0 0 46.4 29.4;" xml:space="preserve")
                        path(fill="#7DC0F5" d="M0.7,23.7v-1.1c0.7-0.7,1.4-1.4,2-2.1c0.6-0.6,1.1-1.2,1.5-1.8s0.7-1.1,1-1.5c0.2-0.5,0.3-0.9,0.3-1.3 c0-0.6-0.2-1-0.5-1.3s-0.7-0.4-1.3-0.4c-0.4,0-0.8,0.2-1.1,0.4c-0.3,0.3-0.7,0.6-1,0.9c-0.4-0.3-0.7-0.7-1.1-1.1 c0.5-0.5,1-1,1.5-1.3s1.2-0.5,1.9-0.6c0.5,0,1,0,1.4,0.1s0.8,0.3,1.1,0.5s0.5,0.6,0.7,0.9c0.2,0.4,0.2,0.8,0.2,1.3s-0.1,1-0.3,1.5 s-0.5,1.1-0.8,1.6c-0.4,0.5-0.8,1.1-1.2,1.7l-1.5,1.8c0.3,0,0.6-0.1,0.9-0.2s0.6-0.1,0.9-0.1c0.9-0.1,1.8-0.2,2.6-0.3V23 C5.5,23.4,3.1,23.6,0.7,23.7z M12.8,22.3c-0.9,0.2-1.6,0.2-2.2,0c-0.6-0.2-1.1-0.4-1.5-0.8c0.3-0.5,0.6-0.9,0.9-1.4 c0.3,0.2,0.7,0.4,1.1,0.6c0.4,0.2,0.9,0.2,1.4,0.1c0.6-0.1,1.1-0.4,1.5-0.9c0.4-0.4,0.6-1,0.6-1.7c0-0.6-0.2-1.1-0.5-1.4 c-0.4-0.3-0.8-0.3-1.4-0.2l-0.9,0.3c-0.2,0.1-0.5,0.4-0.8,0.6c-0.3-0.1-0.6-0.3-0.9-0.4l0.3-5.4c1.9-0.4,3.8-0.8,5.7-1.3V12 c-1.3,0.3-2.7,0.6-4,0.9c-0.1,0.9-0.1,1.8-0.2,2.6c0.2-0.2,0.4-0.3,0.7-0.4c0.2-0.1,0.5-0.2,0.8-0.3c0.5-0.1,0.9-0.1,1.3-0.1 s0.8,0.2,1.1,0.4c0.3,0.2,0.5,0.5,0.7,0.9c0.2,0.4,0.3,0.9,0.3,1.4c0,0.6-0.1,1.1-0.3,1.6c-0.2,0.5-0.5,1-0.8,1.4s-0.7,0.7-1.2,1 C13.7,22,13.3,22.2,12.8,22.3z M5.9,8C3.9,8.2,2,8.4,0,8.4v1.1c2,0,3.9-0.1,5.9-0.4V8z M46.4,0c-13,0-25.9,5.9-38.9,7.8v1.1 c13-1.9,25.9-7.8,38.9-7.8V0z M38.9,20.5C26,22.4,13,28.3,0.1,28.3v1.1c13,0,25.9-5.9,38.9-7.8C38.9,21.2,38.9,20.8,38.9,20.5z M46.4,19.9c-1.9,0-3.9,0.1-5.8,0.4v1.1c1.9-0.2,3.9-0.4,5.8-0.4V19.9z")
                        g
                            path(fill="#7DC0F5" d="M21.2,14.9l0.2-0.1l0.7-2.9l1.1-0.3l-1.1,4.4l0.6,2.2l-1,0.3l-0.6-2.2L18,13l1.1-0.3L21.2,14.9z")
                            path(fill="#7DC0F5" d="M26.1,16.2l3.4-0.9l0.2,0.9l-4.4,1.2l-1.6-6l4.3-1.1l0.2,0.9L25,12.1l0.4,1.5l2.6-0.7l0.2,0.9l-2.6,0.7 L26.1,16.2z")
                            path(fill="#7DC0F5" d="M34.8,15.1l-1-1.6l-2.5,0.6l-0.1,1.9l-1,0.2l0.6-6.5l1.6-0.4l3.4,5.6L34.8,15.1z M31.6,10.5l-0.2,2.6l1.9-0.4 L32,10.4L31.6,10.5z")
                            path(fill="#7DC0F5" d="M37.8,8.2C39.1,8,40,8.5,40.2,9.7c0.1,0.8-0.1,1.4-0.6,1.8l1.4,2.5l-1,0.2l-1.3-2.3c-0.1,0-0.3,0.1-0.5,0.1 l-1.4,0.3l0.4,2.4l-1,0.2L35,8.7L37.8,8.2z M36.2,9.4l0.3,1.9l1.6-0.3c0.8-0.1,1.1-0.5,1-1.2c-0.1-0.6-0.5-0.9-1.3-0.7L36.2,9.4z")
                            path( fill="#7DC0F5" d="M44.8,9c-0.2-0.5-0.6-0.8-1.4-0.7c-0.7,0.1-1.2,0.4-1.1,0.9c0,0.5,0.4,0.6,1,0.7l0.6,0.1l0.6,0.1 c1.1,0.1,1.7,0.7,1.8,1.6c0,0.5-0.1,1-0.5,1.4c-0.4,0.4-1,0.6-1.7,0.7c-0.7,0.1-1.3-0.1-1.8-0.4c-0.5-0.3-0.8-0.8-0.9-1.3l1.1-0.1 c0.2,0.7,0.7,1,1.6,0.9c0.8-0.1,1.3-0.5,1.2-1.1c0-0.5-0.4-0.8-1-0.8c-0.1,0-0.3,0-0.7-0.1c-0.4,0-0.5-0.1-0.6-0.1 c-1-0.1-1.6-0.6-1.7-1.5c0-0.5,0.1-1,0.5-1.3c0.4-0.4,0.9-0.6,1.6-0.6c1.3-0.1,2.3,0.5,2.5,1.5L44.8,9z")
        +e.right
            +e.contact
                +e.A(:href="clearPhone(phone)" :style="style").phone {{ phone }}
                +e.BUTTON(v-on:click="openPopupRecall" type="button" :class="isDark ? 'button--recall-dark' : 'button--recall-light'" :style="style").button.button--recall.--recall-small
                    span {{ text.recall }}
                +e.BUTTON(type="button" v-on:click="openMenu(content.isDark)" :class="[menuStatus ? 'active' : '', isDark ? 'hamburger--dark' : 'hamburger--light', mainPage ? 'hamburger--hide-border-left' : '']").hamburger.hamburger__
                    +e.container
                        +e.wrap
                            span
                            span
                        +e.wrap
                            span
                        +e.wrap
                            span
                            span
        +e.menu--language(:class="{'header__menu--changed-position': isBlogPage}")
            +e.ROUTER-LINK(:to="getCurrentLink('en')" :class="language === 'en' ? 'active' : ''").language En
            +e.ROUTER-LINK(:to="getCurrentLink('ru')" :class="language === 'ru' ? 'active' : ''").language Ru
        +e.close-search.hamburger__.--white-close(:class="{'inited': isBlogPage,'active': popupSearch}" v-on:click="closePopupSearch")
                +e.container
                    +e.wrap
                        span
                        span
                    +e.wrap
                        span
                    +e.wrap
                        span
                        span
        +e.open-search(:class="{'inited': isBlogPage,'hide': popupSearch}" v-on:click="openPopupSearch")
</template>

<script>
    import constants from '../../../content/constants.json';
    import {throttle} from '@/mixins/throttle';
    import {scrollUtils} from '@/mixins/scrollUtils';
    import {phone} from '@/mixins/phone';

    export default {
        mixins: [throttle,scrollUtils,phone],
        props:['content','popupSearch'],
        data() {
            let language = this.$router.currentRoute.meta.language,
                obj = {
                    language: language,
                    menuStatus: false,
                    hideLanguage: false,
                    isScrolled: false,
                    classScrolled: false,
                    isDark: this.$options.propsData.content.isDark,
                    phone: constants.phone,
                    isBlogPage: false,
                    isHidden: false,
                    css:{
                        opacity: 1,
                        scale: 1
                    },
                    mainPage: this.$router.history.current.meta.type === 'main'
                };

            if(language === 'en') {
                obj.text = {
                    logo: 'S-Electrotransport',
                    recall: "Re-call",
                    historyLink: '/en/history'
                }
            } else {
                obj.text = {
                    logo: 'С-Электротранспорт',
                    recall: "Обратный звонок",
                    historyLink: '/ru/history'
                }
            }

            //TODO
            if(this.$router.history.current.meta.type === 'main'){
                obj.hideLanguage = true
            }
            return obj;
        },

        created(){
            if (typeof document !== 'undefined') {
                window.addEventListener('scroll', this.scrollPage);
            }
        },

        destroyed(){
            if (typeof document !== 'undefined'){
                window.removeEventListener('scroll',this.scrollPage);
                window.removeEventListener('scroll',this.clearMenu);
            }
        },

        mounted(){

            window.addEventListener('load', this.scrollPage);
            window.addEventListener('click', this.clearMenu);
            if(this.$router.history.current.meta.type === 'blog'){
                this.isBlogPage = true;
            }
        },


        methods: {
            getCurrentLink(prefix) {

                if(!this.mainPage){
                   return this.$router.history.current.path.substr(0,1) + prefix + this.$router.history.current.path.substr(3);
                } else if(prefix === 'en'){
                    return prefix
                }

                return '/';

            },
            clearMenu(e){
                if(e.target.parentNode.classList.contains('menu__item--popup')){
                    setTimeout(()=>{
                        this.menuStatus = false;
                    },500)

                }
            },
            closePopupSearch() {
                this.$emit('search-articles',{name: 'close'})
            },

            openPopupSearch() {
                this.$emit('search-articles',{name: 'open'})
            },

            scrollPage(){
                this.throttle(this.fixMenu(),50)

            },
            fixMenu(){
                let scrolled = this.getScroll()[1],
                    path = 50,
                    kO = 1 - scrolled/path,
                    kS = (scrolled-path*0.4)/path*0.6;



                if(kO >= 0){

                    if(kO < 0.6){
                        this.css.scale = 1 - 0.3*kS;
                    } else {
                        this.css.scale = 1;
                    }
                } else {
                    kO = 0;
                }

                this.css.opacity = kO;





                if(scrolled > path){
                    this.classScrolled = true;
                    this.isScrolled = true;
                } else {
                    this.isScrolled = false;
                    this.classScrolled = false;
                }

            },
            openMenu(isDark){
                this.$emit('clicked', 'openMenu');
                this.menuStatus = !this.menuStatus;
                if (!isDark){
                    this.isDark = !this.isDark;
                }

                this.hideLanguage = !this.hideLanguage;

                if(this.menuStatus) {
                    if(this.isScrolled){
                        this.classScrolled = false
                    }
                } else {
                    if(this.isScrolled){
                        this.classScrolled = true
                    }
                }
            },
            openPopupRecall() {
                this.$emit('clicked', 'openPopupRecall');
            }
        },
        computed: {
            style(){
                return {opacity: this.css.opacity, transform: 'scaleY(' + this.css.scale + ') translate3d(0,0,0) rotateZ(0)'}
            }
        }
    }
</script>
