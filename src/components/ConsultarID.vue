<template>
    <div class="consultar-id-component">
        <h3>Consultar por ID</h3>
        <div class="form-group">
            <input v-model="id" type="number" placeholder="Ingresa el ID" @keyup.enter="buscar" @blur="buscar" />
            <button @click="buscar">Buscar</button>
        </div>
        <div v-if="estudiante" class="resultado">
            <h4>Estudiante encontrado:</h4>
            <p><strong>ID:</strong> {{ estudiante.id }}</p>
            <p><strong>Nombre:</strong> {{ estudiante.name }}</p>
            <p><strong>Apellido:</strong> {{ estudiante.lastName }}</p>
            <p><strong>Email:</strong> {{ estudiante.email }}</p>
            <p><strong>Género:</strong> {{ estudiante.gender }}</p>
            <p><strong>Fecha de Nacimiento:</strong> {{ estudiante.birthDay ? estudiante.birthDay.split('T')[0] : '' }}</p>
            <p><strong>Provincia:</strong> {{ estudiante.province }}</p>
        </div>
        <div v-if="error" class="error">
            {{ error }}
        </div>
    </div>
</template>

<script>
import MatriculaClient from '@/clients/Matricula';

export default {
    name: "ConsultarIDComponent",
    data() {
        return {
            id: null,
            estudiante: null,
            error: null
        };
    },
    methods: {
        async buscar() {
            this.error = null;
            this.estudiante = null;
            if (!this.id) {
                this.error = 'Por favor ingresa un ID';
                return;
            }
            try {
                const data = await MatriculaClient.consultarPorId(this.id);
                this.estudiante = data;
            } catch (err) {
                this.error = 'Estudiante no encontrado';
            }
        }
    }
};
</script>

<style scoped>
.consultar-id-component {
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

.resultado {
    margin-top: 30px;
    padding: 20px;
    background: #dbeafe;
    border-left: 5px solid #2563eb;
    border-radius: 8px;
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
}

.resultado h4 {
    margin: 0 0 16px;
    color: #1e40af;
    text-align: center;
    font-size: 16px;
}

.resultado p {
    margin: 10px 0;
    color: #1e40af;
    font-size: 14px;
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