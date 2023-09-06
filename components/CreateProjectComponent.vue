<script lang="ts" setup>
import { Project } from '~/types/api/Project';
import { User } from 'types/api/User';

// project variable to be used in the form
let project = {
    name: '',
    keyName: '',
};
const dialog = ref<HTMLDialogElement | null>(null)

const openDialog = () => {
    dialog.value?.showModal()
}

const closeDialog = () => {
    dialog.value?.close()
}

const createProject = async () => {
    const createdProject: Project = await Project.createProject(Project.fromJson(project))
}

</script>

<template>
    <div class="create-project">

        <div class="create-project__open-button">
            <button @click="openDialog" class="create-project__open-button__button">
                <font-awesome-icon :icon="['fas', 'plus']" />
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
                        <input type="text" placeholder="Project Name" v-model="project.name" />
                        <input type="text" placeholder="Project Key" v-model="project.keyName" />

                    </div>
                    <button @click="createProject"
                        class="create-project__dialog__content__body__form__button button--primary">Create</button>
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

        &__button {
            display: flex;
            align-items: center;
            justify-content: center;
            border: $light-grey 3px solid;
            border-radius: 50%;
            background-color: transparent;
            width: 50px;
            height: 50px;
            color: $light-grey;

            &:hover {
                animation: fade-in 1s ease-in-out;
                border: $dark-grey 3px solid;
                color: $dark-grey;
                cursor: pointer;
            }

            & svg {
                width: 25px;
                height: 25px;
            }
        }
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
