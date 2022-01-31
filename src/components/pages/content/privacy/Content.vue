<template lang="pug">
    include ../../../../tools/mixins.pug
    +b#main.text-page
        +e.content.text--article-page(v-html="content.text")
</template>

<script>
    import {fadeInOnScroll} from '@/mixins/fadeInOnScroll';
    export default {
        mixins: [fadeInOnScroll],
        data() {
            let language = this.$router.currentRoute.meta.language,
                obj = {};

            if (language === 'en') {
                obj.content = this.$attrs.content.content.en;
            } else {
                obj.content = this.$attrs.content.content.ru;
            }
            return obj;
        },
        title() {
            return this.content.meta.title;
        },
        meta() {
            return this.content.meta.meta;
        },
    }
</script>