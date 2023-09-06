import { defineStore } from 'pinia';
import { User } from '~/types/User';
import { useNotificationsStore } from './notifications';
import { NotificationType } from '~/types/components/Notification';

interface UserPayloadInterface {
    username: string;
    password: string;
}


export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {} as User | null,
        token: null as String | null,
        authenticated: false,
        loading: false,
    }),
    actions: {
        async authenticateUser({ username, password }: UserPayloadInterface) {
            // useFetch from nuxt 3
            const { data, pending }: any = await useFetch('http://localhost:8080/auth/user/signin', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    username,
                    password,
                },
            });
            this.loading = pending;

            if (data.value) {
                const token = useCookie('token'); // useCookie new hook in nuxt 3
                const userData = useCookie('userData'); // useCookie new hook in nuxt 3
                userData.value = data?.value?.user; // set user data to cookie
                token.value = data?.value?.token; // set token to cookie
                this.authenticated = true; // set authenticated  state value to true
            }
        },
        async fetchUserData() {
            const notificationStore = useNotificationsStore()

            try {
                const { data }: any = await useFetch('http://localhost:8080/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    },
                });
                this.user = data;
            } catch {
                notificationStore.addNotificationToStore(
                    {
                        header: "Server Error",
                        message: "Something went wrong on the server, your data may not be up to date!",
                        type: NotificationType.ERROR
                    }
                )
            }
        },
        logUserOut() {
            const token = useCookie('token'); // useCookie new hook in nuxt 3
            this.authenticated = false; // set authenticated  state value to false
            token.value = null; // clear the token cookie
        },
    },
    getters: {
        isAuthenticated(): boolean {
            return this.authenticated;
        },
        getUserData(): any {
            const userData = useCookie('userData'); // useCookie new hook in nuxt 3
            return userData.value;
        }
    }
});