<template lang="pug">
    include ../../../../tools/mixins.pug
    +b.modeling
        +e.description
            +e.H2.title.title--underlined.--dark.--centered._animated--trf(v-on:click="renderImg()") {{ content.modeling.title }}
            +e.text.text--modeling._animated--trf
                p {{ content.modeling.description }}
            +e.A(href="/public/media/breef.doc").button.button__.--primary.--blue._animated--trf
                span {{ content.modeling.briefButton }}
                +e.DIV.wrapper
                .ui-icon.ui-icon--download
        +e.body(:class="canvasAnimation.status" ref="modeling")
            +e.canvas(ref="canvasWrapper")
                canvas(id="phases" ref="canvas") {{content.modeling.canvas.notification}}
            +e.background(v-on:mouseleave="hoverPhase('unhover')" :style="{pointerEvents: canvasAnimation.disableBody}")
                +e.back--1.--gray(v-on:mouseover="hoverPhase('hover-1')" v-on:click="clickPhase('click-1')" ref="section1")
                    +e.phase-title(ref="sectionTitle1") {{content.modeling.canvas.phases.titles[0]}}
                    +e.phase-toggle(v-on:click="closePhase('hover-1',$event)" ref="sectionToggle1")
                +e.back--2.--darkgray(v-on:mouseover="hoverPhase('hover-2')" v-on:click="clickPhase('click-2')" ref="section2")
                    +e.phase-title(ref="sectionTitle2") {{content.modeling.canvas.phases.titles[1]}}
                    +e.phase-toggle(v-on:click="closePhase('hover-2',$event)" ref="sectionToggle2")
                +e.back--3.--gray(v-on:mouseover="hoverPhase('hover-3')" v-on:click="clickPhase('click-3')" ref="section3")
                    +e.phase-title(ref="sectionTitle3") {{content.modeling.canvas.phases.titles[2]}}
                    +e.phase-toggle(v-on:click="closePhase('hover-3',$event)" ref="sectionToggle3")
                +e.back--4.--darkgray(v-on:mouseover="hoverPhase('hover-4')" v-on:click="clickPhase('click-4')" ref="section4")
                    +e.phase-title(ref="sectionTitle4") {{content.modeling.canvas.phases.titles[3]}}
                    +e.phase-toggle(v-on:click="closePhase('hover-4',$event)" ref="sectionToggle4")
            +e.phases
                +e.phase.phase__(v-for="section in content.modeling.canvas.phases.sections")
                    +e.image
                        img(:src="section.image")
                    +e.toggle
                    +e.text.text--phase(v-html="section.text")
            +e.navigation
                +e.BUTTON(type="button" :class="{'modeling__arrow--disabled' : canvasAnimation.arrowPrevBlured}" :disabled="canvasAnimation.arrowDisabled" v-on:click="changeActivePhase('prev')").arrow--prev
                +e.BUTTON(type="button" :class="{'modeling__arrow--disabled' : canvasAnimation.arrowNextBlured}" :disabled="canvasAnimation.arrowDisabled" v-on:click="changeActivePhase('next')").arrow--next
</template>

<script>
    import {scrollUtils} from '@/mixins/scrollUtils';
    import {throttle} from '@/mixins/throttle';
    import {getOffset} from '@/mixins/getOffset';
    import {scrollTo} from '@/mixins/scrollTo';
    import {TweenMax,CSSPlugin} from 'gsap';
    import {fadeInOnScroll} from '@/mixins/fadeInOnScroll';



    export default {
        props: ['content'],
        mixins: [scrollUtils,throttle,fadeInOnScroll,getOffset,scrollTo],
        data(){
            let obj = {
                canvasAnimation: {
                    images:['/img/modeling/phases/desktop/1.png','/img/modeling/phases/desktop/2.png','/img/modeling/phases/desktop/3.png','/img/modeling/phases/desktop/4.png'],
                    loadedImages: [],
                    time:0,
                    canvas: '',
                    ctx: '',
                    width: 2200,
                    height: 1207,
                    status: '',
                    prevStatus: '',
                    slideStatus: '',
                    timeOut: null,
                    disableBody: '',
                    slicingReady: true,
                    blocksOffsets: ['-100','50','-65','65'],
                    arrowPrevBlured: false,
                    arrowNextBlured: false,
                    arrowDisabled: false,
                    activeSlide: 0,
                    isAnimating: false,
                    coordinates: {
                        sx1: 0,
                        sWidth1: 550,
                        dx1: 0,
                        dWidth1: 550,

                        sx2: 550,
                        sWidth2: 550,
                        dx2: 550,
                        dWidth2: 550,

                        sx3: 1100,
                        sWidth3: 550,
                        dx3: 1100,
                        dWidth3: 550,

                        sx4: 1650,
                        sWidth4: 550,
                        dx4: 1650,
                        dWidth4: 550
                    }
                }
            };
            return obj;
        },
        destroyed(){
            if(window.innerWidth >= 1200){
                window.removeEventListener('scroll',this.slicingModel)
            }
        },
        mounted(){
            if(window.innerWidth >= 1200){
                this.loadingImg();
                this.createCanvas();
                window.addEventListener('scroll',this.slicingModel);
                this.slicingModel();
            }
        },
        methods:{
            createCanvas(){
                this.canvasAnimation.canvas = this.$refs.canvas;
                this.canvasAnimation.ctx = this.canvasAnimation.canvas.getContext('2d');
                this.canvasAnimation.canvas.width = this.canvasAnimation.width;
                this.canvasAnimation.canvas.height = this.canvasAnimation.height;


                let width = this.canvasAnimation.canvas.width,
                    height = this.canvasAnimation.canvas.height,
                    ctx = this.canvasAnimation.ctx,
                    images = this.canvasAnimation.loadedImages,
                    canvasWrapper =  this.$refs.canvasWrapper

                for(let i = 0; i < images.length; i++){
                    this.canvasAnimation.loadedImages[i].onload = function() {
                        ctx.drawImage(images[i],width*i*0.25,0,width*0.25,height,width*i*0.25,0,width*0.25,height);
                        if( i === 3){
                            canvasWrapper.style.opacity = 1;
                        }
                    }
                }
            },
            loadingImg(){
                for(let i = 0; i < this.canvasAnimation.images.length; i++){
                    let img = new Image();
                    img.src = this.canvasAnimation.images[i];
                    this.canvasAnimation.loadedImages[i] = img;
                }

            },
            renderCanvas(status){

                if(status==='hover'){
                    this.initDrawOnHover();
                } else if(status === 'click'){
                    this.initDrawOnClick();
                }
            },
            closePhase(status,event){
                let canvasOffset = this.getOffset(this.$refs.canvas).top - (window.innerHeight - this.$refs.canvas.getBoundingClientRect().height)/2;

                this.canvasAnimation.slicingReady = true;
                if(this.canvasAnimation.status === 'click-1' || this.canvasAnimation.status === 'click-2' || this.canvasAnimation.status === 'click-3' || this.canvasAnimation.status === 'click-4' || this.canvasAnimation.status === 'change-1' || this.canvasAnimation.status === 'change-2' || this.canvasAnimation.status === 'change-3' || this.canvasAnimation.status === 'change-4' ){
                    event.stopPropagation();

                    if(this.howMuchCentered(this.$refs.canvas) !== 0){
                        this.scrollTo(canvasOffset,500,'easeOutCubic');
                    }

                }

                if(this.canvasAnimation.status === 'click-2' || this.canvasAnimation.status === 'click-3' || this.canvasAnimation.status === 'click-4' ){
                    this.canvasAnimation.disableBody = 'none';

                }
                this.canvasAnimation.prevStatus = this.canvasAnimation.status;
                this.canvasAnimation.status = status;
                this.canvasAnimation.isAnimating = this.canvasAnimation.status;
                this.renderCanvas('hover');
                this.canvasAnimation.activeSlide = 0;

            },
            hoverPhase(status){
                if(this.canvasAnimation.status === 'click-1' || this.canvasAnimation.status === 'click-2' || this.canvasAnimation.status === 'click-3' || this.canvasAnimation.status === 'click-4' || this.canvasAnimation.status === 'change-1' || this.canvasAnimation.status === 'change-2' || this.canvasAnimation.status === 'change-3' || this.canvasAnimation.status === 'change-4'  ){
                    return;
                }

                if(this.canvasAnimation.prevStatus === 'click-1' || this.canvasAnimation.prevStatus === 'click-2' || this.canvasAnimation.prevStatus === 'click-3' || this.canvasAnimation.prevStatus === 'click-4'){
                    return
                }

                this.canvasAnimation.isAnimating = this.canvasAnimation.status;
                this.canvasAnimation.status = status;
                this.renderCanvas('hover');
            },
            initDrawOnHover(){
                let time = 0.7,
                    delay = 0,
                    up = 2,
                    under = 1,
                    easing = Power1.easeInOut;

                if(this.canvasAnimation.prevStatus === 'click-1' || this.canvasAnimation.prevStatus === 'click-2' || this.canvasAnimation.prevStatus === 'click-3' || this.canvasAnimation.prevStatus === 'click-4'){
                    delay = 0.3;
                }

                clearTimeout(this.canvasAnimation.timeOut);

                switch(this.canvasAnimation.status) {
                    case 'hover-1':

                        TweenMax.to(this.canvasAnimation.coordinates, time, {
                            sx1:0,
                            sWidth1:660,
                            dx1: 0,
                            dWidth1: 660,

                            sx2:660,
                            sWidth2:440,
                            dx2: 660,
                            dWidth2: 440,

                            sx3: 1100,
                            sWidth3: 550,
                            dx3: 1100,
                            dWidth3: 550,

                            sx4: 1650,
                            sWidth4: 550,
                            dx4: 1650,
                            dWidth4: 550,
                            ease: easing,
                            onUpdate:this.draw
                        });

                        this.$refs.section1.style.zIndex = up;
                        this.$refs.section2.style.zIndex = under;
                        this.$refs.section3.style.zIndex = under;
                        this.$refs.section4.style.zIndex = under;


                        if(this.canvasAnimation.prevStatus === 'click-1'){

                            this.canvasAnimation.timeOut = setTimeout(()=>{
                                TweenMax.to(this.$refs.section2, time, {
                                    css:{
                                        left: "30%",
                                        right: "50%"
                                    },
                                    ease: easing
                                });
                                TweenMax.to(this.$refs.section3, time, {
                                    css:{
                                        left: "50%",
                                        right: "25%"
                                    },

                                    ease: easing
                                });
                                TweenMax.to(this.$refs.section4, time, {
                                    css:{
                                        left: "75%",
                                        right: "0"
                                    },
                                    ease: easing
                                });
                                setTimeout(()=>{
                                    this.$refs.section1.style.zIndex = under;
                                },500)
                            },300)
                        } else {

                            TweenMax.to(this.$refs.section2, time, {
                                css:{
                                    left: "30%",
                                    right: "50%"
                                },
                                ease: easing
                            });
                            TweenMax.to(this.$refs.section3, time, {
                                css:{
                                    left: "50%",
                                    right: "25%"
                                },

                                ease: easing
                            });
                            TweenMax.to(this.$refs.section4, time, {
                                css:{
                                    left: "75%",
                                    right: "0"
                                },
                                ease: easing
                            });
                        }

                        TweenMax.to(this.$refs.section1, time, {
                            css:{
                                left: 0,
                                right: "70%"
                            },
                            ease: easing
                        });



                        break;
                    case 'hover-2':
                        TweenMax.to(this.canvasAnimation.coordinates, time, {

                            sx1: 0,
                            sWidth1: 495,
                            dx1: 0,
                            dWidth1: 495,

                            sx2: 495,
                            sWidth2: 660,
                            dx2: 495,
                            dWidth2: 660,

                            sx3: 1155,
                            sWidth3: 495,
                            dx3: 1155,
                            dWidth3: 495,

                            sx4: 1650,
                            sWidth4: 550,
                            dx4: 1650,
                            dWidth4: 550,
                            delay: delay,
                            ease: easing,
                            onUpdate:this.draw
                        });

                        this.$refs.section1.style.zIndex = under;
                        this.$refs.section2.style.zIndex = up;
                        this.$refs.section3.style.zIndex = under;
                        this.$refs.section4.style.zIndex = under;

                        if(this.canvasAnimation.prevStatus === 'click-2'){


                            this.canvasAnimation.timeOut = setTimeout(()=>{
                                TweenMax.to(this.$refs.section1, time, {
                                    css:{
                                        right: "77.5%"
                                    },
                                    delay: delay,
                                    ease: easing,
                                });
                                TweenMax.to(this.$refs.section3, time, {
                                    css:{
                                        left: "52.5%",
                                        right: "25%"
                                    },
                                    delay: delay,
                                    ease: easing
                                });
                                TweenMax.to(this.$refs.section4, time, {
                                    css:{
                                        left: "75%",
                                        right: "0",
                                    },
                                    delay: delay,
                                    ease: easing
                                });
                                setTimeout(()=>{
                                    this.$refs.section2.style.zIndex = under;
                                },850)
                            },300);

                            TweenMax.to(this.$refs.section2, time, {
                                css:{
                                    right: "47.5%",
                                    left: "22.5%",
                                },
                                delay: delay,
                                ease: easing
                            });
                        } else {

                            TweenMax.to(this.$refs.section1, time, {
                                css:{
                                    right: "77.5%"
                                },
                                delay: delay,
                                ease: easing,
                            });
                            TweenMax.to(this.$refs.section3, time, {
                                css:{
                                    left: "52.5%",
                                    right: "25%"
                                },
                                delay: delay,
                                ease: easing
                            });
                            TweenMax.to(this.$refs.section4, time, {
                                css:{
                                    left: "75%",
                                    right: "0"
                                },
                                delay: delay,
                                ease: easing
                            });

                            TweenMax.to(this.$refs.section2, time, {
                                css:{
                                    right: "47.5%",
                                    left: "22.5%"
                                },
                                delay: delay,
                                ease: easing
                            });
                        }




                        break;
                    case 'hover-3':
                        TweenMax.to(this.canvasAnimation.coordinates, time, {
                            sx1: 0,
                            sWidth1: 550,
                            dx1: 0,
                            dWidth1: 550,

                            sx2: 550,
                            sWidth2: 495,
                            dx2: 550,
                            dWidth2: 495,

                            sx3: 1045,
                            sWidth3: 660,
                            dx3: 1045,
                            dWidth3: 660,

                            sx4: 1705,
                            sWidth4: 495,
                            dx4: 1705,
                            dWidth4: 495,

                            delay: delay,
                            ease: easing,
                            onUpdate:this.draw
                        });

                        this.$refs.section1.style.zIndex = under;
                        this.$refs.section2.style.zIndex = under;
                        this.$refs.section3.style.zIndex = up;
                        this.$refs.section4.style.zIndex = under;


                        if(this.canvasAnimation.prevStatus === 'click-3'){
                            this.canvasAnimation.timeOut = setTimeout(()=>{

                                TweenMax.to(this.$refs.section1, time, {
                                    css:{
                                        right: "75%"
                                    },

                                    delay: delay,
                                    ease: easing
                                });
                                TweenMax.to(this.$refs.section2, time, {
                                    css:{
                                        left: "25%",
                                        right: "52.5%"
                                    },
                                    delay: delay,
                                    ease: easing
                                });

                                TweenMax.to(this.$refs.section4, time, {
                                    css:{
                                        left: "77.5%",
                                        right: "0"
                                    },
                                    delay: delay,
                                    ease: easing
                                });


                                setTimeout(()=>{
                                    this.$refs.section3.style.zIndex = under
                                },850)
                            },300);


                            TweenMax.to(this.$refs.section3, time, {
                                css:{
                                    left: "47.5%",
                                    right: "22.5%",
                                },

                                delay: delay,
                                ease: easing
                            });

                        } else {
                            TweenMax.to(this.$refs.section1, time, {
                                css:{
                                    right: "75%",
                                    zIndex: under,
                                },

                                delay: delay,
                                ease: easing
                            });
                            TweenMax.to(this.$refs.section2, time, {
                                css:{
                                    left: "25%",
                                    right: "52.5%",
                                    zIndex: under,
                                },
                                delay: delay,
                                ease: easing
                            });
                            TweenMax.to(this.$refs.section3, time, {
                                css:{
                                    left: "47.5%",
                                    right: "22.5%",
                                    zIndex: under,
                                },

                                delay: delay,
                                ease: easing
                            });
                            TweenMax.to(this.$refs.section4, time, {
                                css:{
                                    left: "77.5%",
                                    right: "0",
                                    zIndex: under,
                                },
                                delay: delay,
                                ease: easing
                            });
                        }


                        break;
                    case 'hover-4':
                        TweenMax.to(this.canvasAnimation.coordinates, time, {
                            sx1: 0,
                            sWidth1: 550,
                            dx1: 0,
                            dWidth1: 550,

                            sx2: 550,
                            sWidth2: 550,
                            dx2: 550,
                            dWidth2: 550,

                            sx3: 1100,
                            sWidth3: 440,
                            dx3: 1100,
                            dWidth3: 440,

                            sx4: 1540,
                            sWidth4: 660,
                            dx4: 1540,
                            dWidth4: 660,

                            delay: delay,
                            ease: easing,
                            onUpdate:this.draw
                        });
                        TweenMax.to(this.$refs.section1, time, {
                            css:{
                                right: "75%",
                                zIndex: 1,
                            },

                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section2, time, {
                            css:{
                                left: "25%",
                                right: "50%",
                                zIndex: 1,
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section3, time, {
                            css:{
                                left: "50%",
                                right: "30%",
                                zIndex: 1,
                            },

                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section4, time, {
                            css:{
                                left: "70%",
                                right: "0",
                                zIndex: 1,
                            },
                            delay: delay,
                            ease: easing
                        });
                        break;
                    case 'unhover':

                        if(!(this.canvasAnimation.prevStatus === 'click-1' || this.canvasAnimation.prevStatus === 'click-2' || this.canvasAnimation.prevStatus === 'click-3' || this.canvasAnimation.prevStatus === 'click-4')){
                            TweenMax.to(this.canvasAnimation.coordinates, time, {
                                sx1: 0,
                                sWidth1: 550,
                                dx1: 0,
                                dWidth1: 550,

                                sx2: 550,
                                sWidth2: 550,
                                dx2: 550,
                                dWidth2: 550,

                                sx3: 1100,
                                sWidth3: 550,
                                dx3: 1100,
                                dWidth3: 550,

                                sx4: 1650,
                                sWidth4: 550,
                                dx4: 1650,
                                dWidth4: 550,

                                ease: easing,
                                onUpdate:this.draw
                            });
                            TweenMax.to(this.$refs.section1, time, {
                                css:{
                                    right: "75%",
                                    zIndex: under
                                },
                                delay: delay,

                                ease: easing
                            });
                            TweenMax.to(this.$refs.section2, time, {
                                css:{
                                    left: "25%",
                                    right: "50%",
                                    zIndex: under
                                },
                                delay: delay,
                                ease: easing
                            });
                            TweenMax.to(this.$refs.section3, time, {
                                css:{
                                    left: "50%",
                                    right: "25%",
                                    zIndex: under
                                },

                                delay: delay,
                                ease: easing
                            });
                            TweenMax.to(this.$refs.section4, time, {
                                css:{
                                    left: "75%",
                                    right: "0",
                                    zIndex: under
                                },
                                delay: delay,
                                ease: easing
                            });
                        }

                        break;
                }


                setTimeout(()=>{
                    this.canvasAnimation.prevStatus = '';
                    this.canvasAnimation.disableBody = '';
                },1200)

            },
            clickPhase(status){
                this.canvasAnimation.status = status;
                this.canvasAnimation.activeSlide = this.canvasAnimation.status.match(/\d+/g).map(Number)[0];

                this.checkNavigationDisable();
                this.renderCanvas('click');
            },
            initDrawOnClick(){

                let time = 0.7,
                    up = 2,
                    under = 1,
                    easing = Power1.easeInOut,
                    canvasOffset = this.getOffset(this.$refs.canvas).top - (window.innerHeight - this.$refs.canvas.getBoundingClientRect().height)/2,
                    timeOut = 0;


                if(this.howMuchCentered(this.$refs.canvas) !== 0){
                    this.scrollTo(canvasOffset,500,'easeOutCubic');
                }



                if(!(this.howMuchCentered(this.$refs.canvas) > -0.01 && this.howMuchCentered(this.$refs.canvas) < 0.01)){
                    timeOut = 500
                }
                setTimeout(()=>{
                    this.canvasAnimation.slicingReady = false;
                    switch(this.canvasAnimation.status) {
                        case 'click-1':
                            TweenMax.to(this.canvasAnimation.coordinates, time, {

                                sx1:0,
                                sWidth1:2200,
                                dx1: 0,
                                dWidth1: 2200,

                                sx2:550,
                                sWidth2:550,
                                dx2: 550,
                                dWidth2: 550,

                                sx3: 1100,
                                sWidth3: 550,
                                dx3: 1100,
                                dWidth3: 550,

                                sx4: 1650,
                                sWidth4: 550,
                                dx4: 1650,
                                dWidth4: 550,

                                ease: easing,
                                onUpdate:this.draw
                            });


                            this.$refs.section1.style.zIndex = up;



                            TweenMax.to(this.$refs.section1, time, {
                                css:{
                                    right: "0",
                                    left: "0"
                                },
                                ease: easing
                            });
                            TweenMax.to(this.$refs.section2, time, {
                                css: {
                                    left: "30%",
                                    right: "50%",
                                    zIndex: under
                                },
                                delay: 0.1,
                                ease: easing
                            });
                            TweenMax.to(this.$refs.section3, time, {
                                css:{
                                    left: "50%",
                                    right: "25%",
                                    zIndex: under
                                },
                                delay: 0.1,
                                ease: easing
                            });
                            TweenMax.to(this.$refs.section4, time, {
                                css:{
                                    left: "75%",
                                    right: "0",
                                    zIndex: under
                                },
                                delay: 0.1,
                                ease: easing
                            });
                            break;
                        case 'click-2':
                            TweenMax.to(this.canvasAnimation.coordinates, time, {

                                sx1: 0,
                                sWidth1: 550,
                                dx1: 0,
                                dWidth1: 550,

                                sx2: 0,
                                sWidth2: 2200,
                                dx2: 0,
                                dWidth2: 2200,

                                sx3: 1100,
                                sWidth3: 550,
                                dx3: 1100,
                                dWidth3: 550,

                                sx4: 1650,
                                sWidth4: 550,
                                dx4: 1650,
                                dWidth4: 550,

                                ease: easing,
                                onUpdate:this.draw
                            });
                            this.$refs.section1.style.zIndex = under;
                            this.$refs.section2.style.zIndex = up;
                            this.$refs.section3.style.zIndex = under;
                            this.$refs.section4.style.zIndex = under;


                            TweenMax.to(this.$refs.section1, time, {
                                css:{
                                    right: "75%",
                                    zIndex: under
                                },
                                ease: easing
                            });
                            TweenMax.to(this.$refs.section2, time, {
                                css:{
                                    right: "0",
                                    left: "0"
                                },
                                ease: easing
                            });
                            this.$refs.section2.style.zIndex = up;
                            TweenMax.to(this.$refs.section3, time, {
                                css:{
                                    left: "50%",
                                    right: "25%",
                                    zIndex: under
                                },

                                ease: easing
                            });
                            TweenMax.to(this.$refs.section4, time, {
                                css:{
                                    left: "75%",
                                    right: "0",
                                    zIndex: under
                                },
                                ease: easing
                            });
                            break;
                        case 'click-3':

                            TweenMax.to(this.canvasAnimation.coordinates, time, {
                                sx1: 0,
                                sWidth1: 550,
                                dx1: 0,
                                dWidth1: 550,

                                sx2: 550,
                                sWidth2: 550,
                                dx2: 550,
                                dWidth2: 550,

                                sx3: 0,
                                sWidth3: 2200,
                                dx3: 0,
                                dWidth3: 2200,

                                sx4: 1650,
                                sWidth4: 550,
                                dx4: 1650,
                                dWidth4: 550,

                                ease: easing,
                                onUpdate:this.draw
                            });

                            this.$refs.section3.style.zIndex = up;

                            TweenMax.to(this.$refs.section1, time, {
                                css:{
                                    right: "75%",
                                    zIndex: under
                                },
                                ease: easing
                            });
                            TweenMax.to(this.$refs.section2, time, {
                                css:{
                                    right: "50%",
                                    left: "25%",
                                    zIndex: under
                                },
                                ease:easing
                            });
                            TweenMax.to(this.$refs.section3, time, {
                                css:{
                                    right: "0",
                                    left: "0",
                                    zIndex: up
                                },
                                ease: easing
                            });
                            TweenMax.to(this.$refs.section4, time, {
                                css:{
                                    left: "77.5%",
                                    right: "0",
                                    zIndex: under
                                },
                                ease: easing
                            });


                            break;
                        case 'click-4':
                            TweenMax.to(this.canvasAnimation.coordinates, time, {
                                sx1: 0,
                                sWidth1: 550,
                                dx1: 0,
                                dWidth1: 550,

                                sx2: 550,
                                sWidth2: 550,
                                dx2: 550,
                                dWidth2: 550,

                                sx3: 1100,
                                sWidth3: 550,
                                dx3: 1100,
                                dWidth3: 550,

                                sx4: 0,
                                sWidth4: 2200,
                                dx4: 0,
                                dWidth4: 2200,

                                ease: easing,
                                onUpdate:this.draw
                            });

                            this.$refs.section4.style.zIndex = up;


                            TweenMax.to(this.$refs.section1, time, {
                                css:{
                                    right: "75%",
                                    zIndex: under
                                },

                                ease: easing
                            });
                            TweenMax.to(this.$refs.section2, time, {
                                css:{
                                    left: "25%",
                                    right: "50%",
                                    zIndex: under
                                },
                                ease: easing
                            });
                            TweenMax.to(this.$refs.section3, time, {
                                css:{
                                    left: "50%",
                                    right: "25%",
                                    zIndex: under
                                },

                                ease: easing
                            });
                            TweenMax.to(this.$refs.section4, time, {
                                css:{
                                    left: "0",
                                    right: "0"
                                },
                                ease: easing
                            });
                            break;
                    }
                },timeOut)


            },
            draw(){
                let width = this.canvasAnimation.width,
                    height = this.canvasAnimation.height,
                    ctx = this.canvasAnimation.ctx,
                    images = this.canvasAnimation.loadedImages,
                    status = this.canvasAnimation.status;


                ctx.clearRect(0,0,width,height);


                let order =[];
                switch(status) {
                    case 'click-1':
                        order = [1,2,3,0];
                        break;
                    case 'hover-1':
                        order = [1,2,3,0];
                        break;
                    case 'change-1':
                        order = [3,2,1,0];
                        break;
                    case 'click-2':
                        order = [0,2,3,1];
                        break;
                    case 'hover-2':
                        order = [0,2,3,1];
                        break;
                    case 'click-3':
                        order = [0,1,3,2];
                        break;
                    case 'hover-3':
                        order = [0,1,3,2];
                        break;
                    case 'click-4':
                        order = [0,1,2,3];
                        break;
                    case 'hover-4':
                        order = [0,1,2,3];
                        break;
                    case 'unhover':
                        order = [0,1,3,2];
                        break;
                }
                order.map((item) => {
                    ctx.drawImage(images[item],this.canvasAnimation.coordinates['sx'+(item+1)],0,this.canvasAnimation.coordinates['sWidth' + (item+1)],height,this.canvasAnimation.coordinates['dx'+(item+1)],0,this.canvasAnimation.coordinates['dWidth'+(item+1)],height);
                })

            },
            changeActivePhase(direction){
                let canvasOffset = this.getOffset(this.$refs.canvas).top - (window.innerHeight - this.$refs.canvas.getBoundingClientRect().height)/2;
                this.canvasAnimation.arrowDisabled = true;

                if(this.howMuchCentered(this.$refs.canvas) !== 0){
                    this.scrollTo(canvasOffset,500,'easeOutCubic');
                }
                if(direction === 'prev' && this.canvasAnimation.activeSlide > 1){
                    this.canvasAnimation.activeSlide--;
                    this.checkNavigationDisable();
                    this.canvasAnimation.prevStatus = this.canvasAnimation.status;
                    this.canvasAnimation.status = 'change-' + this.canvasAnimation.activeSlide;
                    if(this.canvasAnimation.status === 'change-1'){
                        this.canvasAnimation.slideStatus = 'draw-slide-1'
                    }
                    if(this.canvasAnimation.status === 'change-2'){
                        this.canvasAnimation.slideStatus = 'draw-slide-right-2'
                    }
                    if(this.canvasAnimation.status === 'change-3'){
                        this.canvasAnimation.slideStatus = 'draw-slide-right-3'
                    }



                } else if(direction === 'next' && this.canvasAnimation.activeSlide < 4) {
                    this.canvasAnimation.activeSlide++;
                    this.checkNavigationDisable();
                    this.canvasAnimation.prevStatus = this.canvasAnimation.status;
                    this.canvasAnimation.status = 'change-' + this.canvasAnimation.activeSlide;
                    if(this.canvasAnimation.status === 'change-2'){
                        this.canvasAnimation.slideStatus = 'draw-slide-left-2'
                    }
                    if(this.canvasAnimation.status === 'change-3'){
                        this.canvasAnimation.slideStatus = 'draw-slide-left-3'
                    }
                    if(this.canvasAnimation.status === 'change-4'){
                        this.canvasAnimation.slideStatus = 'draw-slide-4'
                    }
                }



                this.initDrawOnChange();

            },
            checkNavigationDisable(){
                if(this.canvasAnimation.activeSlide === 1){
                    this.canvasAnimation.arrowPrevBlured = true
                } else {
                    this.canvasAnimation.arrowPrevBlured = false
                }

                if(this.canvasAnimation.activeSlide === 4){
                    this.canvasAnimation.arrowNextBlured = true
                } else {
                    this.canvasAnimation.arrowNextBlured = false
                }
            },
            initDrawOnChange(direction){
                let time = 0.7,
                    up = 3,
                    mid = 2,
                    under = 1,
                    delay = 0.3,
                    easing = Power1.easeInOut;
                switch(this.canvasAnimation.slideStatus) {
                    case 'draw-slide-1':
                        TweenMax.to(this.canvasAnimation.coordinates, 0, {
                            sx1:0,
                            sWidth1:0,
                            dx1: 0,
                            dWidth1: 0,

                            sx2:0,
                            sWidth2:2200,
                            dx2: 0,
                            dWidth2: 2200,

                            sx3: 1100,
                            sWidth3: 550,
                            dx3: 1100,
                            dWidth3: 550,

                            sx4: 1650,
                            sWidth4: 550,
                            dx4: 1650,
                            dWidth4: 550,

                            ease: easing,
                            delay: delay,
                            onUpdate:this.drawChange
                        });

                        TweenMax.to(this.canvasAnimation.coordinates, time, {
                            sx1:0,
                            sWidth1:2200,
                            dx1: 0,
                            dWidth1: 2200,

                            sx2:0,
                            sWidth2:2200,
                            dx2: 0,
                            dWidth2: 2200,

                            sx3: 1100,
                            sWidth3: 550,
                            dx3: 1100,
                            dWidth3: 550,

                            sx4: 1650,
                            sWidth4: 550,
                            dx4: 1650,
                            dWidth4: 550,

                            ease: easing,
                            onUpdate:this.drawChange,
                            delay: delay
                        });



                        TweenMax.to(this.$refs.section1, 0, {
                            css:{
                                right: "100%",
                                left: "0",
                            },
                            ease: easing
                        });
                        this.$refs.section1.style.zIndex = up;
                        this.$refs.section2.style.zIndex = mid;
                        this.$refs.section3.style.zIndex = under;
                        this.$refs.section4.style.zIndex = under;

                        TweenMax.to(this.$refs.section1, time, {
                            css:{
                                right: "0",
                                left: "0",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section2, time, {
                            css: {
                                left: "0",
                                right: "0",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section3, time, {
                            css:{
                                left: "50%",
                                right: "25%",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section4, time, {
                            css:{
                                left: "75%",
                                right: "0",
                            },
                            delay: delay,
                            ease: easing
                        });
                        break;
                    case 'draw-slide-left-2':
                        TweenMax.to(this.canvasAnimation.coordinates, 0, {
                            sx1:0,
                            sWidth1:2200,
                            dx1: 0,
                            dWidth1: 2200,

                            sx2:0,
                            sWidth2:0,
                            dx2: 0,
                            dWidth2: 0,

                            sx3: 1100,
                            sWidth3: 550,
                            dx3: 1100,
                            dWidth3: 550,

                            sx4: 1650,
                            sWidth4: 550,
                            dx4: 1650,
                            dWidth4: 550,

                            ease: easing,
                            delay: delay,
                            onUpdate:this.drawChange
                        });

                        TweenMax.to(this.canvasAnimation.coordinates, time, {
                            sx1:0,
                            sWidth1:2200,
                            dx1: 0,
                            dWidth1: 2200,

                            sx2:0,
                            sWidth2:2200,
                            dx2: 0,
                            dWidth2: 2200,

                            sx3: 1100,
                            sWidth3: 550,
                            dx3: 1100,
                            dWidth3: 550,

                            sx4: 1650,
                            sWidth4: 550,
                            dx4: 1650,
                            dWidth4: 550,

                            ease: easing,
                            onUpdate:this.drawChange,
                            delay: delay
                        });



                        TweenMax.to(this.$refs.section2, 0, {
                            css:{
                                right: "100%",
                                left: "0",
                            },
                            ease: easing
                        });
                        this.$refs.section1.style.zIndex = mid;
                        this.$refs.section2.style.zIndex = up;
                        this.$refs.section3.style.zIndex = under;
                        this.$refs.section4.style.zIndex = under;

                        TweenMax.to(this.$refs.section1, time, {
                            css:{
                                right: "0",
                                left: "0",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section2, time, {
                            css: {
                                left: "0",
                                right: "0",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section3, time, {
                            css:{
                                left: "50%",
                                right: "25%",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section4, time, {
                            css:{
                                left: "75%",
                                right: "0",
                            },
                            delay: delay,
                            ease: easing
                        });
                        break;
                    case 'draw-slide-right-2':
                        TweenMax.to(this.canvasAnimation.coordinates, 0, {
                            sx1:0,
                            sWidth1:550,
                            dx1: 0,
                            dWidth1: 550,

                            sx2:0,
                            sWidth2:0,
                            dx2: 0,
                            dWidth2: 0,

                            sx3: 0,
                            sWidth3: 2200,
                            dx3: 0,
                            dWidth3: 2200,

                            sx4: 1650,
                            sWidth4: 550,
                            dx4: 1650,
                            dWidth4: 550,

                            ease: easing,
                            delay: delay,
                            onUpdate:this.drawChange
                        });

                        TweenMax.to(this.canvasAnimation.coordinates, time, {
                            sx1:0,
                            sWidth1:550,
                            dx1: 0,
                            dWidth1: 550,

                            sx2:0,
                            sWidth2:2200,
                            dx2: 0,
                            dWidth2: 2200,

                            sx3: 0,
                            sWidth3: 2200,
                            dx3: 0,
                            dWidth3: 2200,

                            sx4: 1650,
                            sWidth4: 550,
                            dx4: 1650,
                            dWidth4: 550,

                            ease: easing,
                            onUpdate:this.drawChange,
                            delay: delay
                        });



                        TweenMax.to(this.$refs.section2, 0, {
                            css:{
                                right: "100%",
                                left: "0",
                            },
                            ease: easing
                        });
                        this.$refs.section1.style.zIndex = under;
                        this.$refs.section2.style.zIndex = up;
                        this.$refs.section3.style.zIndex = mid;
                        this.$refs.section4.style.zIndex = under;

                        TweenMax.to(this.$refs.section1, time, {
                            css:{
                                left: "0",
                                right: "75%",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section2, time, {
                            css: {
                                left: "0",
                                right: "0",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section3, time, {
                            css:{
                                left: "0",
                                right: "0",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section4, time, {
                            css:{
                                left: "75%",
                                right: "0",
                            },
                            delay: delay,
                            ease: easing
                        });
                        break;
                    case 'draw-slide-left-3':
                        TweenMax.to(this.canvasAnimation.coordinates, 0, {
                            sx1:0,
                            sWidth1:550,
                            dx1: 0,
                            dWidth1: 550,

                            sx2:0,
                            sWidth2:2200,
                            dx2: 0,
                            dWidth2: 2200,

                            sx3: 0,
                            sWidth3: 0,
                            dx3: 0,
                            dWidth3: 0,

                            sx4: 1650,
                            sWidth4: 550,
                            dx4: 1650,
                            dWidth4: 550,

                            ease: easing,
                            delay: delay,
                            onUpdate:this.drawChange
                        });

                        TweenMax.to(this.canvasAnimation.coordinates, time, {
                            sx1:0,
                            sWidth1:550,
                            dx1: 0,
                            dWidth1: 550,

                            sx2:0,
                            sWidth2:2200,
                            dx2: 0,
                            dWidth2: 2200,

                            sx3: 0,
                            sWidth3: 2200,
                            dx3: 0,
                            dWidth3: 2200,

                            sx4: 1650,
                            sWidth4: 550,
                            dx4: 1650,
                            dWidth4: 550,

                            ease: easing,
                            onUpdate:this.drawChange,
                            delay: delay
                        });



                        TweenMax.to(this.$refs.section3, 0, {
                            css:{
                                right: "100%",
                                left: "0",
                            },
                            ease: easing
                        });
                        this.$refs.section1.style.zIndex = under;
                        this.$refs.section2.style.zIndex = mid;
                        this.$refs.section3.style.zIndex = up;
                        this.$refs.section4.style.zIndex = under;

                        TweenMax.to(this.$refs.section1, time, {
                            css:{
                                left: "0",
                                right: "75%",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section2, time, {
                            css: {
                                left: "0",
                                right: "0",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section3, time, {
                            css:{
                                left: "0",
                                right: "0",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section4, time, {
                            css:{
                                left: "75%",
                                right: "0",
                            },
                            delay: delay,
                            ease: easing
                        });


                        break;
                    case 'draw-slide-right-3':
                        TweenMax.to(this.canvasAnimation.coordinates, 0, {
                            sx1:0,
                            sWidth1:550,
                            dx1: 0,
                            dWidth1: 550,

                            sx2:550,
                            sWidth2:550,
                            dx2: 550,
                            dWidth2: 550,

                            sx3: 0,
                            sWidth3: 0,
                            dx3: 0,
                            dWidth3: 0,

                            sx4: 0,
                            sWidth4: 2200,
                            dx4: 0,
                            dWidth4: 2200,

                            ease: easing,
                            delay: delay,
                            onUpdate:this.drawChange
                        });

                        TweenMax.to(this.canvasAnimation.coordinates, time, {
                            sx1:0,
                            sWidth1:550,
                            dx1: 0,
                            dWidth1: 550,

                            sx2:550,
                            sWidth2:550,
                            dx2: 550,
                            dWidth2: 550,

                            sx3: 0,
                            sWidth3: 2200,
                            dx3: 0,
                            dWidth3: 2200,

                            sx4: 0,
                            sWidth4: 2200,
                            dx4: 0,
                            dWidth4: 2200,

                            ease: easing,
                            onUpdate:this.drawChange,
                            delay: delay
                        });



                        TweenMax.to(this.$refs.section3, 0, {
                            css:{
                                right: "100%",
                                left: "0",
                            },
                            ease: easing
                        });
                        this.$refs.section1.style.zIndex = under;
                        this.$refs.section2.style.zIndex = under;
                        this.$refs.section3.style.zIndex = up;
                        this.$refs.section4.style.zIndex = mid;

                        TweenMax.to(this.$refs.section1, time, {
                            css:{
                                left: "0",
                                right: "75%",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section2, time, {
                            css: {
                                left: "25%",
                                right: "50%",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section3, time, {
                            css:{
                                left: "0",
                                right: "0",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section4, time, {
                            css:{
                                left: "0",
                                right: "0",
                            },
                            delay: delay,
                            ease: easing
                        });


                        break;
                    case 'draw-slide-4':
                        TweenMax.to(this.canvasAnimation.coordinates, 0, {
                            sx1:0,
                            sWidth1:550,
                            dx1: 0,
                            dWidth1: 550,

                            sx2:0,
                            sWidth2:550,
                            dx2: 0,
                            dWidth2: 550,

                            sx3: 0,
                            sWidth3: 2200,
                            dx3: 0,
                            dWidth3: 2200,

                            sx4: 0,
                            sWidth4: 0,
                            dx4: 0,
                            dWidth4: 0,

                            ease: easing,
                            delay: delay,
                            onUpdate:this.drawChange
                        });

                        TweenMax.to(this.canvasAnimation.coordinates, time, {
                            sx1:0,
                            sWidth1:550,
                            dx1: 0,
                            dWidth1: 550,

                            sx2:0,
                            sWidth2:550,
                            dx2: 0,
                            dWidth2: 550,

                            sx3: 0,
                            sWidth3: 2200,
                            dx3: 0,
                            dWidth3: 2200,

                            sx4: 0,
                            sWidth4: 2200,
                            dx4: 0,
                            dWidth4: 2200,

                            ease: easing,
                            onUpdate:this.drawChange,
                            delay: delay
                        });



                        TweenMax.to(this.$refs.section4, 0, {
                            css:{
                                right: "100%",
                                left: "0",
                            },
                            ease: easing
                        });
                        this.$refs.section1.style.zIndex = under;
                        this.$refs.section2.style.zIndex = under;
                        this.$refs.section3.style.zIndex = mid;
                        this.$refs.section4.style.zIndex = up;

                        TweenMax.to(this.$refs.section1, time, {
                            css:{
                                left: "0",
                                right: "75%",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section2, time, {
                            css: {
                                left: "25%",
                                right: "50%",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section3, time, {
                            css:{
                                left: "0",
                                right: "0",
                            },
                            delay: delay,
                            ease: easing
                        });
                        TweenMax.to(this.$refs.section4, time, {
                            css:{
                                left: "0",
                                right: "0",
                            },
                            delay: delay,
                            ease: easing
                        });

                        break;
                }


                setTimeout(()=>{
                    this.canvasAnimation.arrowDisabled = false;
                },(delay + time)*1000)
            },
            drawChange(){
                let width = this.canvasAnimation.width,
                    height = this.canvasAnimation.height,
                    ctx = this.canvasAnimation.ctx,
                    images = this.canvasAnimation.loadedImages,
                    status = this.canvasAnimation.slideStatus;


                ctx.clearRect(0,0,width,height);


                let order =[];
                switch(status) {
                    case 'draw-slide-1':
                        order = [2,3,1,0];
                        break;
                    case 'draw-slide-left-2':
                        order = [2,3,0,1];
                        break;
                    case 'draw-slide-right-2':
                        order = [0,3,2,1];
                        break;
                    case 'draw-slide-left-3':
                        order = [0,3,1,2];
                        break;
                    case 'draw-slide-right-3':
                        order = [0,1,3,2];
                        break;
                    case 'draw-slide-4':
                        order = [0,1,2,3];
                        break;
                }
                order.map((item) => {
                    ctx.drawImage(images[item],this.canvasAnimation.coordinates['sx'+(item+1)],0,this.canvasAnimation.coordinates['sWidth' + (item+1)],height,this.canvasAnimation.coordinates['dx'+(item+1)],0,this.canvasAnimation.coordinates['dWidth'+(item+1)],height);
                })
            },
            slicingModel(){
                if(this.isElementInViewport(this.$refs.modeling) && this.canvasAnimation.slicingReady){
                    let k = -this.howMuchCentered(this.$refs.canvas);


                    TweenLite.to(this.$refs.section1, 0.3, {
                        y: k * this.canvasAnimation.blocksOffsets[0],
                        overflow: 5,
                        force3D: !0
                    });
                    TweenLite.to(this.$refs.section2, 0.3, {
                        y: k * this.canvasAnimation.blocksOffsets[1],
                        overflow: 5,
                        force3D: !0
                    });
                    TweenLite.to(this.$refs.section3, 0.3, {
                        y: k * this.canvasAnimation.blocksOffsets[2],
                        overflow: 5,
                        force3D: !0
                    });
                    TweenLite.to(this.$refs.section4, 0.3, {
                        y: k * this.canvasAnimation.blocksOffsets[3],
                        overflow: 5,
                        force3D: !0
                    });
                }
            }
        }
    }
</script>