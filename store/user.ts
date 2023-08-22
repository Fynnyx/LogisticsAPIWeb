import { NotificationType } from "../types/components/Notification";
import { User } from "../types/User";
import { useNotificationsStore } from "./notifications";

const api = process.env.API_BASE_URL;
const notificationsStore = useNotificationsStore();

export const useUserStore = defineStore(
    "UserStore",
    {
        state: () => ({
            user: {} as User,
            token: null as string | null,
        }),
        getters: {
            getUser(): User {
                return this.user;
            },
            getToken(): string | null {
                return this.token;
            }
        },
        actions: {
            setUser(user: User) {
                this.user = user;
            },
            setToken(token: string | null) {
                this.token = token;
            },
            logout() {
                this.user = {} as User;
                this.token = null;
            },
            async login(username: string, password: string) {
                const { data, error, pending, refresh } = await useFetch(`${api}/auth/signin`, {
                    method: 'POST',
                    body: JSON.stringify({
                        username,
                        password
                    })
                });
                console.log(data);
                // Check for 200 status code
                if (error.value?.statusCode === 200) {
                    // this.setToken(apiUser?.token);
                    // this.setUser(apiUser?.user);
                } else if (error.value?.statusCode === 401) {
                    notificationsStore.addNotificationToStore(
                        {
                            header: 'Login failed',
                            message: 'Username or password is incorrect',
                            type: NotificationType.ERROR
                        }
                    );
                } else {
                    notificationsStore.addNotificationToStore(
                        {
                            header: 'Login failed',
                            message: 'Something went wrong',
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