<template>
  <NavbarVue id="navbar"/>
  <div id="non-navbar">
    <BrandVue id="brand"/>
    <router-view/>
  </div>
</template>

<script>
import NavbarVue from './components/Navbar.vue'
import BrandVue from './components/Brand.vue'
export default{
  components:{
    NavbarVue,
    BrandVue
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
:root {
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  --white: white;
  --blue: #112B3C;
  --orange: #F66B0E;
  --black: #2C3333;
  --transition-speed: 500ms;
}
body{
  background-color: #f1f5f8;
}
#navbar{
  width: 4rem;
  height: 100vh;
  z-index: 1000;
}
#navbar:hover{
  width: 12rem;
}
#non-navbar{
  margin-left: 4rem;
}
#brand{
  height: 4rem;
}
</style>
