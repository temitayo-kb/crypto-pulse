import "./Grid.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { Link } from "react-router-dom";
import GridSkeleton from "./GridSkeleton";
import FavoriteButton from "../../Common/FavoriteButton/FavoriteButton";
import { useFavorites } from "../../../hooks/useFavorites";
import { formatNumber } from "../../../functions/FormatNumber";
import { useMediaQuery } from "@mui/material";

function Grid({ coin, isLoading = false, isEmpty = false }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isMobile = useMediaQuery("(max-width: 700px)");

  if (isLoading) {
    return <GridSkeleton />;
  }

  if (isEmpty || !coin) {
    return (
      <div className="grid-container grid-empty">
        <p>Select a coin</p>
      </div>
    );
  }

  return (
    <Link to={`/coin/${coin.id}`}>
      <div
        className={`grid-container ${
          coin.price_change_percentage_24h < 0 && "grid-container-red"
        }`}
      >
        <div className="grid-header">
          <img src={coin.image} className="header-logo" alt={coin.name} />
          <div className="header-identity">
            <p className="header-symbol">{coin.symbol}</p>
            <p className="header-name">{coin.name}</p>
          </div>
          <FavoriteButton
            coinId={coin.id}
            isFavorite={isFavorite(coin.id)}
            onToggle={toggleFavorite}
          />
        </div>
        {coin.price_change_percentage_24h > 0 ? (
          <div className="grid-change">
            <div className="change-price">
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </div>

            <div className="change-icon">
              <TrendingUpRoundedIcon className="trending" />
            </div>
          </div>
        ) : (
          <div className="grid-change">
            <div className="change-price red">
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </div>
            <div className="change-icon red">
              <TrendingDownRoundedIcon className="trending" />
            </div>
          </div>
        )}
        <div className="grid-details">
          <h3 className="details-price">
            $
            {isMobile
              ? formatNumber(coin.current_price, false, true)
              : coin.current_price?.toLocaleString() || "N/A"}
          </h3>
          <p className="grid-stats">
            {isMobile ? "Total Vol" : "Total Volume"}: $
            {isMobile
              ? formatNumber(coin.total_volume, false, true)
              : coin.total_volume?.toLocaleString() || "N/A"}
          </p>
          <p className="grid-stats">
            {isMobile ? "Mkt Cap" : "Market Cap"}: $
            {isMobile
              ? formatNumber(coin.market_cap, false, true)
              : coin.market_cap?.toLocaleString() || "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Grid;
