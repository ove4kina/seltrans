import Vue from 'vue'

export default {
    SET_PAGE: (state, {url, page}) => {
        Vue.set(state.pages, url, page)
    },
    SET_PRODUCT: (state, {commitUrl, product}) => {
        Vue.set(state.products, commitUrl, product)
    },
    SET_ARTICLE: (state, {commitUrl, article}) => {
        Vue.set(state.articles, commitUrl, article)
    }
}
