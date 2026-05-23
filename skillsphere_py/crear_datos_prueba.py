"""
Crea datos de prueba en la API de Skillsphere
"""
import requests
from requests.auth import HTTPBasicAuth

BASE_URL = "http://localhost:8080/api"
auth = HTTPBasicAuth("admin", "admin123")

# Datos de prueba para ofertas laborales
job_offers = [
    {"title": "Desarrollador Java Junior", "company": "Tech Solutions", "description": "Buscamos desarrollador Java", "salary": "1500 USD", "schedule": "Tiempo Completo", "modality": "Remoto", "active": True},
    {"title": "Analista de Datos Jr", "company": "Data Corp", "description": "Analista para equipo de BI", "salary": "1800 USD", "schedule": "Medio Tiempo", "modality": "Híbrido", "active": True},
    {"title": "Frontend Developer", "company": "Web Innovations", "description": "Experiencia en React", "salary": "2000 USD", "schedule": "Tiempo Completo", "modality": "Remoto", "active": True},
    {"title": "Backend Developer", "company": "FinTech Latam", "description": "Java Spring Boot", "salary": "2500 USD", "schedule": "Tiempo Completo", "modality": "Presencial", "active": True},
    {"title": "Data Scientist", "company": "AI Start", "description": "Modelos de ML e IA", "salary": "3000 USD", "schedule": "Tiempo Completo", "modality": "Remoto", "active": True},
]

print("📝 Creando datos de prueba...")
for i, offer in enumerate(job_offers, 1):
    try:
        response = requests.post(f"{BASE_URL}/job-offers", json=offer, auth=auth)
        if response.status_code == 201:
            print(f"✅ Oferta {i} creada: {offer['title']}")
        else:
            print(f"❌ Error {response.status_code}: {response.text}")
    except Exception as e:
        print(f"❌ Error al crear oferta {i}: {e}")

print("\n✅ Datos de prueba creados!")
