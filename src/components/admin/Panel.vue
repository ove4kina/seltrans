<template lang="pug">
    div(class="panel")
        p(v-on:click="firstStateText" style="color:#aeaeae;cursor:pointer;margin-left:15px;") <<
        p(v-on:click="previousStateText" style="color:#fff;cursor:pointer;margin-left:15px;") <
        p(v-on:click="nextStateText" style="color:red;cursor:pointer;margin-left:15px;") >
        p(v-on:click="glvrdApiProofread" style="color:pink;cursor:pointer;margin-left:15px;") glvrd
            span#glvrd-score
        p(v-on:click="yandexSpellerApi" style="color:pink;cursor:pointer;margin-left:15px;") speller
        div#box
        div.notification.notification--success#success-box
        div.notification.notification--error#error-box
</template>

<script>
    export default {
        data() {
            return {
            };
        },
        methods: {
            firstStateText() {
                this.$emit('clicked', { type:'firstStateText' });
            },
            previousStateText() {
                this.$emit('clicked', { type:'previousStateText' });
            },
            nextStateText() {
                this.$emit('clicked', { type:'nextStateText' });
            },
            glvrdApiProofread() {
                this.$emit('clicked', { type:'glvrdApiProofread' });
            },
            yandexSpellerApi() {
                this.$emit('clicked', { type:'yandexSpellerApi' });
            }
        }
    }
</script>
