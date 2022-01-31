export const normalizeWheel = {
    data() {
        return {
            wheelData: {
                pixelStep: 10,
                lineHeight: 40,
                pageHeight: 800
            }
        }
    },
    methods: {
        normalizeWheel(/*object*/ event) /*object*/ {
            let sX = 0, sY = 0, // spinX, spinY
                pX = 0, pY = 0; // pixelX, pixelY

            // Legacy
            if ('detail' in event) {
                sY = event.detail;
            }
            if ('wheelDelta' in event) {
                sY = -event.wheelDelta / 120;
            }
            if ('wheelDeltaY' in event) {
                sY = -event.wheelDeltaY / 120;
            }
            if ('wheelDeltaX' in event) {
                sX = -event.wheelDeltaX / 120;
            }

            // side scrolling on FF with DOMMouseScroll
            if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
                sX = sY;
                sY = 0;
            }

            pX = sX * this.wheelData.pixelStep;
            pY = sY * this.wheelData.pixelStep;

            if ('deltaY' in event) {
                pY = event.deltaY;
            }
            if ('deltaX' in event) {
                pX = event.deltaX;
            }

            if ((pX || pY) && event.deltaMode) {
                if (event.deltaMode === 1) { // delta in LINE units
                    pX *= this.wheelData.lineHeight;
                    pY *= this.wheelData.lineHeight;
                } else { // delta in PAGE units
                    pX *= this.wheelData.pageHeight;
                    pY *= this.wheelData.pageHeight;
                }
            }

            // Fall-back if spin cannot be determined
            if (pX && !sX) {
                sX = (pX < 1) ? -1 : 1;
            }
            if (pY && !sY) {
                sY = (pY < 1) ? -1 : 1;
            }

            return {
                spinX: sX,
                spinY: sY,
                pixelX: pX,
                pixelY: pY
            };
        }
    }
};


