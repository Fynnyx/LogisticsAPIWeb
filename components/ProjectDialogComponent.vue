<script lang="ts" setup>
import { Project } from '~/types/api/Project';
import { User } from 'types/api/User';
import { useNotificationsStore } from '~/store/notifications';
import { NotificationType } from '~/types/components/Notification';

const props = defineProps({
    project: {
        type: Object as PropType<Project>,
        required: false,
    },
})
const propProject = props.project as Project

const notificationStore = useNotificationsStore();

// project variable to be used in the form
let project = {
    name: '',
    keyName: '',
};

if (propProject) {
    project.keyName = propProject.keyName as string
    project.name = propProject.name as string
}

const dialog = ref<HTMLDialogElement | null>(null)

const openDialog = () => {
    dialog.value?.showModal()
}

const closeDialog = () => {
    dialog.value?.close()
}

const createProject = async () => {
    try {
        const createdProject: Project = await Project.createProject(Project.fromJson(project))
        window.location.href = `/projects/${createdProject.keyName}`
    } catch (error : any) {
        notificationStore.addNotificationToStore({
            header: 'Error',
            message: error.message,
            type: NotificationType.ERROR,
        })
    }
}

const updateProject = async () => {
    propProject.keyName = project.keyName
    propProject.name = project.name
    const updatedProject: Project = await Project.updateProject(propProject?.id as number, Project.fromJson(propProject))
    window.location.href = `/projects/${updatedProject.keyName}`
}

</script>

<template>
    <div class="create-project">

        <div class="create-project__open-button">
            <button v-if="propProject" @click="openDialog" class="button--warning create-project__open-button__button">
                <font-awesome-icon :icon="['fas', 'pen']" />
            </button>
            <button v-else @click="openDialog" class="button--primary create-project__open-button__button">
                <font-awesome-icon :icon="['fas', 'plus']" />
            </button>
        </div>

        <dialog ref="dialog" class="create-project__dialog">
            <div class="create-project__dialog__content__header dialog__header">
                <h2 class="create-project__dialog__content__header__title dialog__header__title"> {{ propProject ? "Update project" : "Create project" }}</h2>
                <button class="create-project__dialog__content__header__close-button dialog__header__close-button"
                    @click="closeDialog">&times;</button>
            </div>
            <div class="create-project__dialog__content__body dialog__body">
                <div class="create-project__dialog__content__body__form">
                    <div class="create-project__dialog__content__body__form__inputs">
                        <input type="text" placeholder="Project Name" v-model="project.name" />
                        <input type="text" placeholder="Project Key" v-model="project.keyName" />

                    </div>
                    <button v-if="propProject" @click="updateProject"
                        class="create-project__dialog__content__body__form__button button--warning">
                        Update
                    </button>
                    <button v-else @click="createProject"
                        class="create-project__dialog__content__body__form__button button--primary">
                        Create
                    </button>
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

        // &__button {

        // &:hover {
        // }

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
