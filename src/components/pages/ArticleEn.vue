<template lang="pug">

</template>

<script>
    import Content from '../pages/content/article/Content.vue';
    export default {
        data() {
            return {
                page: 'articleEn'
            };
        },
        asyncData({store}) {
            let url = 'article';
            return store.dispatch('FETCH_PAGE', {url})
        },
        computed: {
            content() {
                return this.$store.state.pages.product
            }
        }
    }
</script>