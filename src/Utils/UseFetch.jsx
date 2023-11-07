import React, { useEffect, useState } from "react";
import axios from "axios";
const UseFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchFunc = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        setErr(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFunc();
  }, [url]);
  return {
    data,
    loading,
    err,
  };
};

export default UseFetch;
