<script lang="ts" setup>
import { useNotificationsStore } from '@/store/notifications';
import { NotificationType } from '@/types/components/Notification';
import { Project } from 'types/api/Project';
import { Transport } from '~/types/api/Transport';

const props = defineProps({
    transport: {
        type: Object as PropType<Transport>,
        required: false,
    },
    project: {
        type: Object as PropType<Project>,
        required: false,
    },
})
const propTransport = props.transport as Transport

const notificationStore = useNotificationsStore();

const transport = {
    deliveryDate: new Date().toISOString().split('T')[0],
    isExternal: false,
    isApproved: false,
    isCompleted: false,
    project: {} as Project,
}

if (propTransport) {
    transport.deliveryDate = new Date(propTransport.deliveryDate).toDateString()
    transport.isExternal = propTransport.isExternal as boolean
    transport.isApproved = propTransport.isApproved as boolean
    transport.isCompleted = propTransport.isCompleted as boolean
    transport.project = propTransport.project as Project
} else if (!props.project) {
    notificationStore.addNotificationToStore({
        header: 'No project provided',
        message: 'Contact the administrator.',
        type: NotificationType.ERROR,
    })
}

console.log(props.project);

const dialog = ref<HTMLDialogElement | null>(null)

const openDialog = () => {
    dialog.value?.showModal()
}

const closeDialog = () => {
    dialog.value?.close()
}

const createTransport = async () => {
    try {
        transport.project.id = props.project?.id as number
        const createdTransport: Transport = await props.project?.addTransport(Transport.fromJson(transport)) as Transport
        window.location.href = `/projects/${createdTransport.project.id}`
    } catch (error: any) {
        notificationStore.addNotificationToStore({
            header: 'Error',
            message: error.message,
            type: NotificationType.ERROR,
        })
    }
}

const updateTransport = async () => {
    propTransport.deliveryDate = new Date(transport.deliveryDate)
    propTransport.isExternal = transport.isExternal
    propTransport.isApproved = transport.isApproved
    propTransport.isCompleted = transport.isCompleted
    propTransport.project.id = transport.project.id
    const updatedTransport: Transport = await Transport.updateTransport(propTransport?.id as number, Transport.fromJson(propTransport))
    // window.location.href = `/projects/${updatedTransport.project.id}`
}
</script>

<template>
    <div class="create-transport">

        <div class="create-transport__open-button">
            <button v-if="propTransport" @click="openDialog" class="button--warning create-transport__open-button__button">
                <font-awesome-icon :icon="['fas', 'pen']" />
            </button>
            <button v-else @click="openDialog" class="button--primary create-transport__open-button__button">
                <font-awesome-icon :icon="['fas', 'plus']" />
            </button>
        </div>

        <dialog ref="dialog" class="create-transport__dialog">
            <div class="create-transport__dialog__content__header dialog__header">
                <h2 class="create-transport__dialog__content__header__title dialog__header__title"> {{ propTransport ?
                    "Update transport" : "Create transport" }}</h2>
                <button class="create-transport__dialog__content__header__close-button dialog__header__close-button"
                    @click="closeDialog">&times;</button>
            </div>
            <div class="create-transport__dialog__content__body dialog__body">
                <form class="create-transport__dialog__content__body__form">
                    <label class="input--medium">
                        Delivery date
                        <input v-model="transport.deliveryDate" type="date" required />
                    </label>
                    <div aria-hidden="true" class="form__blank--medium"></div>
                    <label class="row input--small">
                        External
                        <input v-model="transport.isExternal" type="checkbox" />
                    </label>
                    <label class="row input--small">
                        Approved
                        <input v-model="transport.isApproved" type="checkbox" />
                    </label>
                    <label class="row input--small">
                        Completed
                        <input v-model="transport.isCompleted" type="checkbox" />
                    </label>
                    <div class="form__actions">
                        <button v-if="propTransport" @click.prevent="updateTransport"
                            class="create-transport__dialog__content__body__form__button button--warning">
                            Update
                        </button>
                        <button v-else @click.prevent="createTransport"
                            class="create-transport__dialog__content__body__form__button button--primary">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </dialog>

    </div>
</template>

<style scoped></style>