<template lang="pug">
    include ../../tools/mixins.pug

    +b.service--engineering.--page
        +e.bg--page(ref="videoContainer")
            img(:src="content.media.backgroundImage + imgPrefix + '.jpg'" alt="")
            video(muted="muted" autoplay="true" loop="true" ref="video")
                source(:data-src="content.media.backgroundVideo + '.webm'")
                source(:data-src="content.media.backgroundVideo + '.mp4'")
        +e.content--page
            +e.H1.title--page.title--underlined.--full-white.--big(
                :class="{'editable-text': loginIn}"
                @click="clickTextField($event,content.title,'serviceMain.title','htmlJson')"
                @input="editTextJson($event,content.title,'serviceMain.title')"
            ) {{ content.title }}
            +e.text--page.text--service-main(
                v-html="content.description"
                :class="{'editable-html': loginIn}"
                @click="clickTextField($event,content.description,'serviceMain.description','htmlJson')"
                @input="editHtmlJson($event,content.description,'serviceMain.description')"
            )
            +e.BUTTON(type="button").button--page.button__.--primary
                span {{ content.button.name }}
                +e.wrapper
                .ui-arrow
                    span
                        span
                        span
                            span
                            span
        form-recall-component(class="service__form--page form--shadow")
        grid-component
</template>

<script>
    import FormRecall from '@/components/blanks/FormRecall.vue';
    import Grid from '@/components/blanks/Grid.vue';

    import {getImagePrefix} from '@/mixins/getImagePrefix';
    import {loadVideo} from '@/mixins/loadVideo';

    import {editText} from '@/mixins/admin/editText';
    export default {
        props: ["content"],
        mixins: [editText,getImagePrefix,loadVideo],
        components: {
            'form-recall-component':FormRecall,
            'grid-component': Grid
        },
        mounted(){
            this.loadVideo(this.$refs.video)
            if (this.$router.pageFromAnimation === 'video' && this.$router.history.current.meta.animation === 'video' || this.$router.pageFromAnimation === 'all' && this.$router.history.current.meta.animation === 'video' || this.$router.pageFromAnimation === 'video' && this.$router.history.current.meta.animation === 'all') {
                // this.$refs.video.play();
            } else {
                this.loadVideo(this.$refs.video)
            }
        }
    }
</script>
