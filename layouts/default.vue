<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated, user } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
    logUserOut();
    router.push('/auth/login');
};
</script>

<template>
    <div class="default-layout">
        <NotificationBox />
        <header>
            <nav class="navbar">
                <a class="navbar__item" href="/">Home</a>

                <span v-if="authenticated" id="userinfo" class="navbar__item">Logged in as {{ user?.username }}</span>
                <a v-else id="login" class="navbar__item button--primary" href="/auth/login">Login</a>
                <a v-if="authenticated" class="navbar__item button--danger" href="#" id="logout" @click="logout">Logout</a>
            </nav>
        </header>
        <div class="default-content">
            <slot />

        </div>
    </div>
</template>

<style lang="scss">
.default-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

header {
    background-color: $dark-grey;
    color: #fff;
    padding: 5px;
}

.navbar {
    display: flex;
    gap: 1rem;

    &__item:not(.button--danger, .button--primary) {
        color: #fff;
        text-decoration: none;
        padding: 10px;

    }
}
#login {
    margin-left: auto;
}
#userinfo {
    margin-left: auto;
    font-weight: bold;

}
</style>