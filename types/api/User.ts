import { storeToRefs } from 'pinia';
import { Project } from './Project';
import { useAuthStore } from '~/store/auth';

export class User {
    id: number | null;
    firstname: string;
    lastname: string;
    username: string;
    role: Role;
    projects: Project[];
    ownedProjects: Project[];
    enabled: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
    accountNonExpired: boolean;

    constructor(firstname: string, lastname: string, username: string, role: Role, projects: Project[], ownedProjects: Project[], enabled: boolean, credentialsNonExpired: boolean, accountNonLocked: boolean, accountNonExpired: boolean) {
        this.id = null;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.role = role;
        this.projects = projects;
        this.ownedProjects = ownedProjects;
        this.enabled = enabled;
        this.credentialsNonExpired = credentialsNonExpired;
        this.accountNonLocked = accountNonLocked;
        this.accountNonExpired = accountNonExpired;
    }

    public static fromJson(json: any): User {
        return new User(
            json.firstname,
            json.lastname,
            json.username,
            json.role,
            json.projects,
            json.ownedProjects,
            json.enabled,
            json.credentialsNonExpired,
            json.accountNonLocked,
            json.accountNonExpired
        );
    }

    public static fromJsonList(json: any[]): User[] {
        return json.map(User.fromJson);
    }

    static async fetchAll(): Promise<User[]> {
        const { token } = storeToRefs(useAuthStore());
        const {data} = await useFetch(`${process.env.API_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        });
        return User.fromJsonList(data.value as any[]);
    }

    static async fetchByUsername(username: string): Promise<User> {
        const { token } = storeToRefs(useAuthStore());
        const {data} = await useFetch(`${process.env.API_URL}/users/byUsername/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        });
        return User.fromJson(data.value as any);
    }

    static async fetchCurrent(): Promise<User> {
        const { token } = storeToRefs(useAuthStore());
        const {data} = await useFetch(`${process.env.API_URL}/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.value}`
            },
        });
        return User.fromJson(data.value as any);
    }
}

enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}