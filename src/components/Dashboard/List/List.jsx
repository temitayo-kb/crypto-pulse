import React, { useState } from "react";
import "./List.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { formatNumber } from "../../../functions/FormatNumber";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../../Common/FavoriteButton/FavoriteButton";
import { useFavorites } from "../../../hooks/useFavorites";

function List({ coin, useCompactFormat }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleRowClick = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    navigate(`/coin/${coin.id}`);
    setTimeout(() => setIsNavigating(false), 2000); 
  };

  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    <tr
      className={`list-row ${
        isPositive ? "list-row-positive" : "list-row-negative"
      }`}
      onClick={handleRowClick}
    >
      <td className="list-cell list-cell-coin">
        <FavoriteButton
          className="favorite-button"
          coinId={coin.id}
          isFavorite={isFavorite(coin.id)}
          onToggle={toggleFavorite}
        />
        <img
          src={coin.image}
          className="header-logo"
          alt={coin.name}
          style={{ width: "32px", height: "32px", marginRight: "0.75rem" }}
        />
        <div className="header-identity">
          <p className="header-symbol">{coin.symbol}</p>
          <p className="header-name">{coin.name}</p>
        </div>
      </td>

      <td className="list-cell list-cell-change">
        <div className="list-change">
          <div className={`change-price ${!isPositive ? "red" : ""}`}>
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </div>
          <div className={`change-icon ${!isPositive ? "red" : ""}`}>
            {isPositive ? (
              <TrendingUpRoundedIcon className="trending" />
            ) : (
              <TrendingDownRoundedIcon className="trending" />
            )}
          </div>
        </div>
      </td>
      <td className="list-cell list-cell-price">
        <h3
          className={`details-price ${!isPositive ? "details-price-red" : ""}`}
        >
          {useCompactFormat
            ? formatNumber(coin.current_price, true)
            : `$${coin.current_price.toLocaleString()}`}
        </h3>
      </td>
      <td className="list-cell list-cell-volume">
        <p className="list-stats">
          {useCompactFormat
            ? formatNumber(coin.total_volume, true)
            : `$${coin.total_volume.toLocaleString()}`}
        </p>
      </td>
      <td className="list-cell list-cell-market">
        <p className="list-stats">
          {useCompactFormat
            ? formatNumber(coin.market_cap, true)
            : `$${coin.market_cap.toLocaleString()}`}
        </p>
      </td>
    </tr>
  );
}

export default List;
