<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
  username: '', 
  password: '',
})
const router = useRouter();

const login = async () => {
  await authenticateUser(user.value); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push('/');
  }
};

</script>

<template>
    <h1>Login</h1>
    <div class="login-container">
        <input v-model="user.username" type="text" placeholder="Username" />
        <input v-model="user.password" type="password" placeholder="Password" />
        <button @click="login">Login</button>
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
