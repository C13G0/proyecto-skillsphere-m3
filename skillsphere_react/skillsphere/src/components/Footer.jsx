import './Footer.css'

function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Lado Izquierdo: Logotipo sutil y Copyright */}
        <div className="footer-left">
          <div className="footer-brand">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="footer-brand-icon"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            <span>SkillSphere</span>
          </div>
          <p className="footer-copyright">
            © {anioActual} — Todos los derechos reservados.
          </p>
        </div>

        {/* Lado Derecho: Indicador de estado estilo Dashboard Premium */}
        <div className="footer-right">
          <div className="status-badge">
            <span className="status-dot"></span>
            <span className="status-text">Backend Online</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer