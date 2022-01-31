<template lang="pug">
    include ../../tools/mixins.pug
    +b.menu--popup(:class="content.status ? 'active' : ''")
        grid-dark-component
        +e.sections
            +e.section
            +e.section
            +e.section
            +e.section
            +e.section
            +e.section
            +e.section
        +e.content(
            :class="{'hide': hide}"
        )
            +e.body
                +e.left
                    +e.col--left.--popup._menu-animation
                        +e.item--big.--popup {{menu.left.title.name}}
                        +e.ROUTER-LINK(v-for="(item,index) in menu.left.links" :key="index" :to="item.src").item--small.--popup
                            span {{ item.name }}
                    +e.col--right.--popup._menu-animation
                        +e.ROUTER-LINK(:to="menu.center.title.src").item--big.--popup
                            span {{ menu.center.title.name }}
                        +e.ROUTER-LINK(v-for="(item,index) in menu.center.links" :key="index" :to="item.src").item--small.--popup
                            span {{ item.name }}
                +e.right._menu-animation
                    +e.ROUTER-LINK(v-for="(item,index) in menu.right" :key="index" :to="item.src").item--big.--popup
                        span {{ item.name }}
                    <!--+e.languages-->
                        <!--+e.ROUTER-LINK(:to="'/en'" :class="language === 'en' ? 'active' : ''").language En-->
                        <!--+e.ROUTER-LINK(:to="'/'" :class="language === 'ru' ? 'active' : ''").language Ru-->
                    +e.socials.socials__
                        +e.A(href="https://www.youtube.com/channel/UCXOpKGlBK3ll3rxmFQCyxdw/videos" target="_blank" rel="nofollow noopener").item.--menu.--youtube
                        +e.A(href="https://www.instagram.com/selena_elt/" target="_blank" rel="nofollow noopener").item.--menu.--instagram
                        +e.A(href="https://www.facebook.com/seltrans.ru/" target="_blank" rel="nofollow noopener").item.--menu.--facebook
            +e.ROUTER-LINK(:to="historyLink").photo
                img(src="/img/about/1.jpg")
                svg(v-if="language === 'ru'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.4 29.4")
                    path(fill="#ffffff" d="M.7 23.7v-1.1c.7-.7 1.4-1.4 2-2.1.6-.6 1.1-1.2 1.5-1.8s.7-1.1 1-1.5c.2-.5.3-.9.3-1.3 0-.6-.2-1-.5-1.3s-.7-.4-1.3-.4c-.4 0-.8.2-1.1.4-.3.3-.7.6-1 .9-.4-.3-.7-.7-1.1-1.1.5-.5 1-1 1.5-1.3s1.2-.5 1.9-.6c.5 0 1 0 1.4.1s.8.3 1.1.5.5.6.7.9c.2.4.2.8.2 1.3s-.1 1-.3 1.5-.5 1.1-.8 1.6c-.4.5-.8 1.1-1.2 1.7l-1.5 1.8c.3 0 .6-.1.9-.2.3-.1.6-.1.9-.1.9-.1 1.8-.2 2.6-.3V23c-2.4.4-4.8.6-7.2.7zm12.1-1.4c-.9.2-1.6.2-2.2 0-.6-.2-1.1-.4-1.5-.8.3-.5.6-.9.9-1.4.3.2.7.4 1.1.6.4.2.9.2 1.4.1.6-.1 1.1-.4 1.5-.9.4-.4.6-1 .6-1.7 0-.6-.2-1.1-.5-1.4-.4-.3-.8-.3-1.4-.2l-.9.3c-.2.1-.5.4-.8.6-.3-.1-.6-.3-.9-.4l.3-5.4c1.9-.4 3.8-.8 5.7-1.3V12c-1.3.3-2.7.6-4 .9-.1.9-.1 1.8-.2 2.6.2-.2.4-.3.7-.4.2-.1.5-.2.8-.3.5-.1.9-.1 1.3-.1s.8.2 1.1.4c.3.2.5.5.7.9.2.4.3.9.3 1.4 0 .6-.1 1.1-.3 1.6-.2.5-.5 1-.8 1.4s-.7.7-1.2 1c-.8.6-1.2.8-1.7.9zm8.9-2.2c-.3.1-.6.1-.9.1l.3-1.8h.4c.3-.1.5-.2.6-.5.2-.3.3-.7.4-1.2l.3-2.7c.1-.9.2-1.8.3-2.6 1.9-.5 3.7-1 5.6-1.5v8.3c-.6.2-1.3.3-1.9.5V12l-2.1.6-.3 2.1-.3 2.1c-.1 1-.4 1.7-.8 2.3-.3.4-.8.8-1.6 1zm13.1-3.3c-.6.1-1.1.1-1.6 0s-.9-.3-1.3-.6-.7-.7-.9-1.2-.3-1.1-.3-1.8.1-1.3.3-1.9.5-1.1.9-1.6.8-.8 1.2-1.1c.5-.3.9-.5 1.4-.6.6-.1 1.1-.1 1.5 0s.8.3 1.1.6c.3.3.5.7.6 1.1.1.5.2 1 .2 1.5v.5c0 .2 0 .3-.1.4-1.8.3-3.5.6-5.3 1 .1.7.4 1.2.8 1.5.4.3 1 .4 1.7.2.4-.1.7-.2 1-.4l.9-.6c.2.4.4.7.7 1.1-.4.3-.8.6-1.3.9-.4.7-1 .9-1.5 1zm-2.2-4.6c1.2-.3 2.5-.5 3.7-.8 0-.6-.1-1.1-.4-1.4-.3-.3-.7-.4-1.3-.3-.5.1-.9.4-1.3.8s-.6 1-.7 1.7zm8.9 3.4V8.9c-.9.1-1.7.2-2.6.3V7.7c2.4-.4 4.8-.6 7.2-.6v1.5c-.9 0-1.7 0-2.6.1v6.7c-.7 0-1.4.1-2 .2zM5.9 8c-2 .2-3.9.4-5.9.4v1.1c2 0 3.9-.1 5.9-.4V8zm40.5-8c-13 0-25.9 5.9-38.9 7.8v1.1c13-1.9 25.9-7.8 38.9-7.8V0zm-7.5 20.5C26 22.4 13 28.3.1 28.3v1.1c13 0 25.9-5.9 38.9-7.8-.1-.4-.1-.8-.1-1.1zm7.5-.6c-1.9 0-3.9.1-5.8.4v1.1c1.9-.2 3.9-.4 5.8-.4v-1.1z")
                svg(v-if="language === 'en'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 46.4 29.4" style="enable-background:new 0 0 46.4 29.4;" xml:space="preserve")
                    path(fill="#ffffff" d="M0.7,23.7v-1.1c0.7-0.7,1.4-1.4,2-2.1c0.6-0.6,1.1-1.2,1.5-1.8s0.7-1.1,1-1.5c0.2-0.5,0.3-0.9,0.3-1.3 c0-0.6-0.2-1-0.5-1.3s-0.7-0.4-1.3-0.4c-0.4,0-0.8,0.2-1.1,0.4c-0.3,0.3-0.7,0.6-1,0.9c-0.4-0.3-0.7-0.7-1.1-1.1 c0.5-0.5,1-1,1.5-1.3s1.2-0.5,1.9-0.6c0.5,0,1,0,1.4,0.1s0.8,0.3,1.1,0.5s0.5,0.6,0.7,0.9c0.2,0.4,0.2,0.8,0.2,1.3s-0.1,1-0.3,1.5 s-0.5,1.1-0.8,1.6c-0.4,0.5-0.8,1.1-1.2,1.7l-1.5,1.8c0.3,0,0.6-0.1,0.9-0.2s0.6-0.1,0.9-0.1c0.9-0.1,1.8-0.2,2.6-0.3V23 C5.5,23.4,3.1,23.6,0.7,23.7z M12.8,22.3c-0.9,0.2-1.6,0.2-2.2,0c-0.6-0.2-1.1-0.4-1.5-0.8c0.3-0.5,0.6-0.9,0.9-1.4 c0.3,0.2,0.7,0.4,1.1,0.6c0.4,0.2,0.9,0.2,1.4,0.1c0.6-0.1,1.1-0.4,1.5-0.9c0.4-0.4,0.6-1,0.6-1.7c0-0.6-0.2-1.1-0.5-1.4 c-0.4-0.3-0.8-0.3-1.4-0.2l-0.9,0.3c-0.2,0.1-0.5,0.4-0.8,0.6c-0.3-0.1-0.6-0.3-0.9-0.4l0.3-5.4c1.9-0.4,3.8-0.8,5.7-1.3V12 c-1.3,0.3-2.7,0.6-4,0.9c-0.1,0.9-0.1,1.8-0.2,2.6c0.2-0.2,0.4-0.3,0.7-0.4c0.2-0.1,0.5-0.2,0.8-0.3c0.5-0.1,0.9-0.1,1.3-0.1 s0.8,0.2,1.1,0.4c0.3,0.2,0.5,0.5,0.7,0.9c0.2,0.4,0.3,0.9,0.3,1.4c0,0.6-0.1,1.1-0.3,1.6c-0.2,0.5-0.5,1-0.8,1.4s-0.7,0.7-1.2,1 C13.7,22,13.3,22.2,12.8,22.3z M5.9,8C3.9,8.2,2,8.4,0,8.4v1.1c2,0,3.9-0.1,5.9-0.4V8z M46.4,0c-13,0-25.9,5.9-38.9,7.8v1.1 c13-1.9,25.9-7.8,38.9-7.8V0z M38.9,20.5C26,22.4,13,28.3,0.1,28.3v1.1c13,0,25.9-5.9,38.9-7.8C38.9,21.2,38.9,20.8,38.9,20.5z M46.4,19.9c-1.9,0-3.9,0.1-5.8,0.4v1.1c1.9-0.2,3.9-0.4,5.8-0.4V19.9z")
                    g
                        path(fill="#ffffff" d="M21.2,14.9l0.2-0.1l0.7-2.9l1.1-0.3l-1.1,4.4l0.6,2.2l-1,0.3l-0.6-2.2L18,13l1.1-0.3L21.2,14.9z")
                        path(fill="#ffffff" d="M26.1,16.2l3.4-0.9l0.2,0.9l-4.4,1.2l-1.6-6l4.3-1.1l0.2,0.9L25,12.1l0.4,1.5l2.6-0.7l0.2,0.9l-2.6,0.7 L26.1,16.2z")
                        path(fill="#ffffff" d="M34.8,15.1l-1-1.6l-2.5,0.6l-0.1,1.9l-1,0.2l0.6-6.5l1.6-0.4l3.4,5.6L34.8,15.1z M31.6,10.5l-0.2,2.6l1.9-0.4 L32,10.4L31.6,10.5z")
                        path(fill="#ffffff" d="M37.8,8.2C39.1,8,40,8.5,40.2,9.7c0.1,0.8-0.1,1.4-0.6,1.8l1.4,2.5l-1,0.2l-1.3-2.3c-0.1,0-0.3,0.1-0.5,0.1 l-1.4,0.3l0.4,2.4l-1,0.2L35,8.7L37.8,8.2z M36.2,9.4l0.3,1.9l1.6-0.3c0.8-0.1,1.1-0.5,1-1.2c-0.1-0.6-0.5-0.9-1.3-0.7L36.2,9.4z")
                        path( fill="#ffffff" d="M44.8,9c-0.2-0.5-0.6-0.8-1.4-0.7c-0.7,0.1-1.2,0.4-1.1,0.9c0,0.5,0.4,0.6,1,0.7l0.6,0.1l0.6,0.1 c1.1,0.1,1.7,0.7,1.8,1.6c0,0.5-0.1,1-0.5,1.4c-0.4,0.4-1,0.6-1.7,0.7c-0.7,0.1-1.3-0.1-1.8-0.4c-0.5-0.3-0.8-0.8-0.9-1.3l1.1-0.1 c0.2,0.7,0.7,1,1.6,0.9c0.8-0.1,1.3-0.5,1.2-1.1c0-0.5-0.4-0.8-1-0.8c-0.1,0-0.3,0-0.7-0.1c-0.4,0-0.5-0.1-0.6-0.1 c-1-0.1-1.6-0.6-1.7-1.5c0-0.5,0.1-1,0.5-1.3c0.4-0.4,0.9-0.6,1.6-0.6c1.3-0.1,2.3,0.5,2.5,1.5L44.8,9z")
</template>

<script>
    import GridDark from '@/components/blanks/GridDark.vue';
    export default {
        props:['content'],
        data() {
            let language = this.$router.currentRoute.meta.language,
                obj = {
                    language: language,
                    hide: true
                };

            if(language === 'en') {
                obj.menu = {
                    left: {
                        title: {
                            name: "Services",
                            src: ""
                        },
                        links: [
                            {
                                name: "Production of non-standard equipment",
                                src: "/en/engineering#prevent"
                            },
                            {
                                name: "Modeling objects",
                                src: "/en/modeling#prevent"
                            }
                        ]
                    },
                    center: {
                        title: {
                            name: "Our products",
                            src: "/en/products"
                        },
                        links: [
                            {
                                name: "Current-collecting equipment",
                                src: "/en/products/current-collectors"
                            },
                            {
                                name: "Runners",
                                src: "/en/products/runners"
                            },
                            {
                                name: "Contact strings",
                                src: "/en/products/contact-strings"
                            },
                            {
                                name: "Spare parts and components",
                                src: "/en/spares"
                            }
                        ]
                    },
                    right: [
                        {
                            name: "Blog",
                            src: "/en/blog"
                        },
                        {
                            name: "About company",
                            src: "/en/about"
                        },
                        {
                            name: "Contacts",
                            src: "/en/contacts"
                        }
                    ]
                };
                obj.historyLink = '/en/history';
            } else {
                obj.menu = {
                    left: {
                        title: {
                            name: "Услуги",
                            src: ""
                        },
                        links: [
                            {
                                name: "Производство нестандартного оборудования",
                                src: "/ru/engineering#prevent"
                            },
                            {
                                name: "Моделирование объектов",
                                src: "/ru/modeling#prevent"
                            }
                        ]
                    },
                    center: {
                        title: {
                            name: "Наша продукция",
                            src: "/ru/products"
                        },
                        links: [
                            {
                                name: "Токоприемники",
                                src: "/ru/products/current-collectors"
                            },
                            {
                                name: "Полоза",
                                src: "/ru/products/runners"
                            },
                            {
                                name: "Струны контактной сети",
                                src: "/ru/products/contact-strings"
                            },
                            {
                                name: "Запчасти и комплектующие",
                                src: "/ru/spares"
                            }
                        ]
                    },
                    right: [
                        {
                            name: "Блог",
                            src: "/ru/blog"
                        },
                        {
                            name: "О компании",
                            src: "/ru/about"
                        },
                        {
                            name: "Контакты",
                            src: "/ru/contacts"
                        }
                    ]
                };
                obj.historyLink = '/ru/history';
            }
            return obj;
        },
        mounted(){
            setTimeout(() => {
                this.hide = false;
            }, 1000)
        },
        components:{
            'grid-dark-component': GridDark,
        }
    }
</script>
