"""
Consume la API REST de Skillsphere y genera visualizaciones con gráficos.
Endpoints disponibles:
- /api/job-offers → Ofertas laborales
- /api/certificates → Certificados
- /api/students → Estudiantes
"""

import argparse
import sys
from typing import Any, Dict, List

import matplotlib.pyplot as plt
import requests


def fetch_from_skillsphere(api_url: str, auth: tuple = None) -> Any:
    """Consume la API de Skillsphere y devuelve JSON con autenticación."""
    try:
        if auth:
            response = requests.get(api_url, auth=auth)
        else:
            response = requests.get(api_url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as error:
        print(f"Error al consumir la API: {error}", file=sys.stderr)
        raise


def process_job_offers(data: List[Dict]) -> Dict[str, int]:
    """Procesa ofertas laborales por área/categoría."""
    categories = {}
    for offer in data:
        # Agrupa por título del trabajo o empresa
        key = offer.get("title", "Sin especificar")
        categories[key] = categories.get(key, 0) + 1
    return categories


def process_certificates(data: List[Dict]) -> Dict[str, int]:
    """Procesa certificados por tipo o institución."""
    cert_types = {}
    for cert in data:
        # Agrupa por nombre del certificado o institución
        key = cert.get("certificationName", cert.get("institution", "Sin especificar"))
        cert_types[key] = cert_types.get(key, 0) + 1
    return cert_types


def process_students(data: List[Dict]) -> Dict[str, int]:
    """Procesa cantidad de estudiantes por programa."""
    programs = {}
    for student in data:
        # Agrupa por programa académico
        key = student.get("program", "Sin especificar")
        programs[key] = programs.get(key, 0) + 1
    return programs


def create_skillsphere_visualization(
    chart_data: Dict[str, int], 
    title: str, 
    endpoint_type: str,
    output_path: str
) -> None:
    """Crea un gráfico visualizando los datos de Skillsphere."""
    
    if not chart_data:
        print("⚠️  No hay datos para visualizar", file=sys.stderr)
        return
    
    labels = list(chart_data.keys())
    values = list(chart_data.values())
    
    # Limita a 10 categorías principales si hay más
    if len(labels) > 10:
        sorted_data = sorted(zip(labels, values), key=lambda x: x[1], reverse=True)[:10]
        labels, values = zip(*sorted_data)
        labels = list(labels)
        values = list(values)
    
    fig, ax = plt.subplots(figsize=(12, 6))
    
    colors = plt.cm.viridis(range(len(labels)))
    bars = ax.bar(labels, values, color=colors, edgecolor="black", linewidth=1.2)
    
    # Estilos
    ax.set_title(title, fontsize=16, fontweight="bold", pad=20)
    ax.set_ylabel("Cantidad", fontsize=12, fontweight="bold")
    ax.set_xlabel(f"{endpoint_type.title()}", fontsize=12, fontweight="bold")
    ax.tick_params(axis="x", rotation=45)
    
    # Añade valores en las barras
    for bar in bars:
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height,
                f'{int(height)}',
                ha='center', va='bottom', fontsize=10)
    
    plt.tight_layout()
    fig.savefig(output_path, dpi=150, bbox_inches="tight")
    print(f"✅ Gráfico guardado en: {output_path}")
    plt.close()


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Consume la API de Skillsphere y genera gráficos de análisis.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Ejemplos de uso:
  python consume_skillsphere_api.py --endpoint job-offers
  python consume_skillsphere_api.py --endpoint certificates --output grafico_certificados.png
  python consume_skillsphere_api.py --api-url http://localhost:8080 --endpoint students
        """
    )
    
    parser.add_argument(
        "--api-url",
        default="http://localhost:8080",
        help="URL base de la API Skillsphere (default: http://localhost:8080)",
    )
    
    parser.add_argument(
        "--endpoint",
        choices=["job-offers", "certificates", "students"],
        default="job-offers",
        help="Endpoint de Skillsphere a consumir (default: job-offers)",
    )
    
    parser.add_argument(
        "--output",
        default="skillsphere_analysis.png",
        help="Ruta del archivo PNG de salida (default: skillsphere_analysis.png)",
    )
    parser.add_argument(
        "--username",
        default="admin",
        help="Usuario para autenticación en Skillsphere (default: admin)",
    )
    
    parser.add_argument(
        "--password",
        default="admin123",
        help="Contraseña para autenticación en Skillsphere (default: admin123)",
    )
    
    args = parser.parse_args()
    
    try:
        # Construye la URL completa
        full_url = f"{args.api_url}/api/{args.endpoint}"
        print(f"📡 Consumiendo: {full_url}")
        print(f"👤 Autenticando como: {args.username}")
        
        # Consume la API con autenticación HTTP Basic
        auth = (args.username, args.password)
        data = fetch_from_skillsphere(full_url, auth)
        
        # Procesa los datos según el tipo de endpoint
        if args.endpoint == "job-offers":
            chart_data = process_job_offers(data)
            title = "📊 Análisis de Ofertas Laborales - Skillsphere"
        elif args.endpoint == "certificates":
            chart_data = process_certificates(data)
            title = "🏆 Análisis de Certificados - Skillsphere"
        else:  # students
            chart_data = process_students(data)
            title = "👥 Análisis de Estudiantes por Institución - Skillsphere"
        
        # Crea la visualización
        create_skillsphere_visualization(
            chart_data,
            title,
            args.endpoint,
            args.output
        )
        
        # Imprime resumen
        print(f"\n📈 Resumen:")
        print(f"   Endpoint: {args.endpoint}")
        print(f"   Total de registros: {len(data)}")
        print(f"   Categorías identificadas: {len(chart_data)}")
        print(f"   Total de elementos: {sum(chart_data.values())}")
        
        return 0
        
    except Exception as error:
        print(f"❌ Error: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
