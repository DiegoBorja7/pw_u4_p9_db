<template>
    <div class="students-component">
        <div v-if="estudiantes.length > 0" class="estudiantes-list">
            <h3>Lista de Estudiantes</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th class="fecha-nac">Fecha de Nacimiento</th>
                        <th>Provincia</th>
                        <th>Género</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="estudiante in estudiantes" :key="estudiante.id">
                        <td>{{ estudiante.id }}</td>
                        <td>{{ estudiante.name }}</td>
                        <td>{{ estudiante.lastName }}</td>
                        <td>{{ estudiante.email }}</td>
                        <td class="fecha-nac">{{ estudiante.birthDay ? estudiante.birthDay.split('T')[0] : '' }}</td>
                        <td>{{ estudiante.province }}</td>
                        <td>{{ estudiante.gender }}</td>
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
    },
    mounted() {
        this.consultarTodos();
    }
};
</script>
<style scoped>
.students-component {
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
    font-size: 20px;
    color: #1e40af;
    /* Dark blue */
    text-align: center;
    font-weight: 600;
}

.estudiantes-list {
    margin-top: 16px;
}

table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;
    background: #ffffff;
}

th,
td {
    padding: 14px 16px;
    text-align: left;
    font-size: 14px;
    vertical-align: middle;
}

th {
    background: #dbeafe;
    /* Light blue background */
    color: #1e40af;
    /* Dark blue text */
    font-weight: 600;
    border-bottom: 2px solid #bfdbfe;
    /* Medium blue border */
}


td {
    border-bottom: 1px solid #f3f4f6;
    color: #374151;
}

.fecha-nac {
    text-align: center !important;
}

tr {
    background: #ffffff;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

tbody tr:hover {
    transform: translateY(-2px) scale(1.01);
    background: #eef2ff;
    /* Lighter blue for hover */
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
    /* Blue shadow */
}

tbody tr:first-child td:first-child {
    border-top-left-radius: 8px;
}

tbody tr:first-child td:last-child {
    border-top-right-radius: 8px;
}

tbody tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
}

tbody tr:last-child td:last-child {
    border-bottom-right-radius: 8px;
}

p {
    margin-top: 12px;
    color: #6b7280;
    font-size: 14px;
    text-align: center;
}
</style>