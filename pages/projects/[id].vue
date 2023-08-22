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
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmeW5udXNlciIsImlhdCI6MTY5MjI1NzQxMSwiZXhwIjoxNjkyMzQzODExLCJpc3MiOiJsb2dpc3RpY3MtYXBpIn0.LJoGpQrwxt-FH1x5YL94mu6hEkd5zdD2I1YApLSKHYs'
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