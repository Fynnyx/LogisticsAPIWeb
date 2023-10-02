import { storeToRefs } from "pinia";
import { Transport } from "./Transport";
// import { Department } from "./Department";
import { User } from "./User";
import { useAuthStore } from "~/store/auth";

export class Project {
    id: Number;
    keyName: String;
    name: String;
    description: String | null;
    createdAt: Date;
    isActive: Boolean;
    users: User[];
    owner: User;
    transports: Transport[];
    // departments: Department[];

    constructor(id: Number, keyName: String, name: String, description: String, createdAt: Date, isActive: Boolean, users: User[], owner: User, transports: Transport[]) {
        this.id = id;
        this.keyName = keyName;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.isActive = isActive;
        this.users = users;
        this.owner = owner;
        this.transports = transports;
        // this.departments = departments;
    }

    public static fromJson(json: any): Project {
        return new Project(
            json.id,
            json.keyName,
            json.name,
            json.description,
            json.createdAt,
            json.isActive,
            json.users,
            json.owner,
            json.transports,
            // json.departments
        );
    }

    public static fromJsonList(json: any[]): Project[] {
        return json.map(Project.fromJson);
    }

    static async fetchAll(): Promise<Project[]> {
        const { token } = storeToRefs(useAuthStore());
        const { data } = await useFetch(`${process.env.API_URL}/projects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        });
        return Project.fromJsonList(data.value as any[]);
    }

    static async fetchById(id: Number): Promise<Project> {
        const { token } = storeToRefs(useAuthStore());
        const { data } = await useFetch(`${process.env.API_URL}/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        });
        return Project.fromJson(data.value as any);
    }

    static async fetchByUser(): Promise<Project[]> {
        const user: User = await User.fetchCurrent();
        return user.projects;
    }

    static async createProject(projectData: Project): Promise<Project> {
        const { token } = storeToRefs(useAuthStore());
        const config = useRuntimeConfig();
        const { data } = await useFetch(`${config.public.apiUrl}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify(projectData)
        })
        useAuthStore().fetchUserData();
        return Project.fromJson(data.value as any);
    }

    static async updateProject(projectId: Number, projectData: Project): Promise<Project> {
        const { token } = storeToRefs(useAuthStore());
        const config = useRuntimeConfig();
        const { data } = await useFetch(`${config.public.apiUrl}/projects/${projectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
            body: JSON.stringify(projectData)
        })
        useAuthStore().fetchUserData();
        return Project.fromJson(data.value as any);
    }

    static async deleteProject(projectId: Number) {
        const { token } = storeToRefs(useAuthStore());
        const config = useRuntimeConfig();
        const { data } = await useFetch(`${config.public.apiUrl}/projects/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            }
        })
        useAuthStore().fetchUserData();
        return data.value;
    }


}