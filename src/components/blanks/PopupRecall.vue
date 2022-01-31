<template lang="pug">
    include ../../tools/mixins.pug

    +b.popup(:class="{ 'active': content.status }" v-on:click="onWrapClose($event)")
        +e.body()
            form-recall-component(class="popup__form form--with-image form--popup" @clicked="onClosePopupRecall")
</template>

<script>
    import FormRecall from '@/components/blanks/FormRecall.vue';

    export default {
        props:['content'],
        data() {
            let obj = {}
            return obj
        },
        mounted(){
            document.addEventListener('keydown',(event) =>{
                this.onEscClose(event)
            })
        },
        destroyed(){
            document.removeEventListener('keydown',(event) =>{
                this.onEscClose(event)
            })
        },
        methods: {
            onClosePopupRecall(value) {
                if(value === 'closePopupRecall') {
                    this.$emit('clicked', 'closePopupRecall');
                }
            },
            onWrapClose(event){
                event.stopPropagation();
                if (event.target === document.querySelector('.popup')){
                    this.onClosePopupRecall('closePopupRecall');
                }
            },
            onEscClose(event){
                if (event.keyCode === 27){
                    this.onClosePopupRecall('closePopupRecall');
                }
            }
        },
        components:{
            'form-recall-component': FormRecall,
        }
    }
</script>
