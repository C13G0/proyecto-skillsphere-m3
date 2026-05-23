# SkillSphere - Análisis de Datos

Proyecto de análisis de datos con Python y Pandas para la plataforma SkillSphere.

## Descripción
Este proyecto carga, limpia y analiza datos de estudiantes y certificados de la plataforma SkillSphere.

## Requisitos
- Python 
- pandas

## Configuración del entorno

1. Crea el entorno virtual:
python -m venv venv

2. Actívalo:
.\venv\Scripts\activate

3. Instala las dependencias:
pip install -r requirements.txt

## Ejecución
python analisis.py

## Estructura del proyecto
- data/raw/ → datos crudos originales
- data/processed/ → datos limpios después del procesamiento
- src/preprocesamiento.py → módulo con funciones de limpieza
- analisis.py → script principal
