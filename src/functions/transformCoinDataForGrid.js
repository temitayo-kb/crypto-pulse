export const transformCoinDataForGrid = (coinData) => {
  if (!coinData || !coinData.market_data) return null;

  return {
    id: coinData.id,
    name: coinData.name,
    symbol: coinData.symbol,
    image: coinData.image.large,
    price_change_percentage_24h:
      coinData.market_data.price_change_percentage_24h,
    current_price: coinData.market_data.current_price.usd,
    total_volume: coinData.market_data.total_volume.usd,
    market_cap: coinData.market_data.market_cap.usd,
  };
};
