import pandas as pd
from src.preprocesamiento import cargar_datos, manejar_nulos, estandarizar_texto, limpiar_duracion

# ── CARGA DE DATOS ──────────────────────────────────────────────────────────
df_estudiantes = cargar_datos("data/raw/estudiantes.csv")
df_certificados = cargar_datos("data/raw/certificados.csv")

# ── LIMPIEZA DE DATOS ────────────────────────────────────────────────────────
df_estudiantes = manejar_nulos(df_estudiantes, ["nombre", "id_estudiante"])
df_estudiantes = estandarizar_texto(df_estudiantes, ["nombre", "programa", "ciudad"])

df_certificados = manejar_nulos(df_certificados, ["id_estudiante", "nombre_curso"])
df_certificados = estandarizar_texto(df_certificados, ["nombre_curso", "institucion", "estado"])
df_certificados = limpiar_duracion(df_certificados)

# ── GUARDAR DATOS LIMPIOS ────────────────────────────────────────────────────
df_estudiantes.to_csv("data/processed/estudiantes_limpios.csv", index=False)
df_certificados.to_csv("data/processed/certificados_limpios.csv", index=False)
print("Datos limpios guardados en data/processed/")

# ── MERGE ────────────────────────────────────────────────────────────────────
# Unimos los dos CSV por id_estudiante.
df_merge = pd.merge(df_certificados, df_estudiantes, on="id_estudiante", how="left")
print("\nMerge realizado correctamente")

# ── PREGUNTA 1: ¿Quién tiene más certificados? ───────────────────────────────
print("\n── PREGUNTA 1: Estudiante con más certificados ──")
certificados_por_estudiante = df_merge.groupby("nombre")["id_certificado"].count()
estudiante_top = certificados_por_estudiante.idxmax()
cantidad_top = certificados_por_estudiante.max()
print(f"El estudiante con más certificados es: {estudiante_top} con {cantidad_top} certificados")

# ── PREGUNTA 2: ¿Cuál programa tiene más horas promedio? ────────────────────
print("\n── PREGUNTA 2: Promedio de horas por programa ──")
horas_por_programa = df_merge.groupby("programa")["duracion_horas"].mean().round(2)
print(horas_por_programa.to_string())

# ── PREGUNTA 3: ¿Cuántos certificados están completados? ────────────────────
print("\n── PREGUNTA 3: Certificados completados ──")
completados = df_merge[df_merge["estado"] == "completado"]
print(f"Total de certificados completados: {len(completados)}")
