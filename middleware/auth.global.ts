import { storeToRefs } from "pinia";
import { useNotificationsStore } from "~/store/notifications";
import { NotificationType } from "~/types/components/Notification";
import { useAuthStore } from "~/store/auth";
import { User } from "types/api/User";

export default defineNuxtRouteMiddleware( async (to) => {
    const authStore = useAuthStore()
    const { authenticated, user, token, } = storeToRefs(authStore); // make authenticated state reactive
    const notificationStore = useNotificationsStore()

    const tokenCookie = useCookie('token'); // get token from cookies
    const userData = useCookie('userData'); // get user data from cookies
  
    if (tokenCookie.value) {
      authenticated.value = true; // update the state to authenticated
      token.value = tokenCookie.value;
      user.value = userData?.value as User | null;
      await authStore.fetchUserData()
    }

    // if token exists and url is /login redirect to homepage
    if (tokenCookie.value && to?.name === 'auth-login') {
      notificationStore.addNotificationToStore(
        {
          header: "Already logged in",
          message: "Log out to log in again",
          type: NotificationType.WARNING,
        }
      )
      return navigateTo('/');
    }
  
    // if token doesn't exist redirect to log in
    if (!tokenCookie.value && to?.name !== 'auth-login') {
      abortNavigation();
      return navigateTo('/auth/login');
    }
  });