<template lang="pug">
    include ../../tools/mixins.pug

    +b(ref="rain").rain
        +e.item
        +e.item
        +e.item
        +e.item
        +e.item
        +e.item

</template>

<script>
    import {TweenLite} from 'gsap';

    export default {
        data() {
            let obj = {
                lines: []
            };
            return obj;
        },
        created(){
           if (typeof document !== 'undefined' && window.innerWidth >= 1200) {
                window.addEventListener('scroll', this.scrollAnimation);
                // window.addEventListener('scroll', this.inViewportIndexSvg);
            }
        },
        destroyed(){
            if (typeof document !== 'undefined' && window.innerWidth >= 1200){
                window.removeEventListener('scroll',this.scrollAnimation);
            }
        },
        mounted(){
            this.lines = this.$refs.rain.querySelectorAll('.rain__item')
        },
        methods: {
            scrollAnimation(){

                for (let i = 0; i < this.lines.length; i++){
                    let transform = this.getScroll()[1]*(i+1)*0.01;
                    TweenLite.to(this.lines[i], 0.7, {
                        y: transform,
                        overflow: 5,
                        force3D: !0
                    })
                    // this.lines[i].style.transform = 'translate3d(0,'+transform+'px,0) rotateZ(0)'
                }

            },
            getScroll() {
                if (window.pageYOffset != undefined) {
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
        }
    }
</script>

