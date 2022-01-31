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
    import Content from '@/components/pages/content/privacy/Content.vue';
    import Footer from '@/components/blanks/Footer.vue';
    import Header from '@/components/blanks/Header.vue';
    import ArrowToTop from '@/components/blanks/ArrowToTop.vue';
    import Menu from '@/components/blanks/Menu.vue';
    import TransitionGrid from '@/components/blanks/TransitionGrid.vue';
    import PopupRecall from '@/components/blanks/PopupRecall.vue';

    import {menu} from '@/mixins/menu';
    import {transitionSlice} from '@/mixins/transitionSlice';
    import {popupRecall} from '@/mixins/popupRecall';

    export default {
        mixins: [menu,transitionSlice,popupRecall],
        data() {
            return {
                page: 'privacy'
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
            let url = 'privacy';
            return store.dispatch('FETCH_PAGE', {url})
        },
        computed: {
            content() {
                return this.$store.state.pages.privacy
            }
        },
        components: {
            'content-component': Content,
            'footer-component': Footer,
            'header-component': Header,
            'arrow-to-top-component': ArrowToTop,
            'menu-component': Menu,
            'transition-grid-component': TransitionGrid,
            'popup-recall-component': PopupRecall
        },
        title() {
            return this.content.content.en.meta.title;
        },
        meta() {
            return  this.content.content.en.meta.meta;
        }
    }
</script>