# Contexto de Análisis de Datos: SkillSphere Python (M3)

Este documento centraliza el contexto exclusivo para el análisis de datos (Python) correspondiente al Momento 3 del proyecto.

## 📌 Objetivo Principal
El objetivo de Python en este Momento 3 es **consumir la API provista por el Backend** (Java Spring Boot) para ingestar datos JSON limpios, analizarlos, y muy probablemente preparar los textos semánticos que el backend convertirá a **Embeddings** para su base de datos.

## 🛠️ Tecnologías Esperadas
- **Lenguaje:** Python 3.x
- **Consumo de API:** `requests`
- **Manejo de Datos:** `pandas`, `numpy` (y el trabajo de limpieza previo del M1/M2).

## 🚀 Siguientes Pasos (Pendientes de la Guía Oficial)
1. Extraer los datos limpios que se trabajaron en el Momento 1 y 2.
2. Identificar la estructura exacta (columnas y tipos de datos) que debe enviar al Backend.
3. Crear scripts en Python para realizar peticiones POST a la API del Backend, alimentando la base de datos Supabase a través del *Source of Truth* en Java.
4. (Posible) Generar o limpiar la información semántica que el Backend utilizará para crear los **Embeddings**.

*(Este archivo se poblará con más detalle en futuras sesiones cuando se entreguen los requisitos exactos de esta materia y se proceda con su desarrollo).*
