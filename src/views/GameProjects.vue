<template>
  <div>
    <h1>Game Projects</h1>

    <div style="margin-bottom: 30px;">
      Most notable projects.
    </div>

    <ProjectsList v-bind:projects="projects" />

    <div style="margin-top: 20px;">
      There is more to see on <a target="_blank" href="https://github.com/Ulysses-Alv?tab=repositories">Github Repo</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProjectsList from "@/components/ProjectsList.vue";
import gameProjectsData from "@/data/GameProjectsData";

export default defineComponent({
  name: "GameProjects",
  components: {
    ProjectsList,
  },
  data: function () {
    return {
      projects: gameProjectsData,
    };
  },
});
</script>
