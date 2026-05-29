import { useApi } from '../hooks/useApi'
import VacanteCard from '../components/VacanteCard'
import { OrganicGradientBackground } from '../components/OrganicGradientBackground' // Mantenemos el fondo premium
import './Vacantes.css'

function Vacantes() {
    // Consumimos el Custom Hook apuntando al endpoint real de ofertas laborales
    // Removemos 'postData' porque el estudiante ya no creará vacantes desde aquí
    const { data: vacantes, loading, error, deleteData } = useApi('/job-offers')

    return (
        /* Envolvemos la interfaz completa con tu fondo dinámico de Shaders WebGL */
        <OrganicGradientBackground>
            <div className="vacantes-container">
                <h2>Vacantes disponibles</h2>
                <p className="vacantes-subtitulo">Ofertas laborales a tu medida y conectadas en tiempo real</p>

                {/* Renderizado Condicional: Alerta de error */}
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

                {/* Renderizado Condicional: Spinner o la grilla de vacantes predeterminadas */}
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
                                    nombre={vac.title}        /* Mapea 'title' al prop 'nombre' */
                                    cargo={vac.description}   /* Mapea 'description' al prop 'cargo' */
                                    empresa={vac.company}     /* Mapea 'company' */
                                    salario={vac.salary}       /* Mapea 'salary' */
                                    disponibilidad={vac.schedule} /* Mapea 'schedule' a 'disponibilidad' */
                                    onEliminar={() => deleteData(vac.id)} /* Lo dejamos vinculado temporalmente para evitar errores en los props de la tarjeta */
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