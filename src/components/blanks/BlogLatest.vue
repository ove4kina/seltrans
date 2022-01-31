<template lang="pug">
    include ../../tools/mixins.pug

    +b.SECTION.blog-latest
        grid-dark-component
        +e.title.title--dark.--underlined._animated--trf {{ title }}
        +e.list
            +e(v-for="(article,index) in articles" :class="index!==0 ? '_animated--'+index: ''").item.article__.--card._animated--trf
                +e.DIV.tags--card
                    +e.A(v-for="tag in article.tags" href="#").tag--card.tag--small.--gray {{ tag.name }}
                +e.ROUTER-LINK(:to="article.url").photo--card.--half
                    img(:src="article.avatar" alt="")
                +e.DIV.body--card
                    +e.DIV.title--card.--dark {{ article.name }}
                    +e.DIV.date--card.--gray {{ article.date }}
                +e.button--card.ui-arrow.ui-arrow--card.--blue
                    span
                        span
                        span
                            span
                            span
        +e.ROUTER-LINK(:to="button.url").button.button__.--primary.--blue._animated--trf
            span {{ button.name }}
            +e.DIV.wrapper
            DIV.ui-arrow
                span
                    span
                    span
                        span
                        span
</template>

<script>
    import GridDark from '@/components/blanks/GridDark.vue';
    import Articles from '../../../content/articles';
    import {fadeInOnScroll} from '@/mixins/fadeInOnScroll';
    export default {
        mixins: [fadeInOnScroll],
        data() {
            let language = this.$router.currentRoute.meta.language,
                obj = {};
            if(language === 'en') {
                obj.button = {
                    name: "Blog",
                    url: "/en/blog"
                };
                obj.title = "Cases and news";
                obj.articles = Articles.en.slice(0,3);
            } else {
                obj.button = {
                    name: "Весь блог",
                    url: "/ru/blog"
                };
                obj.title = "Кейсы и новости из блога";
                obj.articles = Articles.ru.slice(0,3);
            }
            return obj;
        },
        components: {
            'grid-dark-component': GridDark
        }
    }
</script>
