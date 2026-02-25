import axios from "axios";
import { CACHE_DURATION } from "../constants/cache";
import { API_BASE_URL, API_ENDPOINTS } from "../constants/api";

const cache = {};

export const getCoinData = async (id, setError) => {
  const now = Date.now();

  if (cache[id] && now - cache[id].timestamp < CACHE_DURATION.COIN_DATA) {
    return cache[id].data;
  }

  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.COIN_DETAIL}/${id}`,
    );

    if (response.data) {
      cache[id] = {
        data: response.data,
        timestamp: now,
      };
      return response.data;
    }
  } catch (e) {
    console.log(e.message);
    if (setError) {
      setError(true);
    }

    if (cache[id]?.data) {
      return cache[id].data;
    }

    throw e;
  }
};
