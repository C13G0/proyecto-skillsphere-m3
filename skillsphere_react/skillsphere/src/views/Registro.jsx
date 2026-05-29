import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

function Registro() {
    // El estado inicial ahora mapea 1:1 con las propiedades de tu StudentDTO de Java
    const [form, setForm] = useState({ 
        firstName: '', 
        lastName: '', 
        email: '',
        phone: '',
        program: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        
        // Validación básica en el cliente por seguridad
        if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.program) {
            setError('Todos los campos son obligatorios para el registro.')
            return
        }

        try {
            setLoading(true)
            setError('')

            // Petición POST real al endpoint de estudiantes que me diste
            const response = await fetch('http://localhost:8080/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form) // Enviamos el JSON limpio con los nombres de Java
            })

            if (!response.ok) {
                throw new Error('Hubo un problema al registrar el estudiante en el servidor.')
            }

            // El backend nos devuelve el estudiante creado (ya con su ID asignado)
            const estudianteCreado = await response.json()

            // Lo logueamos automáticamente guardando sus datos reales en el localStorage
            localStorage.setItem('estudiante', JSON.stringify(estudianteCreado))
            
            // Redirigimos directo a su nuevo perfil
            navigate('/perfil')

        } catch (err) {
            setError('No se pudo completar el registro. Verifica la conexión con el backend.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-glow-1"></div>
            <div className="auth-glow-2"></div>

            <div className="auth-card">
                <div className="auth-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="auth-icon-logo"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    <h1>SkillSphere</h1>
                </div>
                <p className="auth-subtitulo">Crea tu perfil profesional y académico</p>
                
                {error && (
                    <div style={{
                        padding: '10px 14px',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: '#f87171',
                        borderRadius: '8px',
                        fontSize: '13px',
                        marginBottom: '16px',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        textAlign: 'center'
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleRegister}>
                    {/* Campo: Primer Nombre */}
                    <div className="input-group">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Nombres"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Campo: Apellidos */}
                    <div className="input-group">
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Apellidos"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Campo: Correo Electrónico */}
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={form.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Campo: Celular (Será su contraseña de ingreso) */}
                    <div className="input-group">
                        <input
                            type="text"
                            name="phone"
                            placeholder="Número de celular (Será tu contraseña)"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Campo: Programa Académico */}
                    <div className="input-group">
                        <input
                            type="text"
                            name="program"
                            placeholder="Programa académico (ej. Desarrollo de Software)"
                            value={form.program}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" className="btn-auth-submit" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrar nueva cuenta'}
                    </button>
                </form>

                <p className="auth-link">
                    ¿Ya tienes una cuenta?{' '}
                    <span onClick={() => navigate('/login')}>Inicia sesión</span>
                </p>
            </div>
        </div>
    )
}

export default Registro