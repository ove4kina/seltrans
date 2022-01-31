<template lang="pug">
    include ../../../../tools/mixins.pug
    div(id="main")
        admin-panel-component(v-show="loginIn" @clicked="onAdminPanelClick")
        service-main-component(:content="serviceMain")
        +b.benefits--block
            +e.content
                +e.H2.title.title--underlined.--dark.--small._animated--trf(
                    :class="{'editable-text': loginIn}"
                    @click="clickTextField($event,content.title,'title','textJson')"
                    @input="editTextJson($event,content.title,'title',70)"
                ) {{ content.title }}
                +e.text--about-block.text--benefits._animated--trf
                    p(v-html="content.description" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.description,'description','htmlJson')" @input="editHtmlJson($event,content.description,'description')")
                +e.list--block
                    +e.item--block._animated--trf
                        +e.img--block
                            img(src="/img/svg-icons/date.svg")
                        +e.text--block(v-html="content.items[0].name" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.items[0].name,'items.0.name','htmlJson')" @input="editHtmlJson($event,content.items[0].name,'items.0.name')")
                    +e.item--block._animated--trf._animated--1
                        +e.img--block
                            img(src="/img/svg-icons/gears.svg")
                        +e.text--block(v-html="content.items[1].name" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.items[1].name,'items.1.name','htmlJson')" @input="editHtmlJson($event,content.items[1].name,'items.1.name')")
                    +e.item--block._animated--trf._animated--1
                        +e.img--block
                            img(src="/img/svg-icons/check.svg")
                        +e.text--block(v-html="content.items[2].name" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.items[2].name,'items.2.name','htmlJson')" @input="editHtmlJson($event,content.items[2].name,'items.2.name')")
            +e.case._animated--trf
                +e.ROUTER-LINK(:to="content.case.link.src").product.product__.--case
                    +e.DIV.title--case {{ content.case.link.name }}
                    +e.DIV.photo--case
                        img(src="/img/products/absorber/1.png" alt="")
                    +e.BUTTON.button--case.button--gray {{ content.case.link.button }}
                +e.append(v-html="content.case.description" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.case.description,'case.description','htmlJson')" @input="editHtmlJson($event,content.case.description ,'case.description' )")
        +b.visualization
            +e.description
                +e.H2.title.title--underlined.--dark.--small._animated--trf(
                    :class="{'editable-text': loginIn}"
                    @click="clickTextField($event,content.visualization.title,'visualization.title','textJson')"
                    @input="editTextJson($event,content.visualization.title,'visualization.title',70)"
                ) {{ content.visualization.title }}
                +e(v-html="content.visualization.description" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.visualization.description,'visualization.description','htmlJson')" @input="editHtmlJson($event,content.visualization.description,'visualization.description' )").text--description.text--visualization._animated--trf
            +e.content._animated--trf
                +e(v-for="(item,index) in content.visualization.items" :class="'_animated--'+ (index + 1)").item._animated--trf
                    +e.img
                        img(:src="item.avatar" alt="item.alt")
                    +e.text--models.text--models
                        h4(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,item.title,'visualization.items.'+ index + '.title','textJson')"
                            @input="editTextJson($event,item.title,'visualization.items.'+ index + '.title',70)"
                        ) {{ item.title }}
                        p(v-html="item.description"
                            :class="{'editable-html': loginIn}"
                            @click="clickTextField($event,item.description,'visualization.items.'+ index + '.description','htmlJson')"
                            @input="editHtmlJson($event,item.description,'visualization.items.'+ index + '.description')")
        canvas-component(:content="content")
        order-block-component(:content="orderBlock")
        service-block-component(:content="serviceBlock")
        blog-latest-component(class="blog-latest--no-grid blog-latest--more-offset")
</template>
<script>
    import GridDark from '@/components/blanks/GridDark.vue';
    import ServiceMain from '@/components/blanks/ServiceMain.vue';
    import OrderBlock from '@/components/blanks/OrderBlock.vue';
    import ServiceBlock from '@/components/blanks/ServiceBlock.vue';
    import BlogLatest from '@/components/blanks/BlogLatest.vue';
    import Canvas from '@/components/pages/content/modeling/Canvas.vue';


    import {fadeInOnScroll} from '@/mixins/fadeInOnScroll';

    import {editText} from '@/mixins/admin/editText';
    import AdminPanel from '@/components/admin/Panel.vue';

    export default {
        mixins: [editText,fadeInOnScroll],
        data(){
            let language = this.$router.currentRoute.meta.language,
                content = this.$attrs.content.content[language],
                obj = {
                    content: content.text,
                    orderBlock: {
                        form: 'order',
                        title: content.text.orderBlock.title,
                        description: content.text.orderBlock.description
                    },
                    serviceBlock: {
                        media:{
                            backgroundImage: content.text.serviceBlock.media.backgroundImage,
                            backgroundVideo: content.text.serviceBlock.media.backgroundVideo
                        },
                        title: content.text.serviceBlock.title,
                        description: content.text.serviceBlock.description,
                        link: content.text.serviceBlock.link
                    },
                    serviceMain: {
                        title: content.text.serviceMain.title,
                        description: content.text.serviceMain.description,
                        media:{
                            backgroundImage: content.text.serviceMain.media.backgroundImage,
                            backgroundVideo: content.text.serviceMain.media.backgroundVideo
                        },
                        button:{
                            name: content.text.serviceMain.button.name,
                        }
                    }
                };
            return obj;
        },
        components:{
            'blog-latest-component': BlogLatest,
            'grid-dark-component': GridDark,
            'service-main-component': ServiceMain,
            'order-block-component': OrderBlock,
            'service-block-component': ServiceBlock,
            'canvas-component': Canvas,
            'admin-panel-component': AdminPanel
        }
    }
</script>
