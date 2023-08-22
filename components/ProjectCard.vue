<script lang="ts" setup>
import { Project } from 'types/Project';
import { User } from 'types/User';

const props = defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true
  }
})

const project: Project = props.project
</script>

<template>
  <a :href="`/projects/${project.keyName}`" class="project-card">
    <div class="project-id">#{{ project.id }}</div>
    <h3 class="project-card-title">{{ project.name }}</h3>
    <span class="project-card-key-name">{{ project.keyName }}</span>
  </a>
</template>

<style lang="scss">
.project-card {
  display: block;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  padding: 1rem;
  transition: all 0.2s ease-in-out;
  width: 100%;
  text-decoration: none;
  color: black;
  position: relative; /* Add this for positioning */

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transform: scale(1.01);
  }

  &-title {
    font-size: 1.5rem;
    margin: 0;
  }

  &-key-name {
    color: #666;
    font-size: 1rem;
  }

  .project-id {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #666;
    font-size: 0.8rem;
  }
}
</style>
