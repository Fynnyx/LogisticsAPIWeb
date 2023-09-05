<script lang="ts" setup>
import { Project } from 'types/Project';
import { User } from 'types/User';
import { Notification, NotificationType } from '@/types/components/Notification';

import { useNotificationsStore } from '@/store/notifications';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';

const notificationStore = useNotificationsStore()

const { user } = storeToRefs(useAuthStore())

definePageMeta({
  // middleware: 'auth',
  title: 'Home',
  description: 'Home page',
  keywords: 'home, page',
  layout: 'default',
})
let projects: Project[] | null = []
projects = user.value?.projects
</script>

<template>
  <h1>Home</h1>

  <div class="project-card-container">
    <ul class="project-card-list">
      <li v-for="project in projects" :key="(project.keyName as string)" class="project-card-item">
        <ProjectCard :project="project" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.project-card-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.project-card-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.project-card-item {
  display: flex;
  justify-content: center;
}
</style>