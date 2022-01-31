export const clearClasses = {
    methods: {
        clearClasses(){
            this.$refs.form.classList.remove('_animated');
            this.$refs.form.classList.remove('_animated--trf');
        },
    }
};