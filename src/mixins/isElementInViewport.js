export const isElementInViewport = {
    methods: {
        isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
            const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
            return (vertInView);
        },
        isElementInViewportFull(el) {
            let rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document. documentElement.clientWidth)
            );
        }
    }
};