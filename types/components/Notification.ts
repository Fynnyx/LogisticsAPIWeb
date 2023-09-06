export class Notification {
    type: NotificationType;
    header: string;
    message: string;

    constructor(header: string, message: string, type: NotificationType, ) {
        this.type = type;
        this.header = header;
        this.message = message;
    }
}

export enum NotificationType {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info"
}   

// Constructor
