import { useState, useCallback, useRef } from "react";
import { principalApi, deoApi, accountsApi, adminApi } from "../utils/Axios";
import { generateOneTimeToken } from "../utils/AuthToken";
import Swal from "sweetalert2";

/**
 * Decide which Axios instance to use
 */
const getAxiosInstance = (apiKey) => {
  switch (apiKey) {
    case "principal":
      return principalApi;
    case "deo":
      return deoApi;
    case "accounts":
      return accountsApi;
    case "admin":
      return adminApi;
    default:
      return null;
  }
};

const useApi = () => {
  const [loadingMap, setLoadingMap] = useState({});
  const latestRequestRef = useRef({});

  const setLoading = (key, value) => {
    setLoadingMap((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * Core API executor
   */
  const callApi = useCallback(
    async (
      apiKey,
      method,
      url,
      payload = null,
      loadingKey = apiKey
    ) => {
      const requestId =
        (latestRequestRef.current[loadingKey] || 0) + 1;
      latestRequestRef.current[loadingKey] = requestId;

      setLoading(loadingKey, true);

      const api = getAxiosInstance(apiKey);

      if (!api) {
        throw new Error(`Invalid API key: ${apiKey}`);
      }

      try {
        const { status, data } = await api({
          method,
          url,
          data: payload,
          headers: {
            "X-API-Key": generateOneTimeToken(),
          },
        });

        if (latestRequestRef.current[loadingKey] !== requestId) {
          return { success: false, stale: true };
        }

        return {
          success: true,
          status,
          data: data?.data,
          message: data?.message ?? null,
        };
      } catch (err) {
        if (latestRequestRef.current[loadingKey] !== requestId) {
          return { success: false, stale: true };
        }

        let errorMessage = "Something went wrong.";

        // Network / server unreachable
        if (!err.response) {
          errorMessage =
            "Server is starting or temporarily unavailable. Please wait and try again.";
        }
        // Backend returned HTML (maintenance page)
        else if (
          typeof err.response.data === "string" &&
          err.response.data.toLowerCase().includes("<!doctype html")
        ) {
          errorMessage =
            "Server is currently offline or under maintenance. Please try again later.";
        }
        // Normal backend error
        else {
          errorMessage =
            err.response?.data?.message ||
            err.response?.data ||
            err.message ||
            "Something went wrong.";
        }

        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });

        return {
          success: false,
          status: err?.response?.status ?? 0,
          data: null,
          error: errorMessage,
        };
      } finally {
        if (latestRequestRef.current[loadingKey] === requestId) {
          setLoading(loadingKey, false);
        }
      }
    },
    []
  );

  /**
   * Create an API caller with API key fixed once
   */
  const createCaller = (apiKey) => {
    return (method, url, payload, loadingKey = apiKey) =>
      callApi(apiKey, method, url, payload, loadingKey);
  };

  return {
    callApi,
    createCaller,
    isLoading: (key) => !!loadingMap[key],
    globalLoading: Object.values(loadingMap).some(Boolean),
  };
};

export default useApi;