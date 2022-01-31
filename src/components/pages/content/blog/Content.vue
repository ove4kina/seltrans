<template lang="pug">
    include ../../../../tools/mixins.pug
    +b.blog(id="main")
        admin-panel-component(v-show="loginIn" @clicked="onAdminPanelClick")
        grid-dark-component(class="grid--fixed")
        +e.line
            +e.H1.title.title--underlined.--dark.--big(
                :class="{'editable-text': loginIn}"
                @click="clickTextField($event,content.title,'title','textJson')"
                @input="editTextJson($event,content.title,'title',70)"
            ) {{ content.title }}
            +e.BUTTON(type="button" v-on:click="openPopupSearch").button--search.button__.--primary.--blue.--permonent-size
                +e.DIV.wrapper
                .ui-icon.ui-icon--search
        +e.text.text--blog-page
            p(
                v-html="content.description"
                :class="{'editable-html': loginIn}"
                @click="clickTextField($event,content.description,'description','htmlJson')"
                @input="editHtmlJson($event,content.description,'description')"
            )
        +e.filters
            +e(v-for="(filter,index) in filters"
                :key="index"
                v-on:click="filterArticles(filter.url)"
            ).filter.tag--middle.--blur-gray {{ filter.name }}
        +e.body
            +e(v-for="(article,index) in articles" :key="index").item.article__.--card-tiny
                +e.wrapper--card
                    +e.DIV.tags--card
                        +e.A(v-for="tag in article.tags" href="#").tag--card.tag--small.--gray {{ tag.name }}
                    +e.ROUTER-LINK(:to="article.url" :class="article.classes.gradient + ' '+ article.classes.half").photo--card-tiny.--fool
                        img(:src="article.avatar" alt="")
                    +e.DIV.body--card-tiny
                        +e.DIV(:class="'article__title' + article.classes.color").title--card-tiny {{ article.name }}
                        +e.DIV(:class="'article__date' + article.classes.color").date--card-tiny {{ article.date }}
                    +e.button--card.ui-arrow.ui-arrow--card
                        span
                            span
                            span
                                span
                                span
        +e.BUTTON(v-on:click="loadArticles" v-if="loadButton").button--pagination.button__.--primary.--blue
            span {{ content.loadButton }}
            +e.DIV.wrapper
            .ui-icon.ui-icon--pagination
</template>
<script>
    import Articles from '../../../../../content/articles';
    import GridDark from '@/components/blanks/GridDark.vue';

    import {fadeInOnScroll} from '@/mixins/fadeInOnScroll';

    import {editText} from '@/mixins/admin/editText';
    import AdminPanel from '@/components/admin/Panel.vue';

    export default {
        mixins: [editText,fadeInOnScroll],
        data() {
            let language = this.$router.currentRoute.meta.language,
                obj = {
                    language: language,
                    currentFilter: 'all',
                    loadButton: true,
                    content: this.$attrs.content.content[language].text,
                    start: 0,
                    limit: 5,
                    articles: []
                };
            if(language === 'en') {
                // obj.articles = Articles.en.slice(0,8);
                obj.filters = [
                    {
                        name: 'All',
                        url: 'all'
                    },
                    {
                        name: 'Case',
                        url: 'case'
                    },
                    {
                        name: 'Modeling',
                        url: 'modeling'
                    },
                    {
                        name: 'Production',
                        url: 'production'
                    },
                    {
                        name: 'Train',
                        url: 'train'
                    },
                    {
                        name: 'Clients',
                        url: 'clients'
                    }
                ];
                // obj.articles = Articles.en.slice(0,5);
            } else {
                // obj.articles = Articles.ru.slice(0,8);
                obj.filters = [
                    {
                        name: 'Все',
                        url: 'all'
                    },
                    {
                        name: 'Кейс',
                        url: 'case'
                    },
                    {
                        name: 'Моделирование',
                        url: 'modeling'
                    },
                    {
                        name: 'Производство',
                        url: 'production'
                    },
                    {
                        name: 'ЭПС',
                        url: 'train'
                    },
                    {
                        name: 'Наши клиенты',
                        url: 'clients'
                    }
                ];
                // obj.articles = Articles.ru.slice(0,5);
            }
            return obj;
        },
        created(){
            this.fetchArticlesList(0, 5, 'all');
        },
        methods:{
            openPopupSearch() {
                this.$emit('search-articles',{name: 'open'});
            },

            loadArticles() {
                this.start += 5;
                this.limit += 5;
                this.fetchArticlesList(this.start, this.limit);
            },
            fetchArticlesList(start, limit, filter = 'all') {
                let sliceArray = Articles[this.language],
                    filteredArticles = [],
                    countArticles = 0;

                if(filter === 'all') {
                    filteredArticles = sliceArray.slice(start, limit);
                    countArticles = sliceArray.length;
                    // let count = Articles[this.language].length;
                    // this.articles = this.articles.concat(Articles[this.language].slice(start,limit));
                } else {
                    sliceArray.map(arr => arr.tags.map(f => f.url === filter ? filteredArticles.push(arr) : ''));
                    countArticles = filteredArticles.length;
                    filteredArticles = filteredArticles.slice(start, limit);
                    // let articles = Articles[this.language],
                    //     sliceArray = [],
                    //     count = 0;
                    // sliceArray = articles.filter(function (article) {
                    //     for(let i = 0; i < article.tags.length; i++) {
                    //         if(article.tags[i].url === filter) {
                    //             return true;
                    //         }
                    //     }
                    //     return false;
                    // });
                    // count = sliceArray.length;
                    // this.articles = sliceArray.slice(start, limit)
                    // this.articles = this.articles.concat(sliceArray.slice(start, limit));
                }
                this.articles = this.articles.concat(filteredArticles);
                limit >= countArticles ? this.loadButton = false : this.loadButton = true;
            },
            filterArticles(url) {
                if(this.currentFilter !== url) {
                    this.currentFilter = url;
                    this.start = 0;
                    this.limit = 5;
                    this.articles = [];
                    this.fetchArticlesList(this.start, this.limit, url);
                }
            }
        },
        components: {
            'grid-dark-component': GridDark,
            'admin-panel-component': AdminPanel
        }
    }
</script>