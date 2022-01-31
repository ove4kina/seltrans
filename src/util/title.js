function getTitle(vm) {
    const {title} = vm.$options;
    if (title) {
        return typeof title === 'function'
            ? title.call(vm)
            : title
    }
}

function getMeta(vm) {
    const {meta} = vm.$options;
    if (meta) {
        return typeof meta === 'function'
            ? meta.call(vm)
            : meta
    }
}

function getLanguage(vm) {
    const {language} = vm.$options;
    if (language) {
        return typeof language === 'function'
            ? language.call(vm)
            : language
    }
}

function getBrowser(vm) {
    const {browser} = vm.$options;
    if (browser) {
        return typeof browser === 'function'
            ? browser.call(vm)
            : browser
    }
}

const serverTitleMixin = {
    created() {
        const title = getTitle(this);
        const meta = getMeta(this);
        const browser = getBrowser(this);

        if (typeof title !== 'undefined') {
            this.$ssrContext.title = `${this.$ssrContext.title} | ${title}`
        }

        if (typeof meta !== 'undefined') {
            this.$ssrContext.meta = `${meta}`
        }
        if (typeof browser !== 'undefined') {
            this.$ssrContext.browser = `${browser}`
        }
    }
};

const clientTitleMixin = {
    mounted() {
        const title = getTitle(this);
        if (typeof title !== 'undefined') {
            let prefix = '';

            if(this.$router.currentRoute.meta.language === 'en') {
                prefix = 'S-Electrotransport'
            } else {
                prefix = 'С-Электротранспорт'
            }
            document.title = `${prefix} | ${title}`
        }
    }
};

export default process.env.VUE_ENV === 'server'
    ? serverTitleMixin
    : clientTitleMixin
