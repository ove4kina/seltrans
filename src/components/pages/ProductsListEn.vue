<template lang="pug">
    div
        menu-component(:content="menu")
        header-component(@clicked="onOpenMenu" :content="{isDark: true}")
        content-component(:content="content")
        footer-component
</template>

<script>
    import Content from '@/components/pages/content/products-list/Content.vue';
    import Footer from '@/components/blanks/Footer.vue';
    import Header from '@/components/blanks/Header.vue';
    import Menu from '@/components/blanks/Menu.vue';

    import {menu} from '@/mixins/menu';

    export default {
        mixins: [menu],
        data() {
            return {
                page: 'productsListEn'
            };
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
            'menu-component': Menu
        },
        title() {
            return this.content.content.en.meta.title;
        },
        meta() {
            return  this.content.content.en.meta.meta;
        }
    }
</script>
