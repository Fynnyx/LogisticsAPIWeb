export interface Notification {
    type: NotificationType;
    header: string;
    message: string;
}

export enum NotificationType {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info"
}   