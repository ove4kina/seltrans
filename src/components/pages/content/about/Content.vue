<template lang="pug">
    include ../../../../tools/mixins.pug
    div(id="main")
        admin-panel-component(v-show="loginIn" @clicked="onAdminPanelClick")
        +b.about-page
            +e.body
                +e.top
                    +e.H1.title.title--underlined.--dark.--big._animated--trf(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content.title,'title','textJson')"
                            @input="editTextJson($event,content.title,'title',70)"
                        ) {{ content.title }}
                    +e.text--top.text--about-page
                        p._animated--trf._animated(v-html="content.description1" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.description1,'description1','htmlJson')" @input="editHtmlJson($event,content.description1,'description1')")
                        +e.images
                            +e.photo._animated--trf
                                img(src="/img/about-page/traine-1.jpg" alt="")
                            +e.photo._animated--trf
                                img(src="/img/about-page/traine-2.jpg" alt="")
                            +e.ROUTER-LINK(:to="content.buttonHistory.url").button--desktop.button__.--primary.--blue._animated--trf
                                span {{ content.buttonHistory.name }}
                                +e.DIV.wrapper
                                DIV.ui-arrow
                                    span
                                        span
                                        span
                                            span
                                            span
                        p._animated--trf._animated(v-html="content.description2" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.description2,'description2','htmlJson')" @input="editHtmlJson($event,content.description2,'description2')")
                    +e.ROUTER-LINK(:to="content.buttonHistory.url").button--mobile.button__.--primary.--blue
                        span {{ content.buttonHistory.name }}
                        +e.DIV.wrapper
                        DIV.ui-arrow
                            span
                                span
                                span
                                    span
                                    span
                +e.certificates-content._animated--trf
                    +e.text--certificates.text--certificates._animated--trf
                        h3(
                            :class="{'editable-text': loginIn}"
                            @click="clickTextField($event,content.certificates.title,'certificates.title','textJson')"
                            @input="editTextJson($event,content.certificates.title,'certificates.title',70)"
                        ) {{ content.certificates.title }}
                        p(v-html="content.certificates.description1" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.certificates.description1,'certificates.description1','htmlJson')" @input="editHtmlJson($event,content.certificates.description1,'certificates.description1')")
                        +e.certificates
                            +e.certificate._animated--trf
                                img(src="/img/certificats/1.jpg" alt="")
                            +e.certificate._animated--trf._animated--1
                                img(src="/img/certificats/2.jpg" alt="")
                            +e.certificate._animated--trf._animated--2
                                img(src="/img/certificats/3.jpg" alt="")
                            +e.certificate._animated--trf._animated--3
                                img(src="/img/certificats/4.jpg" alt="")
                        p(v-html="content.certificates.description2" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.certificates.description2,'certificates.description2','htmlJson')" @input="editHtmlJson($event,content.certificates.description2,'certificates.description2')").bold._animated--trf._animated
                +e.bottom
                    +e.text--bottom.text--about-page(v-html="content.bottom.left" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.bottom.left,'bottom.left','htmlJson')" @input="editHtmlJson($event,content.bottom.left,'bottom.left')")._animated--trf
                    +e.equipment.text--equipment(v-html="content.bottom.right" :class="{'editable-html': loginIn}" @click="clickTextField($event,content.bottom.right,'bottom.right','htmlJson')" @input="editHtmlJson($event,content.bottom.right,'bottom.right')")._animated--trf
        blog-latest-component(class="blog-latest--no-grid blog-latest--more-offset")
</template>
<script>
    import constants from '../../../../../content/constants.json';
    import GridDark from '@/components/blanks/GridDark.vue';
    import BlogLatest from '@/components/blanks/BlogLatest.vue';

    import {fadeInOnScroll} from '@/mixins/fadeInOnScroll';

    import {editText} from '@/mixins/admin/editText';
    import AdminPanel from '@/components/admin/Panel.vue';

    export default {
        mixins: [editText,fadeInOnScroll],
        data(){
            let language = this.$router.currentRoute.meta.language,
                obj = {
                    content: this.$attrs.content.content[language].text
                };
            return obj;
        },
        components: {
            'grid-dark-component': GridDark,
            'blog-latest-component': BlogLatest,
            'admin-panel-component': AdminPanel
        }
    }
</script>
