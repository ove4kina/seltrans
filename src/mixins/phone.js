export const phone = {
    methods: {
        clearPhone(phone) {
            if (typeof phone !== 'undefined')
                return 'tel:' + phone.replace(/\D/g, '');
            return '';
        }
    }
};