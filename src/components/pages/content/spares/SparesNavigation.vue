<template lang="pug">
    include ../../../../tools/mixins.pug

    +e.swiper-container(ref="slider")
        +e.spares__blur
        .swiper-wrapper
            +b.spare__.--small.spares__item--small.swiper-slide(
                                                            v-for="(item,index) in content"
                                                            v-on:click="$emit('clicked', index)"
                                                            ref="toggles"
                                                        )
                +e.photo--small
                    img(:src="item.smallPhoto")
                +e.title--small
                    span {{item.title}}
</template>

<script>
    export default {
        props:['content'],
        data(){
            let language = this.$router.currentRoute.meta.language;
            let obj = {

            };
            return obj;
        },
        methods:{

        },
        mounted(){
        },
        computed:{

        },
    }
</script>
