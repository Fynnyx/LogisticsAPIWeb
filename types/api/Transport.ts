import { storeToRefs } from "pinia";
import { Project } from "./Project";
import { useAuthStore } from "@/store/auth";

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
            json.deliveryDate,
            json.isExternal,
            json.isApproved,
            json.isCompleted,
            
        );
    }

    static fromJsonList(json: any[]): Transport[] {
        return json.map(Transport.fromJson);
    }

    static async fetchAll(): Promise<Transport[]> {
        const { token } = storeToRefs(useAuthStore());
        const { data } = await useFetch(`${process.env.API_URL}/transports`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        });
        return Transport.fromJsonList(data.value as any[]);
    }

    static async fetchById(id: Number): Promise<Transport> {
        const { token } = storeToRefs(useAuthStore());
        const { data } = await useFetch(`${process.env.API_URL}/transports/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        });
        return Transport.fromJson(data.value as any);
    }

    static async fetchByProjectId(projectId: Number): Promise<Transport[]> {
        const { token } = storeToRefs(useAuthStore());
        const { data } = await useFetch(`${process.env.API_URL}/project/${projectId}/transports`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        });
        return Transport.fromJsonList(data.value as any[]);
    }

    static async createTransport(transport: Transport): Promise<Transport> {
        const { token } = storeToRefs(useAuthStore());
        const { data } = await useFetch(`${process.env.API_URL}/transports`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify(transport)
        });
        return Transport.fromJson(data.value as any);
    }

    static async updateTransport(transportId: Number, transport: Transport): Promise<Transport> {
        const { token } = storeToRefs(useAuthStore());
        const { data } = await useFetch(`${process.env.API_URL}/transports/${transportId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify(transport)
        });
        return Transport.fromJson(data.value as any);
    }

    static async deleteTransport(transportId: Number): Promise<void> {
        const { token } = storeToRefs(useAuthStore());
        await useFetch(`${process.env.API_URL}/transports/${transportId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        });
    }
    
    
}