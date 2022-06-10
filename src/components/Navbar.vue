<template>
    <nav>
        <router-link class="brand" :to="{'name': 'Home'} ">
            <img src="@/assets/svg/logo.svg" alt="logo" id="logo">
        </router-link>

        <button class="menu-toggle d-md-none" ref="toggle" @click="toggleMenu" :disabled="isBeingResized">
            <i class="bi bi-list"></i>
        </button>
        <ul class="nav-menu" ref="nav-menu">
            <li :class="{'active':this.$store.state.currentNavOption==='home'}">
                <router-link :to="{name:'Home'}">Home</router-link>
            </li>
            <li :class="{'active':this.$store.state.currentNavOption==='projects'}">
                <router-link :to="{name:'Home'}">Projects</router-link>
            </li>
            <li :class="{'active':this.$store.state.currentNavOption==='projects'}">
                <router-link :to="{name:'Home'}">Games</router-link>
            </li>
            <li :class="{'active':this.$store.state.currentNavOption==='about'}">
                <router-link :to="{name:'Home'}">About</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    data: () => ({
        width: document.documentElement.clientWidth,
        visible: false,
        isBeingResized: false
    }),
    mounted() {
        this.getDimensions();
        window.addEventListener('resize', this.getDimensions);
    },
    unmounted() {
        window.removeEventListener('resize', this.getDimensions);
    },
    methods: {
        getDimensions() {
            this.width = document.documentElement.clientWidth;
            if(this.width>768){
                this.$refs['nav-menu'].classList.add('active');
            }else{
                if (this.visible){
                    this.$refs['nav-menu'].classList.add('active');
                }else{
                    this.$refs['nav-menu'].classList.remove('active');
                }
            }
        },
        animate(){

        },
        toggleMenu(){
            this.isBeingResized = true;

            // resize animation
            if (this.visible){
                this.$refs['nav-menu'].classList.remove('active');
                this.visible = false;
            }else{
                this.$refs['nav-menu'].classList.add('active');
                this.visible = true;
            }

            this.isBeingResized = false;
        }
    }
}
</script>

<style scoped>
nav{
    background-color: #111;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    font-size: 1.2rem;
    flex-wrap: wrap;
}
.brand{
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
}
#logo{
    height: 5rem;
    margin: 1rem;
}
#brand-name{
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--green);
}
.nav-menu{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0;
    overflow: hidden;
    padding-inline-start:0;

    max-height: 0;

    transform-origin: top;
    transition: max-height 0.4s ease;
}
.nav-menu.active{
    max-height: 12rem;
}
.nav-menu li{
    list-style: none;
    margin: 0 2rem;
}
.nav-menu li.active{
    border-bottom: var(--green) 3px solid;
}
.nav-menu li a{
    text-decoration: none;
    color: white;
    transition: color 0.2s ease, transform 0.2s ease;
}
.nav-menu li a:hover{
    color: var(--green);
}
.nav-menu li.active a{
    color: var(--green);
}
button.menu-toggle{
    background: none;
    cursor:pointer;
    border: 1px solid var(--green);
    border-radius: 0.3rem;
    color: white;
    height: 3rem;
    width: 3rem;
    margin: 1rem;
    font-size: 1.6rem;

    transition: color 0.2s ease;
}
button.menu-toggle:hover,
button.menu-toggle:active{
    color: var(--green);
    transition: transform 0.1s ease-in-out;
}

button.menu-toggle:active{
    color: var(--green);
    transform:translateY(-5px);
}


/* Medium devices (tablets, 768px and up) */
@media (max-width: 768px) {
    .nav-menu{
        flex-basis: 100%;
        flex-direction: column;
        font-size: 1.4rem;
    }
    .nav-menu li{
        margin: 0.4rem;
    }
}
</style>