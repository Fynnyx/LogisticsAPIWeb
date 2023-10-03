<script setup lang="ts">
import { Notification, NotificationType } from '@/types/components/Notification';
import { useNotificationsStore } from '@/store/notifications';

const notificationStore = useNotificationsStore()

function removeNotification(notification: Notification) {
    notificationStore.removeNotificationFromStore(notification)
}

const notifications = notificationStore.notifications
</script>

<template>
    <div class="notification-box">
        <div v-for="notification in notifications" :key="notification.header" class="notification" :class="notification.type">
            <h3 class="notification-title">{{ notification.header }}</h3>
            <button class="notification-close" @click="removeNotification(notification)">&times;</button>
            <div class="notification-message">{{ notification.message }}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.notification-box {
    position: fixed;
    top: 40px;
    right: 0;
    width: 400px;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 20px;
    box-sizing: border-box;
}

.notification {
    position: relative;
    width: 100%;
    margin-bottom: 20px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    line-height: 1.5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    background: #2196f3;
    z-index: 1000;
}

.notification-title {
    margin: 0 0 10px;
    font-size: 16px;
}

.notification-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    padding: 0;
    border: none;
    background: transparent;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
}

.notification-message {
    margin: 0;
}

.notification.success {
    background: #4caf50;
}

.notification.error {
    background: #f44336;
}

.notification.warning {
    background: #ff9800;
}

.notification.info {
    background: #2196f3;
}

.notification-box .notification:last-child {
    margin-bottom: 0;
}

</style>