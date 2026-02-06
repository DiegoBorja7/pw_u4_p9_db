<template>
  <div class="home">
    <!-- Notificación de error -->
    <transition name="slide-down">
      <div v-if="errorMessage" class="notification error">
        <div class="notification-content">
          <span class="notification-icon">⚠️</span>
          <span class="notification-text">
            <strong>Acceso denegado:</strong> {{ errorMessage }}
          </span>
          <button @click="dismissError" class="notification-close">×</button>
        </div>
      </div>
    </transition>

    <div class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">Sistema de Matrícula</span>
        </h1>
        <p class="hero-subtitle">
          Gestiona estudiantes de forma simple y eficiente
        </p>
        <div class="hero-actions">
          <router-link to="/estudiantes" class="btn btn-primary">
            <span>Ver Estudiantes</span>
            <span class="arrow">→</span>
          </router-link>
          <router-link to="/estudiantes/crear" class="btn btn-secondary">
            Crear Estudiante
          </router-link>
        </div>
      </div>
      <div class="hero-image">
        <img alt="Vue logo" src="../assets/logo.png" class="vue-logo">
      </div>
    </div>

    <div class="features">
      <div class="feature-card">
        <div class="feature-icon">📋</div>
        <h3>Consultar</h3>
        <p>Visualiza todos los estudiantes registrados</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">➕</div>
        <h3>Crear</h3>
        <p>Registra nuevos estudiantes fácilmente</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">✏️</div>
        <h3>Actualizar</h3>
        <p>Modifica información de estudiantes</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🗑️</div>
        <h3>Eliminar</h3>
        <p>Gestiona el ciclo de vida completo</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      errorMessage: ''
    };
  },
  mounted() {
    // Verificar si hay mensaje de error en la query
    if (this.$route.query.error === 'access_denied') {
      this.errorMessage = this.$route.query.message || 'No tienes permisos suficientes';

      // Auto-cerrar después de 5 segundos
      setTimeout(() => {
        this.dismissError();
      }, 5000);
    }
  },
  methods: {
    dismissError() {
      this.errorMessage = '';
      // Limpiar query params sin recargar
      this.$router.replace({ name: 'home', query: {} });
    }
  }
}
</script>

<style scoped>
.home {
  min-height: calc(100vh - 64px);
  background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
  position: relative;
}

/* Sistema de Notificaciones */
.notification {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  min-width: 400px;
  max-width: 600px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  overflow: hidden;
}

.notification.error {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border: 1px solid #f87171;
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
}

.notification-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.notification-text {
  flex: 1;
  color: #991b1b;
  font-size: 0.95rem;
  line-height: 1.5;
}

.notification-text strong {
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
}

.notification-close {
  background: transparent;
  border: none;
  color: #991b1b;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s;
  flex-shrink: 0;
}

.notification-close:hover {
  background: rgba(153, 27, 27, 0.1);
}

/* Animaciones */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

.hero {
  max-width: 1280px;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-content {
  text-align: left;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -1px;
}

.gradient-text {
  background: linear-gradient(120deg, #42b983 0%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.btn-primary {
  background: #42b983;
  color: white;
}

.btn-primary:hover {
  background: #35a372;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(66, 185, 131, 0.3);
}

.btn-secondary {
  background: transparent;
  color: #42b983;
  border-color: #42b983;
}

.btn-secondary:hover {
  background: #42b983;
  color: white;
  transform: translateY(-2px);
}

.arrow {
  font-size: 1.2rem;
  transition: transform 0.2s;
}

.btn-primary:hover .arrow {
  transform: translateX(4px);
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vue-logo {
  width: 100%;
  max-width: 400px;
  animation: float 3s ease-in-out infinite;
  filter: drop-shadow(0 20px 40px rgba(66, 185, 131, 0.2));
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }
}

.features {
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  transition: all 0.3s;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  border-color: #42b983;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .notification {
    min-width: auto;
    width: calc(100% - 2rem);
    left: 1rem;
    right: 1rem;
    transform: none;
    top: 70px;
  }

  .notification-content {
    padding: 0.875rem 1rem;
  }

  .notification-text {
    font-size: 0.875rem;
  }

  .hero {
    grid-template-columns: 1fr;
    padding: 3rem 1.5rem 2rem;
    gap: 2rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-content {
    text-align: center;
  }

  .hero-actions {
    justify-content: center;
  }

  .features {
    grid-template-columns: 1fr;
    padding: 2rem 1.5rem;
  }
}
</style>
