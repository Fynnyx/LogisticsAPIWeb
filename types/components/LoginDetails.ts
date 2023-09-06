import { User } from "types/api/User";

export interface LoginDetails {
    user: User;
    token: string | null;
    isLoggedIn: boolean;
}