<template lang="pug">
    include ../../../../tools/mixins.pug
    +b.product--page(id="main")
        admin-panel-component(v-show="loginIn" @clicked="onAdminPanelClick")
        grid-dark-component
        +e.photos--page.swiper-container(v-swiper:photos="swiper.photos" ref="fixElement")
            +e.IMG(src="/img/svg-icons/drag.svg").mobile-drag
            .swiper-wrapper
                +e(v-for="(photo,index) in content.gallery").photo--page.swiper-slide
                    img(:src="photo.src" :alt="photo.alt" )
        +e.body--page(ref="productBody")
            +e.H1.title--page.title--underlined.--dark.--big._animated--trf(
                :class="{'editable-text': loginIn}"
                @click="clickTextField($event,content.name,'name','textJson')"
                @input="editTextJson($event,content.name,'name',70)"
            ) {{ content.name }}
            +e.text--page.text--product._animated--trf
                div(v-html="content.description" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.description,'description','htmlJson')" @input="editHtmlJson($event,content.description,'description')")
            +e.other-articles(ref="triggerBlock")
                +e(v-for="(train,index) in content.trains" :class="'_animated--' + (index + 1)").article-card.article__.--card-small._animated--trf
                    +e.A(href="#").photo--card-small
                        img(:src="train.avatar")
                    +e.DIV.tags--card.--card-small
                        +e.A(v-for="tag in train.tags" href="#").tag--card.tag--small.--gray {{ tag.name }}
                    +e.DIV.title--card-small {{ train.name }}
                    +e.button--card-small.ui-arrow.ui-arrow--card
                        span
                            span
                            span
                                span
                                span
            template(v-if="sameProducts.length > 0")
                +e.H2.title--other-products.title--underlined.--dark._animated--trf {{ text.sameTitle }}
                +e.other-products
                    +e(v-for="(product,index) in sameProducts" :class="'_animated--' + (index + 1)").item.product__.--card._animated--trf
                        +e.photo--card
                            img(:src="product.avatar")
                        +e.tags--card
                            +e.A(v-for="(tag,tagIndex) in product.tags" :key="tagIndex" :class="'tag--' + tag.class").tag--card.tag--small {{ tag.name }}
                        +e.ROUTER-LINK(:to="product.url").title--card
                            span {{ product.name }}
                        +e.description--card.text--product-card
                            p {{ product.description }}
</template>

<script>
    import GridDark from '@/components/blanks/GridDark.vue';
    import Slider from '@/components/pages/content/product/Slider.vue';
    import {scrollUtils} from '@/mixins/scrollUtils';
    import {getOffset} from '@/mixins/getOffset';
    import {fadeInOnScroll} from '@/mixins/fadeInOnScroll';

    import {editText} from '@/mixins/admin/editText';
    import AdminPanel from '@/components/admin/Panel.vue';

    export default {
        props: ['content'],
        mixins: [editText,scrollUtils,getOffset,fadeInOnScroll],
        data(){
            let language = this.$router.currentRoute.meta.language,
                obj = {
                    language: language,
                    swiper:{
                        photos: {
                            effect: 'fade',
                            mousewheelControl: true,
                            mousewheelForceToAxis: true,
                            lazy: {
                                preloadImages: true,
                                loadPrevNextAmount: 20
                            },
                            breakpoints: {
                                1199: {
                                    loop: true
                                }
                            },
                            on: {
                                lazyImageLoad: function (slideEl) {
                                    /* do something */
                                },
                                slideChange: ()=> {
                                    //console.log(this.content.gallery)
                                }
                            }

                        }
                    },
                    fixElement:{
                        top: 0,
                        width: 0,
                        height: 0,
                        pathLength: 0,
                        itterations: 0,
                        step: 0,
                        el: ''
                    },
                    triggerBlock: {
                        top: 0,
                        height: 0
                    }
                };
            if(language === 'en') {
                obj.text = {
                    sameTitle: "See also"
                }
            } else {
                obj.text = {
                    sameTitle: "Смотрите также"
                }
            }

            //TODO
            obj.sameProducts = [];
            if(this.$route.params.category === 'current-collectors') {
                if(language === 'en') {
                    obj.sameProducts = [
                        {
                            "name": "Current collector LA 17-SET 160 1200",
                            "url": "/en/products/current-collectors/la-17-sat-160-1200",
                            "avatar": "/img/products/current-collectors/la-17-sat-160-1200/avatar.png",
                            "description": "The top node, which includes two three-row runners, allows you to shoot current up to 3200 А.",
                            "disabled": {
                                "name": "",
                                "class": ""
                            },
                            "tags": [
                            ]
                        },
                        {
                            "name": "Current collector LA 19-21-SET 155 800",
                            "url": "/en/products/current-collectors/la-19-21-sat-155-800",
                            "avatar": "/img/products/current-collectors/la-19-21-sat-155-800/avatar.png",
                            "description": "The control panel of the current collector is located in the body of the ERS.",
                            "disabled": {
                                "name": "",
                                "class": ""
                            },
                            "tags": [
                            ]
                        },
                        {
                            "name": "Current collector LA 19-22-SET 155 800",
                            "url": "/en/products/current-collectors/la-19-22-sat-155-800",
                            "avatar": "/img/products/current-collectors/la-19-22-sat-155-800/avatar.png",
                            "description": "The removable current has up to 800 A when moving and up to 250 A in the parking place, from a contact network with a voltage of 27 kV and an ERS speed of up to 155 km/h.",
                            "disabled": {
                                "name": "",
                                "class": ""
                            },
                            "tags": [
                            ]
                        },
                    ]
                } else {
                    obj.sameProducts = [
                        {
                            "name": "Токоприемник ЛA 17-СЭТ 160 1200",
                            "url": "/ru/products/current-collectors/la-17-sat-160-1200",
                            "avatar": "/img/products/current-collectors/la-17-sat-160-1200/avatar.png",
                            "description": "Снабжен системой автоматического опускания, срабатывающей при поднятии токоприемника на высоту более 7000 мм над уровнем головки рельса.",
                            "disabled": {
                                "name": "",
                                "class": ""
                            },
                            "tags": [
                            ]
                        },
                        {
                            "name": "Токоприемник ЛA 19-21-СЭТ 155 800",
                            "url": "/ru/products/current-collectors/la-19-21-sat-155-800",
                            "avatar": "/img/products/current-collectors/la-19-21-sat-155-800/avatar.png",
                            "description": "Установлен блок управления, обеспечивающий контроль активации токоприемника и положения полоза.",
                            "disabled": {
                                "name": "",
                                "class": ""
                            },
                            "tags": [
                            ]
                        },
                        {
                            "name": "Токоприемник ЛA 19-22-СЭТ 155 800",
                            "url": "/ru/products/current-collectors/la-19-22-sat-155-800",
                            "avatar": "/img/products/current-collectors/la-19-22-sat-155-800/avatar.png",
                            "description": "Снабжен системами автоматического опускания, срабатывающей при поднятии токоприемника на высоту более 7000 мм над уровнем головки рельса и разрушении вставок полоза.",
                            "disabled": {
                                "name": "",
                                "class": ""
                            },
                            "tags": [
                            ]
                        },
                    ]
                }
            } else if(this.$route.params.category === 'runners') {
                if(language === 'en') {
                    obj.sameProducts = [
                        {
                            "name": "Runner P01-00-0001",
                            "url": "/en/products/runners/p-01-00-0001",
                            "avatar": "/img/products/runners/p-01-00-0001/avatar.png",
                            "description": "The runner consists of a carcass and coal inserts mounted on it.",
                            "disabled": {
                                "name": "",
                                "class": ""
                            },
                            "tags": [
                            ]
                        },
                        {
                            "name": "Runner P02-00-0001",
                            "url": "/en/products/runners/p-02-00-0001",
                            "avatar": "/img/products/runners/p-02-00-0001/avatar.png",
                            "description": "The runner provides significant savings for the coal inserts when the runner restoring achieve the limit of wear.",
                            "disabled": {
                                "name": "",
                                "class": ""
                            },
                            "tags": [
                            ]
                        },
                        {
                            "name": "Runner P05-00-0001",
                            "url": "/en/products/runners/p-05-00-0001",
                            "avatar": "/img/products/runners/p-05-00-0001/avatar.png",
                            "description": "The runner is intended for installation on Czech current collectors of type 2SLS AC electric locomotives.",
                            "disabled": {
                                "name": "",
                                "class": ""
                            },
                            "tags": [
                            ]
                        }
                    ]
                } else {
                    obj.sameProducts = [
                        {
                            "name": "Полоз П01-00-0001",
                            "url": "/ru/products/runners/p-01-00-0001",
                            "avatar": "/img/products/runners/p-01-00-0001/avatar.png",
                            "description": "Каркас полоза обеспечивает универсальность применения и наименьшие затраты труда на монтаж вставок.",
                            "disabled": {
                                "name": "",
                                "class": ""
                            },
                            "tags": [
                            ]
                        },
                        {
                            "name": "Полоз П02-00-0001",
                            "url": "/ru/products/runners/p-02-00-0001",
                            "avatar": "/img/products/runners/p-02-00-0001/avatar.png",
                            "description": "Полоз обеспечивает значительную экономию угольных вставок при восстановлении полоза по достижению предельного износа",
                            "disabled": {
                                "name": "",
                                "class": ""
                            },
                            "tags": [
                            ]
                        },
                        {
                            "name": "Полоз П05-00-0001",
                            "url": "/ru/products/runners/p-05-00-0001",
                            "avatar": "/img/products/runners/p-05-00-0001/avatar.png",
                            "description": "Имеет увеличенное расстояние между рядами вставок, обеспечивающие равномерный износ вставок.",
                            "disabled": {
                                "name": "",
                                "class": ""
                            },
                            "tags": [
                            ]
                        }
                    ]
                }
            }
            return obj;
        },
        destroyed(){
            if (typeof document !== 'undefined' && window.innerWidth >= 1200) {
                window.removeEventListener('scroll', this.fixAnimation);
            }
        },
        mounted(){
            // console.log(this.$children[2]);
            if(window.innerWidth < 1200){
                // this.photos.autoplay.stop()
            }
            if( window.innerWidth >= 1200){
                setTimeout(()=>{
                    this.getVariables();
                    this.fixAnimation();
                    window.addEventListener('scroll', this.fixAnimation);
                },1)

            }



        },
        // beforeUpdate(){
        //     if (typeof document !== 'undefined' && window.innerWidth >= 1200) {
        //         window.removeEventListener('scroll', this.fixAnimation);
        //     }
        //     for (let i = 0; i < this.$children.length; i++){
        //         if(typeof this.$children[i].$refs.fixElement !== 'undefined'){
        //             // this.$children[i].photos.destroy();
        //         }
        //
        //     }
        // },
        updated(){
            if( window.innerWidth >= 1200){


            }

            if( window.innerWidth >= 1200){
                // for (let i = 0; i < this.$children.length; i++){
                //     if(typeof this.$children[i].$refs.fixElement !== 'undefined'){
                //         this.$children[i].photos.update();
                //     }
                //
                // }
                setTimeout(()=>{
                    this.getVariables();

                },750)
                // window.addEventListener('scroll', this.fixAnimation);



            }
        },
        methods: {
            clearVaribales(){
                this.fixElement.top = 0;
                this.fixElement.width = 0;
                this.fixElement.height = 0;

                this.triggerBlock.top = 0;
                this.triggerBlock.height = 0;


                this.fixElement.pathLength  = 0;
                this.fixElement.itterations = 0;
                this.fixElement.step = 0;
            },
            getVariables(){
                if( window.innerWidth >= 1200){
                    // for (let i = 0; i < this.$children.length; i++){
                    //
                    //     if(typeof this.$children[i].$refs.fixElement !== 'undefined'){
                    //         this.fixElement.el = this.$children[i].$refs;
                    //
                    //     }
                    //
                    // }

                    this.fixElement.el = this.$refs.fixElement;

                    this.fixElement.top = this.getOffset(this.fixElement.el).top;
                    this.fixElement.width = this.fixElement.el.offsetWidth;
                    this.fixElement.height = this.fixElement.el.offsetHeight;

                    this.triggerBlock.top = this.getOffset(this.$refs.triggerBlock).top;
                    this.triggerBlock.height = this.$refs.triggerBlock.clientHeight - parseFloat(getComputedStyle(this.$refs.triggerBlock).paddingBottom);

                    this.fixElement.pathLength  = +(this.triggerBlock.top + this.triggerBlock.height -  this.fixElement.height);
                    this.fixElement.itterations = this.photos.slides.length;
                    this.fixElement.step = this.fixElement.pathLength/this.fixElement.itterations;



                }
            },
            fixAnimation(){
                let index = Math.floor(this.getScroll()[1]/this.fixElement.step);
                if(index < this.fixElement.itterations) {
                    this.photos.slideTo(index,300);
                }
                if(this.getScroll()[1] > this.fixElement.top - 50){
                    this.fixElement.el.style.position = 'fixed';
                    this.fixElement.el.style.top = '50px';
                    if(this.getScroll()[1] > this.triggerBlock.top + this.triggerBlock.height - this.fixElement.height - 50){
                        this.fixElement.el.style.position = 'absolute';
                        this.fixElement.el.style.top = this.triggerBlock.top + this.triggerBlock.height - this.fixElement.height + 'px';
                    }
                } else {
                    this.fixElement.el.style.position = 'absolute';
                    this.fixElement.el.style.top = 'auto';
                }
            }
        },
        components:{
            'grid-dark-component': GridDark,
            'slider-component': Slider,
            'admin-panel-component': AdminPanel
        }
    }
</script>