<template>
    <div v-if="project">
        <div class="header">
            <h1>Project - {{ project.name }}</h1>
            <div class="meta-bar">
                <div class="meta-bar__start">
                    <ul class="meta-bar__start__list">
                        <li class="meta-bar__start__list__item">
                            <!-- Id -->
                            <font-awesome-icon :icon="['fas', 'hashtag']" />
                            <span class="meta-bar__start__list__item__text">{{ project.id }}</span>
                        </li>
                        <li class="meta-bar__start__list__item">
                            <!-- Keyname -->
                            <font-awesome-icon :icon="['fas', 'key']" />
                            <span class="meta-bar__start__list__item__text">{{ project.keyName }}</span>
                        </li>
                        <li class="meta-bar__start__list__item">
                            <!-- Created At -->
                            <font-awesome-icon :icon="['fas', 'calendar-alt']" />
                            <span class="meta-bar__start__list__item__text">{{ project.createdAt }}</span>
                        </li>
                    </ul>
                </div>
                <div class="meta-bar__end">
                    <ProjectDialogComponent :project="project" />
                    <button @click="deleteProject" class="button--danger">
                        <font-awesome-icon :icon="['fas', 'trash']" />
                    </button>
                </div>
            </div>
            <p>
                {{ project.description }}
            </p>
        </div>
        <div class="container" id="transports">
            <h2>Transports</h2>
            <TransportDialogComponent :project="project" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header {
    margin-bottom: 1rem;
}



.meta-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;

    &__start {
        display: flex;
        flex-direction: row;
        align-items: center;

        &__list {
            display: flex;
            flex-direction: row;
            gap: 1rem;
            list-style: none;
            margin: 0;
            padding: 0;

            &__item {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 0.5rem;
                background-color: #ccc;
                border-radius: 20px;
                padding: 0.35rem 0.5rem;

                &__text {
                    font-size: .9rem;
                }

                & svg {
                    height: 12px;
                    width: 12px;
                }
            }
        }
    }

    &__end {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: .5rem;
    }

}
</style>

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

// notificationStore.addNotificationToStore(
//     {
//         header: 'Welcome to your project',
//         message: `You accessed your ${project.name} project`,
//         type: NotificationType.SUCCESS
//     }
// )

function deleteProject() {
    Project.deleteProject(project.id)
    window.location.href = '/'
}
</script>
