<template>
    <div  class="content" id="content">
        <content-component ></content-component>
    </div>
</template>
<script>
    import Content from '../pages/content/notfound/Content.vue';
    export default {
        data() {
            return {

            };
        },
        components: {
            'content-component' : Content
        }
    };
</script>