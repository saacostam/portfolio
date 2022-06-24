<template>
  <div class="brand">
    <router-link id="name" to="/"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" id="terminal-svg"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M9.372 86.63C-3.124 74.13-3.124 53.87 9.372 41.37C21.87 28.88 42.13 28.88 54.63 41.37L246.6 233.4C259.1 245.9 259.1 266.1 246.6 278.6L54.63 470.6C42.13 483.1 21.87 483.1 9.372 470.6C-3.124 458.1-3.124 437.9 9.372 425.4L178.7 256L9.372 86.63zM544 416C561.7 416 576 430.3 576 448C576 465.7 561.7 480 544 480H256C238.3 480 224 465.7 224 448C224 430.3 238.3 416 256 416H544z"/></svg> Portfolio | Santiago Acosta Meza</router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
#terminal-svg{
    width: 1rem;
    height: 1rem;
    fill: var(--black)
}
.brand{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;

    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    margin-bottom: 3rem;
}
#name{
    text-decoration: none;
    color: var(--blue);
    font-size: 1.4rem;
    font-weight: 600;
}
</style>