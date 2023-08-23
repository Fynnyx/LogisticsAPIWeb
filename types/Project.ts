import { Transport } from "./Transport";
// import { Department } from "./Department";
import { User } from "./User";

export interface Project {
    id: Number;
    keyName: String;
    name: String;
    description: String;
    createdAt: Date;
    isActive: Boolean;
    users: User[];
    owner: User;
    transports: Transport[];
    // departments: Department[];
}