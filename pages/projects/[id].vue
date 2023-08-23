<template>
    <div v-if="project">
        <h1>Project - {{ project.name }}</h1>
        <p>{{ project.keyName }}</p>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { Project } from '@/types/Project';
import { NotificationType } from '@/types/components/Notification';

import { useNotificationsStore } from '@/store/notifications';

const notificationStore = useNotificationsStore()

let project: Project 
const $route = useRoute()
const id = $route.params.id as String

async function fetchProjectData<Project>(keyName:String) {
    const {data, error, pending, refresh} = await useFetch(`http://localhost:8080/projects/byKeyName/${keyName}`,
    {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmeW5uYWRtaW4iLCJpYXQiOjE2OTI3NzE1ODMsImV4cCI6MTY5Mjg1Nzk4MywiaXNzIjoibG9naXN0aWNzLWFwaSJ9.bWujvqx5b4r48TcH5m0tW343fm8mqqrwtX1fC3sBoOE'
        }
    }
    )
    if (error.value) {
        console.log(error.value);
    }
    console.log(data);
    return data.value as Project
}

project = await fetchProjectData<Project>(id)

notificationStore.addNotificationToStore(
    {
        header: 'Welcome to your project',
        message: `You accessed your ${project.name} project`,
        type: NotificationType.SUCCESS
    }
)
console.log(project);
</script>