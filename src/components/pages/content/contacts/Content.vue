<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.contacts-page(id="main")
        admin-panel-component(v-show="loginIn" @clicked="onAdminPanelClick")
        +e.H1.title.title--underlined.--dark.--big._animated--trf(
            ref="title"
            :class="{'editable-text': loginIn}"
            @click="clickTextField($event,content.title,'title','textJson')"
            @input="editTextJson($event,content.title,'title',70)"
        ) {{ content.title }}
        +e.text.text__.--contacts-page
            +e.col--left._animated--trf
                p.bold(
                    :class="{'editable-text': loginIn}"
                    @click="clickTextField($event,content.address,'address','textJson')"
                    @input="editTextJson($event,content.address,'address',70)"
                ) {{ content.address }}
                p(:class="{'editable-text': loginIn}" @click="editConstantJson($event, address, 'address.ru')" @input="editConstantJson($event, address, 'address.ru')") {{ address }}
                p.bold(
                    :class="{'editable-text': loginIn}"
                    @click="clickTextField($event,content.phone,'phone','textJson')"
                    @input="editTextJson($event,content.phone,'phone',70)"
                ) {{ content.phone }}
                a(
                    :href="clearPhone(phone)"
                    :class="{'editable-text': loginIn}"
                    @click="editConstantJson($event, phone, 'phone')"
                    @input="editConstantJson($event, phone, 'phone')"
                ) {{ phone }}
                p.bold(
                    :class="{'editable-text': loginIn}"
                    @click="clickTextField($event,content.email,'email','textJson')"
                    @input="editTextJson($event,content.email,'email',70)"
                ) {{ content.email }}
                a(
                    :href="'mailto:' + email" :class="{'editable-text': loginIn}"
                    @click="editConstantJson($event, email, 'email')"
                    @input="editConstantJson($event, email, 'email')"
                ) {{ email }}
            +e.col--right._animated--trf
                p.bold(
                    :class="{'editable-text': loginIn}"
                    @click="clickTextField($event,content.manager.name,'manager.name','textJson')"
                    @input="editTextJson($event,content.manager.name,'manager.name',70)"
                ) {{ content.manager.name }}
                span(
                    :class="{'editable-text': loginIn}"
                    @click="clickTextField($event,content.manager.title,'manager.title','textJson')"
                    @input="editTextJson($event,content.manager.title,'manager.title',70)"
                ) {{ content.manager.title }}
                a(
                    :href="clearPhone(content.manager.phone)"
                    :class="{'editable-text': loginIn}"
                    @click="clickTextField($event,content.manager.phone,'manager.phone','textJson')"
                    @input="editTextJson($event,content.manager.phone,'manager.phone',70)"
                ) {{ content.manager.phone }}
                a(
                    :href="'mailto:' + content.manager.email"
                    :class="{'editable-text': loginIn}"
                    @click="clickTextField($event,content.manager.email,'manager.email','textJson')"
                    @input="editTextJson($event,content.manager.email,'manager.email',70)"
                ) {{ content.manager.email }}
                img(src="/img/contacts.jpg")
        form-question-component(class="contacts-page__form _animated _animated--trf")
        +e.map._animated--trf
            googlemaps-map(
            :center.sync="map.center"
            :zoom.sync="map.zoom"
            )
                googlemaps-marker(
                title="Софрино"
                :position="map.point"
                )
</template>
<script>
    import constants from '../../../../../content/constants.json';
    import GridDark from '@/components/blanks/GridDark.vue';
    import FormQuestion from '@/components/blanks/FormQuestion.vue';
    import {googleMap} from '@/mixins/googleMap';
    import {phone} from '@/mixins/phone';
    import {fadeInOnScroll} from '@/mixins/fadeInOnScroll';

    import {editText} from '@/mixins/admin/editText';
    import AdminPanel from '@/components/admin/Panel.vue';

    export default {
        mixins: [editText,googleMap,phone,fadeInOnScroll],
        data(){
            let language = this.$router.currentRoute.meta.language,
                obj = {
                    email: constants.email,
                    phone: constants.phone,
                    address: language === 'ru'? constants.address.ru : constants.address.en,
                    content: this.$attrs.content.content[language].text
                };
            return obj;
        },
        components: {
            'grid-dark-component': GridDark,
            'form-question-component': FormQuestion,
            'admin-panel-component': AdminPanel
        }
    }
</script>