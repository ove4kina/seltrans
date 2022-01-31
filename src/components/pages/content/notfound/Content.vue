<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.not-found
        grid-component
        rain-component
        +e.body
            +e.title 404
            +e.text.text--404
                h1 Страница не найдена
                p Неправильно введен адрес или такой страницы больше не существует.
            +e.ROUTER-LINK(to="/").button.button__.--primary
                span На главную
                +e.DIV.wrapper
                DIV.ui-arrow
                    span
                        span
                        span
                            span
                            span
</template>
<script>
    import Grid from '@/components/blanks/Grid.vue';
    import Rain from '@/components/blanks/Rain.vue';
    export default {
        data() {
            return {};

        },
        components: {
            'grid-component': Grid,
            'rain-component': Rain
        }
    };
</script>
