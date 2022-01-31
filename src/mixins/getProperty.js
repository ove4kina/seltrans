export const getProperty = {
    methods: {
        getProperty(style, selector) {
            for (let i = 0; i < document.styleSheets.length; i++) {
                let mysheet = document.styleSheets[i];
                let myrules = mysheet.cssRules ? mysheet.cssRules : mysheet.rules;
                for (let j = 0; j < myrules.length; j++) {
                    if (myrules[j].selectorText && myrules[j].selectorText.toLowerCase() === selector) {
                        return myrules[j].style[style];
                    }
                }

            }
        }
    }
};