<script lang="ts" setup>
import { User } from 'types/User';
import { useUserStore } from '@/store/user';

const config = useRuntimeConfig()
const userStore = useUserStore()

const user = {
    username: '',
    password: '',
    token: ''
}

async function handleLogin() {
    const response = await fetch(`${config.API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    const data = await response.json()

    if (data.token) {
        userStore.setToken(data.token)
    }
}



</script>

<template>
    <div class="login-container">
        <form>
            <input v-model="user.username" type="text" placeholder="Username" />
            <input v-model="user.password" type="password" placeholder="Password" />
            <button @click="" type="submit">Login</button>
        </form>
    </div>    
</template>

<style lang="scss">
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
