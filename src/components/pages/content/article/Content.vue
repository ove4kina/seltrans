<template lang="pug">
    include ../../../../tools/mixins.pug
    div(id="main")
        admin-panel-component(v-show="loginIn" @clicked="onAdminPanelClick")
        +b.SECTION.article__.--page
            +e.main
                grid-component
                +e.date--page._animated--trf(
                    :class="{'editable-text': loginIn}"
                    @click="clickTextField($event,content.date,'date','textJson')"
                    @input="editTextJson($event,content.date,'date',70)"
                ) {{ content.date }}
                +e.title--page._animated--trf(
                    :class="{'editable-text': loginIn}"
                    @click="clickTextField($event,content.name,'name','textJson')"
                    @input="editTextJson($event,content.name,'name')"
                ) {{ content.name }}
                +e.tags--page
                    +e.A(v-for="(tag,index) in content.tags" :class="'_animated--' + index").tag--page.tag--small.--gray._animated--trf {{ tag.name }}
            +e.photo--page._animated--trf
                img(:src="content.avatar" :alt="content.name + '-avatar'")
                +e.photo-text(
                    v-if="content.contentParts[0].mainPhotoText"
                    v-html="content.contentParts[0].mainPhotoText"
                )
            +e.body--page
                +e.text--page.text__.--article-page(
                    v-html="content.contentParts[0].text"
                    :class="{'editable-full': loginIn}"
                    @click="clickTextField($event,content.contentParts[0].text,'contentParts.0.text','htmlJson')"
                    @input="editHtmlJson($event,content.contentParts[0].text,'contentParts.0.text')"
                )
        order-block-component(:content="orderBlock")
        blog-latest-component(class="blog-latest--no-grid blog-latest--more-offset")
</template>

<script>
    import constants from '../../../../../content/constants.json';
    import GridDark from '@/components/blanks/GridDark.vue';
    import Grid from '@/components/blanks/Grid.vue';
    import BlogLatest from '@/components/blanks/BlogLatest.vue';
    import OrderBlock from '@/components/blanks/OrderBlock.vue';

    import {fadeInOnScroll} from '@/mixins/fadeInOnScroll';

    import {editText} from '@/mixins/admin/editText';
    import AdminPanel from '@/components/admin/Panel.vue';

    export default {
        props: ['content'],
        mixins: [editText,fadeInOnScroll],
        data(){
            let language = this.$router.currentRoute.meta.language,
                obj = {
                    swiper:{
                        photos:{
                            loop: true,

                            centeredSlides: true,
                            navigation: {
                                nextEl: '.text__slider-nav--next',
                                prevEl: '.text__slider-nav--prev',
                            },
                            lazy: {
                                loadPrevNext: true,
                                preloadImages: true,

                            },
                            breakpoints: {
                                599: {
                                    slidesPerView: 1.14,
                                },
                                1199: {
                                    slidesPerView: 1.4,
                                },
                                9999: {
                                    slidesPerView: 2,
                                }
                            }
                        }
                    },
                    isMuted: true,

                    orderBlock: {
                        form: 'recall',
                        title: 'Хотите такой же пневмозахват?',
                        description: '<p>Наша команда производит нестандратное оборудование на заказ и поставляет в любую точку мира. Для того, чтобы обсудить условия сотрудничества, наберите нам по телефону +7 495 544-71-31 или оставьте заявку и мы перезвоним вам в ближайшее время.</p>'
                    }
                };
            return obj;
        },
        mounted(){

        },
        methods: {
            startVideo(){
                this.isMuted = false;
                this.$refs.video.play();
            }
        },
        components:{
            'grid-dark-component': GridDark,
            'grid-component': Grid,
            'blog-latest-component': BlogLatest,
            'order-block-component': OrderBlock,
            'admin-panel-component': AdminPanel
        },
        title() {
            return this.content.meta.title;
        },
        meta() {
            return this.content.meta.meta;
        }
    }
</script>