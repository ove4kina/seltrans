<template lang="pug">
    div
        menu-component(:content="menu")
        header-component(@clicked="onOpenMenu" :content="{isDark: true}")
        content-component(:content="content")
        footer-component
        transition-grid-component(:class="{'show': animationSlice.showSlices,'transition': animationSlice.transitioned, 'left': animationSlice.left,'right': animationSlice.right}")
</template>

<script>
    import Content from '@/components/pages/content/spares/Content.vue';
    import Footer from '@/components/blanks/Footer.vue';
    import Header from '@/components/blanks/Header.vue';
    import Menu from '@/components/blanks/Menu.vue';
    import TransitionGrid from '@/components/blanks/TransitionGrid.vue';

    import {transitionSlice} from '@/mixins/transitionSlice';
    import {menu} from '@/mixins/menu';

    export default {
        mixins: [menu,transitionSlice],
        data() {
            return {
                page: 'sparesEn'
            };
        },
        asyncData({store}) {
            let url = 'spares';
            return store.dispatch('FETCH_PAGE', {url})
        },
        computed: {
            content() {
                return this.$store.state.pages.spares
            }
        },
        components: {
            'content-component': Content,
            'footer-component': Footer,
            'header-component': Header,
            'menu-component': Menu,
            'transition-grid-component': TransitionGrid
        },
        title() {
            return this.content.content.en.meta.title;
        },
        meta() {
            return  this.content.content.en.meta.meta;
        },


    }
</script>
