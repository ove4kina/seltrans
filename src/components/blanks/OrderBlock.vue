<template lang="pug">
    include ../../tools/mixins.pug
    +b.SECTION.form-order._animated--trf
        grid-component
        +e.left
            +e.H2.title.title--underlined.--white._animated--trf {{ content.title }}
            +e.text.text--form-order._animated--trf(v-html="content.description")
        form-recall-component(class="form-order__right _animated _animated--trf" v-if="content.form ==='recall'")
        form-order-component(class="form-order__right _animated _animated--trf" v-if="content.form ==='order'")
</template>

<script>
    import FormRecall from '@/components/blanks/FormRecall.vue';
    import FormOrder from '@/components/blanks/FormOrder.vue';
    import Grid from '@/components/blanks/Grid.vue';

    import {fadeInOnScroll} from '@/mixins/fadeInOnScroll';
    export default {
        props: ['content'],
        mixins: [fadeInOnScroll],
        data(){
            let obj = {
                    page: this.$router.history.current.meta.type
                };
            return obj;
        },
        mounted(){
        },
        components: {
            'form-recall-component':FormRecall,
            'form-order-component':FormOrder,
            'grid-component': Grid
        }
    }
</script>
