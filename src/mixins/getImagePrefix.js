export const getImagePrefix = {
    data() {
        return {
            imgPrefix: 'desktop'
        };
    },
    mounted() {

        this.imgPrefix = this.getImagePrefix();

    },
    methods: {
        getImagePrefix() {
            if (typeof window !== 'undefined') {
                return this.clientDetectPrefix();

            } else {
                return this.serverDetectPrefix();

            }
        },
        clientDetectPrefix() {
            let viewPortWidth = 0;
            if (typeof window !== "undefined") {
                viewPortWidth = window.innerWidth;
                if (viewPortWidth < 1200) {
                    return "mobile";
                }
            }
            return "desktop";
        },
        serverDetectPrefix() {
            let device = document.head.querySelector("[property=device]").content;
            if (device === 'tablet')
                device = 'mobile';

            return device;
        },

    }
};