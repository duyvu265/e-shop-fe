import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";


const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async ({ url, signal }) => {
    setLoading(true);
    setError(false);
    setData(null);

    try {
      const res = await apiClient.get(url, { signal });
      setData(res.data);
      setError(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchData({ url, signal });

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
