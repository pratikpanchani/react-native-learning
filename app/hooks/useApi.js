import { useState } from "react";

const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const request = async (...args) => {
    const response = await apiFunc(...args);

    if (!response.ok) return setError(true);

    setError(false);
    setData(response.data);
  };

  return { data, error, request };
};

export default useApi
