<template>
    <div class="crear-component">
        <h3>Crear Estudiante</h3>
        <form @submit.prevent="crear">
            <div class="form-group">
                <label>Nombre:</label>
                <input v-model="formulario.name" type="text" required />
            </div>
            <div class="form-group">
                <label>Apellido:</label>
                <input v-model="formulario.lastName" type="text" required />
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input v-model="formulario.email" type="email" required />
            </div>
            <div class="form-group">
                <label>Fecha de Nacimiento:</label>
                <input v-model="formulario.birthDay" type="datetime-local" />
            </div>
            <div class="form-group">
                <label>Provincia:</label>
                <input v-model="formulario.province" type="text" />
            </div>
            <div class="form-group">
                <label>Género:</label>
                <select v-model="formulario.gender">
                    <option value="">Selecciona...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>
            <button type="submit">Crear</button>
        </form>
        <div v-if="mensaje" :class="['mensaje', tipo]">
            {{ mensaje }}
        </div>
    </div>
</template>

<script>
import MatriculaClient from '@/clients/Matricula';

export default {
    name: "CrearEstudianteComponent",
    data() {
        return {
            formulario: {
                name: '',
                lastName: '',
                email: '',
                birthDay: '',
                province: '',
                gender: ''
            },
            mensaje: null,
            tipo: null
        };
    },
    methods: {
        async crear() {
            try {
                await MatriculaClient.crear(this.formulario);
                this.mensaje = 'Estudiante creado exitosamente';
                this.tipo = 'exito';
                this.formulario = { name: '', lastName: '', email: '', birthDay: '', province: '', gender: '' };
                setTimeout(() => { this.mensaje = null; }, 3000);
            } catch (error) {
                this.mensaje = 'Error al crear estudiante';
                this.tipo = 'error';
            }
        }
    }
};
</script>

<style scoped>
.crear-component {
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
    margin: 0 0 24px;
    font-size: 18px;
    color: #1f2937;
    text-align: center;
}

form {
    max-width: 400px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 18px;
}

label {
    display: block;
    margin-bottom: 8px;
    color: #374151;
    font-weight: 600;
    font-size: 14px;
}

input,
select {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    box-sizing: border-box;
    transition: all 0.2s;
}

input:focus,
select:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

button {
    width: 100%;
    background: #10b981;
    color: #ffffff;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.2s ease;
    margin-top: 10px;
}

button:hover {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.mensaje {
    margin-top: 24px;
    padding: 16px;
    border-radius: 8px;
    font-size: 14px;
    text-align: center;
}

.mensaje.exito {
    background: #dcfce7;
    color: #166534;
    border-left: 4px solid #10b981;
}

.mensaje.error {
    background: #fee2e2;
    color: #991b1b;
    border-left: 4px solid #dc2626;
}
</style>

<style scoped>
.crear-component {
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
}

form {
    max-width: 400px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #374151;
    font-weight: 500;
    font-size: 14px;
}

input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
    box-sizing: border-box;
}

input:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

button {
    background: #10b981;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s ease;
}

button:hover {
    background: #059669;
}

.mensaje {
    margin-top: 20px;
    padding: 15px;
    border-radius: 6px;
    font-size: 14px;
}

.mensaje.exito {
    background: #dcfce7;
    color: #166534;
    border-left: 4px solid #10b981;
}

.mensaje.error {
    background: #fee2e2;
    color: #991b1b;
    border-left: 4px solid #dc2626;
}
</style>
