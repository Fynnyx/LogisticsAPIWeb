<script lang="ts" setup>
import { Project } from 'types/Project';
import { User } from 'types/User';
import { Notification, NotificationType } from '@/types/components/Notification';

import { useNotificationsStore } from '@/store/notifications';

const notificationStore = useNotificationsStore()

definePageMeta({
  title: 'Home',
  description: 'Home page',
  keywords: 'home, page',
  layout: 'default',
})

let requestStatus: Object = {
  error: false,
  pending: false,
}

notificationStore.addNotificationToStore(
  {
    header: 'Welcome',
    message: 'Welcome to the home page',
    type: NotificationType.SUCCESS
  }
)
let projects: Project[] = []

async function fetchUserData<User>() {
  const { data, error, pending, refresh } = await useFetch('http://localhost:8080/user',
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmeW5uYWRtaW4iLCJpYXQiOjE2OTIyNzYzODAsImV4cCI6MTY5MjM2Mjc4MCwiaXNzIjoibG9naXN0aWNzLWFwaSJ9.9Rs5W7Ar_m5-BNY8eXr6hNDesCWZgTWAakO0gOlOy5s'
      }
    }
  )
  requestStatus = { error, pending }
  if (error.value) {
    requestStatus = { error, pending }
    notificationStore.addNotificationToStore(
      {
        header: 'Error',
        message: error.value.message,
        type: NotificationType.ERROR
      }
    )
  }
  return data.value as User
}

const userData: User = await fetchUserData<User>()
projects = userData.projects
</script>

<template>
  <div class="project-card-container">
    <h1>Home</h1>
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