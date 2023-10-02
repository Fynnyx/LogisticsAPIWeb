<script lang="ts" setup>
import { Transport } from '~/types/api/Transport';

const props = defineProps({
    transport: {
        type: Object as PropType<Transport>,
        required: false,
    },
})
const propTransport = props.transport as Transport

const transport = {
    deliveryDate: '',
    isExternal: false,
    isApproved: false,
    isCompleted: false,
    project: {
        id: 0
    }
}
</script>

<template>
    <div class="create-transport">

<div class="create-transport__open-button">
    <button v-if="propProject" @click="openDialog" class="button--warning create-transport__open-button__button">
        <font-awesome-icon :icon="['fas', 'pen']" />
    </button>
    <button v-else @click="openDialog" class="button--primary create-transport__open-button__button">
        <font-awesome-icon :icon="['fas', 'plus']" />
    </button>
</div>

<dialog ref="dialog" class="create-transport__dialog">
    <div class="create-transport__dialog__content__header dialog__header">
        <h2 class="create-transport__dialog__content__header__title dialog__header__title"> {{ propProject ? "Update transport" : "Create transport" }}</h2>
        <button class="create-transport__dialog__content__header__close-button dialog__header__close-button"
            @click="closeDialog">&times;</button>
    </div>
    <div class="create-transport__dialog__content__body dialog__body">
        <div class="create-transport__dialog__content__body__form">
            <div class="create-transport__dialog__content__body__form__inputs">
                <input type="text" placeholder="Project Name" v-model="transport.name" />
                <input type="text" placeholder="Project Key" v-model="transport.keyName" />

            </div>
            <button v-if="propProject" @click="updateProject"
                class="create-transport__dialog__content__body__form__button button--warning">
                Update
            </button>
            <button v-else @click="createProject"
                class="create-transport__dialog__content__body__form__button button--primary">
                Create
            </button>
        </div>
    </div>
</dialog>

</div>
</template>

<style scoped>

</style>