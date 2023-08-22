import { Notification } from "types/components/Notification";

export const useNotificationsStore = defineStore(
    "NotificationsStore",
    {
        state: () => ({
            notifications: [] as Notification[]
        }),
        getters: {
            getNotifications(): Notification[] {
                return this.notifications;
            }
        },
        actions: {
            addNotificationToStore(notification: Notification) {
                this.notifications.push(notification);
            },
            removeNotificationFromStore(notification: Notification) {
                this.notifications.splice(this.notifications.indexOf(notification), 1);
            },
            addNotificationsToStore(notifications: Notification[]) {
                this.notifications.push(...notifications);
            },
            setNotificationStore(notifications: Notification[]) {
                this.notifications = notifications;
            }
        }
    });

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useNotificationsStore, import.meta.hot));

}
