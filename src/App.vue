<template>
  <div id="app">
    <header v-if="$route.path !== '/login'" class="app-header">
      <div class="header-content">
        <div class="header-left">
          <router-link to="/" class="logo">
            <span class="logo-icon">📚</span>
            <span class="logo-text">Matrícula</span>
          </router-link>
        </div>
        <nav class="header-nav">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/estudiantes" class="nav-link">Estudiantes</router-link>
        </nav>
        <div class="header-right">
          <div v-if="isLoggedIn" class="user-section">
            <div class="user-info">
              <div class="user-avatar">{{ userInitial }}</div>
              <span class="user-name">{{ currentUser }}</span>
            </div>
            <button @click="handleLogout" class="logout-btn">
              <span class="logout-icon">👋</span>
              Logout
            </button>
          </div>
          <button v-else @click="handleLogin" class="login-btn">
            <span class="login-icon">🔐</span>
            Login
          </button>
        </div>
      </div>
    </header>
    <main :class="{ 'with-header': $route.path !== '/login' }">
      <router-view />
    </main>
  </div>
</template>

<script>
import AuthClient from '@/clients/Auth';

export default {
  name: 'App',
  data() {
    return {
      authCheck: 0
    }
  },
  computed: {
    isLoggedIn() {
      this.authCheck; // Trigger reactivity
      return !!localStorage.getItem('accessToken');
    },
    currentUser() {
      this.authCheck; // Trigger reactivity
      return localStorage.getItem('currentUser') || 'Usuario';
    },
    userInitial() {
      return this.currentUser.charAt(0).toUpperCase();
    }
  },
  watch: {
    $route() {
      this.authCheck++; // Update auth status on route change
    }
  },
  methods: {
    handleLogin() {
      this.$router.push('/login');
    },
    handleLogout() {
      AuthClient.logout();
      localStorage.removeItem('currentUser');
      this.authCheck++; // Trigger computed update
      this.$router.push('/login');
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background: #fafafa;
}

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #2c3e50;
  font-weight: 700;
  font-size: 1.25rem;
  transition: color 0.2s;
}

.logo:hover {
  color: #42b983;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  letter-spacing: -0.5px;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-left: 3rem;
}

.nav-link {
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.nav-link:hover {
  color: #2c3e50;
  border-bottom-color: #42b983;
}

.nav-link.router-link-exact-active {
  color: #42b983;
  border-bottom-color: #42b983;
}

.header-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 100%);
  border-radius: 12px;
  border: 1px solid rgba(66, 185, 131, 0.2);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #42b983 0%, #35a372 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  box-shadow: 0 2px 8px rgba(66, 185, 131, 0.3);
}

.user-name {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
  letter-spacing: -0.2px;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: #dc2626;
  background: transparent;
  border: 1px solid #fecaca;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-family: inherit;
  padding: 0.5rem 1rem;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: #fef2f2;
  border-color: #dc2626;
  transform: translateY(-1px);
}

.logout-icon {
  font-size: 1.1rem;
}

.login-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: #42b983;
  background: transparent;
  border: 1px solid #42b983;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-family: inherit;
  padding: 0.5rem 1rem;
  transition: all 0.2s;
}

.login-btn:hover {
  background: #42b983;
  color: white;
  transform: translateY(-1px);
}

.login-icon {
  font-size: 1.1rem;
}

main.with-header {
  padding-top: 64px;
}
</style>
