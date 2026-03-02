import React, { useRef, useState } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { formatNumber } from "../../../functions/FormatNumber";
import FavoriteButton from "../../Common/FavoriteButton/FavoriteButton";
import { useFavorites } from "../../../hooks/useFavorites";
import { useNavigate } from "react-router-dom";

function MobileList({ coins, onSort }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const scrollablePanelRef = useRef(null);
  const fixedPanelRef = useRef(null);

  const handleRowClick = (coinId) => {
    navigate(`/coin/${coinId}`);
  };

  const SortIndicator = () => (
    <span className="list-sort-indicator">
      <ArrowDropUpIcon className="sort-arrow up-arrow" />
      <ArrowDropDownIcon className="sort-arrow down-arrow" />
    </span>
  );

  return (
    <div className="list-table-container">
      {/* Fixed Left Panel */}
      <div className="list-table-fixed" ref={fixedPanelRef}>
        <div className="table-headers">
          <div className="fixed-headers">
            <div
              className="header-cell fixed-header-cell coin"
              onClick={() => onSort("name")}
            >
              Coin <SortIndicator />
            </div>
          </div>
        </div>
        <div className="table-rows">
          {coins.map((coin, i) => (
            <div
              key={i}
              className={`table-row ${coin.price_change_percentage_24h > 0 ? "list-row-positive" : "list-row-negative"} ${hoveredRowIndex === i ? "row-hovered" : ""}`}
              onMouseEnter={() => setHoveredRowIndex(i)}
              onMouseLeave={() => setHoveredRowIndex(null)}
              onClick={() => handleRowClick(coin.id)}
            >
              <div className="fixed-cells">
                <div className="cell fixed-cell coin">
                  <FavoriteButton
                    coinId={coin.id}
                    isFavorite={isFavorite(coin.id)}
                    onToggle={toggleFavorite}
                  />
                  <img
                    src={coin.image}
                    alt={coin.name}
                    style={{
                      width: "32px",
                      height: "32px",
                      marginRight: "0.5rem",
                    }}
                  />
                  <div className="header-identity">
                    <p className="header-symbol">{coin.symbol}</p>
                    <p className="header-name">{coin.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable Right Panel */}
      <div className="list-table-scrollable" ref={scrollablePanelRef}>
        <div className="table-headers">
          <div className="scrollable-headers">
            <div
              className="header-cell scrollable-header-cell change"
              onClick={() => onSort("price_change_percentage_24h")}
            >
              24h Change <SortIndicator />
            </div>
            <div
              className="header-cell scrollable-header-cell price"
              onClick={() => onSort("current_price")}
            >
              Price <SortIndicator />
            </div>
            <div
              className="header-cell scrollable-header-cell volume"
              onClick={() => onSort("total_volume")}
            >
              Volume <SortIndicator />
            </div>
            <div
              className="header-cell scrollable-header-cell market"
              onClick={() => onSort("market_cap")}
            >
              Mkt Cap <SortIndicator />
            </div>
          </div>
        </div>
        <div className="table-rows">
          {coins.map((coin, i) => {
            const isPositive = coin.price_change_percentage_24h > 0;
            return (
              <div
                key={i}
                className={`table-row ${hoveredRowIndex === i ? "row-hovered" : ""}`}
                onMouseEnter={() => setHoveredRowIndex(i)}
                onMouseLeave={() => setHoveredRowIndex(null)}
                onClick={() => handleRowClick(coin.id)}
              >
                <div className="scrollable-cells">
                  <div className="cell scrollable-cell change">
                    <div className="list-change">
                      <div
                        className={`change-price ${!isPositive ? "red" : ""}`}
                      >
                        {coin.price_change_percentage_24h?.toFixed(2)}%
                      </div>
                      <div
                        className={`change-icon ${!isPositive ? "red" : ""}`}
                      >
                        {isPositive ? "↗" : "↘"}
                      </div>
                    </div>
                  </div>
                  <div className="cell scrollable-cell price">
                    <div
                      className={`details-price ${!isPositive ? "details-price-red" : ""}`}
                    >
                      {formatNumber(coin.current_price, true)}
                    </div>
                  </div>
                  <div className="cell scrollable-cell volume">
                    <p className="list-stats">
                      {formatNumber(coin.total_volume, true)}
                    </p>
                  </div>
                  <div className="cell scrollable-cell market">
                    <p className="list-stats">
                      {formatNumber(coin.market_cap, true)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MobileList;
