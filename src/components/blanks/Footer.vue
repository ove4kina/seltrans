<template lang="pug">
    include ../../tools/mixins.pug
    +b.FOOTER.footer
        +e.top
            +e.ROUTER-LINK.logo(v-if="!mainPage" :to="language === 'ru' ? '/' : '/en'")
                img(src="/img/logo.svg" alt="")
            +e.logo(v-if="mainPage")
                img(src="/img/logo.svg" alt="")
            +e.NAV.menu.menu__
                +e.wrapper--footer-left
                    +e.ROUTER-LINK(v-for="(item,index) in menu.left.big" :key="item.id" :to="item.url").item--footer.--big-footer
                        span.border--white {{ item.name }}
                    +e.ROUTER-LINK(v-for="(item,index) in menu.left.small" :key="item.id" :to="item.url").item--footer.--small-footer
                        span.border--white {{ item.name }}
                +e.wrapper--footer-right
                    +e.col--footer-left
                        +e.ROUTER-LINK(v-for="(item,index) in menu.right.left" :key="item.id" :to="item.url").item--footer.--big-footer
                            span.border--white {{ item.name }}
                    +e.col--footer-right
                        +e.ROUTER-LINK(v-for="(item,index) in menu.right.right" :key="item.id" :to="item.url").item--footer.--big-footer
                            span.border--white {{ item.name }}
            +e.ROUTER-LINK(:to="historyLink").logo-anniversary
                img(src="/img/anniversary.svg" alt="")
        +e.middle
            +e.socials.socials__
                +e.A(href="https://www.youtube.com/channel/UCXOpKGlBK3ll3rxmFQCyxdw/videos" target="_blank" rel="nofollow noopener").item.--footer.--youtube
                +e.A(href="https://www.instagram.com/selena_elt/" target="_blank" rel="nofollow noopener").item.--footer.--instagram
                +e.A(href="https://www.facebook.com/seltrans.ru/" target="_blank" rel="nofollow noopener").item.--footer.--facebook
            +e.contact
                +e.A(:href="clearPhone(phone)").phone {{ phone }}
                +e.BUTTON(type="button" v-on:click="openPopupRecall").button.button--recall.button--recall-light
                    span {{ recall }}
        +e.bottom.text--footer-bottom
            router-link(:to="privacy.link").border--white {{ privacy.name }}
            p {{ reserved }}

</template>

<script>
    import constants from '../../../content/constants.json';
    import {phone} from '@/mixins/phone';

    export default {
        mixins: [phone],
        data() {
            let language = this.$router.currentRoute.meta.language,
                obj = {
                    language: language,
                    phone: constants.phone,
                    mainPage: this.$router.history.current.meta.type === 'main'
                };
            if(language === 'en') {
                obj.menu = {
                    left: {
                        big: [
                            {
                                name: "About company",
                                url: "/en/about"
                            },
                            {
                                name: "Our products",
                                url: "/en/products"
                            }
                        ],
                        small: [
                            {
                                name: "Current-collecting equipment",
                                url: "/en/products/current-collectors"
                            },
                            {
                                name: "Runners",
                                url: "/en/products/runners"
                            },
                            {
                                name: "Contact strings",
                                url: "/en/products/contact-strings"
                            },
                            {
                                name: "Spare parts and components",
                                url: "/en/spares"
                            }
                        ]
                    },
                    right: {
                        left: [
                            {
                                name: "Non-standard equipment",
                                url: "/en/engineering#prevent"
                            },
                            {
                                name: "Modeling objects",
                                url: "/en/modeling#prevent"
                            }
                        ],
                        right: [
                            {
                                name: "Blog",
                                url: "/en/blog"
                            },
                            {
                                name: "Contacts",
                                url: "/en/contacts"
                            }
                        ]
                    }
                };
                obj.recall = "Re-call";
                obj.privacy = {
                  name: "Privacy policy",
                  link: "/en/privacy"
                };
                obj.reserved = "All rights reserved";
                obj.historyLink = "/en/history";
            } else {
                obj.menu = {
                    left: {
                        big: [
                            {
                                id: 1,
                                name: "О компании",
                                url: "/ru/about"
                            },
                            {
                                id: 2,
                                name: "Наша продукция",
                                url: "/ru/products"
                            }
                        ],
                        small: [
                            {
                                id: 3,
                                name: "Токоприемники",
                                url: "/ru/products/current-collectors"
                            },
                            {
                                id: 4,
                                name: "Полоза",
                                url: "/ru/products/runners"
                            },
                            {
                                id: 5,
                                name: "Запчасти и комплектующие",
                                url: "/ru/spares"
                            },
                            {
                                id: 6,
                                name: "Нестандартное оборудование",
                                url: "/ru/engineering"
                            }
                        ]
                    },
                    right: {
                        left: [
                            {
                                id: 8,
                                name: "Проектирование",
                                url: "/ru/modeling#prevent"
                            },
                            {
                                id: 7,
                                name: "Производство",
                                url: "/ru/engineering#prevent"
                            }
                        ],
                        right: [
                            {
                                id: 9,
                                name: "Блог",
                                url: "/ru/blog"
                            },
                            {
                                id: 10,
                                name: "Контакты",
                                url: "/ru/contacts"
                            }
                        ]
                    }
                };
                obj.recall = "Обратный звонок";
                obj.privacy = {
                  name: "Политика конфиденциальности",
                  link: "/ru/privacy"
                };
                obj.reserved = "Все права защищены";
                obj.historyLink = "/ru/history";

            }
            return obj;
        },
        methods: {
            openPopupRecall() {
                this.$emit('clicked', 'openPopupRecall');
            }
        },
    }
</script>
