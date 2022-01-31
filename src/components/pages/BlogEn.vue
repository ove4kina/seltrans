<template lang="pug">
    div
        menu-component(:content="menu")
        header-component(@clicked="onClicked" :content="{isDark: true}" @search-articles="popupSearchArticles" :popupSearch="popupSearch.status")
        content-component(@clicked="onClicked" :content="content" @search-articles="popupSearchArticles")
        footer-component(@clicked="onClicked")
        arrow-to-top-component
        transition-grid-component(:class="{'show': animationSlice.showSlices,'transition': animationSlice.transitioned, 'left': animationSlice.left,'right': animationSlice.right}")
        popup-recall-component(@clicked="onClicked" :content="recall")
        popup-search-component(@clicked="onClicked" @search-articles="popupSearchArticles" :content="popupSearch")
</template>

<script>
    import Content from '@/components/pages/content/blog/Content.vue';
    import Footer from '@/components/blanks/Footer.vue';
    import Header from '@/components/blanks/Header.vue';
    import ArrowToTop from '@/components/blanks/ArrowToTop.vue';
    import Menu from '@/components/blanks/Menu.vue';
    import TransitionGrid from '@/components/blanks/TransitionGrid.vue';
    import PopupRecall from '@/components/blanks/PopupRecall.vue';
    import PopupSearch from '@/components/blanks/PopupSearch.vue';


    import {menu} from '@/mixins/menu';
    import {transitionSlice} from '@/mixins/transitionSlice';
    import {popupRecall} from '@/mixins/popupRecall';
    import {popupSearch} from '@/mixins/popupSearch';

    export default {
        mixins: [popupSearch,menu,transitionSlice,popupRecall],
        data() {
            return {
                animation: {
                    showSlices: false,
                    left: false,
                    right: false,
                    transitioned: false
                },
                page: 'blog'
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
        asyncData({store}) {
            let url = 'blog';
            return store.dispatch('FETCH_PAGE', {url})
        },
        computed: {
            content() {
                return this.$store.state.pages.blog
            }
        },
        components: {
            'content-component': Content,
            'footer-component': Footer,
            'header-component': Header,
            'arrow-to-top-component': ArrowToTop,
            'menu-component': Menu,
            'transition-grid-component': TransitionGrid,
            'popup-recall-component': PopupRecall,
            'popup-search-component': PopupSearch
        },
        title() {
            return this.content.content.en.meta.title;
        },
        meta() {
            return  this.content.content.en.meta.meta;
        }
    }
</script>