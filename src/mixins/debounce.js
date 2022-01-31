export const debounce = {
    methods: {
        debounce(callback, time) {
            let timeout;
            return function () {
                let context = this;
                let args = arguments;
                if (timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(function () {
                    timeout = null;
                    callback.apply(context, args);
                }, time);
            }
        },
    }
};