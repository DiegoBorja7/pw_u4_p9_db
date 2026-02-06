<template>
    <div class="login-view">
        <header class="login-header">
            <router-link to="/" class="logo">
                <span class="logo-icon">📚</span>
                <span class="logo-text">Matrícula</span>
            </router-link>
        </header>

        <main class="login-main">
            <div class="login-container">
                <div class="login-card">
                    <div class="login-header-text">
                        <h1>Bienvenido</h1>
                        <p>Ingresa tus credenciales para continuar</p>
                    </div>

                    <form @submit.prevent="handleLogin" class="login-form">
                        <div class="input-group">
                            <label for="username">Usuario</label>
                            <input id="username" type="text" v-model="username" placeholder="admin"
                                autocomplete="username" required />
                        </div>

                        <div class="input-group">
                            <label for="password">Contraseña</label>
                            <input id="password" type="password" v-model="password" placeholder="••••••••"
                                autocomplete="current-password" required />
                        </div>

                        <button type="submit" class="login-btn" :disabled="loading">
                            <span v-if="!loading">Iniciar Sesión</span>
                            <span v-else>Ingresando...</span>
                        </button>

                        <p v-if="error" class="error-message">{{ error }}</p>
                    </form>

                    <div class="login-footer">
                        <p v-if="isDevelopment" class="hint">💡 Dev: <strong>admin</strong> / <strong>admin123</strong>
                        </p>
                        <p v-else class="contact">¿No tienes acceso? <a href="mailto:admin@matricula.com">Contacta al
                                administrador</a></p>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import AuthClient from '@/clients/Auth';

export default {
    name: "LoginView",
    data() {
        return {
            username: '',
            password: '',
            error: '',
            loading: false
        };
    },
    computed: {
        isDevelopment() {
            return process.env.NODE_ENV === 'development';
        }
    },
    methods: {
        async handleLogin() {
            try {
                this.error = '';
                this.loading = true;
                await AuthClient.login(this.username, this.password);
                localStorage.setItem('currentUser', this.username);
                this.$router.push('/estudiantes');
            } catch (error) {
                console.error('Error en login:', error);

                // Mensajes específicos según el tipo de error
                if (error.status === 401) {
                    this.error = 'Usuario o contraseña incorrectos';
                } else if (error.status === 403) {
                    this.error = '⚠️ Acceso denegado: Se requiere rol de administrador';
                } else if (error.message && error.message !== 'Network Error') {
                    // Mostrar el mensaje real del backend
                    this.error = error.message;
                } else {
                    this.error = 'Error de conexión. Verifica que el servidor esté disponible';
                }
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
.login-view {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, #ffffff 0%, #f0f9ff 50%, #ecfdf5 100%);
    position: relative;
    overflow: hidden;
}

.login-view::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
        radial-gradient(circle at 20% 30%, rgba(66, 185, 131, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(66, 185, 131, 0.05) 0%, transparent 50%);
    pointer-events: none;
}

.login-header {
    padding: 1.5rem 2rem;
    position: relative;
    z-index: 10;
}

.logo {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: #2c3e50;
    font-weight: 700;
    font-size: 1.5rem;
    transition: transform 0.2s;
}

.logo:hover {
    transform: translateY(-2px);
    color: #42b983;
}

.logo-icon {
    font-size: 2rem;
}

.logo-text {
    letter-spacing: -0.5px;
}

.login-main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
    z-index: 10;
}

.login-container {
    width: 100%;
    max-width: 440px;
    animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.login-card {
    background: white;
    backdrop-filter: blur(20px);
    border-radius: 24px;
    padding: 3rem;
    box-shadow:
        0 10px 40px rgba(66, 185, 131, 0.1),
        0 1px 3px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(66, 185, 131, 0.1);
}

.login-header-text {
    text-align: center;
    margin-bottom: 2.5rem;
}

.login-header-text h1 {
    font-size: 2rem;
    font-weight: 800;
    color: #2c3e50;
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
}

.login-header-text p {
    color: #6b7280;
    font-size: 1rem;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.input-group label {
    font-weight: 600;
    color: #374151;
    font-size: 0.875rem;
    letter-spacing: 0.1px;
}

.input-group input {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.2s;
    background: white;
    box-sizing: border-box;
}

.input-group input:focus {
    outline: none;
    border-color: #42b983;
    box-shadow: 0 0 0 4px rgba(66, 185, 131, 0.1);
}

.input-group input::placeholder {
    color: #9ca3af;
}

.login-btn {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, #42b983 0%, #35a372 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 0.5rem;
    box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
}

.login-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(66, 185, 131, 0.4);
}

.login-btn:active:not(:disabled) {
    transform: translateY(0);
}

.login-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.error-message {
    color: #dc2626;
    font-size: 0.875rem;
    text-align: center;
    padding: 0.75rem;
    background: #fef2f2;
    border-radius: 8px;
    border: 1px solid #fecaca;
    margin-top: 0.5rem;
    animation: shake 0.4s;
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-10px);
    }

    75% {
        transform: translateX(10px);
    }
}

.login-footer {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
}

.hint {
    text-align: center;
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.6;
}

.hint strong {
    color: #42b983;
    font-weight: 600;
}

.contact {
    text-align: center;
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.6;
}

.contact a {
    color: #42b983;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
}

.contact a:hover {
    color: #35a372;
    text-decoration: underline;
}

@media (max-width: 640px) {
    .login-card {
        padding: 2rem 1.5rem;
    }

    .login-header-text h1 {
        font-size: 1.75rem;
    }

    .login-main {
        padding: 1rem;
    }
}
</style>