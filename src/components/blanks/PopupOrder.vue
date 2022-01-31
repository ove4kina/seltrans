<template lang="pug">
    include ../../tools/mixins.pug

    +b.popup
        +e.body
            form-order-component(class="popup__form form--with-image form--popup")
</template>

<script>
    import FormOrder from '@/components/blanks/FormOrder.vue';

    export default {
        props:['content'],
        data() {
            let obj = {}
            return obj
        },
        components:{
            'form-order-component': FormOrder,
        }
    }
</script>
