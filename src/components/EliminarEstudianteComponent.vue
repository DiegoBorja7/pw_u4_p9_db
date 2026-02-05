<template>
    <div class="eliminar-component">
        <h3>Eliminar Estudiante</h3>
        <div class="form-group">
            <input v-model="id" type="number" placeholder="Ingresa el ID" @keyup.enter="buscarEstudiante" />
            <button @click="buscarEstudiante">Buscar</button>
        </div>
        <div v-if="mensaje && tipo === 'error'" class="error">
            {{ mensaje }}
        </div>
        <div v-if="id && buscando" class="cargando-pro">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" class="spin">
                <circle cx="12" cy="12" r="10" stroke="#f59e0b" stroke-width="4" opacity="0.2" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="#f59e0b" stroke-width="4" />
            </svg>
            <span>Cargando datos del estudiante...</span>
        </div>
        <div v-if="estudiante && !buscando" class="confirmacion">
            <div class="card-eliminar">
                <div class="icono-advertencia">
                    <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="12" fill="#fef3c7" />
                        <path d="M12 8v4m0 4h.01" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>
                <div class="datos-estudiante">
                    <div class="dato"><span>ID:</span> <b>{{ estudiante.id }}</b></div>
                    <div class="dato"><span>Nombre:</span> <b>{{ estudiante.name }} {{ estudiante.lastName }}</b>
                    </div>
                    <div class="dato"><span>Email:</span> <b>{{ estudiante.email }}</b></div>
                    <div class="dato"><span>Fecha de Nacimiento:</span> <b>{{ estudiante.birthDay ?
                        estudiante.birthDay.split('T')[0] : '' }}</b></div>
                    <div class="dato"><span>Provincia:</span> <b>{{ estudiante.province }}</b></div>
                    <div class="dato"><span>Género:</span> <b>{{ estudiante.gender }}</b></div>
                </div>
                <div class="advertencia-pro">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="12" fill="#f59e0b" fill-opacity="0.15" />
                        <path d="M12 8v4m0 4h.01" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                    <span>¿Estás seguro de que deseas eliminar este estudiante? <b>Esta acción no se puede
                            deshacer.</b></span>
                </div>
                <div class="botones-accion">
                    <button @click="confirmarEliminacion" class="btn-eliminar-pro">Sí, eliminar</button>
                    <button @click="cancelar" class="btn-cancelar-pro">Cancelar</button>
                </div>
            </div>
        </div>
        <div v-if="mensaje && tipo === 'exito'" :class="['mensaje', tipo]">
            {{ mensaje }}
        </div>
    </div>
</template>

<script>
import MatriculaClient from '@/clients/Matricula';

export default {
    name: "EliminarEstudianteComponent",
    data() {
        return {
            id: null,
            estudiante: null,
            mensaje: null,
            tipo: null,
            buscando: false
        };
    },
    watch: {
        id: {
            immediate: true,
            handler: async function (nuevoId) {
                if (!nuevoId) {
                    this.estudiante = null;
                    return;
                }
                try {
                    this.estudiante = null;
                    const est = await MatriculaClient.consultarPorId(nuevoId);
                    this.estudiante = est;
                } catch (e) {
                    this.estudiante = null;
                }
            }
        }
    },
    methods: {
        async buscarEstudiante() {
            this.mensaje = null;
            this.estudiante = null;
            if (!this.id) {
                this.mensaje = 'Por favor ingresa un ID';
                this.tipo = 'error';
                return;
            }
            this.buscando = true;
            try {
                const est = await MatriculaClient.consultarPorId(this.id);
                this.estudiante = est;
            } catch (e) {
                this.mensaje = 'Estudiante no encontrado';
                this.tipo = 'error';
                this.estudiante = null;
            }
            this.buscando = false;
        },
        async confirmarEliminacion() {
            try {
                await MatriculaClient.eliminar(this.id);
                this.mensaje = 'Estudiante eliminado exitosamente';
                this.tipo = 'exito';
                this.id = null;
                this.estudiante = null;
                setTimeout(() => { this.mensaje = null; }, 3000);
            } catch (error) {
                this.mensaje = 'Error al eliminar estudiante';
                this.tipo = 'error';
            }
        },
        cancelar() {
            this.id = null;
            this.estudiante = null;
            this.mensaje = null;
            this.tipo = null;
        }
    }
};
</script>

<style scoped>
/* Panel de confirmación profesional */
.confirmacion {
    margin-top: 32px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 320px;
}

.card-eliminar {
    background: #fff7ed;
    border-radius: 18px;
    box-shadow: 0 8px 32px rgba(245, 158, 11, 0.10), 0 1.5px 6px rgba(0, 0, 0, 0.04);
    border: 1.5px solid #fde68a;
    padding: 32px 32px 24px 32px;
    max-width: 420px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: fadeInUp 0.5s cubic-bezier(.23, 1.01, .32, 1) both;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(40px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.icono-advertencia {
    margin-bottom: 18px;
    background: linear-gradient(135deg, #f59e0b22 60%, #fffbe9 100%);
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 2px 8px #f59e0b22;
}

.datos-estudiante {
    width: 100%;
    margin-bottom: 18px;
}

.dato {
    display: flex;
    justify-content: space-between;
    padding: 7px 0;
    border-bottom: 1px solid #fde68a;
    font-size: 15px;
    color: #92400e;
}

.dato span {
    font-weight: 500;
    color: #b45309;
}

.dato b {
    font-weight: 700;
    color: #78350f;
}

.advertencia-pro {
    display: flex;
    align-items: center;
    background: #fef3c7;
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 18px;
    color: #b45309;
    font-size: 15px;
    box-shadow: 0 1px 4px #f59e0b11;
    border: 1px solid #fde68a;
    gap: 10px;
}

.advertencia-pro b {
    color: #dc2626;
    font-weight: 700;
}

.botones-accion {
    display: flex;
    gap: 16px;
    width: 100%;
    margin-top: 8px;
}

.btn-eliminar-pro {
    flex: 1;
    background: linear-gradient(90deg, #f87171 0%, #dc2626 100%);
    color: #fff;
    border: none;
    padding: 12px 0;
    border-radius: 8px;
    font-weight: 700;
    font-size: 15px;
    box-shadow: 0 2px 8px #dc262622;
    transition: background 0.2s, transform 0.2s;
}

.btn-eliminar-pro:hover {
    background: linear-gradient(90deg, #dc2626 0%, #b91c1c 100%);
    transform: translateY(-2px) scale(1.03);
}

.btn-cancelar-pro {
    flex: 1;
    background: linear-gradient(90deg, #f3f4f6 0%, #d1d5db 100%);
    color: #374151;
    border: none;
    padding: 12px 0;
    border-radius: 8px;
    font-weight: 700;
    font-size: 15px;
    box-shadow: 0 2px 8px #d1d5db22;
    transition: background 0.2s, transform 0.2s;
}

.btn-cancelar-pro:hover {
    background: linear-gradient(90deg, #d1d5db 0%, #9ca3af 100%);
    transform: translateY(-2px) scale(1.03);
}

.cargando-pro {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #b45309;
    font-size: 15px;
    justify-content: center;
    min-height: 120px;
}

.cargando-pro .spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}

/* Animación fade para transición */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

<style scoped>
.eliminar-component {
    max-width: 900px;
    margin: 24px auto;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

h3 {
    margin: 0 0 16px;
    font-size: 18px;
    color: #1f2937;
    text-align: center;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0;
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
}

input {
    padding: 10px 14px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.2s;
}

input:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

button {
    background: #2563eb;
    color: #ffffff;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;
    align-self: center;
    min-width: 150px;
}

button:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.error {
    margin-top: 30px;
    padding: 20px;
    background: #fee2e2;
    border-left: 5px solid #dc2626;
    color: #991b1b;
    border-radius: 8px;
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}
</style>
