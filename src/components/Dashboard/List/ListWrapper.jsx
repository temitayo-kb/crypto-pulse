import React, { useState, useEffect, useRef } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { formatNumber } from "../../../functions/FormatNumber";
import List from "./List";
import FavoriteButton from "../../Common/FavoriteButton/FavoriteButton";
import { useFavorites } from "../../../hooks/useFavorites";

function ListWrapper({ coins }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const scrollablePanelRef = useRef(null);
  const fixedPanelRef = useRef(null);

  const [useCompactFormat, setUseCompactFormat] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 650); // For layout
      setUseCompactFormat(window.innerWidth < 800); // For formatting
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Sync vertical scrolling between panels
  useEffect(() => {
    const fixedPanel = fixedPanelRef.current;
    const scrollablePanel = scrollablePanelRef.current;

    const handleScroll = (source, target) => {
      return () => {
        if (source.scrollTop !== target.scrollTop) {
          target.scrollTop = source.scrollTop;
        }
      };
    };

    if (isMobile && fixedPanel && scrollablePanel) {
      const handleFixedScroll = handleScroll(fixedPanel, scrollablePanel);
      const handleScrollableScroll = handleScroll(scrollablePanel, fixedPanel);

      fixedPanel.addEventListener("scroll", handleFixedScroll);
      scrollablePanel.addEventListener("scroll", handleScrollableScroll);

      return () => {
        fixedPanel.removeEventListener("scroll", handleFixedScroll);
        scrollablePanel.removeEventListener("scroll", handleScrollableScroll);
      };
    }
  }, [isMobile]);

  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }

    setSortConfig({ key, direction });
  };

  const getSortedCoins = () => {
    if (!sortConfig.key) return coins;

    return [...coins].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  // Handle row hover
  const handleRowHover = (index) => {
    setHoveredRowIndex(index);
  };

  const handleRowLeave = () => {
    setHoveredRowIndex(null);
  };

  // Mobile table render
  const renderMobileTable = () => {
    const sortedCoins = getSortedCoins();

    return (
      <div className="list-table-container">
        {/* Fixed Left Panel */}
        <div className="list-table-fixed" ref={fixedPanelRef}>
          {/* Fixed Headers */}
          <div className="table-headers">
            <div className="fixed-headers">
              <div
                className="header-cell fixed-header-cell coin"
                onClick={() => handleSort("name")}
              >
                Coin
                <span className="list-sort-indicator">
                  <ArrowDropUpIcon className="sort-arrow up-arrow" />
                  <ArrowDropDownIcon className="sort-arrow down-arrow" />
                </span>
              </div>
            </div>
          </div>

          {/* Fixed Rows */}
          <div className="table-rows">
            {sortedCoins.map((coin, i) => (
              <div
                key={i}
                className={`table-row ${
                  coin.price_change_percentage_24h > 0
                    ? "list-row-positive"
                    : "list-row-negative"
                } ${hoveredRowIndex === i ? "row-hovered" : ""}`}
                onMouseEnter={() => handleRowHover(i)}
                onMouseLeave={handleRowLeave}
              >
                <div className="fixed-cells">
                  <div className="cell fixed-cell coin">
                    <FavoriteButton
                      className="fixed-cell favorite-button"
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
          {/* Scrollable Headers */}
          <div className="table-headers">
            <div className="scrollable-headers">
              <div
                className="header-cell scrollable-header-cell change"
                onClick={() => handleSort("price_change_percentage_24h")}
              >
                24h Change
                <span className="list-sort-indicator">
                  <ArrowDropUpIcon className="sort-arrow up-arrow" />
                  <ArrowDropDownIcon className="sort-arrow down-arrow" />
                </span>
              </div>
              <div
                className="header-cell scrollable-header-cell price"
                onClick={() => handleSort("current_price")}
              >
                Price
                <span className="list-sort-indicator">
                  <ArrowDropUpIcon className="sort-arrow up-arrow" />
                  <ArrowDropDownIcon className="sort-arrow down-arrow" />
                </span>
              </div>
              <div
                className="header-cell scrollable-header-cell volume"
                onClick={() => handleSort("total_volume")}
              >
                Volume
                <span className="list-sort-indicator">
                  <ArrowDropUpIcon className="sort-arrow up-arrow" />
                  <ArrowDropDownIcon className="sort-arrow down-arrow" />
                </span>
              </div>
              <div
                className="header-cell scrollable-header-cell market"
                onClick={() => handleSort("market_cap")}
              >
                Mkt Cap
                <span className="list-sort-indicator">
                  <ArrowDropUpIcon className="sort-arrow up-arrow" />
                  <ArrowDropDownIcon className="sort-arrow down-arrow" />
                </span>
              </div>
            </div>
          </div>

          {/* Scrollable Rows */}
          <div className="table-rows">
            {sortedCoins.map((coin, i) => {
              const isPositive = coin.price_change_percentage_24h > 0;
              return (
                <div
                  key={i}
                  className={`table-row ${
                    hoveredRowIndex === i ? "row-hovered" : ""
                  }`}
                  onMouseEnter={() => handleRowHover(i)}
                  onMouseLeave={handleRowLeave}
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
                        className={`details-price ${
                          !isPositive ? "details-price-red" : ""
                        }`}
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
  };

  // Desktop table render (original implementation)
  const renderDesktopTable = () => {
    return (
      <table className="list-table">
        <thead>
          <tr className="list-header">
            <th
              className="list-table-header coin"
              onClick={() => handleSort("name")}
            >
              Coin
              <span className="list-sort-indicator">
                <ArrowDropUpIcon className="sort-arrow up-arrow" />
                <ArrowDropDownIcon className="sort-arrow down-arrow" />
              </span>
            </th>
            <th
              className="list-table-header change"
              onClick={() => handleSort("price_change_percentage_24h")}
            >
              24h Change
              <span className="list-sort-indicator">
                <ArrowDropUpIcon className="sort-arrow up-arrow" />
                <ArrowDropDownIcon className="sort-arrow down-arrow" />
              </span>
            </th>
            <th
              className="list-table-header price"
              onClick={() => handleSort("current_price")}
            >
              Price
              <span className="list-sort-indicator">
                <ArrowDropUpIcon className="sort-arrow up-arrow" />
                <ArrowDropDownIcon className="sort-arrow down-arrow" />
              </span>
            </th>
            <th
              className="list-table-header volume"
              onClick={() => handleSort("total_volume")}
            >
              {useCompactFormat ? "Volume" : "Total Volume"}
              <span className="list-sort-indicator">
                <ArrowDropUpIcon className="sort-arrow up-arrow" />
                <ArrowDropDownIcon className="sort-arrow down-arrow" />
              </span>
            </th>
            <th
              className="list-table-header market"
              onClick={() => handleSort("market_cap")}
            >
              {useCompactFormat ? "Mkt Cap" : "Market Cap"}
              <span className="list-sort-indicator">
                <ArrowDropUpIcon className="sort-arrow up-arrow" />
                <ArrowDropDownIcon className="sort-arrow down-arrow" />
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          {getSortedCoins().map((coin, i) => {
            return (
              <List coin={coin} key={i} useCompactFormat={useCompactFormat} />
            );
          })}
        </tbody>
      </table>
    );
  };

  return isMobile ? renderMobileTable() : renderDesktopTable();
}

export default ListWrapper;
