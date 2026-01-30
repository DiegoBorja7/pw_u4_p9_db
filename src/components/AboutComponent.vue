<template>
    <div class="about-component">
        <h2>Estudiantes</h2>
        <button @click="consultarTodos">Consultar Todos Estudiantes</button>
        <div v-if="estudiantes.length > 0" class="estudiantes-list">
            <h3>Lista de Estudiantes</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="estudiante in estudiantes" :key="estudiante.id">
                        <td>{{ estudiante.id }}</td>
                        <td>{{ estudiante.name }}</td>
                        <td>{{ estudiante.email }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <p>No hay estudiantes cargados</p>
        </div>
    </div>
</template>
<script>

export default {
    name: "AboutComponent",
    props: {
        estudiantes: {
            type: Array,
            required: true
        }
    },
    methods: {
        consultarTodos() {
            this.$emit('consultar-todos');
        },
        consultarPorId(id) {
            this.$emit('consultar-por-id', id);
        }
    }
};
</script>
<style scoped>
.about-component {
    max-width: 900px;
    margin: 24px auto;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
    margin: 0 0 12px;
    font-size: 24px;
    color: #111827;
}

h3 {
    margin: 16px 0 8px;
    font-size: 18px;
    color: #1f2937;
}

button {
    background: #2563eb;
    color: #ffffff;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s ease;
}

button:hover {
    background: #1d4ed8;
}

.estudiantes-list {
    margin-top: 16px;
}

table {
    width: 100%;
    border-collapse: collapse;
    background: #f9fafb;
    border-radius: 8px;
    overflow: hidden;
}

th,
td {
    padding: 10px 12px;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
    font-size: 14px;
}

th {
    background: #f3f4f6;
    color: #111827;
    font-weight: 600;
}

tbody tr:hover {
    background: #eef2ff;
}

p {
    margin-top: 12px;
    color: #6b7280;
    font-size: 14px;
}
</style>