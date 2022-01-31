export const howManyInViewPort = {
    methods: {
        howManyInViewPort(el) {
            let rect = el.getBoundingClientRect(),
                top = rect.top,
                percent = top / window.innerHeight;
            if (percent < 0) {
                return (1 + percent)
            } else {
                return (1 - percent)
            }
        }
    }
};