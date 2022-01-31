<template lang="pug">
    include ../../../../tools/mixins.pug

    +b(v-if="content.setup").product-setup
        grid-dark-component
        +e.body(:class="{'_animated-part _animated-part--trf':animation.body.init, '_inViewPort-part':animation.body.show}" ref="body")
            +e.BUTTON(type="button"
                        v-for="(part,index) in content.setup.parts"
                        :key="index"
                        v-on:click="setup.index = index"
                        :class="['product-setup__button--' + content.setup.buttonClass + '-' + part.id, index === setup.index ? 'active' : '',index === setup.indexHover ? 'hovered' : '']").button.button--plus.--blured
            +e.photo(v-for="(part,index) in content.setup.parts" :class="[index === setup.index ? 'active' : '', index === setup.indexHover ? 'hovered' : '']")
                img(:src="'/img/product-setup/' + content.setup.photoDirectory + '/desktop/' + part.id + '.png'")
            +e.photo--blank
                img(:src="'/img/product-setup/' + content.setup.photoDirectory + '/desktop/blank.png'")
        +e.description
            +e.wrapper
                +e.H2.title.title--underlined.--dark(:class="{'_animated-part _animated-part--trf':animation.title.init, '_inViewPort-part':animation.title.show}" ref="title") {{ content.setup.title }}
                +e.text.text--product-setup(:class="{'_animated-part _animated-part--trf':animation.text.init, '_inViewPort-part':animation.text.show}" ref="text")
                    p {{ content.setup.description }}
            +e.list
                product-setup-part-component(v-for="(part,index) in content.setup.parts"
                                            :key="index"
                                            v-on:click.native="setup.index = index"
                                            v-on:mouseenter.native = "setup.indexHover = index"
                                            v-on:mouseleave.native = "setup.indexHover = false"
                                            :ref="'part' + index"
                                            class="product-setup__part"
                                            :class="{'_animated-part _animated-part--trf':!checkElementInMassiveAnimate(index), '_inViewPort-part':checkElementInMassiveAnimate(index)}"
                                            :content="{part:part,index:index,photoDirectory:content.setup.photoDirectory, active:setup.index===index}")
</template>

<script>
    import ProductSetupPart from '@/components/pages/content/products-list/ProductSetupPart.vue';
    import GridDark from '@/components/blanks/GridDark.vue';
    import {scrollUtils} from '@/mixins/scrollUtils';

    export default {
        mixins:[scrollUtils],
        props:['content'],
        data(){
            let obj = {
                setup: {
                    index: 0,
                    indexHover: false
                },
                animation: {
                    body: {
                        init: true,
                        show: false
                    },
                    title: {
                        init: true,
                        show: false
                    },
                    text: {
                        init: true,
                        show: false
                    },
                    part: {
                        init: true,
                        show: false,
                        activeIndexes: []
                    },
                }
            };
            return obj
        },
        mounted(){
            window.addEventListener('scroll', this.animationOnScroll);
        },
        destroyed(){
            window.removeEventListener('scroll', this.animationOnScroll);
        },
        methods: {
            animationOnScroll(){
                if (typeof this.$refs.body !== 'undefined'){
                    if(this.isElementInViewport(this.$refs.body)){
                        this.animation.body.show = true;
                        setTimeout(()=>{
                            this.animation.body.init = false;
                            this.animation.body.show = false;
                        },2200)
                    }
                    if(this.isElementInViewport(this.$refs.title)){
                        this.animation.title.show = true;
                        setTimeout(()=>{
                            this.animation.title.init = false;
                            this.animation.title.show = false;
                        },2200)
                    }
                    if(this.isElementInViewport(this.$refs.text)){
                        this.animation.text.show = true;
                        setTimeout(()=>{
                            this.animation.text.init = false;
                            this.animation.text.show = false;
                        },2200)
                    }
                    for(let i = 0; i < 6; i++){
                        // console.log(this.$refs['part' + i])
                        if(this.isElementInViewport( this.$refs['part' + i][0].$el) && !this.checkElementInMassive(i, this.animation.part.activeIndexes)){
                            this.animation.part.activeIndexes.push(i)
                        }
                    }
                }



            },
            checkElementInMassive(el,mas){
                for(let i = 0; i < mas.length;i++){
                    if (el === mas[i]){
                        return true
                    }
                }
                return false
            },
            checkElementInMassiveAnimate(index) {
                if(this.checkElementInMassive(index,this.animation.part.activeIndexes)) {
                    return true;
                }
                return false;
            }
        },
        components:{
            'grid-dark-component': GridDark,
            'product-setup-part-component': ProductSetupPart,
        }

    }
</script>
