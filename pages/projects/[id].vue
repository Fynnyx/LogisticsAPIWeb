<template>
    <div v-if="project">
        <h1>Project - {{ project.name }}</h1>
        <p>{{ project.keyName }}</p>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { Project } from '@/types/api/Project';
import { NotificationType } from '@/types/components/Notification';

import { useNotificationsStore } from '@/store/notifications';
import { useAuthStore } from '~/store/auth';
import { storeToRefs } from 'pinia';

const notificationStore = useNotificationsStore()

const { user, token } = storeToRefs(useAuthStore())

let project: Project 
const $route = useRoute()
const id = $route.params.id as String

async function fetchProjectData<Project>(keyName:String) {
    const {data, error, pending, refresh} = await useFetch(`http://localhost:8080/projects/byKeyName/${keyName}`,
    {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.value}`
        }
    }
    )
    if (error.value) {
        console.error(error.value);
    }
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
</script>