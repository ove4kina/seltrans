export const loadVideo = {
    methods: {
        stopVideo(el){
            el.pause();
        },
        loadVideo(el){
            let video = el,
                src = video.querySelectorAll('source'),
                i = 0,
                browser = this.checkBrowser();
            if(browser === 'safari'){
                i = 1;
            }
            if(!(video.classList.contains('loaded'))){
                video.src = src[i].dataset.src;
                video.load();
                video.addEventListener("loadeddata", function(){
                    video.classList.add('loaded');
                    video.play();
                });
            } else {
                video.play();
            }
        },
        checkBrowser(){
            let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
                isChrome = !!window.chrome && !!window.chrome.webstore,
                isIE = /*@cc_on!@*/false || !!document.documentMode,
                isEdge = !isIE && !!window.StyleMedia,
                isFirefox = typeof InstallTrigger !== 'undefined';

            if(isSafari){
                return 'safari'
            } else if(isChrome){
                return 'chrome'
            } else if(isIE){
                return 'ie'
            } else  if(isEdge){
                return 'edge'
            } else  if(isFirefox){
                return 'firefox'
            } else {
                return 'other';
            }

        }
    }
};