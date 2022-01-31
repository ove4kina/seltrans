import axios from 'axios'

export const editText = {
    data() {
        let page = this.$router.currentRoute.meta.type,
            url = this.$router.currentRoute.params.url,
            pageType = null;
        if (page === 'main') {
            page = 'index'
        }

        if (page === 'article') {
            pageType = 'article';
            page = 'blog';
        }

        if (page === 'products-list') {
            page = 'products/' + this.$router.currentRoute.params.category;
        }

        if (page === 'product') {
            pageType = 'article';
            page = 'products/' + this.$router.currentRoute.params.category;

            url = this.$router.currentRoute.params.product;
        }

        return {
            language: this.$router.currentRoute.meta.language,
            page: page,
            pageType: pageType,
            url: url,
            loginIn: false,
            previousValues: {},
            currentInputKey: '',
            currentInputIndex: 0,
            currentInputTarget: '',
            currentInputType: '',

            currentRealTarget: null,
            positionRealTarget: 0,

            timeOutTyping: null,

            glvrdOn: false,
            glvrd: {},
            spellerOn: false,
            speller: {}
        }
    },
    mounted() {

        // axios({
        //     method: 'POST',
        //     url: '/authStatus'
        // })
        //     .then((response) => {
        //         this.loginIn = response.data.status;
        //
        //         if (!this.loginIn) {
        //             let swipers = document.querySelectorAll('.medium-insert-images');
        //             // console.log(swipers)
        //             swipers.forEach((swiper) => {
        //                 if (swiper.children.length > 1) {
        //                     if (swiper.classList.value === 'medium-insert-images' || swiper.classList.value === 'medium-insert-images medium-insert-images-grid') {
        //
        //                         let tempHtml = swiper.innerHTML;
        //                         tempHtml = tempHtml.replace(/<figure[^>]*>/g, '<figure class="swiper-slide">');
        //
        //                         swiper.innerHTML = '<div class="swiper-wrapper">' + tempHtml + '</div>';
        //
        //                         new Swiper(swiper, {
        //                             // loop: true,
        //                             centeredSlides: true,
        //                             breakpoints: {
        //                                 599: {
        //                                     slidesPerView: 1.14,
        //                                 },
        //                                 1199: {
        //                                     slidesPerView: 1.4,
        //                                 },
        //                                 9999: {
        //                                     slidesPerView: 2,
        //                                 }
        //                             }
        //                         });
        //                     }
        //                 }
        //             })
        //         }
        //     })
        //     .catch(function (error) {
        //         // console.log(error)
        //     });


    },
    methods: {
        onAdminPanelClick(value) {
            switch (value.type) {
                case 'firstStateText':
                    this.onFirstStateText();
                    break;
                case 'previousStateText':
                    this.onPreviousStateText();
                    break;
                case 'nextStateText':
                    this.onNextStateText();
                    break;
                case 'glvrdApiProofread':
                    this.spellerOn = false;
                    this.glvrdOn = true;
                    this.glvrdApiProofread();
                    break;
                case 'yandexSpellerApi':
                    this.spellerOn = true;
                    this.glvrdOn = false;
                    this.yandexSpellerApi();
                    break;
            }
        },

        onFirstStateText() {
            if (this.currentInputKey !== '' && Array.isArray(this.previousValues[this.currentInputKey])) {
                switch (this.currentInputType) {
                    case 'textJson':
                        this.currentInputTarget.innerText = this.previousValues[this.currentInputKey][0];
                        this.setTextJson(this.previousValues[this.currentInputKey][0], this.language, this.page, this.currentInputKey);
                        break;
                    case 'htmlJson':
                        this.currentInputTarget.innerHTML = this.previousValues[this.currentInputKey][0];
                        this.setHtmlJson(this.previousValues[this.currentInputKey][0], this.language, this.page, this.currentInputKey);
                        break;
                    case 'constantsJson':
                        this.currentInputTarget.innerText = this.previousValues[this.currentInputKey][0];
                        this.setConstantsJson(this.previousValues[this.currentInputKey][0], this.language, this.page, this.currentInputKey);
                        break;
                }
            }
        },

        onPreviousStateText() {
            this.currentInputIndex--;
            if (this.currentInputKey !== '' && this.currentInputIndex >= 0) {
                switch (this.currentInputType) {
                    case 'textJson':
                        this.currentInputTarget.innerText = this.previousValues[this.currentInputKey][this.currentInputIndex];
                        this.setTextJson(this.previousValues[this.currentInputKey][this.currentInputIndex], this.language, this.page, this.currentInputKey);
                        break;
                    case 'htmlJson':
                        this.currentInputTarget.innerHTML = this.previousValues[this.currentInputKey][this.currentInputIndex];
                        this.setHtmlJson(this.previousValues[this.currentInputKey][this.currentInputIndex], this.language, this.page, this.currentInputKey);
                        break;
                    case 'constantsJson':
                        this.currentInputTarget.innerText = this.previousValues[this.currentInputKey][this.currentInputIndex];
                        this.setConstantsJson(this.previousValues[this.currentInputKey][this.currentInputIndex], this.language, this.page, this.currentInputKey);
                        break;
                }
            } else if (this.currentInputKey !== '') {
                this.currentInputIndex = 0;
            }
        },

        onNextStateText() {
            this.currentInputIndex++;
            if (this.currentInputKey !== '') {
                if (this.previousValues[this.currentInputKey].length - 1 >= this.currentInputIndex) {
                    switch (this.currentInputType) {
                        case 'textJson':
                            this.currentInputTarget.innerText = this.previousValues[this.currentInputKey][this.currentInputIndex];
                            this.setTextJson(this.previousValues[this.currentInputKey][this.currentInputIndex], this.language, this.page, this.currentInputKey);
                            break;
                        case 'htmlJson':
                            this.currentInputTarget.innerHTML = this.previousValues[this.currentInputKey][this.currentInputIndex];
                            this.setHtmlJson(this.previousValues[this.currentInputKey][this.currentInputIndex], this.language, this.page, this.currentInputKey);
                            break;
                        case 'constantsJson':
                            this.currentInputTarget.innerText = this.previousValues[this.currentInputKey][this.currentInputIndex];
                            this.setConstantsJson(this.previousValues[this.currentInputKey][this.currentInputIndex], this.language, this.page, this.currentInputKey);
                            break;
                    }
                } else {
                    this.currentInputIndex = this.previousValues[this.currentInputKey].length - 1;
                }
            }
        },

        editTextJson(event, valueInit, key, length = 0) {
            if (!this.loginIn) return;
            clearTimeout(this.timeOutTyping);
            this.timeOutTyping = setTimeout(() => {
                // console.log(event);

                let value = event.target.innerText;
                if (value.length > length && length !== 0) {
                    this.showBoxNotification('Максимальный размер текста: ' + length + ' символов', 'error');
                    return;
                }

                if (event.type !== 'click') {
                    value = this.deleteErrors(value);
                    if (!Array.isArray(this.previousValues[key])) {
                        this.previousValues[key] = [valueInit];
                    }
                    this.previousValues[key].push(value);

                    this.currentInputTarget = event.target;
                    this.currentInputIndex = this.previousValues[key].length - 1;
                    this.currentInputKey = key;
                    this.currentInputType = 'textJson';

                    if (this.pageType === 'article') {
                        this.editArticleJson(value, this.language, key);
                    } else {
                        this.setTextJson(value, this.language, this.page, key);
                    }

                    if (this.glvrdOn) {
                        this.glvrdApiProofread();
                    }
                    if (this.spellerOn) {
                        this.yandexSpellerApi();
                    }
                }
            }, 1000);
        },

        clickTextField(event, valueInit, key, type) {

            if (!this.loginIn) return;
            //для предыдущих значений
            if (!Array.isArray(this.previousValues[key])) {
                this.previousValues[key] = [valueInit];
            }

            //проверка на вывод бокса с ошибкой
            if (event.target.className.indexOf('editor-red') !== -1) {
                this.showBox(event);
            }

            this.currentRealTarget = event.target;
            if (event.target.childNodes.length > 1) {
                this.positionRealTarget = this.getCaretPos(event.target);
                for (let i = 0; i < event.target.childNodes.length; i++) {
                    if (event.target.childNodes[i] === event.target) {
                        // this.positionRealTarget += 1;
                    }
                }
            } else {
                this.positionRealTarget = this.getCaretPos(event.target);
            }

            this.setParentTarget(event);

            this.currentInputKey = key;
            this.currentInputType = type;

            if (type === 'htmlJson') {
                this.editHtmlJson(event, valueInit, key);
            }
        },

        setParentTarget(event) {
            event.path.map((item) => {
                if (typeof item.className !== 'undefined') {
                    if (item.className.indexOf('medium-editor-element') !== -1) {
                        this.currentInputTarget = item;
                    }
                }

            });
        },

        setTextJson(value, language, page, key) {
            axios({
                method: 'POST',
                url: '/api/editJson',
                data: {
                    value: value,
                    language: language,
                    page: page,
                    key: key
                }
            })
                .then(function (response) {
                    // return response.data;
                    // console.log(response.data)
                })
                .catch(function (error) {
                    // console.log(error)
                });
        },

        editHtmlJson(event, valueInit, key, length = 0) {
            if (!this.loginIn) return;
            // this.currentRealTarget = event.target;
            this.positionRealTarget = this.getCaretPos(event.target);
            clearTimeout(this.timeOutTyping);
            this.timeOutTyping = setTimeout(() => {
                //event.target.className.indexOf('editable-full') - принудительный клик из medium для вызова изменнеия на удаление фотки
                if (event.type !== 'click' || event.target.className.indexOf('editable-full') !== -1) {
                    this.setParentTarget(event);
                    let value = this.currentInputTarget.innerHTML,
                        textValue = this.currentInputTarget.innerText;
                    value = this.deleteErrors(value);
                    if (textValue.length > length && length !== 0) {
                        this.showBoxNotification('Максимальный размер текста: ' + length + ' символов', 'error');
                        return;
                    }

                    if (this.pageType === 'article') {
                        this.editArticleJson(value, this.language, key);
                    } else {
                        this.setTextJson(value, this.language, this.page, key);
                    }


                    if (event.type !== 'click') {
                        if (!Array.isArray(this.previousValues[key])) {
                            this.previousValues[key] = [valueInit];
                        }
                        this.previousValues[key].push(value);

                        // this.currentInputTarget = event.target;
                        this.currentInputIndex = this.previousValues[key].length - 1;
                        this.currentInputKey = key;
                        this.currentInputType = 'htmlJson';


                        // setTimeout(() => {
                        if (this.glvrdOn) {
                            this.glvrdApiProofread();
                        }
                        if (this.spellerOn) {
                            this.yandexSpellerApi();
                        }
                        // },1000)

                    }
                }
            }, 1000);

        },

        setHtmlJson(value, language, page, key) {
            axios({
                method: 'POST',
                url: '/api/editJson',
                data: {
                    value: value,
                    language: language,
                    page: page,
                    key: key
                }
            })
                .then(function (response) {
                    // console.log(response.data)
                }).catch(function (error) {
                // console.log(error)
            });
        },

        editConstantJson(event, valueInit, key, length = 0) {
            if (!this.loginIn) return;
            let value = event.target.innerText;
            if (value.length > length && length !== 0) {
                return;
            }

            if (event.type !== 'click') {
                if (!Array.isArray(this.previousValues[key])) {
                    this.previousValues[key] = [valueInit];
                }
                this.previousValues[key].push(value);

                this.currentInputIndex = this.previousValues[key].length - 1;
                this.setConstantsJson(value, this.language, this.page, key);
            }

            this.currentInputKey = key;
            this.currentInputTarget = event.target;
            this.currentInputType = 'constantsJson';
        },

        setConstantsJson(value, language, page, key) {
            axios({
                method: 'POST',
                url: '/api/editConstantJson',
                data: {
                    value: value,
                    language: language,
                    page: page,
                    key: key
                }
            })
                .then(function (response) {
                    // console.log(response.data)
                })
                .catch(function (error) {
                    // console.log(error)
                });
        },

        glvrdApiProofread() {
            document.getElementById('box').innerHTML = '';
            if (this.currentInputTarget !== '') {
                this.currentInputTarget.innerHTML = this.deleteErrors(this.currentInputTarget.innerHTML);
                window.glvrd.getStatus((result) => {
                    if (result.status === 'ok') {
                        window.glvrd.proofread(this.currentInputTarget.innerHTML, (result) => {
                            if (result.status === 'ok') {
                                let tempInnerText = this.currentInputTarget.innerHTML,
                                    diffClassError = 0;
                                this.glvrd = result;

                                if (result.fragments.length === 0) {
                                    this.showBoxNotification('Нет ошибок', 'success');
                                } else {
                                    result.fragments.map((fragment, index) => {
                                        let cut = tempInnerText.substring(fragment.start + diffClassError, fragment.end + diffClassError),
                                            cutFormatted;
                                        cutFormatted = '<em class="editor-red" data-key="' + index + '">';
                                        cut = cutFormatted + cut + '</em>';
                                        tempInnerText = this.removeFromTo(fragment.start + diffClassError, fragment.end + diffClassError, tempInnerText, cut);

                                        // +5 = </em>
                                        diffClassError += cutFormatted.length + 5;
                                    });
                                }
                                this.currentInputTarget.innerHTML = tempInnerText;

                                this.setCursor(this.currentRealTarget, this.positionRealTarget);
                            } else {
                                // console.log(result.message);
                            }
                        });

                        window.glvrd.proofread(this.currentInputTarget.innerText, (result) => {
                            if (result.status === 'ok') {
                                let score = document.getElementById('glvrd-score');
                                score.innerHTML = result.score;
                            }
                        });
                    }
                });
            }
        },

        yandexSpellerApi() {
            document.getElementById('box').innerHTML = '';
            let value = this.deleteErrors(this.currentInputTarget.innerHTML);
            //format= html||plain
            // axios({
            //     method: 'POST',
            //     url: 'https://speller.yandex.net/services/spellservice.json/checkText?format=html&lang=ru&text=' + encodeURIComponent(value)
            // })
            const params = new URLSearchParams();
            params.append('text', value);
            params.append('format', 'html');
            params.append('lang', 'ru');
            axios.post('https://speller.yandex.net/services/spellservice.json/checkText', params)
                .then((response) => {
                    this.speller = {
                        status: 'ok',
                        data: response.data
                    };
                    let tempInnerText = this.deleteErrors(this.currentInputTarget.innerHTML),
                        diffClassError = 0;
                    if (response.data.length === 0) {
                        this.showBoxNotification('Нет ошибок', 'success');
                    } else {
                        response.data.map((fragment, index) => {
                            let code;
                            switch (fragment.code) {
                                case 1:
                                    code = 'Слова нет в словаре';
                                    break;
                                case 2:
                                    code = 'Повтор слова';
                                    break;
                                case 3:
                                    code = 'Неверное употребление прописных и строчных букв';
                                    break;
                                case 4:
                                    code = 'Текст содержит слишком много ошибок.';
                                    break;
                            }
                            let cut = tempInnerText.substring(fragment.pos + diffClassError, fragment.pos + fragment.len + diffClassError),
                                cutFormatted;
                            cutFormatted = '<em class="editor-red" data-key="' + index + '">';
                            cut = cutFormatted + cut + '</em>';
                            tempInnerText = this.removeFromTo(fragment.pos + diffClassError, fragment.pos + fragment.len + diffClassError, tempInnerText, cut);
                            // // +5 = </em>
                            diffClassError += cutFormatted.length + 5;
                        });
                    }
                    this.currentInputTarget.innerHTML = tempInnerText;
                })
                .catch((error) => {
                    this.showBoxNotification('Сервис не доступен', 'error');
                    // return '404';
                });
        },

        showBox(event) {
            let key = event.target.dataset.key,
                box = document.getElementById('box'),
                render = '';
            box.innerHTML = '';
            if (this.glvrd.status === 'ok' && this.glvrdOn) {
                if (typeof this.glvrd.fragments[key] !== 'undefined') {
                    let glvrd = this.glvrd.fragments[key];
                    render += '<p>Главред</p>';
                    render += '<p>' + glvrd.hint.name + '</p>';
                    render += '<p>' + glvrd.hint.description + '</p>';
                    render += '<p>Штраф: ' + glvrd.hint.penalty + '</p>';
                    render += '<p>Вес: ' + glvrd.hint.weight + '</p>';
                    render += '<a href="' + glvrd.url + '" target="_blank">Главред</a>';
                }
            }

            if (this.speller.status === 'ok' && this.spellerOn) {
                let speller = this.speller.data[key];
                if (typeof speller !== 'undefined') {
                    render += '<p>Яндекс Speller</p>';
                    render += '<p>Варианты: ';
                    render += speller.s.join(', ');
                    render += '</p>';
                }
            }

            if (this.glvrd.status === 'ok' || this.speller.status === 'ok') {
                render = '<div class="glvrd-box">' + render + '</div>';
                box.innerHTML = render;
            }
        },

        showBoxNotification(message, type) {
            let box = {};
            switch (type) {
                case 'error':
                    box = document.getElementById('error-box');
                    box.innerHTML = message;
                    box.classList.add('active');
                    setTimeout(() => {
                        box.classList.remove('active');
                    }, 4000);
                    break;
                case 'success':
                    box = document.getElementById('success-box');
                    box.innerHTML = message;
                    box.classList.add('active');
                    setTimeout(() => {
                        box.classList.remove('active');
                    }, 4000);
                    break;
            }
        },

        removeFromTo(pos, end, str, strIn) {
            let beforeSubStr = str.substring(0, pos);
            let afterSubStr = str.substring(end, str.length);
            return beforeSubStr + strIn + afterSubStr;
        },

        setCursor(el, position) {
            let root = document.querySelector('.editable-full');

            if (root.childNodes !== null) {
                root.childNodes.forEach((node, index) => {
                    if (node.innerText === el.innerText) {
                        // console.log('in', el, node, '||||||||||||', index, position);

                        let range = document.createRange(),
                            sel = window.getSelection(),
                            flagInError = false;

                        if (node.childNodes.length > 1) {
                            let innerTextCount = 0;
                            node.childNodes.forEach((nodeError) => {
                                let length = 0,
                                    type = '';

                                if (typeof nodeError.innerText !== 'undefined') {
                                    length += nodeError.innerText.length;
                                    type = 'node';
                                } else {
                                    length += nodeError.length;
                                    type = 'text';
                                }

                                innerTextCount += length;
                                let positionNodeError = position - (innerTextCount - length);

                                if (innerTextCount >= position && !flagInError && type === 'text') {
                                    flagInError = true;

                                    range.setStart(nodeError, positionNodeError);
                                    range.collapse(false);
                                    sel.removeAllRanges();
                                    sel.addRange(range);
                                } else if (innerTextCount >= position && !flagInError && type === 'node') {
                                    flagInError = true;

                                    range.setStart(nodeError.childNodes[0], positionNodeError);
                                    range.collapse(false);
                                    sel.removeAllRanges();
                                    sel.addRange(range);
                                }
                            })
                        } else {
                            range.setStart(node.childNodes[0], position);
                            range.collapse(false);
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }

                    }
                });
            }
        },

        getCaretPos(element) {
            element.focus();
            if (document.selection) {
                let sel = document.selection.createRange();
                let clone = sel.duplicate();
                sel.collapse(true);
                clone.moveToElementText(element);
                clone.setEndPoint('EndToEnd', sel);
                return clone.text.length;
            } else {
                return window.getSelection().getRangeAt(0).startOffset;
            }
            return 0;
        },

        deleteErrors(value) {
            let $data = $('<div />').html(value);
            $data.find('.medium-insert-buttons').remove();
            $data.find('.medium-insert-active').removeClass('medium-insert-active');

            // Restore original embed code from embed wrapper attribute value.
            $data.find('[data-embed-code]').each(function () {
                let $this = $(this),
                    html = $('<div />').html($this.attr('data-embed-code')).text();
                $this.html(html);
            });
            value = $data.html();
            value = value.replace(/contenteditable="true"/g, '');
            value = value.replace(/contenteditable="false"/g, '');
            value = value.replace(/<em[^>]*>|<\/em>/g, '');
            return value;
        },

        editArticleJson(value, language, key) {
            let page = this.page,
                url = this.url;
            axios({
                method: 'POST',
                url: '/api/editArticleJson',
                data: {
                    value: value,
                    language: language,
                    page: page,
                    url: url,
                    key: key
                }
            })
                .then(function (response) {
                    // return response.data;
                    // console.log(response.data)
                })
                .catch(function (error) {
                    // console.log(error)
                });
        },
    }
};