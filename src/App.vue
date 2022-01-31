<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        updated(){
            if (typeof document !== 'undefined'){
                document.body.style.overflow = "";
            }
        },
        created(){
            if (typeof document !== 'undefined' && window.innerWidth >= 1200) {
                window.addEventListener('resize', this.setHtmlFontSize);
            }
        },
        destroyed(){
            if (typeof document !== 'undefined' && window.innerWidth >= 1200){
                window.removeEventListener('resize', this.setHtmlFontSize);
            }
        },
        mounted() {
            if(window.innerWidth >= 1200){
                this.setHtmlFontSize();
            }
        },
        methods:{
            setHtmlFontSize (){
                let fontSize = window.innerWidth / 100;

                if(window.innerWidth >= 1920) fontSize = 19.2;
                document.documentElement.style.fontSize = fontSize + 'px';
            }
        }
    };
</script>

<style lang="scss">
    /*@import 'assets/scss/critical';*/
    /*@import 'assets/scss/main';*/
</style>
