import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import CertificadoCard from '../components/CertificadoCard'
import './Certificados.css'

function Certificados() {
    // Consumimos nuestro Custom Hook apuntando al endpoint de Java
    const { data: certificados, loading, error, postData, deleteData } = useApi('/certificates')

    // Formulario alineado estrictamente con el CertificateDTO de Spring Boot
    const [formulario, setFormulario] = useState({
        name: '',
        description: '',
        year: '',
        student_id: 1,       // ID de prueba por defecto (Andres)
        institution_id: 1    // ID de prueba por defecto (SENA)
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

        // Convertimos el año a número entero antes de mandarlo al backend
        const payload = {
            ...formulario,
            year: parseInt(formulario.year, 10)
        }

        const exito = await postData(payload)
        if (exito) {
            // Limpiamos solo los campos de texto si todo sale bien
            setFormulario({ ...formulario, name: '', description: '', year: '' })
        }
    }

    return (
        <div className="certificados-container">
            <h2>Mis Certificados</h2>
            <p className="certificados-subtitulo">Logros y certificaciones obtenidos desde la API real</p>

            {/* Renderizado Condicional: Alerta de Error amigable si falla el Backend */}
            {error && (
                <div style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px', marginBottom: '16px' }}>
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
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Descripción o competencia obtenida"
                    value={formulario.description}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="year"
                    placeholder="Año de finalización (ej. 2026)"
                    value={formulario.year}
                    onChange={handleChange}
                />
                <button type="submit">Agregar Certificado</button>
            </form>

            {/* Renderizado Condicional: Indicador de Carga (Spinner / Mensaje) */}
            {loading ? (
                <div style={{ textAlign: 'center', margin: '32px 0', fontSize: '1.2rem', color: '#4f46e5' }}>
                    <div className="spinner"></div> Cargando certificaciones reales...
                </div>
            ) : (
                <div className="certificados-grid">
                    {certificados.length === 0 ? (
                        <p>No hay certificados registrados aún en la base de datos.</p>
                    ) : (
                        certificados.map((cert) => (
                            <CertificadoCard
                                key={cert.id}
                                nombre={cert.name}          /* Adaptado a lo que devuelve el backend */
                                escuela={cert.description}   /* Usamos description temporalmente en la card */
                                fecha={String(cert.year)}    /* Convertido a string para la interfaz */
                                onEliminar={() => deleteData(cert.id)}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default Certificados