<template lang="pug">
    include ../../tools/mixins.pug
    +b.FORM.form__.--main(:class="{'send' : form.response,'loading' : form.loading}" ref="form")
        +e.body--main
            +e.text--main.text--form-main
                h3 {{ text.title }}
                p {{ text.description }}
            +e.input--main.input__(:class="{'isFocus': form.inputs.name.focus,'isError': form.inputs.name.error}")
                input(
                name="name"
                v-model="form.inputs.name.value"
                @focus="form.inputs.name.focus = true"
                @blur="form.inputs.name.value.length === 0 ? form.inputs.name.focus = false : ''")
                +e.label {{ form.inputs.name.text.label }}
                +e.tooltip {{ form.inputs.name.text.tooltip }}
            +e.input--main.input__(:class="{'isFocus': form.inputs.phone.focus,'isError': form.inputs.phone.error}")
                input(name="phone" type="tel"
                v-model="form.inputs.phone.value"
                @focus="form.inputs.phone.focus = true"
                @blur="form.inputs.phone.value.length === 0 ? form.inputs.phone.focus = false : ''")
                +e.label {{ form.inputs.phone.text.label }}
                +e.tooltip {{ form.inputs.phone.text.tooltip }}
            +e.BUTTON(type="button" v-on:click="sendForm").button--main.button__.--primary.--blue
                span {{ text.submit }}
                +e.DIV.wrapper
                .ui-icon.ui-icon--plane
            +e.privacy--main {{ text.privacy.description }}
                +e.ROUTER-LINK(:to="text.privacy.link.url" v-html="text.privacy.link.name")
        +e.image
            img(src="/img/popup.jpg" alt="")
        +e.close(v-on:click="closePopupRecall")
            span
                span
                span
            span
        +e.response--main.text--response
            p.bold Ваша заявка принята!
            p Мы рассмотрим вашу задачу в течении 24 часов с момента отправки данного сообщения.
        +e.preloader--main
            .dot
            .dot
            .dot
            .dot
            .dot
            .dot
            .dot
            .dot
</template>

<script>
    import axios from 'axios';
    import {clearClasses} from '@/mixins/clearClasses';
    export default {
        mixins: [clearClasses],
        data(){
            let language = this.$router.currentRoute.meta.language,
                obj = {
                    form: {
                        inputs: {
                            name: {
                                value: "",
                                focus: false,
                                error: false
                            },
                            phone: {
                                value: "",
                                focus: false,
                                error: false
                            }
                        },
                        response: false,
                        loading: false
                    }
                };
            if(language === 'en') {
                obj.text = {
                    title: "Recall",
                    description: "The technical specialist will call you back and help you to make a technical assignment.",
                    privacy: {
                        description: "By clicking the «Submit» button you agree with ",
                        link: {
                            name: "&nbspthe policy of processing personal data.",
                            url: "/en/privacy"
                        }
                    },
                    submit: "Send"
                };
                obj.form.inputs.name.text = {
                    tooltip: "Enter name",
                    label: "Name"
                };
                obj.form.inputs.phone.text = {
                    tooltip: "Enter phone",
                    label: "Phone"
                };
            } else {
                obj.text = {
                    title: "Обратная связь",
                    description: "Технический специалист перезвонит вам и поможет составить грамотное техническое задание.",
                    privacy: {
                        description: "Нажимая кнопку «Отправить», вы даете свое согласие на обработку персональных данных в соответствии с",
                        link: {
                            name: "&nbspполитикой конфиденциальности.",
                            url: "/ru/privacy"
                        }
                    },
                    submit: "Отправить"
                };
                obj.form.inputs.name.text = {
                    tooltip: "Введите имя",
                    label: "Имя"
                };
                obj.form.inputs.phone.text = {
                    tooltip: "Введите телефон",
                    label: "Телефон"
                };
            }
            return obj;
        },
        methods: {
            sendForm() {
                if (this.checkInputTextEmpty(this.form.inputs.name.value)) {
                    this.form.inputs.name.error = true;
                } else {
                    this.form.inputs.name.error = false;
                }

                if (this.checkInputTextEmpty(this.form.inputs.phone.value)) {
                    this.form.inputs.phone.error = true;
                } else {
                    this.form.inputs.phone.error = false;
                }

                if (!this.form.inputs.name.error && !this.form.inputs.phone.error) {
                    this.form.loading = true;
                    setTimeout(()=>{
                        this.clearClasses();
                    },1)
                    axios({
                        method: 'post',
                        url: '/send-form-recall',
                        data: {
                            name: this.form.inputs.name.value,
                            phone: this.form.inputs.phone.value
                        }
                    })
                        .then(response => {
                            setTimeout(()=>{
                                this.form.response = true;
                                this.form.loading = false;
                                setTimeout(()=>{
                                    this.clearClasses();
                                },1)
                                this.form.inputs.name.value = "";
                                this.form.inputs.phone.value = "";
                                this.form.inputs.name.focus = false;
                                this.form.inputs.phone.focus = false;
                            },2000)
                        })
                        .catch(e => {
//                        console.log(e)
                        })
                }
            },
            checkInputTextEmpty(value) {
                if (value === "" || value === "undefined") {
                    return true;
                }
                return false;
            },
            closePopupRecall(){
                setTimeout(()=>{
                    this.form.response = false;
                    this.form.send = false;
                },600)

                this.$emit('clicked', 'closePopupRecall');
            }
        }
    }
</script>
