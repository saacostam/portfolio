<template>
    <div class="project col-12 col-sm-6 col-lg-4">
        <div class="myCard" @click="goTo">
            <div class="mask">
                <h2>{{project.name}}</h2>
                {{project.desc}}
            </div>
            <div class="p-4">
                <img :src="project.image" :alt="project.name" class="img-fluid">
                <h2>{{project.name}}</h2>
                <div class="tech">
                    <span v-for="technology in project.tech" :key="technology">{{technology.toUpperCase()}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['project'],
    methods:{
        goTo(){
            if (this.project.link.substring(0, 4) === 'http'){
                window.open(this.project.link, '_blank');
            }else{
                this.$router.push(this.project.link);
            }
        }
    }
}
</script>

<style scoped>
.myCard{
    border: none;
    border-radius: 0;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;

    transition: transform 0.5s ease;
    cursor:pointer;

    background: -webkit-linear-gradient(160deg, var(--blue) 40%, white 40%);
    background: -o-linear-gradient(160deg, var(--blue) 40%, white 40%);
    background: -moz-linear-gradient(160deg, var(--blue) 40%, white 40%);
    background: linear-gradient(160deg, var(--blue) 40%, white 40%);
}
.myCard .mask{
    transform-origin: top;
    transform: scaleY(0);
    /* transform-origin: top; */
    overflow: hidden;
    background-color: var(--orange);
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 100;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;

    transition: transform 0.5s ease;
}
.myCard:hover{
    transform: scale(1.05);
}
.myCard:hover .mask{
    transform:scaleY(1);
}
.project{
    color: white;
    margin-bottom: 2rem;
    position: relative;
}
.desc{
    text-align:center;
}
h2{
    text-align: center;
    font-size: 2.3rem;
    margin: 1.2rem;
}
h2{color: var(--blue)}
.mask h2{color: white;}
.tech{
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    flex-wrap: wrap;
}
.tech span{
    display: inline-block;
    font-size: 0.9rem;
    font-weight: 400;
    color: var(--white);
    padding: 0 0.3rem;
    border: 1px solid var(--orange);
    background-color: var(--orange);
    border-radius: 0.5rem;
    margin: 0 0.2rem 0.3rem;
}
</style>