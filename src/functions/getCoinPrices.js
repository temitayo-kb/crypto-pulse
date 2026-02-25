import axios from "axios";
import { CACHE_DURATION } from "../constants/cache";
import { API_BASE_URL, API_ENDPOINTS, API_PARAMS } from "../constants/api";

const cache = {};

export const getCoinPrices = async (id, days, priceType) => {
  const cacheKey = `${id}-${days}-ALL`;
  const now = Date.now();

  if (
    cache[cacheKey] &&
    now - cache[cacheKey].timestamp < CACHE_DURATION.COIN_PRICES
  ) {
    return cache[cacheKey].data[priceType];
  }

  try {
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.COIN_DETAIL}/${id}${API_ENDPOINTS.MARKET_CHART}`,
      {
        params: {
          vs_currency: API_PARAMS.VS_CURRENCY,
          days: days,
          interval: API_PARAMS.INTERVAL,
        },
      },
    );

    if (response.data) {
      const allData = {
        prices: response.data.prices,
        market_caps: response.data.market_caps,
        total_volumes: response.data.total_volumes,
      };

      cache[cacheKey] = {
        data: allData,
        timestamp: now,
      };

      return allData[priceType];
    }
  } catch (error) {
    console.error("Error fetching coin prices:", error);

    if (cache[cacheKey]?.data) {
      return cache[cacheKey].data[priceType];
    }

    throw error;
  }
};
