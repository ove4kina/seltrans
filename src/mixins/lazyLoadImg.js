export const lazyLoadImg = {
    data() {
        return {
            lazy:{
                images: []
            }

        }
    },
    mounted(){
        this.getImages();
        this.loadImg();
        window.addEventListener('scroll',this.scrollLazy)
    },
    updated(){
        this.getImages();
        this.loadImg();
    },
    destroyed(){
        window.removeEventListener('scroll',this.scrollLazy)
    },
    methods: {
        scrollLazy(){
            this.throttle(this.loadImg(),50)
        },
        loadImg(){
            for(let i = 0; i < this.lazy.images.length;i++){

                if (this.howMuchCentered(this.lazy.images[i]) > -1){
                    let el =  this.lazy.images[i];
                    if (el.getAttribute('src') !== el.getAttribute('data-lazy')) {
                        el.style.opacity = 0.3;
                        el.style.transition = '0.3s ease';
                        let img = new Image();
                        let src = el.getAttribute('data-lazy');
                        img.src = src;
                        img.onload = function() {
                            el.src = src;
                            el.style.opacity = 1;
                            setTimeout(function() {
                                el.removeAttribute('style');
                            }, 300)
                        };
                    }
                }
            }
        },
        getImages(){
            for (let i = 0; i < document.querySelectorAll('._lazy').length;i++){
                this.lazy.images.push(document.querySelectorAll('._lazy')[i]);
            }
        },
        howMuchCentered(el) {
            let elementOffsetTop = el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop),
                rect = el.getBoundingClientRect(),
                viewportHeight = window.innerHeight,
                k = (2*this.getScroll()[1]-2*elementOffsetTop+viewportHeight-rect.height)/(viewportHeight + rect.height);
            return k;
        },
        getScroll() {
            if (window.pageYOffset !== undefined) {
                return [pageXOffset, pageYOffset];
            } else {
                let sx, sy, d = document,
                    r = d.documentElement,
                    b = d.body;
                sx = r.scrollLeft || b.scrollLeft || 0;
                sy = r.scrollTop || b.scrollTop || 0;
                return [sx, sy];
            }
        },
        throttle(callback, limit) {
            let wait = false;
            return function () {
                if (!wait) {
                    callback.call();
                    wait = true;
                    setTimeout(function () {
                        wait = false;
                    }, limit);
                }
            }
        },
    }
};