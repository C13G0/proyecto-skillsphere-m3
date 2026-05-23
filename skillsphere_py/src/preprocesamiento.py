import pandas as pd

def cargar_datos(ruta):
    df = pd.read_csv(ruta)
    print(f"Archivo cargado: {ruta}")
    print(f"Filas: {len(df)}  Columnas: {len(df.columns)}")
    return df


def manejar_nulos(df, columnas_criticas):
    print(f"Nulos antes de limpiar:")
    print(df.isna().sum())
    df = df.dropna(subset=columnas_criticas)
    print(f"Filas después de eliminar nulos críticos: {len(df)}")
    return df


def estandarizar_texto(df, columnas_texto):
    for columna in columnas_texto:
        df[columna] = df[columna].str.lower().str.strip()
    print(f"Texto estandarizado en columnas: {columnas_texto}")
    return df


def limpiar_duracion(df):
    # Si la columna duracion_horas tiene valores vacíos, los rellena con 0
    df["duracion_horas"] = pd.to_numeric(df["duracion_horas"], errors="coerce")
    df["duracion_horas"] = df["duracion_horas"].fillna(0)
    print("Duración limpiada: valores nulos reemplazados por 0")
    return df