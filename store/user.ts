import { LoginDetails } from "types/components/LoginDetails";
import { NotificationType } from "../types/components/Notification";
import { User } from "../types/User";
import { useNotificationsStore } from "./notifications";

import nuxtStorage from 'nuxt-storage';

export const useUserStore = defineStore(
    "UserStore",
    {
        state: () => ({
            user: {} as User,
            token: null as string | null,
            isLoggedIn: false
        }),
        getters: {
            loadProperties(): void {
                const loginDetails = nuxtStorage.localStorage.getData('loginDetails');
                if (loginDetails) {
                    this.user = loginDetails;
                    this.token = loginDetails.token;
                    this.isLoggedIn = true;
                }
            },
            getUser(): User {
                return this.user;
            },
            getToken(): string | null {
                return this.token;
            }
        },
        actions: {
            setProperties(user: User, token: string | null, isLoggedIn: boolean) {
                this.user = user;
                this.token = token;
                this.isLoggedIn = isLoggedIn;
                nuxtStorage.localStorage.setData('loginDetails', user);
            },
            setUser(user: User) {
                this.user = user;
            },
            setToken(token: string | null) {
                this.token = token;
            },
            logout() {
                this.user = {} as User;
                this.token = null;
                this.isLoggedIn = false;
            },
            async login(username: string, password: string) {
                const notificationsStore = useNotificationsStore();
                const api = process.env.API_BASE_URL;
                const { data, error, pending, refresh } = await useFetch(`http://localhost:8080/auth/user/signin`, {
                    method: 'POST',
                    body: {
                        username: username,
                        password: password
                    }
                });
                const user = data.value as LoginDetails;
                if (error.value?.statusCode === 200 || error.value == null) {
                    this.user = user.user;
                    this.token = user.token;
                    this.isLoggedIn = true;
                    notificationsStore.addNotificationToStore(
                        {
                            header: 'Login successful',
                            message: 'You have been logged in as ' + user.user.username + '.',
                            type: NotificationType.SUCCESS
                        }
                    );
                } else if (error.value?.statusCode === 401) {
                    notificationsStore.addNotificationToStore(
                        {
                            header: 'Login failed',
                            message: 'Username or password is incorrect',
                            type: NotificationType.ERROR
                        }
                    );
                } else {
                    console.log(error);
                    notificationsStore.addNotificationToStore(
                        {
                            header: 'Login failed',
                            message: (error.value?.message ? error.value?.message : 'An unknown error occurred'),
                            type: NotificationType.ERROR
                        }
                    );
                }
            }
        }
    });

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}