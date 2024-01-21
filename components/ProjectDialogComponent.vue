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
    description: '',
};

if (propProject) {
    project.keyName = propProject.keyName as string
    project.name = propProject.name as string
    project.description = propProject.description as string
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
    propProject.description = project.description
    propProject.owner = {} as User,
    propProject.owner.id = propProject.owner.id as number
    const updatedProject = await propProject.update(propProject)
    window.location.href = `/projects/${updatedProject.keyName}`
}

</script>

<template>
    <div class="create-project">

        <div class="create-project__open-button">
            <button v-if="propProject" @click.prevent="openDialog" class="button--warning create-project__open-button__button">
                <font-awesome-icon :icon="['fas', 'pen']" />
            </button>
            <button v-else @click.prevent="openDialog" class="button--primary create-project__open-button__button">
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
                <form class="create-project__dialog__content__body__form">
                    <!-- <div class="create-project__dialog__content__body__form__inputs"> -->
                        <input type="text" placeholder="Project Name" v-model="project.name" class="input--medium" />
                        <input type="text" placeholder="Project Key" v-model="project.keyName" class="input--medium" />
                        <textarea placeholder="Project Description" v-model="project.description" class="input--large"></textarea>
                    <!-- </div> -->
                    <div class="form__actions">
                        <button v-if="propProject" @click="updateProject"
                            class="create-project__dialog__content__body__form__button button--warning">
                            Update
                        </button>
                        <button v-else @click="createProject"
                            class="create-project__dialog__content__body__form__button button--primary">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </dialog>

    </div>
</template>

<style lang="scss" scoped>
.create-project {
    display: flex;
    flex-direction: row;
    width: 100%;
}
</style>
