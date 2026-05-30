import os
import sys
import requests
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# ── CONFIGURACIÓN DE RUTAS Y API (SIN SEGURIDAD) ─────────────────────────────
BASE_URL = "http://localhost:8080/api"

# Rutas de salida para React (Opción A)
REACT_PUBLIC_DIR = os.path.join("..", "skillsphere_react", "skillsphere", "public")
PATH_GRAFICO_1 = os.path.join(REACT_PUBLIC_DIR, "grafico_programas.png") # Ahora será una torta
PATH_GRAFICO_2 = os.path.join(REACT_PUBLIC_DIR, "grafico_instituciones.png") # Seguirán siendo barras horiz.

# Ruta de salida para el reporte académico del profesor
REPORT_HTML_PATH = "reporte.html"

# Asegurar que la carpeta public de React exista
os.makedirs(REACT_PUBLIC_DIR, exist_ok=True)


# ── 1. CONSUMO DE API REAL (PETICIÓN LIMPIA) ──────────────────────────────────
def fetch_api_data(endpoint: str) -> pd.DataFrame:
    """Consume un endpoint de la API sin seguridad y lo retorna como DataFrame."""
    url = f"{BASE_URL}/{endpoint}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return pd.DataFrame(data)
    except requests.RequestException as e:
        print(f"❌ Error al conectar con el endpoint /api/{endpoint}: {e}", file=sys.stderr)
        return pd.DataFrame()


# ── 2. MÓDULO DE VISUALIZACIÓN (GRÁFICOS DIFERENTES) ──────────────────────────

def graficar_estudiantes_por_programa(df_students: pd.DataFrame) -> None:
    """Genera un GRÁFICO DE TORTA para la distribución de estudiantes."""
    if df_students.empty or "program" not in df_students.columns:
        print("⚠️ No hay datos válidos para graficar programas de estudiantes.")
        return

    # Conteo de datos
    conteo_programas = df_students["program"].value_counts()
    
    # Configurar el gráfico de torta
    plt.figure(figsize=(8, 8)) # Cuadrado para que la torta sea redonda
    
    # Definir colores bonitos usando una paleta de Seaborn
    colors = sns.color_palette("pastel")[0:len(conteo_programas)]

    # Crear el gráfico de torta
    patches, texts, autotexts = plt.pie(
        conteo_programas.values, 
        labels=conteo_programas.index, 
        autopct='%1.1f%%', # Muestra porcentajes con un decimal
        startangle=140, # Rota el inicio para mejor estética
        colors=colors,
        wedgeprops={'edgecolor': 'white', 'linewidth': 1} # Bordes blancos entre porciones
    )

    # Estilizar los textos
    plt.setp(texts, size=10, weight="bold")
    plt.setp(autotexts, size=10, weight="bold", color="white") # Porcentajes dentro

    plt.title("Distribución Porcentual de Estudiantes por Programa", fontsize=14, fontweight="bold", pad=20)
    plt.axis('equal') # Asegura que la torta sea un círculo perfecto

    plt.tight_layout()
    plt.savefig(PATH_GRAFICO_1, dpi=150)
    plt.close()
    print(f"✅ Gráfico 1 (TORTA) guardado en React public: {PATH_GRAFICO_1}")


def graficar_certificados_por_institucion(df_certs: pd.DataFrame, df_insts: pd.DataFrame) -> pd.DataFrame:
    """Genera un GRÁFICO DE BARRAS HORIZONTALES para las instituciones."""
    if df_certs.empty or "institution_id" not in df_certs.columns or df_insts.empty:
        print("⚠️ Datos insuficientes para cruzar certificados e instituciones.")
        return pd.DataFrame()

    # Combinar datos (cruce real)
    df_merged = pd.merge(df_certs, df_insts, left_on="institution_id", right_on="id", suffixes=("_cert", "_inst"))
    
    # CORRECCIÓN: Usamos 'name_inst' porque Pandas lo renombró para evitar colisiones
    conteo_instituciones = df_merged["name_inst"].value_counts()

    plt.figure(figsize=(10, 5))
    sns.set_theme(style="whitegrid")
    
    # Gráfico de barras horizontales
    ax = sns.barplot(
        x=conteo_instituciones.values, 
        y=conteo_instituciones.index, 
        palette="magma", 
        hue=conteo_instituciones.index, 
        legend=False
    )
    
    # Quitamos el emoji para limpiar el UserWarning de fuentes
    plt.title("Top Instituciones por Certificados Emitidos", fontsize=14, fontweight="bold", pad=15)
    plt.xlabel("Cantidad Absoluta de Certificados", fontsize=11, fontweight="bold")
    plt.ylabel("Institución", fontsize=11, fontweight="bold")

    # Añadir valores al final de las barras
    for p in ax.patches:
        width = p.get_width()
        ax.annotate(f'{int(width)}', (width, p.get_y() + p.get_height() / 2.),
                    ha='left', va='center', fontsize=10, color='black', xytext=(5, 0),
                    textcoords='offset points')

    plt.tight_layout()
    plt.savefig(PATH_GRAFICO_2, dpi=150)
    plt.close()
    print(f"✅ Gráfico 2 (BARRAS HORIZ.) guardado en React public: {PATH_GRAFICO_2}")
    
    return df_merged


# ── 3. GENERADOR DE REPORTES (HTML ÚNICO CORREGIDO) ───────────────────────────
def generar_reporte_html(df_students: pd.DataFrame, df_certs_complete: pd.DataFrame):
    """Ensambla el archivo HTML con estilos y gráficos variados."""
    
    tabla_estudiantes_html = df_students[["id", "firstName", "lastName", "email", "program"]].to_html(index=False, classes="display cell-border") if not df_students.empty else "<p>No hay datos disponibles</p>"
    
    columnas_certs = ["id_cert", "name_cert", "year", "name_inst"]
    columnas_existentes = [col for col in columnas_certs if col in df_certs_complete.columns]
    tabla_certificados_html = df_certs_complete[columnas_existentes].to_html(index=False, classes="display cell-border") if not df_certs_complete.empty else "<p>No hay datos disponibles</p>"

    # HTML y CSS permanecen igual, solo cambia el contenido visual de la imagen referenciada
    html_content = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reporte Analítico - SkillSphere</title>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    
    <style>
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f6f9;
            color: #333;
            margin: 0;
            padding: 20px;
        }}
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            background: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }}
        h1 {{
            color: #2c3e50;
            text-align: center;
            margin-bottom: 20px;
        }}
        h2 {{
            color: #16a085;
            border-left: 5px solid #16a085;
            padding-left: 10px;
            margin-top: 30px;
        }}
        hr {{
            border: 0;
            height: 1px;
            background: #dcdde1;
            margin: 20px 0;
        }}
        .flex-container {{
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 20px;
            align-items: center;
        }}
        .chart-box {{
            flex: 1;
            min-width: 450px;
            text-align: center;
        }}
        .chart-box img {{
            max-width: 100%;
            height: auto;
            border-radius: 6px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }}
        .table-box {{
            flex: 1;
            min-width: 450px;
        }}
        table.dataTable {{
            width: 100% !important;
            font-size: 0.9rem;
            margin-top: 10px;
        }}
        table.dataTable thead th {{
            background-color: #2c3e50 !important;
            color: white !important;
            font-weight: bold;
        }}
        table.dataTable tbody tr:hover {{
            background-color: #f1f2f6 !important;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 Reporte Ejecutivo de Analítica Corregido - SkillSphere</h1>
        <hr>
        
        <h2>1. Análisis Proporcional de Programas (Torta)</h2>
        <div class="flex-container">
            <div class="chart-box">
                <img src="{PATH_GRAFICO_1}" alt="Gráfico de Torta de Estudiantes por Programa">
            </div>
            <div class="table-box">
                <h3>Listado de Estudiantes Activos</h3>
                {tabla_estudiantes_html}
            </div>
        </div>

        <br><hr><br>

        <h2>2. Comparativa de Certificaciones por Institución (Barras)</h2>
        <div class="flex-container">
            <div class="chart-box">
                <img src="{PATH_GRAFICO_2}" alt="Gráfico de Barras de Certificados por Institución">
            </div>
            <div class="table-box">
                <h3>Mapeo de Certificados Emitidos</h3>
                {tabla_certificados_html}
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function() {{
            $('table.display').DataTable({{
                "language": {{
                    "url": "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
                }},
                "pageLength": 5,
                "lengthMenu": [5, 10, 25]
            }});
        }});
    </script>
</body>
</html>
"""
    with open(REPORT_HTML_PATH, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"🚀 Reporte HTML único generado con gráficos variados: {REPORT_HTML_PATH}")


# ── 4. ORQUESTADOR PRINCIPAL ──────────────────────────────────────────────────
def main():
    print("📡 Conectando con la API de Spring Boot (Puerto 8080)...")
    
    # Consumo real de los 3 endpoints necesarios
    df_students = fetch_api_data("students")
    df_certificates = fetch_api_data("certificates")
    df_institutions = fetch_api_data("institutions")
    
    if df_students.empty and df_certificates.empty:
        print("❌ No se recibieron datos. Asegúrate de tener corriendo el Backend en Java.")
        return

    print("📊 Procesando estructuras y renderizando gráficos variados...")
    # Ejecutar funciones de graficación (Torta y Barras Horizontales)
    graficar_estudiantes_por_programa(df_students)
    df_certs_merged = graficar_certificados_por_institucion(df_certificates, df_institutions)
    
    print("📋 Estructurando reporte interactivo...")
    generar_reporte_html(df_students, df_certs_merged)


if __name__ == "__main__":
    main()