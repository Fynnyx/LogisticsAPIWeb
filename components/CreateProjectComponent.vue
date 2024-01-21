<script lang="ts" setup>
import { useNotificationsStore } from '@/store/notifications';
import { Project } from '~/types/api/Project';
import { User } from '@/types/api/User';
import { storeToRefs } from 'pinia';
import { NotificationType } from '@/types/components/Notification';

const notificationStore = useNotificationsStore()

let project: Project | null = null;


const props = defineProps({
    project: {
        type: Object as PropType<Project>,
        required: false,
    },
})

if (props.project) {
    project = props.project
}

const dialog = ref<HTMLDialogElement | null>(null)

const openDialog = () => {
    dialog.value?.showModal()
}

const closeDialog = () => {
    dialog.value?.close()
}

const createProject = async () => {
    if (!project) {
        return notificationStore.addNotificationToStore(
            {
                header: 'Error',
                message: `Project is null`,
                type: NotificationType.ERROR
            }
        )
    }
    const createdProject: Project = await Project.createProject(project)
}

const updateProject = async () => {
    if (!project) {
        return notificationStore.addNotificationToStore(
            {
                header: 'Error',
                message: `Project is null`,
                type: NotificationType.ERROR
            }
        )
    }
    const updatedProject: Project = await Project.updateProject(project)
}

console.log(project);

</script>

<template>
    <div class="create-project">

        <div class="create-project__open-button">
            <button @click="openDialog" class="create-project__open-button__button button--primary">
                <font-awesome-icon :icon="project ? ['fas', 'plus'] : ['fas', 'edit']" />
            </button>
        </div>

        <dialog ref="dialog" class="create-project__dialog">
            <div class="create-project__dialog__content__header dialog__header">
                <h2 class="create-project__dialog__content__header__title dialog__header__title">Create Project</h2>
                <button class="create-project__dialog__content__header__close-button dialog__header__close-button"
                    @click="closeDialog">&times;</button>
            </div>
            <div class="create-project__dialog__content__body dialog__body">
                <div class="create-project__dialog__content__body__form">
                    <div class="create-project__dialog__content__body__form__inputs">
                        <input type="text" placeholder="Project Name" v-model="project?.name" />
                        <input type="text" placeholder="Project Key" v-model="project?.keyName" />

                    </div>
                    <button @click="project ? createProject : updateProject"
                        class="create-project__dialog__content__body__form__button button--primary">{{ project ? "Update" :
                            "Create" }}</button>
                </div>
            </div>
        </dialog>

    </div>
</template>

<style lang="scss" scoped>
.create-project {
    display: flex;
    flex-direction: row;
    width: 100%;

    &__open-button {
        display: flex;
        margin: 0.5rem 0 1.5rem 0.5rem;

        // &__button {
        // & svg {
        // }
        // }
    }

    &__dialog {

        &__content {

            // &__header {

            //     &__title {}

            //     &__close-button {}
            // }

            &__body {
                &__form {
                    display: flex;
                    flex-direction: column;

                    // &__inputs {

                    //     input {}
                    // }

                    &__button {
                        margin-top: 1rem;
                        align-self: center;
                    }
                }
            }
        }
    }
}
</style>
