<template>
    <div class="project col-12 col-sm-6 col-lg-4">
        <div class="card" @click="goTo">
            <div class="mask">
                <h2>{{project.name}}</h2>
                {{project.desc}}
            </div>
            <div class="p-4">
                <img :src="project.image" :alt="project.name" class="img-fluid">
                <div class="icon"><i class="bi bi-box-arrow-up-right"></i></div>
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
            this.$router.push(this.project.link);
        }
    }
}
</script>

<style scoped>
.card{
    background-color: #111;
    border: 1px var(--green) solid;
    height: 100%;

    transition: transform 0.5s ease;
    cursor:pointer;
}
.card .mask{
    transform-origin: bottom;
    transform: scaleY(0);
    /* transform-origin: top; */
    overflow: hidden;
    background-color: var(--green);
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
.card:hover{
    transform: scale(1.05);
}
.card:hover .mask{
    transform:scaleY(1);
}
.project{
    color: white;
    margin-bottom: 30px;
    position: relative;
}
.desc{
    text-align:center;
}
h2{
    text-align: center;
    font-weight: 300;
    margin-bottom: 1.5rem;
}
.icon{
    border: 2px var(--green) solid;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    display: flex;
    align-content: center;
    justify-content: center;
    background-color: #111;

    margin: auto;
    position: relative;
    bottom: 1.5rem;
}
.icon i{
    padding-top: 0.8rem;
    font-size: 1.4rem;
}
.tech{
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    flex-wrap: wrap;
}
.tech span{
    display: inline-block;
    font-size: 1rem;
    color: var(--green);
    padding: 0 0.3rem;
    border: 1px solid var(--green);
    border-radius: 0.5rem;
    margin: 0 0.2rem 0.3rem;
}
</style>