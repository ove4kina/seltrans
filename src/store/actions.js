import {
    fetchPage,
    fetchProduct,
    fetchArticle
} from '../api'

export default {
    FETCH_PAGE: ({commit, state}, {url}) => {
        return state.pages[url]
            ? Promise.resolve(state.pages[url])
            : fetchPage(url).then(page => commit('SET_PAGE', {url, page}))
    },
    FETCH_PRODUCT: ({commit, state}, {url, language}) => {
        let commitUrl = url + language;
        return state.products[commitUrl]
            ? Promise.resolve(state.products[commitUrl])
            : fetchProduct(url, language).then(product => commit('SET_PRODUCT', {commitUrl, product}))
    },
    FETCH_ARTICLE: ({commit, state}, {url, language}) => {
        let commitUrl = url + language;
        return state.articles[commitUrl]
            ? Promise.resolve(state.articles[commitUrl])
            : fetchArticle(url, language).then(article => commit('SET_ARTICLE', {commitUrl, article}))
    },
}
