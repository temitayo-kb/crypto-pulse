import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header/Header";
import Loader from "../components/Common/Loader/Loader";
import TabsComponent from "../components/Dashboard/Tabs/Tabs";
import { useFavorites } from "../hooks/useFavorites";
import { get200Coins } from "../functions/get200Coins";

function WatchlistPage() {
  const { favorites } = useFavorites();
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCoins() {
      // If no favorites, don't fetch anything
      if (favorites.length === 0) {
        setCoins([]);
        return;
      }

      setIsLoading(true);

      // get200Coins will return cached data if available (30 min cache)
      // No API call if user came from Dashboard/Compare/Coin page recently
      const allCoins = await get200Coins();

      // Filter only favorited coins
      const favoriteCoins = allCoins.filter((coin) =>
        favorites.includes(coin.id),
      );

      setCoins(favoriteCoins);
      setIsLoading(false);
    }

    fetchCoins();
  }, [favorites]);

  // Show empty state immediately if no favorites
  if (favorites.length === 0) {
    return (
      <div>
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <h2 style={{ color: "var(--white)", margin: 0 }}>No Favorites Yet</h2>
          <p style={{ color: "var(--grey)", margin: 0 }}>
            Add coins to your watchlist by clicking the star icon
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      {isLoading ? <Loader /> : <TabsComponent coins={coins} />}
    </div>
  );
}

export default WatchlistPage;
