export const transitionVideo =  {
    data() {
        return {
            animationVideo: {
                hideSection: false,
                section: null,
                mainBlock: null,
                mainHeight: 0,
                hideMain: false,
                transitionedMain: false,
                videoInited: false,
                servicesBlock: null,
                serviceEngineering: null,
                serviceModeling: null,
                servicesList: null,
                indexMain: null
            },
        }
    },
    created() {
        if(typeof window !== 'undefined'){
            if(window.innerWidth >= 1200){
                if (this.$router.pageFromAnimation === 'video' && this.$router.history.current.meta.animation === 'video' || this.$router.pageFromAnimation === 'video' && this.$router.history.current.meta.animation === 'all' || this.$router.pageFromAnimation === 'all' && this.$router.history.current.meta.animation === 'video') {
                    this.setInitStageVideo();
                }
            }
        }
    },
    mounted() {
        if(window.innerWidth >= 1200){
            this.getVariablesVideo();
            if (
                (this.$router.pageFromAnimation === 'all'
                ||
                (this.$router.history.current.meta.animation === 'video' && typeof this.$router.pageFromAnimation !=='undefined'))
                &&
                this.$router.history.current.meta.language === this.$router.pageFromLanguage
            ) {
                this.setMountedOptionsVideo();

                setTimeout(()=>{
                    this.releasePageVideo();
                },1)
            }
            if (this.$router.pageFromAnimation === 'video' && this.$router.history.current.meta.animation === 'video' || this.$router.pageFromAnimation === 'video' && this.$router.history.current.meta.animation === 'all') {
                this.releasePageVideo();
            }
        }

    },
    beforeRouteLeave(to, from, next) {
        if(window.innerWidth >= 1200){
            if ((to.meta.animation === 'video' && from.meta.animation === 'video' || to.meta.animation === 'video' && from.meta.animation === 'all') && to.hash !== '#prevent') {


                if (to.hash === '#engineering' || to.hash === '#modeling'){
                    if(to.hash === '#engineering'){
                        this.scrollBeforeOut(this.animationVideo.indexBlock,-(this.animationVideo.servicesList.offsetTop + this.animationVideo.serviceEngineering.offsetTop));

                    } else {
                        this.scrollBeforeOut(this.animationVideo.indexBlock,-(this.animationVideo.servicesList.offsetTop + this.animationVideo.serviceModeling.offsetTop));
                    }
                    setTimeout(()=>{
                        this.hidePageVideo();
                    },200);
                    setTimeout(() => {
                        next()
                    }, 600)
                } else {
                    if(this.animationVideo.indexMain !== null){
                        this.scrollBeforeOut(this.animationVideo.indexMain,0);
                    }

                    if(this.animationVideo.section !== null){
                        this.scrollBeforeOut(this.animationVideo.section,0);
                    }

                    setTimeout(()=>{
                        this.hidePageVideo();
                    },200);
                    setTimeout(() => {
                        next()
                    }, 1001)
                }


            } else {
                next()
            }
        } else {
            next()
        }

    },

    methods: {
        scrollBeforeOut(el,offset){
            if(el.getBoundingClientRect().top !== 0){
                this.scrollTo(el,200,'easeOutCubic',offset);
            }
        },
        setInitStageVideo(){
            this.animationVideo.hideMain = true;
            this.animationVideo.transitionedMain = false;
            this.animationVideo.videoInited = true;
        },
        setMountedOptionsVideo(){
            this.animationVideo.mainBlock.style.maxHeight = window.innerHeight + 'px';
            this.animationVideo.mainBlock.style.height = window.innerHeight + 'px';
        },
        hidePageVideo(){
            this.animationVideo.hideSection = true;
            this.animationVideo.hideMain = true;
            setTimeout(()=>{
                if(this.$router.pageFromAnimation === 'video' && this.$router.history.current.meta.animation === 'video' || this.$router.pageFromAnimation === 'video' && this.$router.history.current.meta.animation === 'all'){
                    this.animationVideo.section.style.maxHeight = this.animationVideo.mainHeight + 'px';
                }
            },500)
        },
        releasePageVideo(){
            if (this.$router.pageFromAnimation === 'all' || this.$router.history.current.meta.animation === 'video'){
                this.animationVideo.mainBlock.style.transition = '0.5s ease';
                this.animationVideo.mainBlock.style.maxHeight = this.animationVideo.mainHeight + 'px';
                // this.animationVideo.mainBlock.style.height = 'auto';
                setTimeout(()=>{
                    this.animationVideo.hideMain = false;
                    this.animationVideo.transitionedMain = true;
                    setTimeout(()=>{
                        this.animationVideo.transitionedMain = false;
                    },1000)
                },500)


            } else {
                this.animationVideo.hideMain = false;
                this.animationVideo.transitionedMain = true;
                setTimeout(()=>{
                    this.animationVideo.transitionedMain = false;
                },1000)
            }
        },
        getVariablesVideo(){
            if(document.querySelector('.service--page') !== null){
                this.animationVideo.section = document.querySelector('.service--block');
                this.animationVideo.mainBlock = document.querySelector('.service--page');
                this.animationVideo.mainHeight = this.animationVideo.mainBlock.getBoundingClientRect().height;
            }
            if((document.querySelector('.services') !== null)){
                this.animationVideo.indexBlock = document.querySelector('.services');
                this.animationVideo.serviceEngineering = document.querySelector('.services__item--engineering');
                this.animationVideo.serviceModeling = document.querySelector('.services__item--modeling');
                this.animationVideo.servicesList = document.querySelector('.services__list');
                this.animationVideo.indexMain = document.querySelector('.main');

            }
        },
        scrollTo(destination, duration = 200, easing = 'linear',offset = 0, callback) {


            const easings = {
                linear(t) {
                    return t;
                },
                easeInQuad(t) {
                    return t * t;
                },
                easeOutQuad(t) {
                    return t * (2 - t);
                },
                easeInOutQuad(t) {
                    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                },
                easeInCubic(t) {
                    return t * t * t;
                },
                easeOutCubic(t) {
                    return (--t) * t * t + 1;
                },
                easeInOutCubic(t) {
                    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                },
                easeInQuart(t) {
                    return t * t * t * t;
                },
                easeOutQuart(t) {
                    return 1 - (--t) * t * t * t;
                },
                easeInOutQuart(t) {
                    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
                },
                easeInQuint(t) {
                    return t * t * t * t * t;
                },
                easeOutQuint(t) {
                    return 1 + (--t) * t * t * t * t;
                },
                easeInOutQuint(t) {
                    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
                }
            };
            const start = window.pageYOffset;
            const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
            const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
            const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
            const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop - offset;
            const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset) ;
            if ('requestAnimationFrame' in window === false) {
                window.scroll(0, destinationOffsetToScroll);
                if (callback) {
                    callback();
                }
                return;
            }


            function scroll() {
                const now = 'now' in window.performance ? performance.now() : new Date().getTime();
                const time = Math.min(1, ((now - startTime) / duration));
                const timeFunction = easings[easing](time);
                window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));
                if (window.pageYOffset === destinationOffsetToScroll) {
                    if (callback) {
                        callback();
                    }
                    return;
                }
                requestAnimationFrame(scroll);
            }
            scroll();
        }
    }
};