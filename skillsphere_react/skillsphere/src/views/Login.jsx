import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

function Login() {
    const [form, setForm] = useState({ usuario: '', contrasena: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        // Validación inicial en el cliente
        if (!form.usuario || !form.contrasena) {
            setError('Por favor, ingresa tu usuario y contraseña.')
            return
        }

        try {
            setLoading(true)
            setError('')

            // Consultamos la lista completa de estudiantes en el Backend
            const response = await fetch('http://localhost:8080/api/students')

            if (!response.ok) {
                throw new Error('No se pudo conectar con el servidor.')
            }

            const estudiantes = await response.json()

            // Buscamos comparando contra firstName (o nombre completo) y phone
            const estudianteEncontrado = estudiantes.find(est =>
                est.firstName?.trim().toLowerCase() === form.usuario.trim().toLowerCase() &&
                est.phone?.trim() === form.contrasena.trim()
            )

            if (estudianteEncontrado) {
                // Guardamos el objeto completo del estudiante en localStorage en formato JSON
                // Esto nos servirá para leer su ID y filtrar certificados o mostrar su perfil exacto
                localStorage.setItem('estudiante', JSON.stringify(estudianteEncontrado))
                navigate('/perfil')
            } else {
                setError('Credenciales incorrectas. Verifica tu nombre o número de celular.')
            }

        } catch (err) {
            setError('Error en el sistema de autenticación. Inténtalo de nuevo más tarde.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-container">
            {/* Esferas decorativas de fondo para el efecto de cristalización */}
            <div className="auth-glow-1"></div>
            <div className="auth-glow-2"></div>

            <div className="auth-card">
                {/* Logo Principal de la Marca */}
                <div className="auth-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="auth-icon-logo"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                    <h1>SkillSphere</h1>
                </div>
                <p className="auth-subtitulo">Inicia sesión con tu Nombre y tu Celular</p>

                {/* Alerta de Error Dinámica */}
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

                <form onSubmit={handleLogin}>
                    {/* Campo: Usuario (Nombre) */}
                    <div className="input-group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        <input
                            type="text"
                            name="usuario"
                            placeholder="Tu nombre completo"
                            value={form.usuario}
                            onChange={handleChange}
                            autoComplete="username"
                            disabled={loading}
                        />
                    </div>

                    {/* Campo: Contraseña (Celular) */}
                    <div className="input-group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                        <input
                            type="password"
                            name="contrasena"
                            placeholder="Número de celular"
                            value={form.contrasena}
                            onChange={handleChange}
                            autoComplete="current-password"
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" className="btn-auth-submit" disabled={loading}>
                        {loading ? 'Verificando...' : 'Ingresar a la plataforma'}
                    </button>
                </form>

                <p className="auth-link">
                    ¿No tienes una cuenta?{' '}
                    <span onClick={() => navigate('/register')}>Regístrate gratis</span>
                </p>
            </div>
        </div>
    )
}

export default Login