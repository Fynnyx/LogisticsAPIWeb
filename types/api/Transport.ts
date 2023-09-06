import { Project } from "./Project";

export interface Transport {
    id: Number;
    deliveryDate: Date;
    isExternal: Boolean;
    isApproved: Boolean;
    isCompleted: Boolean;
    project: Project;
}