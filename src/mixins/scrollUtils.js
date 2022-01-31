export const scrollUtils = {
    data() {
        return {
            sliceStartPositions: [],
        };
    },
    mounted() {
        if (this.$refs.slice) {
            this.sliceStartPositions = this.getStartPositions(this.$refs.slice);
        }

    },
    methods: {
        howMuchCentered(el) {
            let elementOffsetTop = el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop),
                rect = el.getBoundingClientRect(),
                viewportHeight = window.innerHeight,
                k = (2*this.getScroll()[1]-2*elementOffsetTop+viewportHeight-rect.height)/(viewportHeight + rect.height);
                // k = (this.getScroll()[1] - elementOffsetTop + (viewportHeight - rect.height) / 2) / (viewportHeight - ((viewportHeight - rect.height) / 2));
            return k;
        },
        getScroll() {
            if (window.pageYOffset !== undefined) {
                return [pageXOffset, pageYOffset];
            } else {
                let sx, sy, d = document,
                    r = d.documentElement,
                    b = d.body;
                sx = r.scrollLeft || b.scrollLeft || 0;
                sy = r.scrollTop || b.scrollTop || 0;
                return [sx, sy];
            }
        },
        sliceScroll(el, start) {
            let slices = el.querySelectorAll('._slice'),
                imgs = el.querySelectorAll('img'),
                deltas = [],
                viewportHeight = window.innerHeight,
                k = this.howMuchCentered(el);

            for (let i = 0; i < start.length; i++) {
                deltas.push(start[i] / viewportHeight / 2);
            }

            for (let i = 0; i < slices.length; i++) {
                if (deltas[i] < 0) {
                    slices[i].style.transform = 'translate3d(0,' + start[i] * k + 'px,0) rotateZ(0)';
                    imgs[i].style.transform = 'translate3d(0,' + start[i] * (-k)+ 'px,0) rotateZ(0)';
                } else {
                    k = k * -1;
                    slices[i].style.transform = 'translate3d(0,' + start[i] * k + 'px,0) rotateZ(0)';
                    imgs[i].style.transform = 'translate3d(0,' + (-start[i]) * k + 'px,0) rotateZ(0)';
                }
            }
        },
        getStartPositions(el) {
            let startPositions = [],
                elements = el.querySelectorAll('._slice'),
                elementOffsetTop = el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
            for (let i = 0; i < elements.length; i++) {
                startPositions.push((elements[i].getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop)) - elementOffsetTop)
            }
            return startPositions;
        },
        isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
            const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
            return (vertInView);
        },

    }
};