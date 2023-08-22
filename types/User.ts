import { Project } from './Project';

export interface User {
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
}

enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER'
}