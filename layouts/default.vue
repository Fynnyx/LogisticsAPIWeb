<script lang="ts" setup>
import { useUserStore } from '@/store/user';

const logindetails = useUserStore()

</script>

<template>
    <div class="default-layout">
        <NotificationBox/>
        <header>
            <nav>
                <a href="/">Home</a>

                <span v-if="logindetails.isLoggedIn">Logged in as {{ logindetails.user.username }}</span>
                <a v-else href="/auth/login">Login</a>
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
        background-color: #333;
        color: #fff;
        padding: 10px;
    }

    nav {
        display: flex;
        gap: 1rem;

        & > a {
            color: #fff;
            text-decoration: none;
        }
    }

</style>