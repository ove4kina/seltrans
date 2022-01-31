<template lang="pug">
    include ../../tools/mixins.pug
    +b.FORM.form__.--main(:class="{'send' : form.response,'loading' : form.loading}" ref="form")
        +e.body--main
            +e.text--main.text--form-main
                h3.small-title {{ text.title }}
            +e.LABEL(for="input-name" :class="{'isFocus': form.inputs.name.focus,'isError': form.inputs.name.error}").input--main.input__
                input(
                name="name" id="input-name"
                v-model="form.inputs.name.value"
                @focus="form.inputs.name.focus = true"
                @blur="form.inputs.name.value.length === 0 ? form.inputs.name.focus = false : ''")
                +e.label {{ form.inputs.name.text.label }}
                +e.tooltip {{ form.inputs.name.text.tooltip }}
            +e.LABEL(for="input-email" :class="{'isFocus': form.inputs.email.focus,'isError': form.inputs.email.error}").input--main.input__
                input(
                name="email" id="input-email"
                v-model="form.inputs.email.value"
                @focus="form.inputs.email.focus = true"
                @blur="form.inputs.email.value.length === 0 ? form.inputs.email.focus = false : ''")
                +e.label {{ form.inputs.email.text.label }}
                +e.tooltip {{ form.inputs.email.text.tooltip }}
            +e.LABEL(for="input-phone" :class="{'isFocus': form.inputs.phone.focus,'isError': form.inputs.phone.error}").input--main.input__.--no-radius
                input(name="phone" type="tel" id="input-phone"
                v-model="form.inputs.phone.value"
                @focus="form.inputs.phone.focus = true"
                @blur="form.inputs.phone.value.length === 0 ? form.inputs.phone.focus = false : ''")
                +e.label {{ form.inputs.phone.text.label }}
                +e.tooltip {{ form.inputs.phone.text.tooltip }}
            +e.LABEL(for="textarea" :class="{'isFocus': form.inputs.message.focus,'isError': form.inputs.message.error}").textarea--main.textarea__
                textarea(name="text" id="textarea"
                v-model="form.inputs.message.value"
                @focus="form.inputs.message.focus = true"
                @blur="form.inputs.message.value.length === 0 ? form.inputs.message.focus = false : ''")
                +e.label {{ form.inputs.message.text.label }}
                +e.tooltip {{ form.inputs.message.text.tooltip }}
            +e.BUTTON(type="button" v-on:click="sendForm").button--main.button__.--primary.--blue
                span {{ text.submit }}
                +e.DIV.wrapper
                .ui-icon.ui-icon--plane
            +e.privacy--main {{ text.privacy.description }}
                +e.ROUTER-LINK(:to="text.privacy.link.url" v-html="text.privacy.link.name")
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
                            email: {
                                value: "",
                                focus: false,
                                error: false
                            },
                            phone: {
                                value: "",
                                focus: false,
                                error: false
                            },
                            message: {
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
                    title: "If you have a question - write to us!",
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
                obj.form.inputs.message.text = {
                    tooltip: "Enter message",
                    label: "Message"
                };
                obj.form.inputs.email.text = {
                    tooltip: "Enter email",
                    label: "Email"
                };
            } else {
                obj.text = {
                    title: "Если у вас возник вопрос — напишите нам!",
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
                obj.form.inputs.message.text = {
                    tooltip: "Введите сообщение",
                    label: "Сообщение"
                };
                obj.form.inputs.email.text = {
                    tooltip: "Введите почту",
                    label: "Email"
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

                if (this.checkInputTextEmpty(this.form.inputs.email.value)) {
                    this.form.inputs.email.error = true;
                } else {
                    this.form.inputs.email.error = false;
                }

                if (!this.form.inputs.name.error && !this.form.inputs.phone.error) {
                    this.form.loading = true;
                    setTimeout(()=>{
                        this.clearClasses();
                    },1)
                    axios({
                        method: 'post',
                        url: '/send-form-question',
                        data: {
                            name: this.form.inputs.name.value,
                            phone: this.form.inputs.phone.value,
                            message: this.form.inputs.message.value,
                            email: this.form.inputs.email.value
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
                                this.form.inputs.message.value = "";
                                this.form.inputs.email.value = "";
                                this.form.inputs.name.focus = false;
                                this.form.inputs.phone.focus = false;
                                this.form.inputs.email.focus = false;
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
            }
        }
    }
</script>
