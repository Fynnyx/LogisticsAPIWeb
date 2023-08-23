<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { User } from 'types/User';

const config = useRuntimeConfig()
const userStore = useUserStore()

const user = {
    username: '',
    password: '',
    token: ''
}

async function handleLogin() {
    console.log("logging in with user: ", user);
    userStore.login(user.username, user.password)
}



</script>

<template>
    <h1>Login</h1>
    <div class="login-container">
        <input v-model="user.username" type="text" placeholder="Username" />
        <input v-model="user.password" type="password" placeholder="Password" />
        <button @click="handleLogin">Login</button>
    </div>    
</template>

<style lang="scss">
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 80%;
    height: 300px;
    border-radius: 5px;
}

input {
    width: 100%;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid grey;
}

button {
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    background-color: #4caf50;
    border: 1px solid #ccc;
    cursor: pointer;
}

button:hover {
    background-color: #398b3c;
}

</style>
