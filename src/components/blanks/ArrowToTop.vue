<template lang="pug">
    include ../../tools/mixins.pug

    BUTTON.button.button--scroll-top(:class="{'hidden': isHidden}" v-scroll-to="'#main'")
        .ui-arrow.ui-arrow--big
            span
                span
                span
                    span
                    span
        p {{ button }}
</template>



<script>
    import {scrollUtils} from '@/mixins/scrollUtils';
    import {throttle} from '@/mixins/throttle';
    export default {
        mixins: [scrollUtils,throttle],
        data() {
            let language = this.$router.currentRoute.meta.language;
            let obj = {
                isHidden: true,
                button: language === 'en' ? 'To Top' : 'Наверх'
            };
            return obj;
        },
        created(){
            if (typeof document !== 'undefined') {
                window.addEventListener('scroll', this.scroll);
            }
        },
        destroyed(){
            if (typeof document !== 'undefined'){
                window.removeEventListener('scroll',this.scroll);
            }
        },
        methods: {
            scroll(){
                this.throttle(this.showButton(),50)
            },
            showButton(){
                if(this.getScroll()[1] > window.innerHeight*1.5){
                    this.isHidden = false
                } else {
                    this.isHidden = true
                }
            }
        }
    }
</script>
