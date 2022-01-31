export const transitionSlice =  {
    data() {
        return {
            animationSlice: {
                showSlices: false,
                left: false,
                right: false,
                transitioned: false,
                inited: false
            },
        }
    },
    created() {
        if(typeof window !== 'undefined'){
            if(window.innerWidth >= 1200){
                if (this.$router.pageFromAnimation === 'slice' && this.$router.history.current.meta.animation === 'slice'
                    ||
                    this.$router.pageFromAnimation === 'all' && this.$router.history.current.meta.animation === 'slice'
                    ||
                    this.$router.pageFromAnimation === 'slice' && this.$router.history.current.meta.animation === 'all'
                    ||
                    this.$router.pageFromAnimation === 'video' && this.$router.history.current.meta.animation === 'all'
                    ||
                    this.$router.pageFromAnimation === 'video' && this.$router.history.current.meta.animation === 'slice'
                    ||
                    this.$router.pageFromAnimation === 'slice' && this.$router.history.current.meta.animation === 'video'
                    ||
                    this.$router.history.current.hash === '#prevent'
                    ||
                    this.$router.history.current.meta.language !== this.$router.pageFromLanguage
                ) {
                    this.setInitStage();
                }
            }
        }

    },
    mounted() {
        if(window.innerWidth >= 1200){
            if (
                this.$router.pageFromAnimation === 'slice' && this.$router.history.current.meta.animation === 'slice'
                ||
                this.$router.pageFromAnimation === 'all' && this.$router.history.current.meta.animation === 'slice'
                ||
                this.$router.pageFromAnimation === 'slice' && this.$router.history.current.meta.animation === 'all'
                ||
                this.$router.pageFromAnimation === 'video' && this.$router.history.current.meta.animation === 'all'
                ||
                this.$router.pageFromAnimation === 'video' && this.$router.history.current.meta.animation === 'slice'
                ||
                this.$router.pageFromAnimation === 'slice' && this.$router.history.current.meta.animation === 'video'
                ||
                this.$router.history.current.hash === '#prevent'
                ||
                this.$router.history.current.meta.language !== this.$router.pageFromLanguage
            ) {
                this.releasePage();
            }
        }

    },
    beforeRouteLeave(to, from, next) {
        // console.log(to.meta,from.meta)
        if(window.innerWidth >= 1200){
            if (
                to.meta.animation === 'slice' && from.meta.animation === 'slice'
                ||
                to.meta.animation === 'all' && from.meta.animation === 'slice'
                ||
                to.meta.animation === 'slice' && from.meta.animation === 'all'
                ||
                to.meta.animation === 'all' && from.meta.animation === 'video'
                ||
                to.meta.animation === 'slice' && from.meta.animation === 'video'
                ||
                to.meta.animation === 'video' && from.meta.animation === 'slice'
                ||
                to.hash === '#prevent'
                ||
                to.meta.language !== from.meta.language ) {
                this.hidePage();
                setTimeout(() => {
                    next()
                }, 750)
            } else {
                next()
            }
        } else {
            next()
        }

    },
    beforeRouteUpdate(to, from, next) {
        if(window.innerWidth >= 1200){
            if (
                to.meta.animation === 'slice' && from.meta.animation === 'slice'
                ||
                to.meta.animation === 'all' && from.meta.animation === 'slice'
                ||
                to.meta.animation === 'slice' && from.meta.animation === 'all'
                ||
                to.meta.animation === 'all' && from.meta.animation === 'video'
                ||
                to.meta.animation === 'slice' && from.meta.animation === 'video'
                ||
                to.meta.animation === 'video' && from.meta.animation === 'slice'
                ||
                to.hash === '#prevent'
                || to.meta.language !== from.meta.language
            ) {
                this.hidePage();
                this.animationSlice.inited = false;
                setTimeout(() => {
                    next()
                }, 750)
            } else {
                next()
            }
        } else {
            next()
        }

    },
    updated() {
        if(window.innerWidth >= 1200){
            if (
                this.$router.pageFromAnimation === 'slice' && this.$router.history.current.meta.animation === 'slice'
                ||
                this.$router.pageFromAnimation === 'all' && this.$router.history.current.meta.animation === 'slice'
                ||
                this.$router.pageFromAnimation === 'slice' && this.$router.history.current.meta.animation === 'all'
                ||
                this.$router.pageFromAnimation === 'video' && this.$router.history.current.meta.animation === 'all'
                ||
                this.$router.pageFromAnimation === 'video' && this.$router.history.current.meta.animation === 'slice'
                ||
                this.$router.pageFromAnimation === 'slice' && this.$router.history.current.meta.animation === 'video'
                ||
                this.$router.history.current.hash === '#prevent'
                ||
                this.$router.history.current.meta.language !== this.$router.pageFromLanguage
            ) {
                setTimeout(() => {
                    if(!this.animationSlice.inited){
                        this.setUpdateStage();
                        this.animationSlice.inited = true;
                    }

                }, 750)
            }
        }

    },
    methods: {
        hidePage(){
            this.animationSlice.transitioned = true;
            this.animationSlice.right = false;
            this.animationSlice.left = true;
            this.animationSlice.showSlices = true;
        },
        setInitStage(){
            this.animationSlice.showSlices = true;
            this.animationSlice.left = false;
            this.animationSlice.right = true;
            this.animationSlice.transitioned = true;
        },
        setUpdateStage(){
            this.animationSlice.left = false;
            this.animationSlice.right = true;
            this.animationSlice.showSlices = false
        },
        releasePage(){
            setTimeout(()=>{
                this.animationSlice.showSlices = false
            },100)

        }
    }
};