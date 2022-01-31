<template lang="pug">
    include ../../tools/mixins.pug

    +b.blog-search__(:class="{'active': content.status }")
        grid-dark-component
        +e.sections
            +e.section
            +e.section
            +e.section
            +e.section
            +e.section
            +e.section
            +e.section
        +e.wrapper
            +e.H2.title.title.--dark Поиск по статьям:
            +e.line
                +e.input.input--big.--search
                    input(name="search" v-model="content.search.value" @input="searchArticles" placeholder="Введите запрос")
                    span(v-on:click="clearSearchInput") Очистить
                +e.total {{ formatSearchText(content.search.articles.length) }}
            +e.list
                +e.item.article__.--search-card(
                        v-for="article in content.search.articles"
                        :class="{'search-loading' : article.classAnimation}"
                        )
                    +e.wrapper--search-card
                        +e.title--search-card(v-html="article.name")
                        +e.date--search-card {{ article.date }}
                        +e.text--search-card.text--search-card(v-html="article.description")
                        +e.line--search-card
                            +e.tags--search-card
                                +e.A(href="#" v-for="tag in article.tags").tag--search-card.tag--small.--true-gray {{ tag.name }}
                            +e.ROUTER-LINK(:to="article.url").button--search-card.button__.--primary.--blue.--compact-mobile
                                span Читать
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
    export default {
        props: ['content'],

        data() {
            return {
                timeOutTyping: null
            }
        },

        methods: {
            searchArticles() {
                clearTimeout(this.timeOutTyping);
                this.timeOutTyping = setTimeout(() => {
                    this.$emit('search-articles',{name: 'search', value: this.value});
                }, 500);
            },

            clearSearchInput() {
                this.value = '';
                this.$emit('search-articles',{ name: 'clear' });
            },

            formatSearchText(count) {
                if( count === 0) {
                    return '';
                } else {
                    return 'Найден' + this.declOfNum(count,['а','о','о']) + ' ' + count + ' стат' + this.declOfNum(count,['ья','ьи','ей']);
                }
            },

            declOfNum(number, titles) {
                let cases = [2, 0, 1, 1, 1, 2];
                return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
            }
        },
        components:{
            'grid-dark-component': GridDark,
        }
    }
</script>
