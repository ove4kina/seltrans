import Perlin from '../libs/perlinNoise'
export const canvasNoise = {
    data() {
        return {
            canvasNoise: {
                time: 0,
                ctx: '',
                width: 0,
                height: 0
            }
        }
    },
    methods: {
        createScene (){
            let el = document.getElementById('canvas');
            let size = el.getBoundingClientRect().width;
            let canvas = document.createElement('canvas');

            this.canvasNoise.ctx = canvas.getContext('2d');
            this.canvasNoise.width = size;
            this.canvasNoise.height = size * 9/16;
            canvas.width =  this.canvasNoise.width;
            canvas.height = this.canvasNoise.height;
            el.appendChild(canvas);

        },
        draw(){
            let ctx = this.canvasNoise.ctx,
                time = this.canvasNoise.time,
                size = this.canvasNoise.width;


            ctx.clearRect(0,0,this.canvasNoise.width,this.canvasNoise.height);
            for(let i = 0; i<size;i++){
                ctx.fillRect(i,0,1,200*Perlin((i/100),time/500,0));
            }
        },
        render(){
            this.draw();
            this.canvasNoise.time++;
            window.requestAnimationFrame(this.render)
        }
    },
    mounted(){
        if (window.innerWidth >=1200){
            this.createScene();
            this.render();
        }
    }
};