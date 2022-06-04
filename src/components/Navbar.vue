<template>
    <nav>
        <router-link class="brand" :to="{'name': 'Home'} ">
            <img src="@/assets/svg/logo.svg" alt="logo" id="logo">
        </router-link>

        <button class="menu-toggle d-md-none" ref="toggle" @click="visible = !(visible)">
            <i class="bi bi-list"></i>
        </button>
        <Transition>
            <ul class="nav-menu" v-show="width>768 || visible">
                <li class="active">
                    <router-link :to="{name:'Home'}">Home</router-link>
                </li>
                <li>
                    <router-link :to="{name:'Home'}">Projects</router-link>
                </li>
                <li>
                    <router-link :to="{name:'Home'}">About</router-link>
                </li>
            </ul>
        </Transition>
    </nav>
</template>

<script>
export default {
    data: () => ({
        width: document.documentElement.clientWidth,
        visible: false
    }),
    mounted() {
        window.addEventListener('resize', this.getDimensions);
    },
    unmounted() {
        window.removeEventListener('resize', this.getDimensions);
    },
    methods: {
        getDimensions() {
            this.width = document.documentElement.clientWidth;
        }
    }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
}
.v-enter-from,
.v-leave-to {
    transform-origin : 50% 0%;
    transform: scaleY(0);
    opacity: 0;
}
nav{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
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
        padding: 1.6rem 0;
    }
    .nav-menu li{
        margin: 0.3rem;
    }
}
</style>