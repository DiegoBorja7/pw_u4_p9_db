<template>
    <div class="login">
        <h2>Login</h2>
        <input type="text" v-model="username" placeholder="Usuario" @keyup.enter="login">
        <input type="password" v-model="password" placeholder="Contraseña" @keyup.enter="login">
        <button @click="login">Login</button>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script>
import AuthClient from '@/clients/Auth';

export default {
    name: "Login",

    data() {
        return {
            username: '',
            password: '',
            error: ''
        };
    },

    methods: {
        async login() {
            try {
                this.error = '';
                await AuthClient.login(this.username, this.password);
                this.$router.push('/estudiantes');
            } catch (error) {
                console.error('Error en login:', error);
                this.error = 'Usuario o contraseña incorrectos';
            }
        }
    }
};

</script>

<style scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 350px;
    margin: 60px auto;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    font-family: sans-serif;
}

h2 {
    margin-bottom: 1.5rem;
    color: #333;
}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

button {
    width: 100%;
    padding: 10px;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #1d4ed8;
}

.error {
    color: #dc2626;
    font-size: 14px;
    margin-top: 10px;
}
</style>