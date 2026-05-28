import { useState, useEffect, useCallback } from 'react';

const BASE_URL = 'http://localhost:8080/api';

export function useApi(endpoint) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // GET: Obtener datos
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`Error ${response.status}: No se pudieron obtener los datos.`);
            }
            const json = await response.json();
            setData(json);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [endpoint]);

    // POST: Crear registro
    const postData = async (body) => {
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error('No se pudo guardar el registro en el servidor.');
            }
            // Recargamos la lista actualizada desde la base de datos
            await fetchData();
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    // DELETE: Eliminar registro
    const deleteData = async (id) => {
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}${endpoint}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('No se pudo eliminar el registro del servidor.');
            }
            // Filtrar del estado local para actualización instantánea en interfaz
            setData((prevData) => prevData.filter((item) => item.id !== id));
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    };

    // Carga inicial automática al montar el componente (Semana 10)
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, postData, deleteData, refetch: fetchData };
}