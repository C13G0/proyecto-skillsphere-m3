import { useState } from 'react'
import CertificadoCard from '../components/CertificadoCard'
import './Certificados.css'

function Certificados() {
    const [certificados, setCertificados] = useState([
        { id: 1, nombre: "Desarrollo de Software", escuela: "SENA", fecha: "Enero 2026" },
        { id: 2, nombre: "Fundamentos de Python", escuela: "Coursera", fecha: "Febrero 2026" },
        { id: 3, nombre: "Diseño UX/UI", escuela: "Google", fecha: "Marzo 2026" },
        { id: 4, nombre: "React Básico", escuela: "Platzi", fecha: "Marzo 2026" },
        { id: 5, nombre: "Git y GitHub", escuela: "Udemy", fecha: "Febrero 2026" },
    ])

    const [formulario, setFormulario] = useState({
        nombre: '',
        escuela: '',
        fecha: ''
    })

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formulario.nombre || !formulario.escuela || !formulario.fecha) return
        const nuevo = { id: Date.now(), ...formulario }
        setCertificados([...certificados, nuevo])
        setFormulario({ nombre: '', escuela: '', fecha: '' })
    }

    const handleEliminar = (id) => {
        setCertificados(certificados.filter((cert) => cert.id !== id))
    }

    return (
        <div className="certificados-container">
            <h2>Mis Certificados</h2>
            <p className="certificados-subtitulo">Logros y certificaciones obtenidas</p>

            <form className="certificado-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre del certificado"
                    value={formulario.nombre}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="escuela"
                    placeholder="Escuela o plataforma"
                    value={formulario.escuela}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="fecha"
                    placeholder="Fecha (ej. Abril 2026)"
                    value={formulario.fecha}
                    onChange={handleChange}
                />
                <button type="submit">Agregar Certificado</button>
            </form>

            <div className="certificados-grid">
                {certificados.map((cert) => (
                    <CertificadoCard
                        key={cert.id}
                        nombre={cert.nombre}
                        escuela={cert.escuela}
                        fecha={cert.fecha}
                        onEliminar={() => handleEliminar(cert.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Certificados