<template>
  <NavbarVue/>
  <router-view/>
</template>

<script>
import NavbarVue from './components/Navbar.vue'
export default{
  components:{
    NavbarVue
  }
}
</script>

<style>
body{
  background-color: #111;
  font-weight: 300;
  font-size: 1.3rem;
}
:root{
  --color: #4985ff;
}
</style>
