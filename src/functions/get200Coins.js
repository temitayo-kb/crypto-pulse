import axios from "axios";
import { CACHE_DURATION } from "../constants/cache";
import { API_BASE_URL, API_ENDPOINTS, API_PARAMS } from "../constants/api";

let cache = null;
let cacheTimestamp = null;

export const get200Coins = async () => {
  const now = Date.now();

  if (cache && now - cacheTimestamp < CACHE_DURATION.COIN_LIST) {
    return cache;
  }

  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.COINS_MARKETS}`,
      {
        params: {
          vs_currency: API_PARAMS.VS_CURRENCY,
          order: API_PARAMS.ORDER,
          per_page: API_PARAMS.PER_PAGE,
          page: API_PARAMS.PAGE,
        },
      },
    );

    if (response.data) {
      cache = response.data;
      cacheTimestamp = now;
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching coin list:", error);
    return cache || [];
  }
};
