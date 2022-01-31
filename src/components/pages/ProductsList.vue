<template lang="pug">
    div
        menu-component(:content="menu")
        header-component(@clicked="onClicked" :content="{isDark: true}")
        content-component(:content="content")
        footer-component(@clicked="onClicked")
        arrow-to-top-component
        transition-grid-component(:class="{'show': animationSlice.showSlices,'transition': animationSlice.transitioned, 'left': animationSlice.left,'right': animationSlice.right}")
        popup-recall-component(@clicked="onClicked" :content="recall")
</template>

<script>
    import Content from '@/components/pages/content/products-list/Content.vue';
    import Footer from '@/components/blanks/Footer.vue';
    import Header from '@/components/blanks/Header.vue';
    import Menu from '@/components/blanks/Menu.vue';
    import ArrowToTop from '@/components/blanks/ArrowToTop.vue';
    import TransitionGrid from '@/components/blanks/TransitionGrid.vue';
    import PopupRecall from '@/components/blanks/PopupRecall.vue';

    import {transitionSlice} from '@/mixins/transitionSlice';
    import {menu} from '@/mixins/menu';
    import {popupRecall} from '@/mixins/popupRecall';

    export default {
        mixins: [menu,transitionSlice,popupRecall],
        data() {
            return {
                animation: {
                    showSlices: false,
                    left: false,
                    right: false,
                    transitioned: false
                },
                page: 'productsList'
            };
        },
        methods: {
            onClicked(value){
                switch(value){
                    case 'openPopupRecall':
                        this.openPopupRecall(value);
                        break;
                    case 'openMenu':
                        this.onOpenMenu(value);
                        break;
                    case 'closePopupRecall':
                        this.closePopupRecall(value);
                        break;
                }
            }
        },
        asyncData({store, route}) {
            let url = 'products/' + route.params.category;
            return store.dispatch('FETCH_PAGE', {url})
        },
        computed: {
            content() {
                return this.$store.state.pages['products/' + this.$route.params.category]
            }
        },
        components: {
            'content-component': Content,
            'footer-component': Footer,
            'header-component': Header,
            'menu-component': Menu,
            'arrow-to-top-component': ArrowToTop,
            'transition-grid-component': TransitionGrid,
            'popup-recall-component': PopupRecall
        },
        title() {
            return this.content.content.ru.meta.title;
        },
        meta() {
            return  this.content.content.ru.meta.meta;
        },

        
    }
</script>
