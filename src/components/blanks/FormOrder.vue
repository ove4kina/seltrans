<template lang="pug">
    include ../../tools/mixins.pug
    +b.FORM.form__.--main(:class="{'send' : form.response,'loading' : form.loading}" ref="form")
        +e.body--main
            +e.text--main.text--form-main
                h3 {{ text.title }}
                p {{ text.description }}
            +e.LABEL(for="input-name" :class="{'isFocus': form.inputs.name.focus,'isError': form.inputs.name.error}").input--main.input__
                input(
                name="name" id="input-name"
                v-model="form.inputs.name.value"
                @focus="form.inputs.name.focus = true"
                @blur="form.inputs.name.value.length === 0 ? form.inputs.name.focus = false : ''")
                +e.label {{ form.inputs.name.text.label }}
                +e.tooltip {{ form.inputs.name.text.tooltip }}
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
            +e.upload--main.upload__(:class="{'isLoading':fileUpload.loading, 'isError': fileUpload.error, 'isLoaded': fileUpload.loaded}")
                +e.title {{ text.appendFile }}
                +e.body
                    +e.LABEL(for="upload").button {{ text.chooseFile }}
                    +e.text-toggle {{ fileUpload.fileName !== ''  ? fileUpload.fileName: text.fileNotChoose}}
                        svg(xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12")
                            g(fill="none" fill-rule="evenodd")
                                circle(cx="6" cy="6" r="5" stroke="#E0E0E0" class="upload-bottom")
                                circle(cx="6" cy="6" r="5" stroke="#292929" class="upload-loader" ref="fileLoader")
                        +e.remove(v-on:click="resetUpload")
                +e.description {{ text.fileMaxSize }}
                input(type="file" id="upload" @change="processFile($event)")
            +e.BUTTON(type="button" v-on:click="sendForm").button--main.button__.--primary.--blue
                span {{ text.submit }}
                +e.DIV.wrapper
                .ui-icon.ui-icon--plane
            +e.privacy--main {{ text.privacy.description }}
                +e.ROUTER-LINK(:to="text.privacy.link.url" v-html="text.privacy.link.name")
        +e.image
            img(src="https://placeimg.com/720/800/any" alt="")
        +e.close
            span
                span
                span
            span
        +e.response--main.text--response(v-html="text.success")

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
    import {TweenMax} from 'gsap';
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
                            },
                            message: {
                                value: "",
                                focus: false,
                                error: false
                            },
                            file: {
                                value: ""
                            }
                        },
                        response: false,
                        loading: false,
                    },
                    fileUpload :{
                        loading: false,
                        error: false,
                        loaded: false,
                        fileName: ''
                    },
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
                    submit: "Send",
                    appendFile: 'Append File',
                    chooseFile: 'Choose File',
                    fileNotChoose: 'File not chosen',
                    fileMaxSize: 'Max file size — 10 Mb',
                    success: '<p class="bold">Your application is accepted!</p>'
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
            } else {
                obj.text = {
                    title: "Оставить заявку",
                    description: "Технический специалист перезвонит вам и поможет составить грамотное техническое задание.",
                    privacy: {
                        description: "Нажимая кнопку «Отправить», вы даете свое согласие на обработку персональных данных в соответствии с",
                        link: {
                            name: "&nbspполитикой конфиденциальности.",
                            url: "/ru/privacy"
                        }
                    },
                    submit: "Отправить",
                    appendFile: 'Прикрепить файл',
                    chooseFile: 'Выбрать файл',
                    fileNotChoose: 'Файл не выбран',
                    fileMaxSize: 'Максимальный размер файлов — 10 Мб',
                    success: '<p class="bold">Ваша заявка принята!</p><p>Мы рассмотрим вашу задачу в течении 24 часов с момента отправки данного сообщения.</p>'
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
                        url: '/send-form-order',
                        data: {
                            name: this.form.inputs.name.value,
                            phone: this.form.inputs.phone.value,
                            message: this.form.inputs.message.value,
                            file: this.form.inputs.file.value
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

            resetUpload() {
                this.fileUpload = {
                    loading: false,
                    error: false,
                    loaded: false,
                    fileName: ''
                }
            },

            drawLoading(percent){
                let stroke = (1 - percent/100)*32;
                TweenMax.to(this.$refs.fileLoader, 0.3,
                    {
                        strokeDashoffset: stroke,
                        ease: Power1.easeOut
                    }
                );
            },

            processFile(event) {

                let file = event.target.files[0],
                    reader = new FileReader(),
                    $event = event;

                if(file.size > 10000000) {
                    this.fileUpload.loading = false;
                    this.fileUpload.error = true;
                    this.fileUpload.loaded = false;
                    return;
                }

                reader.readAsDataURL(file);

                this.fileUpload.fileName = file.name;
                reader.onload = () => {
                    this.form.inputs.file.value = reader.result;
                };

                reader.onloadstart = () => {
                    this.fileUpload.loading = true;
                    this.fileUpload.error = false;
                    this.fileUpload.loaded = false;
                };

                reader.onloadend = () => {
                    setTimeout(() => {
                        this.fileUpload.loading = false;
                        this.fileUpload.error = false;
                        this.fileUpload.loaded = true;
                    },1000);
                };

                reader.onerror = () => {
                    this.fileUpload.loading = false;
                    this.fileUpload.error = true;
                    this.fileUpload.loaded = false;
                };

                reader.onprogress = (data) => {
                    if (data.lengthComputable) {
                        let progress = parseInt( ((data.loaded / data.total) * 100), 10 );
                        this.drawLoading(progress);
                    }
                }
            },
        }
    }
</script>
