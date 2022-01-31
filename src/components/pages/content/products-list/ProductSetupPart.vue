<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.part(:class="{'active':content.active}")
        +e.photo
            img(:src="'/img/product-setup/' + content.photoDirectory +'/mobile/' + content.part.id + '.jpg'")
        +e.name {{content.part.name}}
        +e.text.text--part(v-html="content.part.description")
        +e.button.button--plus(:class="{'active':content.active}")
</template>



<script>
    export default {
        props:['content'],
        data() {
            let obj = {

            };
            return obj;
        },
        created(){

        },
        destroyed(){

        },
        methods: {

        }
    }
</script>