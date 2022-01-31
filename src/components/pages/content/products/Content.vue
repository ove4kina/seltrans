<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.products(id="main")
        admin-panel-component(v-show="loginIn" @clicked="onAdminPanelClick")
        grid-dark-component(class="grid--fixed")
        +e.H1.title.title--underlined.--dark.--big._animated--trf(
            :class="{'editable-text': loginIn}"
            @click="clickTextField($event,content.title,'title','textJson')"
            @input="editTextJson($event,content.title,'title',70)"
        ) {{ content.title }}
        +e.text.text--products._animated--trf
            p(v-html="content.description" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.description,'description','htmlJson')" @input="editHtmlJson($event,content.description,'description')")
        +e.list
            +e.item.product-set__
                +e.body--right.--current
                    +e.description.text--product-set._animated--trf
                        h2(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content.products[0].title,'products.0.title','textJson')"
                            @input="editTextJson($event,content.products[0].title,'products.0.title',70)"
                        ) {{ content.products[0].title }}
                        p(v-html="content.products[0].description" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.products[0].description,'products.0.description','htmlJson')" @input="editHtmlJson($event,content.products[0].description,'products.0.description')")
                    +e.ROUTER-LINK(:to="content.products[0].link.url").button.button__.--primary.--blue._animated--trf
                        span {{ text.itemButton }}
                        +e.wrapper
                        .ui-arrow
                            span
                                span
                                span
                                    span
                                    span
                +e.photo--current._animated--trf
                    img._lazy(src="/img/products-set/tok-placeholder.png" data-lazy="/img/products-set/toknew.png")
                +e.card.product__._animated--trf
                    +e.ROUTER-LINK(:to="content.products[0].model.link").title--card-list
                        span {{ content.products[0].model.name }}
                    +e.description--card-list.text--product-card
                        p(v-html="content.products[0].model.description")
            +e.item.product-set__
                +e.body--left.--pantograph
                    +e.description.text--product-set._animated--trf
                        h2(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content.products[1].title,'products.1.title','textJson')"
                            @input="editTextJson($event,content.products[1].title,'products.1.title',70)"
                        ) {{ content.products[1].title }}
                        p(v-html="content.products[1].description" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.products[1].description,'products.1.description','htmlJson')" @input="editHtmlJson($event,content.products[1].description,'products.1.description')")
                    +e.ROUTER-LINK(:to="content.products[1].link.url").button.button__.--primary.--blue._animated--trf
                        span {{ text.itemButton }}
                        +e.wrapper
                        .ui-arrow
                            span
                                span
                                span
                                    span
                                    span
                +e.photo--pantograph._animated--trf
                    img._lazy(src="/img/products-set/poloz-placeholder.png" data-lazy="/img/products-set/poloz.png")
                +e.card--absoluted.product__._animated--trf
                    +e.ROUTER-LINK(:to="content.products[1].model.link").title--card-list
                        span {{ content.products[1].model.name }}
                    +e.description--card-list.text--product-card
                        p {{ content.products[1].model.description }}
            +e.item--after-absoluted.product-set__
                +e.photo--strings._animated--trf
                    img._lazy(src="/img/products-set/struni-placeholder.png" data-lazy="/img/products-set/struni.png")
                +e.body--left.--strings
                    +e.description.text--product-set._animated--trf
                        h2(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content.products[2].title,'products.2.title','textJson')"
                            @input="editTextJson($event,content.products[2].title,'products.2.title',70)"
                        ) {{ content.products[2].title }}
                        p(v-html="content.products[2].description" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.products[2].description,'products.2.description','htmlJson')" @input="editHtmlJson($event,content.products[2].description,'products.2.description')")
                    +e.ROUTER-LINK(:to="content.products[2].link.url").button.button__.--primary.--blue._animated--trf
                        span {{ text.itemButton }}
                        +e.wrapper
                        .ui-arrow
                            span
                                span
                                span
                                    span
                                    span
            +e.item--absoluted-img.product-set__
                +e.photo--shape
                    img(class="product-set__img product-set__img--3" src="/img/products-set/rama-placeholder.png" data-lazy="/img/products-set/rama.png")._animated--trf._animated._lazy
                    img(class="product-set__img product-set__img--1" src="/img/products-set/karetka-placeholder.png" data-lazy="/img/products-set/karetka.png")._animated--trf._animated._lazy
                    img(class="product-set__img product-set__img--2" src="/img/products-set/pnevmo-placeholder.png" data-lazy="/img/products-set/pnevmo.png")._animated--trf._animated._lazy
                +e.body--right.--shape
                    +e.description.text--product-set._animated--trf
                        h2(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content.products[3].title,'products.3.title','textJson')"
                            @input="editTextJson($event,content.products[3].title,'products.3.title',70)"
                        ) {{ content.products[3].title }}
                        p(v-html="content.products[3].description" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.products[3].description,'products.3.description','htmlJson')" @input="editHtmlJson($event,content.products[3].description,'products.3.description')")
                    +e.ROUTER-LINK(:to="content.products[3].link.url").button.button__.--primary.--blue._animated--trf
                        span {{ text.itemButton }}
                        +e.wrapper
                        .ui-arrow
                            span
                                span
                                span
                                    span
                                    span

</template>
<script>
    import GridDark from '@/components/blanks/GridDark.vue';

    import {getOffset} from '@/mixins/getOffset';
    import {fadeInOnScroll} from '@/mixins/fadeInOnScroll';
    import {lazyLoadImg} from '@/mixins/lazyLoadImg';

    import {editText} from '@/mixins/admin/editText';
    import AdminPanel from '@/components/admin/Panel.vue';

    export default {
        mixins: [editText,getOffset,fadeInOnScroll,lazyLoadImg],
        data(){
            let language = this.$router.currentRoute.meta.language,
                obj = {
                    content: this.$attrs.content.content[language].text
                };
            if(language === 'en') {
                obj.text = {
                    itemButton: "Go to the section"
                }
            } else {
                obj.text = {
                    itemButton: "Перейти в раздел"
                }
            }
            return obj;
        },
        methods: {
            mouseMove(event, small) {
                if (window.innerWidth >=1200){
                    let $this = event.target,
                        left = this.getOffset($this).left,
                        top = this.getOffset($this).top,
                        width = $this.clientWidth,
                        height = $this.offsetHeight,
                        x = event.pageX,
                        y = event.pageY;

                    if (small) {
                        var innerLeft = x - left,
                            innerTop = y - top,
                            multiplier = 3;
                    } else {
                        var innerLeft = x - left,
                            innerTop = y - top,
                            multiplier = 3;
                    }

                    let rotateX = (1 - innerTop / (width / 2)) * multiplier * -1,
                        rotateY = (1 - innerLeft / (height / 2)) * multiplier;


                    $this.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
                }
                

            },
            mouseOut(event) {
                if (window.innerWidth >=1200){
                    event.target.style.transform = "none";
                }
                
            }
        },
        components:{
            'grid-dark-component': GridDark,
            'admin-panel-component': AdminPanel
        }
    }
</script>