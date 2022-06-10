<template>
    <div class="hero">
        <div class="dot" v-for="star in this.stars" :key="star.id" :style="`right:${star.x}%; top:${star.y}%;`"></div>
        <img src="@/assets/svg/terrain.svg" alt="moon-terrain">
        <div class="gradient"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            stars:[],
            nStarts:50
        }
    }, 
    created(){
        for (let i=0; i<this.nStarts; i++){
            this.stars.push( this.randomPair(i) );
        }
    },
    methods:{
        randomPair(i){
            return {x:Math.random()*100, y:Math.random()*80, id:i};
        }
    }
}
</script>

<style scoped>
.hero{
    height: calc(1/3*100vw);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    max-width: calc(100vw);
    position: relative;
}
.hero img{
    max-width: 100%;
    vertical-align:bottom;
    height: fit-content;
}
.gradient{
    height: calc(1/20*100vw);
    background: linear-gradient(rgba(189.258, 189.258, 189.258, 1), rgba(0,0,0,0));
}
#planet{
    position:absolute;
    right: 0;
    left: 0;
    top: 20%;
    z-index: -5;
    height: 20%;
    
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}
#planet img{
    height: 100%;
    margin-right: 1rem;
}
#planet div{
    font-size: calc(1.5em);
}
.dot{
    position:absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: white;
    z-index: -10;
}

/* Medium devices (tablets, 768px and up) */
@media (max-width: 768px) {
    .hero{
        height: calc(2/5*100vw);
    }
}

/* Small devices (landscape phones, 576px and up) */
@media (max-width: 576px) {
    .hero{
        height: calc(1/2*100vw);
    }
}

#logo{
    animation: sprite 0.2s steps(4) infinite;
    height: 100px;
    width: 100px;
    background-image:url("../../assets/img/logo_sprite.png");
}

#canvas-hero{
    position: absolute;
    height: 100%;
    width: 100%;
}

@keyframes sprite {
  from { 
        background-position: 0px; 
    }
  to { 
        background-position: -400px; 
    }
}
</style>