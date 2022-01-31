export const getRandomArbitrary = {
    methods: {
        getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
    }
};