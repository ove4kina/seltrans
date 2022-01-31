export const preventScrollPage = {
    data() {
        return {
            keys: {37: 1, 38: 1, 39: 1, 40: 1}
        }
    },
    methods: {
        preventDefault(e) {
            // e.deltaY = 0;
            e = e || window.event;
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = false;
        },

        preventDefaultForScrollKeys(e) {
            if (this.keys[e.keyCode]) {
                this.preventDefault(e);
                return false;
            }
        },

        disableScroll() {
            if (window.addEventListener) // older FF
                window.addEventListener('DOMMouseScroll', this.preventDefault, false);
            window.onwheel = this.preventDefault; // modern standard
            window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
            window.ontouchmove  = this.preventDefault; // mobile
            document.onkeydown  = this.preventDefaultForScrollKeys;
        },
        enableScroll() {
            if (window.removeEventListener)
                window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
            window.onmousewheel = document.onmousewheel = null;
            window.onwheel = null;
            window.ontouchmove = null;
            document.onkeydown = null;
        }
    }
};