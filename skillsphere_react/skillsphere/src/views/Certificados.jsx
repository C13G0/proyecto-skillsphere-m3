import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../hooks/useApi'
import CertificadoCard from '../components/CertificadoCard'
import { OrganicGradientBackground } from '../components/OrganicGradientBackground'
import './Certificados.css'

function Certificados() {
    const navigate = useNavigate()
    
    // Obtenemos de forma segura el estudiante logueado
    const sesion = localStorage.getItem('estudiante')
    const estudiante = sesion ? JSON.parse(sesion) : null

    // Redirección de seguridad si intentan entrar directo por URL sin loguearse
    useEffect(() => {
        if (!sesion) {
            navigate('/login')
        }
    }, [sesion, navigate])

    const { data: todosLosCertificados, loading, error, postData, deleteData } = useApi('/certificates')

    // Inicializamos el formulario con el ID dinámico del estudiante en sesión
    const [formulario, setFormulario] = useState({
        name: '',
        description: '',
        year: '',
        student_id: estudiante ? estudiante.id : '',      
        institution_id: 6 // Asumimos que la institución es fija por ahora, pero podríamos hacerla dinámica también    
    })

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formulario.name || !formulario.description || !formulario.year) {
            alert('Por favor completa los campos obligatorios.')
            return
        }

        const payload = {
            ...formulario,
            year: parseInt(formulario.year, 10),
            student_id: estudiante.id // Nos superaseguramos de enviar su ID real
        }

        const exito = await postData(payload)
        if (exito) {
            // Limpiamos los textos del formulario pero conservamos los IDs de relación intactos
            setFormulario({ ...formulario, name: '', description: '', year: '' })
        }
    }

    // Filtramos en caliente la lista general para mostrar ÚNICAMENTE los certificados de este estudiante
    const misCertificados = todosLosCertificados 
        ? todosLosCertificados.filter(cert => {
            // Validamos cualquier variante común de mapeo JPA que devuelva tu backend (objeto o ID plano)
            const idRelacionado = cert.student?.id || cert.studentId || cert.student_id
            return idRelacionado === estudiante?.id
          })
        : []

    if (!estudiante) return null

    return (
        <OrganicGradientBackground>
            <div className="certificados-container">
                <h2>Mis Certificados</h2>
                <p className="certificados-subtitulo"> Logros de {estudiante.firstName} obtenidos en diferentes instituciones</p>

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
                        ⚠️ <strong>Hubo un problema:</strong> {error}
                    </div>
                )}

                <form className="certificado-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre del certificado (ej. React Backend)"
                        value={formulario.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Descripción o competencia obtenida"
                        value={formulario.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="year"
                        placeholder="Año (ej. 2026)"
                        value={formulario.year}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Agregar Certificado
                    </button>
                </form>

                {loading ? (
                    <div style={{ textAlign: 'center', margin: '64px 0', fontSize: '15px', color: '#10b981', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <div className="spinner-tech"></div> 
                        <span>Sincronizando con el servidor de SkillSphere...</span>
                    </div>
                ) : (
                    <div className="certificados-grid">
                        {misCertificados.length === 0 ? (
                            <div className="no-data-card">
                                <p>No tienes certificados registrados aún en tu perfil.</p>
                            </div>
                        ) : (
                            misCertificados.map((cert) => (
                                <CertificadoCard
                                    key={cert.id}
                                    nombre={cert.name}          
                                    escuela={cert.description}   
                                    fecha={String(cert.year)}    
                                    onEliminar={() => deleteData(cert.id)}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </OrganicGradientBackground>
    )
}

export default Certificados