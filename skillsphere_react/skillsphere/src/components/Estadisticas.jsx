import React from 'react';
import { useNavigate } from 'react-router-dom';

const Estadisticas = () => {
  const navigate = useNavigate();

  // Función para volver al Login/Ventana principal
  const handleVolver = () => {
    navigate('/login'); // Ajusta a '/' si tu login es la raíz
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={handleVolver} style={styles.backButton}>
          ← Volver al Login
        </button>
        <h1 style={styles.title}>📊 Panel de Analítica Oculto</h1>
      </div>

      <div style={styles.grid}>
        {/* Gráfico 1: Torta */}
        <div style={styles.card}>
          <h2>Distribución de Estudiantes</h2>
          <img 
            src="/grafico_programas.png" 
            alt="Gráfico de Torta Programas" 
            style={styles.chart}
            // Evita que el navegador cachee el gráfico viejo si cambia
            onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Ejecuta+el+script+de+Python'; }}
          />
        </div>

        {/* Gráfico 2: Barras Horizontales */}
        <div style={styles.card}>
          <h2>Certificaciones por Institución</h2>
          <img 
            src="/grafico_instituciones.png" 
            alt="Gráfico de Barras Instituciones" 
            style={styles.chart}
            onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Ejecuta+el+script+de+Python'; }}
          />
        </div>
      </div>
    </div>
  );
};

// Estilos rápidos en línea para no complicarnos con archivos CSS externos
const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f4f6f9',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '30px',
    borderBottom: '2px solid #dcdde1',
    paddingBottom: '15px',
  },
  title: {
    margin: 0,
    color: '#2c3e50',
  },
  backButton: {
    padding: '10px 15px',
    backgroundColor: '#16a085',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '25px',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    flex: '1',
    minWidth: '450px',
    maxWidth: '600px',
  },
  chart: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
    marginTop: '15px',
  }
};

export default Estadisticas;