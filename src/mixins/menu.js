export const menu = {
    data() {
        return {
            menu: {
                status: false
            }
        }
    },
    mounted(){


        if (window.innerWidth >=1200){
            this.enableScrollOverflow();
            this.barWidth = this.getBarWidth();
        }
    },
    updated(){
        if(window.innerWidth >= 1200){
            this.enableScrollOverflow();
        }
    },
    beforeUpdate(){
        setTimeout(()=>{
            this.menu.status = false;
            if(window.innerWidth >= 1200){
                this.enableScrollOverflow();
            }

        },750)

    },

    // updated() {
    //     this.menu.status = false;
    // },

    methods: {
        onOpenMenu(value){
            if (value === 'openMenu') {
            	if(window.innerWidth >=1200){
		            if (this.menu.status) {
			            this.enableScrollOverflow();
		            } else {
			            this.preventScrollOverflow();
		            }
	            }

                this.menu.status = !this.menu.status;
            }
        },
        preventScrollOverflow(){
            let bodyEl = document.getElementsByTagName("body")[0];
            let menuSections = document.querySelector('.menu__sections');
	        let menuGrids = document.querySelector('.menu .grid');
	        let menuContent = document.querySelector('.menu__content');
	        let header = document.querySelector('.header');
            let headerLanguage =  document.querySelector('.header__menu--language');
	        let search =  document.querySelector('.header__open-search');
	        let blogGrid =  '';

	        if(document.querySelectorAll('.blog').length > 0){
                blogGrid =  document.querySelector('.blog .grid');
                blogGrid.style.paddingRight = this.barWidth + 'px';
            }

            bodyEl.style.overflow = 'hidden';
            bodyEl.style.paddingRight = this.barWidth + 'px';
	        menuGrids.style.paddingRight = this.barWidth + 'px';
	        menuSections.style.paddingRight = this.barWidth + 'px';
	        menuContent.style.paddingRight = this.barWidth + 'px';
	        header.style.paddingRight = this.barWidth + 'px';
            headerLanguage.style.right = this.barWidth + 'px';
	        search.style.marginRight = this.barWidth + 'px';

            // bodyEl.style.marginRight = -this.barWidth + 'px';
        },
        enableScrollOverflow(){
	        let bodyEl = document.getElementsByTagName("body")[0];
	        let menuSections = document.querySelector('.menu__sections');
	        let menuGrids = document.querySelector('.menu .grid');
	        let menuContent = document.querySelector('.menu__content');
	        let header = document.querySelector('.header');
	        let search =  document.querySelector('.header__open-search');
	        let blogGrid =  '';
            if(document.querySelectorAll('.blog').length > 0){
                blogGrid =  document.querySelector('.blog .grid');
            }
            setTimeout(()=>{
	            bodyEl.style.overflow = '';
                bodyEl.style.paddingRight = 0;
                menuGrids.style.paddingRight = 0;
                menuSections.style.paddingRight = 0;
                menuContent.style.paddingRight = 0;
                header.style.paddingRight = 0;
	            search.style.marginRight = 0;
                if(document.querySelectorAll('.blog').length > 0){
                    blogGrid.style.paddingRight = 0;
                }
            },300);
        },
        getBarWidth(){
            if (typeof document !== "undefined" && typeof window !== "undefined" ) {
                const e = document.createElement("div");
                e.style.overflowY = "scroll";
                e.style.width = "50px";
                e.style.height = "50px";
                e.style.visibility = "hidden";
                document.body.appendChild(e);
                let w = e.offsetWidth - e.clientWidth;
                document.body.removeChild(e);
                return w;
            }
        }
    }
};