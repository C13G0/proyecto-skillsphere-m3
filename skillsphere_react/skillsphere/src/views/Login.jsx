import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

function Login() {
    const [form, setForm] = useState({ usuario: '', contrasena: '' })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        if (!form.usuario || !form.contrasena) return
        localStorage.setItem('usuario', form.usuario)
        navigate('/perfil')
    }

    return (
        <div className="auth-container">
            {/* Esferas decorativas de fondo para el efecto de cristalización */}
            <div className="auth-glow-1"></div>
            <div className="auth-glow-2"></div>

            <div className="auth-card">
                {/* Logo Principal de la Marca */}
                <div className="auth-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="auth-icon-logo"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    <h1>SkillSphere</h1>
                </div>
                <p className="auth-subtitulo">Inicia sesión en tu cuenta de desarrollo</p>
                
                <form onSubmit={handleLogin}>
                    {/* Campo: Usuario */}
                    <div className="input-group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <input
                            type="text"
                            name="usuario"
                            placeholder="Nombre de usuario"
                            value={form.usuario}
                            onChange={handleChange}
                            autoComplete="username"
                        />
                    </div>

                    {/* Campo: Contraseña */}
                    <div className="input-group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <input
                            type="password"
                            name="contrasena"
                            placeholder="Contraseña"
                            value={form.contrasena}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" className="btn-auth-submit">
                        Ingresar a la plataforma
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