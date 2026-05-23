import argparse
import io
import sys
from typing import Any, Dict, List

import matplotlib.pyplot as plt
import requests
from PIL import Image


def fetch_json(api_url: str) -> Any:
    response = requests.get(api_url)
    response.raise_for_status()
    return response.json()


def fetch_image(image_url: str) -> Image.Image:
    response = requests.get(image_url)
    response.raise_for_status()
    return Image.open(io.BytesIO(response.content))


def parse_chart_data(data: Any) -> Dict[str, float]:
    if isinstance(data, dict):
        if "items" in data and isinstance(data["items"], list):
            items = data["items"]
        else:
            items = [data]
    elif isinstance(data, list):
        items = data
    else:
        raise ValueError("No se pudo extraer datos de la respuesta JSON.")

    labels = []
    values = []
    for item in items:
        if not isinstance(item, dict):
            continue
        label = item.get("label") or item.get("name") or item.get("category")
        value = item.get("value") or item.get("count") or item.get("score")
        if label is not None and isinstance(value, (int, float)):
            labels.append(str(label))
            values.append(value)

    if not labels or not values:
        raise ValueError(
            "El JSON recibido no contiene campos compatibles. Use claves 'label'/'name'/'category' y 'value'/'count'/'score'."
        )

    return {label: value for label, value in zip(labels, values)}


def plot_image_and_chart(image: Image.Image, chart_data: Dict[str, float], output_path: str) -> None:
    labels = list(chart_data.keys())
    values = list(chart_data.values())

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))

    ax1.imshow(image)
    ax1.axis("off")
    ax1.set_title("Imagen descargada")

    ax2.bar(labels, values, color="#4C72B0")
    ax2.set_title("Gráfico de datos de la API")
    ax2.set_ylabel("Valor")
    ax2.set_xlabel("Categoría")
    ax2.tick_params(axis="x", rotation=45)

    plt.tight_layout()
    fig.savefig(output_path, dpi=150)
    print(f"Gráfico generado y guardado en: {output_path}")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Consume una API, descarga una imagen y crea un gráfico combinado."
    )
    parser.add_argument(
        "--api-url",
        default="https://api.publicapis.org/entries",
        help="URL de la API que devuelve JSON.",
    )
    parser.add_argument(
        "--image-url",
        default="https://via.placeholder.com/450",
        help="URL de la imagen a descargar y mostrar.",
    )
    parser.add_argument(
        "--output",
        default="result.png",
        help="Ruta del archivo de salida del gráfico combinado.",
    )

    args = parser.parse_args()

    try:
        data = fetch_json(args.api_url)
        chart_data = parse_chart_data(data)
        image = fetch_image(args.image_url)
        plot_image_and_chart(image, chart_data, args.output)
        return 0
    except requests.RequestException as error:
        print(f"Error en la solicitud HTTP: {error}", file=sys.stderr)
        return 1
    except Exception as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
