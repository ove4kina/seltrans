import axios from 'axios'
import constantsJson from '../../content/constants.json';

export function fetchPage(url) {
    return axios({
        method: 'get',
        url: constantsJson.site + '/content/' + url + '/content.json',
    })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            return '404';
        });
}

export function fetchProduct(url, language = '') {
    return axios({
        method: 'get',
        url: constantsJson.site + '/content/products/' + url + '/content' + language + '.json',
    })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            return '404';
        });
}

export function fetchArticle(url, language = '') {
    return axios({
        method: 'get',
        url: constantsJson.site + '/content/blog/' + url + '/content' + language + '.json',
    })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            return '404';
        });
}