<template lang="pug">
    include ../../../../tools/mixins.pug
    div(id="main")
        admin-panel-component(v-show="loginIn" @clicked="onAdminPanelClick")
        service-main-component(:content="serviceMain")
        shader-component
        +b#about.SECTION.about-experience
            grid-dark-component
            +e.content
                +e.H3.title.title--dark.--underlined.--small.--centered-tablet._animated--trf(
                    :class="{'editable-text': loginIn}"
                    @click="clickTextField($event,content.title,'title','textJson')"
                    @input="editTextJson($event,content.title,'title',70)"
                ) {{ content.title }}
                +e.text.text--about-experience._animated--trf
                    p(v-html="content.description" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.description,'description','htmlJson')" @input="editHtmlJson($event,content.description,'description')")
                +e.ROUTER-LINK(:to="content.historyLink.link").button.button__.--primary.--blue._animated--trf
                    span {{ content.historyLink.name }}
                    +e.DIV.wrapper
                    DIV.ui-arrow
                        span
                            span
                            span
                                span
                                span
            +e(ref="slice").photo._animated--trf
                +e.img._slice
                    img(src="/img/about/1.jpg" alt="")
                +e.img._slice
                    img(src="/img/about/1.jpg" alt="")
                +e.img._slice
                    img(src="/img/about/1.jpg" alt="")
        +b.visual-set(ref="columns")._animated--mrgn
            grid-dark-component
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
            +e.content
                p(
                    :class="{'editable-text': loginIn}"
                    @click="clickTextField($event,content.visualSet,'visualSet','textJson')"
                    @input="editTextJson($event,content.visualSet,'visualSet')"
                    ref="canvasText"
                ) {{ content.visualSet }}
            +e#canvas.canvas(ref="canvas")
        +b.stages
            grid-dark-component
            +e.list
                +e.item.stage__
                    +e.description
                        +e.H3.title.title--underlined.--dark.--small._animated--trf(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content.stages[0].title,'stages.0.title','textJson')"
                            @input="editTextJson($event,content.stages[0].title,'stages.0.title')"
                        ) {{ content.stages[0].title }}
                        +e(v-html="content.stages[0].description" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.stages[0].description,'stages.0.description','htmlJson')" @input="editHtmlJson($event,content.stages[0].description,'stages.0.description')").text.text--stage._animated--trf
                    +e.illustration--product._animated--trf
                        +e.ROUTER-LINK(:to="content.stages[0].case.link").product.product__.--case
                            +e.DIV.title--case {{ content.stages[0].case.title }}
                            +e.DIV.photo--case
                                img(src="/img/engineering.png" alt="")
                            +e.button--case.button--gray {{ content.stages[0].case.show }}
                        +e.append(:class="{'editable-html': loginIn}" v-html="content.stages[0].case.description" @click="clickTextField($event,content.stages[0].case.description,'stages.0.case.description','htmlJson')" @input="editHtmlJson($event,content.stages[0].case.description,'stages.0.case.description')")
                    +e.number._animated--trf 01
                +e.item.stage__
                    +e.description
                        +e.H3.title.title--underlined.--dark.--small._animated--trf(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content.stages[1].title,'stages.1.title','textJson')"
                            @input="editTextJson($event,content.stages[1].title,'stages.1.title')"
                        ) {{ content.stages[1].title }}
                        +e(v-html="content.stages[1].description" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.stages[1].description,'stages.1.description','htmlJson')" @input="editHtmlJson($event,content.stages[1].description,'stages.1.description')").text.text--stage._animated--trf
                    +e.illustration
                        +e.img._animated--trf
                            img(src="/img/others/docs.png" alt="")
                    +e.number._animated--trf 02
                +e.item.stage__
                    +e.description--down
                        +e.H3.title.title--underlined.--dark.--small._animated--trf(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content.stages[2].title,'stages.2.title','textJson')"
                            @input="editTextJson($event,content.stages[2].title,'stages.2.title')"
                        ) {{ content.stages[2].title }}
                        +e.text.text--stage._animated--trf
                            p(v-html="content.stages[2].description" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.stages[2].description,'stages.2.description','htmlJson')" @input="editHtmlJson($event,content.stages[2].description,'stages.2.description')")
                    +e.illustration
                        +e.img._animated--trf
                            img(src="/img/products/absorber/1.png" alt="")
                    +e.number._animated--trf 03
        order-block-component(:content="orderBlock")
        service-block-component(:content="serviceBlock")
        blog-latest-component(class="blog-latest--no-grid blog-latest--more-offset")
</template>
<script>
    import GridDark from '@/components/blanks/GridDark.vue';
    import ServiceMain from '@/components/blanks/ServiceMain.vue';
    import OrderBlock from '@/components/blanks/OrderBlock.vue';
    import ServiceBlock from '@/components/blanks/ServiceBlock.vue';
    import BlogLatest from '@/components/blanks/BlogLatest.vue';

    import Shader from '@/components/pages/content/engineering/Shader.vue';

    import {scrollUtils} from '@/mixins/scrollUtils';
    import {throttle} from '@/mixins/throttle';
    import {fadeInOnScroll} from '@/mixins/fadeInOnScroll';

    import {TweenMax} from 'gsap';

    import {editText} from '@/mixins/admin/editText';
    import AdminPanel from '@/components/admin/Panel.vue';


    export default {
        mixins: [editText,scrollUtils,throttle,fadeInOnScroll],
        data(){
            let language = this.$router.currentRoute.meta.language,
                content = this.$attrs.content.content[language],
                obj = {
                    content: content.text,
                    orderBlock: {
                        form: 'order',
                        title: content.text.orderBlock.title,
                        description: content.text.orderBlock.description
                    },
                    serviceBlock: {
                        media:{
                            backgroundImage: content.text.serviceBlock.media.backgroundImage,
                            backgroundVideo: content.text.serviceBlock.media.backgroundVideo
                        },
                        title: content.text.serviceBlock.title,
                        description: content.text.serviceBlock.description,
                        link: content.text.serviceBlock.link
                    },
                    serviceMain: {
                        title: content.text.serviceMain.title,
                        description: content.text.serviceMain.description,
                        media:{
                            backgroundImage: content.text.serviceMain.media.backgroundImage,
                            backgroundVideo: content.text.serviceMain.media.backgroundVideo
                        },
                        button:{
                            name: content.text.serviceMain.button.name,
                        }
                    },
                    animations: {
                        visualSetScales:[0.4,0.22,0.39,0.35,0.42,0.18,0.38,0.24,0.54,0.28,0.45,0.11,0.24,0.32]
                    }
                };
            return obj;
        },
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
                if(this.isElementInViewport(this.$refs.slice)){
                    this.throttle(this.sliceScroll(this.$refs.slice, this.sliceStartPositions),50)
                }
                if(this.isElementInViewport(this.$refs.columns)){
                    this.throttle(this.slideCanvas(),50)
                }



            },
            slideCanvas(){
                let k = (1 - this.howMuchCentered(this.$refs.columns))/2,
                    scale = 0;
                let section = this.$refs.columns.querySelectorAll('.visual-set__slide');

                // TweenLite.to(this.$refs.canvas, 0.5, {
                //     scale: 1 + (0.2 * k),
                //     overflow: 5,
                //     force3D: !0
                // });

                for (let i = 0 ; i < section.length; i++) {

                    if( i === 0 || i === 3 || i === 5 || i === 2 || i === 8 || i === 7 || i === 9 || i === 10 ){
                        k = -k + 1
                    }
                    scale = this.animations.visualSetScales[i]*k;

                    TweenLite.to(section[i], 0.7, {
                        scaleY: scale,
                        overflow: 5,
                        force3D: !0
                    })
                }

            },
            slidingMedia(el){
                let k = this.howMuchCentered(el),
                    columns = this.$refs.columns.querySelectorAll('.visual-set__col');
                for (let i = 0; i < columns.length;i++){
                    let up = columns[i].querySelector('.visual-set__slide--up'),
                        down = columns[i].querySelector('.visual-set__slide--down'),
                        multiply = 0;

                    if(i === 0 || i === 1) multiply = 0.4;
                    if(i === 2 || i === 3) multiply = 0.6;
                    if(i === 4)            multiply = 0.2;
                    if(i === 5)            multiply = 0.6;
                    if(i === 6 || i === 7) multiply = 0.5;
                    if(i === 8 || i === 9) multiply = 0.45;

                    if(k > 0){
                        TweenLite.to(up, 0.3, {
                            scaleY: k*multiply,
                            overflow: 5,
                            force3D: !0
                        });
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
        mounted(){
            if(window.innerWidth >= 1200){
                this.slideCanvas();
            }
        },
        components:{
            'blog-latest-component': BlogLatest,
            'grid-dark-component': GridDark,
            'service-main-component': ServiceMain,
            'order-block-component': OrderBlock,
            'service-block-component': ServiceBlock,
            'admin-panel-component': AdminPanel,
            'shader-component': Shader
        }
    }
</script>