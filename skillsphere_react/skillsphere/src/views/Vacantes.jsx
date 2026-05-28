import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import VacanteCard from '../components/VacanteCard'
import './Vacantes.css'

function Vacantes() {
    // Consumimos el Custom Hook apuntando al endpoint de ofertas laborales
    const { data: vacantes, loading, error, postData, deleteData } = useApi('/job-offers')

    // Formulario alineado estrictamente con el JobOfferDTO de Spring Boot
    const [formulario, setFormulario] = useState({
        title: '',
        company: '',
        description: '',
        salary: '',
        schedule: '',
        modality: '',
        active: true // Por defecto la vacante entra como activa
    })

    function manejarCambio(e) {
        setFormulario({ ...formulario, [e.target.name]: e.target.value })
    }

    async function agregarVacante(e) {
        e.preventDefault() // Evita que se recargue la página si es un formulario
        if (!formulario.title || !formulario.company || !formulario.description) {
            alert('Por favor, completa los campos principales (Título, Empresa y Descripción).')
            return
        }

        const exito = await postData(formulario)
        if (exito) {
            // Limpiamos el formulario tras el guardado exitoso en DB
            setFormulario({
                title: '',
                company: '',
                description: '',
                salary: '',
                schedule: '',
                modality: '',
                active: true
            })
        }
    }

    return (
        <div className="vacantes-container">
            <h2>Vacantes disponibles</h2>
            <p className="vacantes-subtitulo">Ofertas laborales conectadas en tiempo real con el Backend</p>

            {/* Renderizado Condicional: Alerta amigable si falla la API de Spring Boot */}
            {error && (
                <div style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px', marginBottom: '16px' }}>
                    ⚠️ <strong>Error de conexión:</strong> {error}
                </div>
            )}

            <div className="formulario">
                <input name="title" placeholder="Título del cargo (ej. Desarrollador Java)" value={formulario.title} onChange={manejarCambio} />
                <input name="company" placeholder="Empresa" value={formulario.company} onChange={manejarCambio} />
                <input name="description" placeholder="Descripción de la vacante / Requisitos" value={formulario.description} onChange={manejarCambio} />
                <input name="salary" placeholder="Salario (ej. $ 3.500.000 COP)" value={formulario.salary} onChange={manejarCambio} />
                <input name="schedule" placeholder="Horario (ej. Full-time, Part-time)" value={formulario.schedule} onChange={manejarCambio} />
                <input name="modality" placeholder="Modalidad (ej. Remoto, Presencial)" value={formulario.modality} onChange={manejarCambio} />
                <button onClick={agregarVacante}>Agregar Vacante</button>
            </div>

            {/* Renderizado Condicional: Spinner o indicador de carga mientras responde la API */}
            {loading ? (
                <div style={{ textAlign: 'center', margin: '32px 0', fontSize: '1.2rem', color: '#4f46e5' }}>
                    <div className="spinner"></div> Consultando ofertas reales del mercado...
                </div>
            ) : (
                <div className="vacantes-grid">
                    {vacantes.length === 0 ? (
                        <p>No hay vacantes vigentes en este momento.</p>
                    ) : (
                        vacantes.map((vac) => (
                            <VacanteCard
                                key={vac.id}
                                nombre={vac.title}              /* Mapea 'title' al prop viejo 'nombre' */
                                cargo={vac.description}         /* Mapea 'description' al prop viejo 'cargo' */
                                empresa={vac.company}           /* Mapea 'company' */
                                salario={vac.salary}             /* Mapea 'salary' */
                                disponibilidad={vac.schedule}    /* Mapea 'schedule' a 'disponibilidad' */
                                onEliminar={() => deleteData(vac.id)}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default Vacantes