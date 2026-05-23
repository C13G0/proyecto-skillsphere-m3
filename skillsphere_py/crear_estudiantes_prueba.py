"""
Crea estudiantes de prueba en la API de Skillsphere.
"""
import requests
from requests.auth import HTTPBasicAuth

BASE_URL = "http://localhost:8080/api"
auth = HTTPBasicAuth("admin", "admin123")

students = [
    {"firstName": "Juan", "lastName": "Pérez", "email": "juan.perez@example.com", "phone": "+573001234567", "birthDate": "1998-04-12", "program": "Ingeniería de Software"},
    {"firstName": "María", "lastName": "Rodríguez", "email": "maria.rodriguez@example.com", "phone": "+573112345678", "birthDate": "2000-07-22", "program": "Ciencia de Datos"},
    {"firstName": "Carlos", "lastName": "Gómez", "email": "carlos.gomez@example.com", "phone": "+573212345679", "birthDate": "1999-09-05", "program": "Ingeniería de Software"},
    {"firstName": "Ana", "lastName": "Martínez", "email": "ana.martinez@example.com", "phone": "+573312345670", "birthDate": "2001-01-15", "program": "Ciberseguridad"},
    {"firstName": "Luis", "lastName": "Ramírez", "email": "luis.ramirez@example.com", "phone": "+573412345671", "birthDate": "1997-11-30", "program": "Ciencia de Datos"},
]

print("📝 Creando estudiantes de prueba...")
for i, student in enumerate(students, start=1):
    response = requests.post(f"{BASE_URL}/students", json=student, auth=auth)
    if response.status_code in (200, 201):
        print(f"✅ Estudiante {i} creado: {student['firstName']} {student['lastName']}")
    else:
        print(f"❌ Error {response.status_code}: {response.text}")

print("\n✅ Estudiantes de prueba creados.")
