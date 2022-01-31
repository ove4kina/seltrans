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
    import Content from '@/components/pages/content/history/Content.vue';
    import Footer from '@/components/blanks/Footer.vue';
    import Header from '@/components/blanks/Header.vue';
    import Menu from '@/components/blanks/Menu.vue';
    import PopupRecall from '@/components/blanks/PopupRecall.vue';
    import ArrowToTop from '@/components/blanks/ArrowToTop.vue';
    import TransitionGrid from '@/components/blanks/TransitionGrid.vue';

    import {menu} from '@/mixins/menu';
    import {popupRecall} from '@/mixins/popupRecall';
    import {transitionSlice} from '@/mixins/transitionSlice';

    export default {
        mixins: [menu,popupRecall,transitionSlice],
        data() {
            return {
                page: 'history'
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
            let url = 'history';
            return store.dispatch('FETCH_PAGE', {url})
        },
        computed: {
            content() {
                return this.$store.state.pages.history
            }
        },
        components: {
            'content-component': Content,
            'footer-component': Footer,
            'header-component': Header,
            'menu-component': Menu,
            'popup-recall-component': PopupRecall,
            'arrow-to-top-component': ArrowToTop,
            'transition-grid-component': TransitionGrid,
        },
        title() {
            return this.content.content.ru.meta.title;
        },
        meta() {
            return  this.content.content.ru.meta.meta;
        }
    }
</script>
