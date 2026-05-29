import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import VacanteCard from '../components/VacanteCard'
import { OrganicGradientBackground } from '../components/OrganicGradientBackground' // Importamos el fondo
import './Vacantes.css'

function Vacantes() {
    // Consumimos el Custom Hook apuntando al endpoint real de ofertas laborales
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
        /* Envolvemos la interfaz completa con tu fondo dinámico de Shaders WebGL */
        <OrganicGradientBackground>
            <div className="vacantes-container">
                <h2>Vacantes disponibles</h2>
                <p className="vacantes-subtitulo">Ofertas laborales conectadas en tiempo real con el Backend</p>

                {/* Renderizado Condicional: Alerta adaptada para contrastar en el fondo oscuro */}
                {error && (
                    <div style={{ 
                        padding: '14px 18px', 
                        backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                        color: '#f87171', 
                        borderRadius: '12px', 
                        marginBottom: '24px',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        fontSize: '14px',
                        display: 'flex',
                        gap: '8px'
                    }}>
                        ⚠️ <strong>Error de conexión:</strong> {error}
                    </div>
                )}

                {/* Contenedor del formulario con Glassmorphism translúcido */}
                <div className="formulario">
                    <input name="title" placeholder="Título del cargo (ej. Desarrollador Java)" value={formulario.title} onChange={manejarCambio} />
                    <input name="company" placeholder="Empresa" value={formulario.company} onChange={manejarCambio} />
                    <input name="description" placeholder="Descripción de la vacante / Requisitos" value={formulario.description} onChange={manejarCambio} />
                    <input name="salary" placeholder="Salario (ej. $ 3.500.000 COP)" value={formulario.salary} onChange={manejarCambio} />
                    <input name="schedule" placeholder="Horario (ej. Full-time, Part-time)" value={formulario.schedule} onChange={manejarCambio} />
                    <input name="modality" placeholder="Modalidad (ej. Remoto, Presencial)" value={formulario.modality} onChange={manejarCambio} />
                    <button onClick={agregarVacante}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        <span style={{ verticalAlign: 'middle' }}>Agregar Vacante</span>
                    </button>
                </div>

                {/* Renderizado Condicional: Spinner estilizado para ambiente Cyberpunk */}
                {loading ? (
                    <div style={{ textAlign: 'center', margin: '64px 0', fontSize: '15px', color: '#10b981', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <div className="spinner"></div> 
                        <span>Consultando ofertas reales del mercado...</span>
                    </div>
                ) : (
                    <div className="vacantes-grid">
                        {vacantes.length === 0 ? (
                            <div className="no-vacantes-card">
                                <p>No hay vacantes vigentes en este momento.</p>
                            </div>
                        ) : (
                            vacantes.map((vac) => (
                                <VacanteCard
                                    key={vac.id}
                                    nombre={vac.title}        /* Mapea 'title' al prop viejo 'nombre' */
                                    cargo={vac.description}   /* Mapea 'description' al prop viejo 'cargo' */
                                    empresa={vac.company}     /* Mapea 'company' */
                                    salario={vac.salary}       /* Mapea 'salary' */
                                    disponibilidad={vac.schedule} /* Mapea 'schedule' a 'disponibilidad' */
                                    onEliminar={() => deleteData(vac.id)}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </OrganicGradientBackground>
    )
}

export default Vacantes