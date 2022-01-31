<template lang="pug">
    include ../../../../tools/mixins.pug
    div(id="main")
        admin-panel-component(v-show="loginIn" @clicked="onAdminPanelClick")
        +b.products-list(ref="products")
            grid-dark-component(class="grid--fixed")
            +e.description(
                ref="fixElement"
                :style="{maxHeight: description.height, 'position': fixElementStyles.position,'top': fixElementStyles.top,'bottom': fixElementStyles.bottom,'width': fixElementStyles.width}"
                :class="[description.status ? 'open':'']"
            )
                +e.H1.title.title--underlined.--dark.--big(
                    ref="animatedElements0"
                    :class="{'editable-text': loginIn, '_animated': animatedElements[0].animated, '_animated--trf': animatedElements[0].animated, '_inViewPort': animatedElements[0].inViewPort}"
                    @click="clickTextField($event,content.title,'title','textJson')"
                    @input="editTextJson($event,content.title,'title',70)"
                ) {{ content.title }}
                +e(
                    v-html="content.description"
                    :class="{'editable-html': loginIn, '_animated': animatedElements[1].animated, '_animated--trf': animatedElements[1].animated, '_inViewPort': animatedElements[1].inViewPort}"
                    @click="clickTextField($event,content.description,'description','htmlJson')"
                    @input="editHtmlJson($event,content.description,'description')"
                    ref="animatedElements1"
                ).text.text--products-list
                +e.toggle(v-on:click="toggleDescription($event)")
                    span {{ content.hideButton }}
            +e.body(
                ref="productBody"
                :style="{'position': productBodyStyles.position,'top': productBodyStyles.top,'bottom': productBodyStyles.bottom,'width': productBodyStyles.width, 'margin-left': productBodyStyles.marginLeft}"
            )
                +e.filters-title(
                    ref="animatedElements2"
                    :class="{'_animated': animatedElements[2].animated, '_animated--trf': animatedElements[2].animated, '_inViewPort': animatedElements[2].inViewPort}"
                ) {{ content.filterName }}
                +e.filters
                    +e(
                        v-for="(filter,index) in filters"
                        v-on:click="filterProducts(filter.id)"
                        :key="index"
                        :style="{'transition-delay': `${(index+1)/20}s`}"
                        ref="animatedTabs"
                        :class="['tag--' + filter.modifier, {'_animated': animatedTabs[index].animated,'_animated--trf': animatedTabs[index].animated, '_inViewPort': animatedTabs[index].inViewPort}]"
                        v-if="true"
                    ).filter.tag--big {{ filter.name }}
                +e.content(ref="productList")
                    +e(v-for="(product,index) in products" :key="index"  ref="productItems").item.product__.--card
                        +e.photo--card(:class="{'_animated': productAnimation[index].animated,'_animated--trf': productAnimation[index].animated, '_inViewPort': productAnimation[index].inViewPort}")
                            img._lazy(:src="placeholderUrl" :data-lazy="product.avatar")
                        +e.tags--card
                            +e.A(v-for="(tag,tagIndex) in product.tags" :key="tagIndex" :class="['tag--' + tag.class, '_animated--' + tagIndex,{'_animated': productAnimation[index].animated,'_animated--trf': productAnimation[index].animated, '_inViewPort': productAnimation[index].inViewPort}]").tag--card.tag--small {{ tag.name }}
                        +e.ROUTER-LINK.title--card( :to="product.url" :class="{'_animated': productAnimation[index].animated,'_animated--trf': productAnimation[index].animated, '_inViewPort': productAnimation[index].inViewPort}")
                            span {{ product.name }}
                        +e.description--card.text--product-card(:class="{'_animated': productAnimation[index].animated,'_animated--trf': productAnimation[index].animated, '_inViewPort': productAnimation[index].inViewPort}")
                            p(
                                :class="{'editable-text': loginIn}"
                                @click="clickTextField($event,product.description,'products.' + index  + '.description','textJson')"
                                @input="editTextJson($event,product.description,'products.' + index  + '.description')"
                            ) {{ product.description }}
        product-setup-component(:content="content" class="_animated _animated--trf")
        blog-latest-component(class="blog-latest--no-grid blog-latest--more-offset")
</template>
<script>

    import GridDark from '@/components/blanks/GridDark.vue';
    import BlogLatest from '@/components/blanks/BlogLatest.vue';
    import ProductSetup from '@/components/pages/content/products-list/ProductSetup.vue';
    import ProductSetupPart from '@/components/pages/content/products-list/ProductSetupPart.vue';

   // import {fadeInOnScroll} from '@/mixins/fadeInOnScroll';
    import {scrollUtils} from '@/mixins/scrollUtils';
    import {getOffset} from '@/mixins/getOffset';
    import {lazyLoadImg} from '@/mixins/lazyLoadImg';
    import {isElementInViewport} from '@/mixins/isElementInViewport';

    import {TweenLite} from 'gsap';


    import {editText} from '@/mixins/admin/editText';
    import AdminPanel from '@/components/admin/Panel.vue';

    export default {
        mixins: [editText,scrollUtils,getOffset,BlogLatest,lazyLoadImg,isElementInViewport],
        data(){
            let language = this.$router.currentRoute.meta.language,
                obj = {
                    language: language,
                    //content: this.$attrs.content.content[language].text,
                    description: {
                        status:  false,
                        height: 230
                    },
                    animatedTabs: [],
                    animatedElements: [
                        {
                            animated: true,
                            inViewPort: false
                        },
                        {
                            animated: true,
                            inViewPort: false
                        },
                        {
                            animated: true,
                            inViewPort: false
                        },
                    ],
                    productAnimation:[],
                    fixElementStyles:{
                        top: 'auto',
                        bottom: 'auto',
                        position: 'relative',
                        width: null
                    },
                    productBodyStyles:{
                        top: 'auto',
                        bottom: 'auto',
                        position: 'relative',
                        width: null,
                        marginLeft: 0
                    },
                    fixElement:{
                        top: 0,
                        width: 0,
                        left: 0,
                        height: 0
                    },
                    productList:{
                        top: 0,
                        left: 0,
                        height: 0
                    },
                    productBody:{
                        top: 0,
                        left: 0,
                        height: 0,
                        width: 0
                    },
                    products:{
                        element: null,
                        height: 0,
                        top: 0
                    },
                    savedTransform: 0
                };
            if(language === 'en') {
                obj.filters = [
                    {
                        name: "All",
                        url: "all",
                        modifier: "darkgray",
                        id: 0
                    },
                    {
                        name: "Rolling stock",
                        url: "stock",
                        modifier: "red",
                        id: 1
                    },
                    {
                        name: "Tram",
                        url: "tram",
                        modifier: "yellow",
                        id: 2
                    },
                    {
                        name: "Electrobus",
                        url: "electrobus",
                        modifier: "blue",
                        id: 3
                    }
                ]
            } else {
                obj.filters = [
                    {
                        name: "Все",
                        url: "all",
                        modifier: "darkgray",
                        id: 0
                    },
                    {
                        name: "ЭПС ж.д.",
                        url: "stock",
                        modifier: "red",
                        id: 1
                    },
                    {
                        name: "Трамвай",
                        url: "tram",
                        modifier: "yellow",
                        id: 2
                    },
                    {
                        name: "Электробус",
                        url: "electrobus",
                        modifier: "blue",
                        id: 3
                    }
                ]
            }
            // obj.products = obj.content.products;
            obj.products = [];
            obj.placeholderUrl = '';
            return obj;
        },
        destroyed(){
            if (typeof document !== 'undefined' && window.innerWidth >= 1200) {
                window.removeEventListener('scroll', this.fixAnimation);
            }
        },
        created(){
            this.filters.map((tab,index)=>{
                this.animatedTabs.push({animated: true, inViewPort: false})
            });
            this.content.products.map((product,index)=>{
                this.productAnimation.push({animated: true, inViewPort: false})
            });
        },
        mounted(){
            this.fadeInOnScroll();
            if (typeof document !== 'undefined' && window.innerWidth >= 1200) {
                setTimeout(()=>{
                    this.getScrollVariables();
                    this.fixAnimation();
                    window.addEventListener('scroll', this.fixAnimation);
                },1)
            }
        },
        beforeUpdate(){
            if (typeof document !== 'undefined' && window.innerWidth >= 1200) {
                //this.clearAnimation();
                //window.removeEventListener('scroll', this.fixAnimation);
            }
        },
        updated() {
            if (typeof document !== 'undefined' && window.innerWidth >= 1200 && this.$router.history.current.meta.type === 'products-list') {
                //this.getScrollVariables();
                //this.fixAnimation();
                //window.addEventListener('scroll', this.fixAnimation);
            }
        },
        methods:{
            fadeInOnScroll(){
                 for (let i = 0;i < this.animatedElements.length; i++){
                     if(this.isElementInViewportOffset(this.$refs[`animatedElements${i}`],0) && this.animatedElements[i].animated === true){

                         this.animatedElements[i].inViewPort = true;

                          setTimeout(()=>{
                              this.animatedElements[i].animated = false;
                              this.animatedElements[i].inViewPort = false;
                          },2000)
                     }
                 }
                 for (let i = 0;i < this.animatedTabs.length; i++){
                     if(typeof this.$refs.animatedTabs[i] !== 'undefined'){
                         if(this.isElementInViewportOffset(this.$refs.animatedTabs[i],0) && this.animatedTabs[i].animated === true){

                             this.animatedTabs[i].inViewPort = true;

                             setTimeout(()=>{
                                 this.animatedTabs[i].animated = false;
                                 this.animatedTabs[i].inViewPort = false;
                             },2000)
                         }
                     }
                 }
                 for (let i = 0;i < this.productAnimation.length; i++){
                     if(typeof this.$refs.productItems[i] !== 'undefined'){
                         if(this.isElementInViewportOffset(this.$refs.productItems[i],0) && this.productAnimation[i].animated === true){

                             this.productAnimation[i].inViewPort = true;

                             setTimeout(()=>{
                                 this.productAnimation[i].animated = false;
                                 this.productAnimation[i].inViewPort = false;
                             },2000)
                         }
                     }
                 }
            },
            // checkProductViewport(){
            //     this.$refs.productItems.map((product,index)=>{
            //         if(this.isElementInViewport(product)){
            //             this.productAnimation[index] = false;
            //             //console.log(this.productAnimation[index])
            //         }
            //     });
            // },
            isElementInViewportOffset(el,offset) {
                if(typeof el !== 'undefined'){
                    let rect = el.getBoundingClientRect();
                    return ((rect.top - (window.innerHeight || document. documentElement.clientHeight) + offset) <= 0);
                }
            },
            deleteUselessTabs(tabIndex){
                if(tabIndex === 0){
                    return true;
                }
                let visible = false;
                this.content.products.map((product) => {
                    product.tags.map((tag) => {
                        if(tag.id === tabIndex){
                            visible = true;
                        }
                    });
                });
                return visible;
            },
            getScrollVariables() {
                if(window.innerWidth >= 1200){
                    this.fixElement.top = this.getOffset(this.$refs.fixElement).top;
                    this.fixElement.left = this.$refs.fixElement.getBoundingClientRect().left;
                    this.fixElement.width = this.$refs.fixElement.getBoundingClientRect().width;
                    this.fixElement.height = this.$refs.fixElement.getBoundingClientRect().height;

                    this.productList.top = this.getOffset(this.$refs.productList).top;
                    this.productList.left = this.$refs.productList.getBoundingClientRect().left;
                    this.productList.height = this.$refs.productList.getBoundingClientRect().height;

                    this.productBody.top = this.getOffset(this.$refs.productBody).top;
                    this.productBody.left = this.$refs.productBody.getBoundingClientRect().left;
                    this.productBody.height = this.$refs.productBody.getBoundingClientRect().height;
                    this.productBody.width = this.$refs.productBody.getBoundingClientRect().width;
                    this.products.element = this.$refs.products;
                    this.products.height = this.products.element.getBoundingClientRect().height;
                }
            },
            filterProducts(filter) {
                 if(filter === 0) {
                     this.products = this.content.products;
                 } else {
                     this.products = this.content.products.filter(function (product) {
                         return product.tags.filter(function (tag) {
                             return tag.id === filter;
                         }).length > 0;
                     });
                 }
                 if(window.innerWidth >= 1200){
                     if(this.products.length === 0){
                         window.removeEventListener('scroll', this.fixAnimation);
                     } else {
                         setTimeout(() => {
                             this.clearAnimation();
                             window.removeEventListener('scroll', this.fixAnimation);
                             this.getScrollVariables();
                             this.fixAnimation();
                             window.addEventListener('scroll', this.fixAnimation);
                         })
                     }
                 }
            },
            clearAnimation(){
                this.fixElementStyles.position = 'relative';
                this.fixElementStyles.top = 'auto';
                this.fixElementStyles.bottom = 'auto';

                this.productBodyStyles.position = 'relative';
                this.productBodyStyles.top = 'auto';
                this.productBodyStyles.bottom = 'auto';
                this.productBodyStyles.marginLeft = 0;
                this.savedTransform = 0;
            },
            fixAnimation(){
                if(window.innerWidth >= 1200){
                    this.fadeInOnScroll();
                    if(this.fixElement.height > this.productBody.height) { // левая сторона больше чем правая
                        if(this.getScroll()[1] > this.productBody.top - 40){
                            this.productBodyStyles.position = 'fixed';
                            this.productBodyStyles.top = `${40}px`;
                            this.productBodyStyles.bottom ='auto';
                            this.productBodyStyles.width = this.productBody.width + 'px';
                            if(this.productBody.height + 40 > window.innerHeight){
                                let scrolledInside = this.getScroll()[1] - this.productBody.top + 40, //скролл с 0
                                    k = 1 - ((this.fixElement.height - this.productBody.height)/(this.products.height - window.innerHeight - (this.productBody.top - 40)));


                                if(this.getScroll()[1] > this.products.height - window.innerHeight){
                                    scrolledInside = this.products.height - this.productBody.top - window.innerHeight + 40;
                                }

                                let trf = scrolledInside * k;
                                TweenLite.to(this.$refs.productBody, 0.1, {
                                    y: -trf,
                                    overflow: 5,
                                    force3D: !0
                                })
                                if(this.getScroll()[1] > this.products.height - window.innerHeight){
                                    if(this.savedTransform === 0){
                                        this.savedTransform = trf
                                    }
                                    this.productBodyStyles.position = 'absolute';
                                    this.productBodyStyles.top ='auto';
                                    this.productBodyStyles.bottom = -(this.savedTransform - (this.products.height - this.fixElement.top - this.fixElement.height)) + 'px';
                                }
                            } else {
                                if(this.getScroll()[1] > this.productList.top + this.productList.height - window.innerHeight + 40) {
                                    this.fixElementStyles.position = 'absolute';
                                    this.fixElementStyles.top ='auto';
                                    this.fixElementStyles.bottom = this.$refs.products.getBoundingClientRect().height - this.productList.top - this.productList.height  + 'px';
                                }
                            }
                        } else{
                            this.productBodyStyles.position = 'relative';
                            this.productBodyStyles.top = 'auto';
                            this.productBodyStyles.bottom ='auto';
                            TweenLite.to(this.$refs.productBody, 0.1, {
                                y: 0,
                                overflow: 5,
                                force3D: !0
                            })
                        }
                    } else { // правая сторона больше чем левая
                        if(this.getScroll()[1] > this.fixElement.top - 40){
                            this.fixElementStyles.position = 'fixed';
                            this.fixElementStyles.top = `${40}px`;
                            this.productBodyStyles.marginLeft = `${40}%`;

                            this.fixElementStyles.bottom ='auto';
                            this.fixElementStyles.width = `${this.fixElement.width}px`;
                            if(this.fixElement.height + 40 > window.innerHeight){
                                let scrolledInside = this.getScroll()[1] - this.fixElement.top + 40, //скролл с 0
                                    k = 1 - ((this.productBody.height - this.fixElement.height)/(this.products.height - window.innerHeight - (this.productBody.top - 40))); // коеффициент замедления/ускорения

                                if(this.getScroll()[1] > this.products.height - window.innerHeight){
                                    scrolledInside = this.products.height - this.fixElement.top - window.innerHeight + 40;
                                }

                                let trf = scrolledInside * k;
                                TweenLite.to(this.$refs.fixElement, 0.1, {
                                    y: -trf,
                                    overflow: 5,
                                    force3D: !0
                                })

                                if(this.getScroll()[1] >= this.products.height - window.innerHeight){
                                    if(this.savedTransform === 0){
                                        this.savedTransform = trf
                                    }
                                    this.fixElementStyles.position = 'absolute';
                                    this.fixElementStyles.top ='auto';
                                    this.fixElementStyles.bottom = -(this.savedTransform - (this.products.height - this.productBody.top - this.productBody.height)) + 'px';
                                }
                            } else {
                                if(this.getScroll()[1] > this.products.height - window.innerHeight) {
                                    this.fixElementStyles.position = 'absolute';
                                    this.fixElementStyles.top ='auto';
                                    this.fixElementStyles.bottom = window.innerHeight - this.fixElement.height - 40 + 'px';
                                }
                            }
                        } else{
                            this.fixElementStyles.position = 'relative';
                            this.fixElementStyles.top = 'auto';
                            this.productBodyStyles.marginLeft = 0;
                            TweenLite.to(this.$refs.fixElement, 0.1, {
                                y: 0,
                                overflow: 5,
                                force3D: !0
                            })
                        }
                    }
                }
                //this.checkProductViewport();
            },
            toggleDescription($event){
                this.description.status = !this.description.status;
                if(this.description.status){
                    this.description.height = (this.$refs.animatedElements1.offsetHeight + this.getOffset(this.$refs.animatedElements1).top - this.getOffset(this.$refs.fixElement).top )+ 'px';
                    setTimeout(() => {
                        $event.target.innerHTML = 'Скрыть'
                    },200)
                } else {
                    this.description.height = 230 + 'px';
                    setTimeout(() => {
                        $event.target.innerHTML = 'Раскрыть'
                    },200)
                }
            },

        },
        computed: {
            content() {
                this.products = this.$attrs.content.content[this.language].text.products;
                this.placeholderUrl = this.$attrs.content.content[this.language].text.placeholderUrl;
                return this.$attrs.content.content[this.language].text;
            }
        },
        components:{
            'grid-dark-component': GridDark,
            'product-setup-part-component': ProductSetupPart,
            'blog-latest-component': BlogLatest,
            'product-setup-component': ProductSetup,
            'admin-panel-component': AdminPanel
        }
    }
</script>
