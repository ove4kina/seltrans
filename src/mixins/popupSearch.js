import Articles from '../../content/articles';
import axios from 'axios'

export const popupSearch = {
    data() {
        return {
            language: this.$router.currentRoute.meta.language,
            popupSearch: {
                status: false,

                search: {
                    value: '',
                    articles: []
                }
            }
        }
    },
	mounted(){
		if (window.innerWidth >=1200){
			this.barWidth = this.getBarWidth();
		}
	},
    methods: {
        open() {
            this.popupSearch.status = true;
	        if(window.innerWidth >=1200){
		        this.preventScrollSearch();
	        }
        },

        close() {
            this.popupSearch.status = false;
            if(window.innerWidth >=1200){
	            this.enableScrollSearch();
            }

            setTimeout(() => {
                this.popupSearch.search = {
                    value: '',
                    articles: []
                };
            }, 500)
        },

        search(values) {
            let articlesTemp = [],
                formattedText = '',
                statusName = false,
                statusDescription = false,
                description = '',
                descriptionJson = '',
                descriptionCount = 0;

            values = values.split(' ');

            this.popupSearch.search.articles = [];

            if (this.language === 'ru') {
                articlesTemp = Articles.ru;
            }

            articlesTemp.map((article) => {
                article.name = article.name.replace(/<span[^>]*>|<\/span>/g, '');
                article.description = '';
                article.classAnimation = false;
            });


            articlesTemp.map((article) => {
                axios({
                    method: 'GET',
                    url: '/content/blog/' + article.url.replace('/ru/blog/', '') + '/content.json'
                })
                    .then((response) => {

                        statusName = false;
                        statusDescription = false;
                        description = '';
                        descriptionJson = response.data.content.contentParts[0].text.replace(/<\/?[^>]+(>|$)/g, "");
                        descriptionCount = 0;

                        if (response.data !== '') {
                            values.map((value) => {
                                if (value !== '' && value !== ' ' && value.length > 1) {
                                    formattedText = this.searchPhraseInText(value, article.name);
                                    if (formattedText) {
                                        article.name = formattedText;
                                        statusName = true;
                                    }

                                    formattedText = this.searchPhraseInTextClosest(value, descriptionJson);
                                    if (formattedText && descriptionCount < 3) {
                                        descriptionCount++;
                                        description += formattedText;
                                    }
                                }
                            });

                            if (descriptionCount === 1) {
                                description = description.replace(/<br><br>/g, '')
                            } else if (descriptionCount > 1) {
                                let lastIndex = description.lastIndexOf('<br><br>');
                                description = description.slice(0, lastIndex) + description.slice(lastIndex).replace('<br><br>', '');
                            }


                            if (statusName || description !== '') {
                                if (description !== '') {
                                    article.description = description;
                                } else {
                                    article.description = descriptionJson.substring(0, 150) + '...';
                                }

                                article.classAnimation = true;
                                this.popupSearch.search.articles.push(article);
                            }
                        }

                    })
                    .catch(function (error) {
                        // console.log(error)
                    });
            });

            setTimeout(() => {
                let selectors = document.querySelectorAll('.search-loading');
                selectors.forEach((selector) => {
                    selector.classList.remove('search-loading');
                })
            }, 100);
        },

        searchPhraseInTextClosest(phrase, text) {
            phrase = phrase.toLowerCase();
            let position = text.toLowerCase().indexOf(phrase),
                leftCut = 0,
                rightCut = 0,
                prefixLeft = '...',
                prefixRight = '...';
            if (position !== -1) {

                leftCut = position - 70;
                if (leftCut < 0) {
                    prefixLeft = '';
                    leftCut = 0;
                }

                rightCut = position + 70;
                if (rightCut > text.length) {
                    prefixRight = '';
                    rightCut = text.length;
                }

                text = prefixLeft + text.substring(leftCut, position) +
                    '<span>' + text.substring(position, position + phrase.length) + '</span>' +
                    text.substring(position + phrase.length, rightCut) + prefixRight + '<br><br>';
                return text;
            }
            return false;
        },

        searchPhraseInText(phrase, text) {
            phrase = phrase.toLowerCase();
            let position = text.toLowerCase().indexOf(phrase);
            if (position !== -1) {
                text = text.substring(0, position) +
                    '<span>' + text.substring(position, position + phrase.length) + '</span>' +
                    text.substring(position + phrase.length, text.length);
                return text;
            }
            return false;
        },

	    preventScrollSearch(){
		    let bodyEl = document.getElementsByTagName("body")[0];
		    let menuGrids = document.querySelector('.blog-search .grid');
		    let header = document.querySelector('.header');
		    let searchClose =  document.querySelector('.header__close-search');
		    let searchOpen =  document.querySelector('.header__open-search');
		    let blogGrid =  document.querySelector('.blog .grid');
		    let menuSections = document.querySelector('.blog-search__sections');
		    let menuContent = document.querySelector('.blog-search__wrapper');

		    bodyEl.style.paddingRight = this.barWidth + 'px';
		    menuGrids.style.paddingRight = this.barWidth + 'px';
		    menuSections.style.paddingRight = this.barWidth + 'px';
		    if(this.barWidth > 0){
			    menuContent.style.marginRight = -2 + 'px';
		    }
		    header.style.paddingRight = this.barWidth + 'px';
		    searchClose.style.marginRight = this.barWidth + 'px';
		    searchOpen.style.marginRight = this.barWidth + 'px';
		    blogGrid.style.paddingRight = this.barWidth + 'px';
		    bodyEl.style.overflow = 'hidden';
	    },
	    enableScrollSearch(){
		    let bodyEl = document.getElementsByTagName("body")[0];
		    let menuGrids = document.querySelector('.blog-search .grid');
		    let header = document.querySelector('.header');
		    let searchClose =  document.querySelector('.header__close-search');
		    let searchOpen =  document.querySelector('.header__open-search');
		    let blogGrid =  document.querySelector('.blog .grid');
		    let menuContent = document.querySelector('.blog-search__wrapper');
		    let menuSections = document.querySelector('.blog-search__sections');

		    bodyEl.style.overflow = '';
		    bodyEl.style.paddingRight = 0;
		    menuGrids.style.paddingRight = 0;
		    menuSections.style.paddingRight = 0;
		    if(this.barWidth > 0){
			    menuContent.style.marginRight = 0;
		    }
		    header.style.paddingRight = 0;
		    searchClose.style.marginRight = 0;
		    searchOpen.style.marginRight = 0;
		    blogGrid.style.paddingRight = 0;

	    },
	    getBarWidth(){
		    if (typeof document !== "undefined" && typeof window !== "undefined" ) {
			    const e = document.createElement("div");
			    e.style.overflowY = "scroll";
			    e.style.width = "50px";
			    e.style.height = "50px";
			    e.style.visibility = "hidden";
			    document.body.appendChild(e);
			    let w = e.offsetWidth - e.clientWidth;
			    document.body.removeChild(e);
			    return w;
		    }
	    },

        popupSearchArticles(value) {
            switch (value.name) {
                case 'search':
                    if(this.popupSearch.search.value !== '') {
                        this.search(this.popupSearch.search.value);
                    }
                    break;
                case 'clear':
                    this.popupSearch.search = {
                        value: '',
                        articles: []
                    };
                    break;
                case 'close':
                    this.close();
                    break;
                case 'open':
                    this.open();
                    break;
            }
        }
    }
};