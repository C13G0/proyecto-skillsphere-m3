import { useState } from 'react'
import VacanteCard from '../components/VacanteCard'
import './Vacantes.css'

function Vacantes() {
    const [vacantes, setVacantes] = useState([
        { id: 1, nombre: "Desarrollador Frontend", cargo: "Junior", empresa: "Tech Colombia", salario: "$3.500.000", disponibilidad: "Tiempo completo" },
        { id: 2, nombre: "Diseñador UX/UI", cargo: "Semi-senior", empresa: "Creative Studio", salario: "$4.000.000", disponibilidad: "Híbrido" },
        { id: 3, nombre: "Analista de Datos", cargo: "Junior", empresa: "DataCo", salario: "$3.800.000", disponibilidad: "Remoto" },
        { id: 4, nombre: "Desarrollador Backend", cargo: "Senior", empresa: "SoftHub", salario: "$6.000.000", disponibilidad: "Tiempo completo" },
        { id: 5, nombre: "DevOps Engineer", cargo: "Semi-senior", empresa: "CloudNet", salario: "$5.500.000", disponibilidad: "Remoto" },
    ])

    const [formulario, setFormulario] = useState({
        nombre: '',
        cargo: '',
        empresa: '',
        salario: '',
        disponibilidad: ''
    })

    function manejarCambio(e) {
        setFormulario({ ...formulario, [e.target.name]: e.target.value })
    }

    function agregarVacante() {
        if (!formulario.nombre || !formulario.cargo) return
        const nueva = { ...formulario, id: vacantes.length + 1 }
        setVacantes([...vacantes, nueva])
        setFormulario({ nombre: '', cargo: '', empresa: '', salario: '', disponibilidad: '' })
    }

    function eliminarVacante(id) {
        setVacantes(vacantes.filter((vac) => vac.id !== id))
    }

    return (
        <div className="vacantes-container">
            <h2>Vacantes disponibles</h2>
            <p className="vacantes-subtitulo">Cargo disponible</p>

            <div className="formulario">
                <input name="nombre" placeholder="Nombre del cargo" value={formulario.nombre} onChange={manejarCambio} />
                <input name="cargo" placeholder="Nivel" value={formulario.cargo} onChange={manejarCambio} />
                <input name="empresa" placeholder="Empresa" value={formulario.empresa} onChange={manejarCambio} />
                <input name="salario" placeholder="Salario" value={formulario.salario} onChange={manejarCambio} />
                <input name="disponibilidad" placeholder="Disponibilidad" value={formulario.disponibilidad} onChange={manejarCambio} />
                <button onClick={agregarVacante}>Agregar Vacante</button>
            </div>

            <div className="vacantes-grid">
                {vacantes.map((vac) => (
                    <VacanteCard
                        key={vac.id}
                        nombre={vac.nombre}
                        cargo={vac.cargo}
                        empresa={vac.empresa}
                        salario={vac.salario}
                        disponibilidad={vac.disponibilidad}
                        onEliminar={() => eliminarVacante(vac.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Vacantes