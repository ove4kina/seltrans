<template lang="pug">
    div
        menu-component(:content="menu")
        header-component(@clicked="onClicked" :content="{isDark: false}")
        content-component
        popup-recall-component(@clicked="onClicked" :content="recall")
</template>
<script>
    import Content from '../pages/content/notfound/Content.vue';
    import Menu from '@/components/blanks/Menu.vue';
    import Header from '@/components/blanks/Header.vue';
    import PopupRecall from '@/components/blanks/PopupRecall.vue';

    import {menu} from '@/mixins/menu';
    import {popupRecall} from '@/mixins/popupRecall';
    export default {
        mixins: [menu,popupRecall],
        data() {

            return {

            };
        },
        methods: {
            onClicked(value){
                switch(value){
                    case 'openPopupRecall':
                        this.openPopupRecall(value);
                        break;
                    case 'openMenu':
                        this.onOpenMenu(value);
                        break;
                    case 'closePopupRecall':
                        this.closePopupRecall(value);
                        break;
                }
            }
        },
        components: {
            'content-component' : Content,
            'header-component': Header,
            'menu-component': Menu,
            'popup-recall-component': PopupRecall
        }
    };
</script>