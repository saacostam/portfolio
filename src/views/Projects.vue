<template>
    <div class="home">
      <div class="container mb-4">  
        <h3 class="text-white">💻 Projects</h3>
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
      const sortedProjects = projects.sort(function(a,b){
        return b.rating - a.rating;
      });
      const devProjects = sortedProjects.filter(p => p.category !== 'game');
      return {
        projects: devProjects,
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