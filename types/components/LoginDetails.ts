import { User } from "types/User";

export interface LoginDetails {
    user: User;
    token: string | null;
    isLoggedIn: boolean;
}