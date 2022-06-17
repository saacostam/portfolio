<template>
  <div class="home">
    <div class="container">
      <div class="row mb-5">
        <h4>MAIN PROJECTS</h4>
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
h4{
  color: white;
  font-weight: 300;
  font-size: 2.4rem;
  width: fit-content;
  margin: 0.5rem auto 2rem;
}
</style>