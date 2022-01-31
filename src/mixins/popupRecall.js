export const popupRecall = {
    data() {
        return {
            recall: {
                status: false
            }
        }
    },
    methods: {
        openPopupRecall(value) {
            if (value === 'openPopupRecall') {
                this.recall.status = !this.recall.status;
            }
        },
        closePopupRecall(value) {
            if (value === 'closePopupRecall') {
                this.recall.status = false;
            }
        }
    }
};