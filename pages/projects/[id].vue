<template>
    <div v-if="project">
        <h1>Project - {{ project.name }}</h1>
        <div class="info-bar">
            <div class="info-bar__info">
                <div class="info-bar__item">
                    <span>Key Name</span>
                    <span>{{ project.keyName }}</span>
                </div>
                <div class="info-bar__item">
                    <span>Created At</span>
                    <span>{{ DateHelper.parseDateToString(project.createdAt) }}</span>
                </div>
            </div>
            <div class="info-bar__actions">
                <button class="btn btn--primary">Edit</button>
                <button class="btn btn--danger">Delete</button>
            </div>
        </div>
        <p>{{ project }}</p>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { Project } from '@/types/api/Project';
import { NotificationType } from '@/types/components/Notification';

import { useNotificationsStore } from '@/store/notifications';
import { useAuthStore } from '~/store/auth';
import { storeToRefs } from 'pinia';
import { DateHelper } from '@/types/util/DateHelper';

const notificationStore = useNotificationsStore()

const { user, token } = storeToRefs(useAuthStore())

let project: Project
const $route = useRoute()
const id = $route.params.id as String

async function fetchProjectData<Project>(keyName: String) {
    const { data, error, pending, refresh } = await useFetch(`http://localhost:8080/projects/byKeyName/${keyName}`,
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

<style lang="scss" scoped>
.info-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;

    &__info {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex: 1;
        color: #666;
    }

    &__item {
        display: flex;
        flex-direction: column;
        margin-right: 20px;

        &:last-child {
            margin-right: 0;
        }
    }

    &__actions {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
    }
}
</style>