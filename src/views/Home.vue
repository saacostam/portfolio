<template>
  <div class="home">
    <div class="container">
      <h3>All Projects</h3>
      <div class="row justify-content-center">
        <ProjectVue v-for="project in projects" :key="project.id" :project="project"/>
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
    const nProjects = 6;
    const sortedProjects = projects.sort(function(a,b){
      return b.rating - a.rating;
    });
    return {
      projects: sortedProjects.slice(0, nProjects)
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