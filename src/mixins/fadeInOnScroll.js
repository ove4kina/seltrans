export const fadeInOnScroll = {
    data() {
        return {
            animatedElements: [],
            pageReady: false,
        }
    },
    created() {
        if (typeof document !== 'undefined' && window.innerWidth >= 1200) {
            window.addEventListener('scroll', this.fadeInOnScroll);
        }
    },
    mounted() {
        //добавление классов для элементов статей
        if(document.querySelector('.text--article-page') !== null){
            for (let i = 0;i < document.querySelector('.text--article-page').childNodes.length;i++){
                document.querySelector('.text--article-page').childNodes[i].classList.add('_animated')
                document.querySelector('.text--article-page').childNodes[i].classList.add('_animated--trf')
            }
        }
        for (let i = 0;i < document.querySelectorAll('._animated').length;i++){
            this.animatedElements.push(document.querySelectorAll('._animated')[i])

        }
        this.fadeInOnScroll();

    },
    updated(){
        this.fadeInOnScroll();
    },
    methods: {
        fadeInOnScroll(){
            for (let i = 0;i < this.animatedElements.length; i++){
                if(this.isElementInViewportOffset(this.animatedElements[i],0) && this.animatedElements[i].classList.contains('_animated')){

                    if(this.animatedElements[i].classList.contains('_animated--mrgn')){
                        this.animatedElements[i].classList.add('_inViewPort--mrgn');

                    } else if(this.animatedElements[i].classList.contains('_animated--border')) {
                        this.animatedElements[i].classList.add('_inViewPort--border');

                    } else {
                        this.animatedElements[i].classList.add('_inViewPort');
                    }

                    setTimeout(()=>{
                        this.animatedElements[i].classList.remove('_animated');
                        this.animatedElements[i].classList.remove('_inViewPort');
                        this.animatedElements[i].classList.remove('_animated--trf');
                        this.animatedElements[i].classList.remove('_animated--mrgn');
                        this.animatedElements[i].classList.remove('_inViewPort--mrgn');
                        this.animatedElements[i].classList.remove('_inViewPort--border');
                        this.animatedElements[i].classList.remove('_animated--1');
                        this.animatedElements[i].classList.remove('_animated--2');
                        this.animatedElements[i].classList.remove('_animated--3');
                        this.animatedElements[i].classList.remove('_animated--4');
                        this.animatedElements[i].classList.remove('_animated--5');
                        this.animatedElements[i].classList.remove('_animated--border');
                    },2000)
                }
            }
        },
        isElementInViewportOffset(el,offset) {
            let rect = el.getBoundingClientRect();
            return ((rect.top - (window.innerHeight || document. documentElement.clientHeight) + offset) <= 0);
        },
    },
    destroyed(){
        if (typeof document !== 'undefined' && window.innerWidth >= 1200) {
            window.removeEventListener('scroll', this.fadeInOnScroll);
        }
    }
};