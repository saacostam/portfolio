<template>
  <div class="home">
    <div class="container">
      <h3>Main Projects</h3>
      <div class="row">
        <div class="row justify-content-center">
          <ProjectVue v-for="project in projects" :key="project.id" :project="project"/>
        </div>
      </div>
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
    const nProjects = 3;
    projects.sort((project)=>{return project.rating});
    return {
      projects:projects.slice(0, nProjects)
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