import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Index from '../components/pages/Index.vue';
import IndexEn from '../components/pages/IndexEn.vue';

import Product from '../components/pages/Product.vue';
import ProductEn from '../components/pages/ProductEn.vue';

import Products from '../components/pages/Products.vue';
import ProductsEn from '../components/pages/ProductsEn.vue';

import ProductsList from '../components/pages/ProductsList.vue';
import ProductsListEn from '../components/pages/ProductsListEn.vue';

import Engineering from '../components/pages/Engineering.vue';
import EngineeringEn from '../components/pages/EngineeringEn.vue';

import Modeling from '../components/pages/Modeling.vue';
import ModelingEn from '../components/pages/ModelingEn.vue';

import Spares from '../components/pages/Spares.vue';
import SparesEn from '../components/pages/Spares.vue';

import Blog from '../components/pages/Blog.vue';
import BlogEn from '../components/pages/BlogEn.vue';

import History from '../components/pages/History.vue';
import HistoryEn from '../components/pages/HistoryEn.vue';

import Article from '../components/pages/Article.vue';
import ArticleEn from '../components/pages/ArticleEn.vue';

import Contacts from '../components/pages/Contacts.vue';
import ContactsEn from '../components/pages/ContactsEn.vue';

import About from '../components/pages/About.vue';
import AboutEn from '../components/pages/AboutEn.vue';

import ContactStrings from '../components/pages/ContactStrings.vue';
import ContactStringsEn from '../components/pages/ContactStringsEn.vue';

import Privacy from '../components/pages/Privacy.vue';
import PrivacyEn from '../components/pages/PrivacyEn.vue';

import NotFound from '../components/pages/NotFound.vue';
import NotFoundEn from '../components/pages/NotFoundEn.vue';

export function createRouter() {
    return new Router({
        mode: 'history',
        fallback: false,
        scrollBehavior: () => ({y: 0}),
        routes: [
            {
                path: '',
                name: 'main',
                component: Index,
                meta: {
                    language: 'ru',
                    type: 'main',
                    animation: 'all'
                }
            },
            {
                path: '/en',
                name: 'mainEn',
                component: IndexEn,
                meta: {
                    language: 'en',
                    type: 'main',
                    animation: 'all'
                }
            },


            {
                path: '/ru/products/contact-strings',
                name: 'contactStrings',
                component: ContactStrings,
                meta: {
                    language: 'ru',
                    type: 'contact-strings',
                    animation: 'slice'
                }
            },
            {
                path: '/en/products/contact-strings',
                name: 'contactStringsEn',
                component: ContactStringsEn,
                meta: {
                    language: 'en',
                    type: 'contact-strings',
                    animation: 'slice'
                }
            },


            {
                path: '/ru/products/:category/:product',
                name: 'product',
                component: Product,
                meta: {
                    language: 'ru',
                    type: 'product',
                    animation: 'slice'
                }
            },
            {
                path: '/en/products/:category/:product',
                name: 'productEn',
                component: ProductEn,
                meta: {
                    language: 'en',
                    type: 'product',
                    animation: 'slice'
                }
            },

            {
                path: '/ru/products/:category',
                name: 'productList',
                component: ProductsList,
                meta: {
                    language: 'ru',
                    type: 'products-list',
                    animation: 'slice'
                }
            },

            {
                path: '/en/products/:category',
                name: 'productListEn',
                component: ProductsListEn,
                meta: {
                    language: 'en',
                    type: 'products-list',
                    animation: 'slice'
                }
            },

            {
                path: '/ru/products',
                name: 'products',
                component: Products,
                meta: {
                    language: 'ru',
                    type: 'products',
                    animation: 'slice'
                }
            },
            {
                path: '/en/products',
                name: 'productsEn',
                component: ProductsEn,
                meta: {
                    language: 'en',
                    type: 'products',
                    animation: 'slice'
                }
            },
            {
                path: '/ru/engineering',
                name: 'engineering',
                component: Engineering,
                meta: {
                    language: 'ru',
                    type: 'engineering',
                    animation: 'video'
                }
            },
            {
                path: '/en/engineering',
                name: 'engineeringEn',
                component: EngineeringEn,
                meta: {
                    language: 'en',
                    type: 'engineering',
                    animation: 'video'
                }
            },
            {
                path: '/ru/modeling',
                name: 'modeling',
                component: Modeling,
                meta: {
                    language: 'ru',
                    type: 'modeling',
                    animation: 'video'
                }
            },
            {
                path: '/en/modeling',
                name: 'modelingEn',
                component: ModelingEn,
                meta: {
                    language: 'en',
                    type: 'modeling',
                    animation: 'video'
                }
            },
            {
                path: '/ru/spares',
                name: 'spares',
                component: Spares,
                meta: {
                    language: 'ru',
                    type: 'spares',
                    animation: 'slice'
                }
            },
            {
                path: '/en/spares',
                name: 'sparesEn',
                component: SparesEn,
                meta: {
                    language: 'en',
                    type: 'spares',
                    animation: 'slice'
                }
            },

            {
                path: '/ru/blog',
                name: 'blog',
                component: Blog,
                meta: {
                    language: 'ru',
                    type: 'blog',
                    animation: 'slice'
                }
            },
            {
                path: '/en/blog',
                name: 'blogEn',
                component: BlogEn,
                meta: {
                    language: 'en',
                    type: 'blog',
                    animation: 'slice'
                }
            },
            {
                path: '/ru/blog/:url',
                name: 'article',
                component: Article,
                meta: {
                    language: 'ru',
                    type: 'article',
                    animation: 'slice'
                }
            },
            {
                path: '/en/blog/:url',
                name: 'articleEn',
                component: ArticleEn,
                meta: {
                    language: 'en',
                    type: 'article',
                    animation: 'slice'
                }
            },
            {
                path: '/ru/history',
                name: 'history',
                component: History,
                meta: {
                    language: 'ru',
                    type: 'history',
                    animation: 'slice'
                }
            },
            {
                path: '/en/history',
                name: 'historyEn',
                component: HistoryEn,
                meta: {
                    language: 'en',
                    type: 'history',
                    animation: 'slice'
                }
            },
            {
                path: '/ru/contacts',
                name: 'contacts',
                component: Contacts,
                meta: {
                    language: 'ru',
                    type: 'contacts',
                    animation: 'slice'
                }
            },
            {
                path: '/en/contacts',
                name: 'contactsEn',
                component: ContactsEn,
                meta: {
                    language: 'en',
                    type: 'contacts',
                    animation: 'slice'
                }
            },
            {
                path: '/ru/about',
                name: 'about',
                component: About,
                meta: {
                    language: 'ru',
                    type: 'about',
                    animation: 'slice'
                }
            },
            {
                path: '/en/about',
                name: 'aboutEn',
                component: AboutEn,
                meta: {
                    language: 'en',
                    type: 'contacts',
                    animation: 'slice'
                }
            },
            {
                path: '/ru/privacy',
                name: 'privacy',
                component: Privacy,
                meta: {
                    language: 'ru',
                    type: 'privacy',
                    animation: 'slice'
                }
            },
            {
                path: '/en/privacy',
                name: 'privacyEn',
                component: PrivacyEn,
                meta: {
                    language: 'en',
                    type: 'privacy',
                    animation: 'slice'
                }
            },
            {
                path: '/en/*',
                name: '404',
                component: NotFoundEn,
                meta: {
                    title: '404',
                    language: 'en',
                    type: '404',
                    animation: 'slice'
                }
            },
            {
                path: '*',
                name: '404En',
                component: NotFound,
                meta: {
                    title: '404',
                    language: 'ru',
                    type: '404',
                    animation: 'slice'
                }
            }
        ]
    });
}