<template>
  <div class="home">
    <div class="container mb-4">
      <div class="rounded my-5 text-white px-1 py-3 px-md-5 py-md-3" style="background-color: var(--orange);">
        <h1 class="text-center my-4">Hi 👋, I'm Santi</h1>
        <div class="d-block d-lg-flex flex-row my-4 align-items-center">
          <img src="img/profile/viking.png" alt="Profile Image of Santiago Acosta Meza" style="max-width: 250px" class="d-block mx-auto rounded rounded-circle">
          <div class="flex-fill p-2">
            <h3 class="mx-auto my-4 font-weight-light">A software engineering student, interested in full-stack web development.</h3>
          </div>
        </div>

        <h3 class="my-4">About Me:</h3>
        <ul>
          <li>👀 I’m interested in Full-Stack Web Development. I also enjoy competitive programming.</li>
          <li>📚 I’m currently studying Systems and Computation Engineering at the National University of Colombia.</li>
          <li>🌱 I’m currently learning <b>Algorithms and Data Structures</b> for competitive programming.</li>
          <li>🐱‍🚀 Check my work at: <a href="https://github.com/saacostam" target="_blank">@saacostam</a></li>
          <li>📫 You can reach me at: saacostam@unal.edu.co</li>
        </ul>

        <h3 class="my-4">Languages and Tools:</h3>
        <p class="text-center"> <a href="https://getbootstrap.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://graphql.org" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg" alt="graphql" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://www.python.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> <a href="https://vuejs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original-wordmark.svg" alt="vuejs" width="40" height="40"/> </a> </p>
      </div>

      <h3 class="text-white">💻 Dev Projects</h3>
      <div class="row justify-content-center">
        <ProjectVue v-for="project in projects" :key="project.id" :project="project"/>
      </div>
      <router-link to="/projects" class="btn btn-dark btn-lg d-block" style="background-color: var(--orange);">More Projects</router-link>

      <h3 class="text-white">💿 Music-Related Projects</h3>
      <div class="row justify-content-center">
        <ProjectVue v-for="project in musicProjects" :key="project.id" :project="project"/>
      </div>
      <router-link to="/projects" class="btn btn-dark btn-lg d-block" style="background-color: var(--orange);">More Projects</router-link>

      <h3 class="text-white">🎮 Games</h3>
      <div class="row justify-content-center">
        <ProjectVue v-for="project in games" :key="project.id" :project="project"/>
      </div>
      <router-link to="/games" class="btn btn-dark btn-lg d-block" style="background-color: var(--orange);">More Games</router-link>
    </div>
  </div>
</template>

<script>
import projects from '@/db/projects.js'
import ProjectVue from '@/components/home/Project.vue'
export default {
  components:{
    ProjectVue
  },
  data(){
    const sortedProjects = projects.sort(function(a,b){
      return b.rating - a.rating;
    });
    const devProjects = sortedProjects.filter(p => p.category === 'dev');
    const sortedGames = sortedProjects.filter(p => p.category === 'game');
    const sortedMusic = sortedProjects.filter(p => p.category === 'music');
    return {
      projects: devProjects.slice(0, 3),
      games: sortedGames.slice(0, 3),
      musicProjects: sortedMusic.slice(0, 3),
    }
  }
}
</script>

<style scoped>
h3{
  text-align: center;
  margin: 3rem 0;
}
#description{
  background-color: var(--blue);
  color: var(--white);
  padding: 0 15rem;
}
</style>