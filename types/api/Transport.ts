import { Project } from "./Project";

export class Transport {
    id: Number;
    deliveryDate: Date;
    isExternal: Boolean;
    isApproved: Boolean;
    isCompleted: Boolean;
    project: Project;

    constructor(id: Number, deliveryDate: Date, isExternal: Boolean, isApproved: Boolean, isCompleted: Boolean, project: Project) {
        this.id = id;
        this.deliveryDate = deliveryDate;
        this.isExternal = isExternal;
        this.isApproved = isApproved;
        this.isCompleted = isCompleted;
        this.project = project;
    }

    static fromJson(json: any): Transport {
        return new Transport(
            json.id,
            json.deliveryDate,
            json.isExternal,
            json.isApproved,
            json.isCompleted,
            Project.fromJson(json.project)
        );
    }

    static toJson(transport: Transport): any {
        return {
            id: transport.id,
            deliveryDate: transport.deliveryDate,
            isExternal: transport.isExternal,
            isApproved: transport.isApproved,
            isCompleted: transport.isCompleted
        }
    }
    
    
}