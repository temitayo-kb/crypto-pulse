import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useMediaQuery } from "@mui/material";
import List from "./List";

function DesktopList({ coins, onSort }) {
  const useCompactFormat = useMediaQuery("(max-width: 800px)");

  return (
    <table className="list-table">
      <thead>
        <tr className="list-header">
          <th className="list-table-header coin" onClick={() => onSort("name")}>
            Coin
            <span className="list-sort-indicator">
              <ArrowDropUpIcon className="sort-arrow up-arrow" />
              <ArrowDropDownIcon className="sort-arrow down-arrow" />
            </span>
          </th>
          <th
            className="list-table-header change"
            onClick={() => onSort("price_change_percentage_24h")}
          >
            24h Change
            <span className="list-sort-indicator">
              <ArrowDropUpIcon className="sort-arrow up-arrow" />
              <ArrowDropDownIcon className="sort-arrow down-arrow" />
            </span>
          </th>
          <th
            className="list-table-header price"
            onClick={() => onSort("current_price")}
          >
            Price
            <span className="list-sort-indicator">
              <ArrowDropUpIcon className="sort-arrow up-arrow" />
              <ArrowDropDownIcon className="sort-arrow down-arrow" />
            </span>
          </th>
          <th
            className="list-table-header volume"
            onClick={() => onSort("total_volume")}
          >
            {useCompactFormat ? "Volume" : "Total Volume"}
            <span className="list-sort-indicator">
              <ArrowDropUpIcon className="sort-arrow up-arrow" />
              <ArrowDropDownIcon className="sort-arrow down-arrow" />
            </span>
          </th>
          <th
            className="list-table-header market"
            onClick={() => onSort("market_cap")}
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
        {coins.map((coin, i) => (
          <List coin={coin} key={i} useCompactFormat={useCompactFormat} />
        ))}
      </tbody>
    </table>
  );
}

export default DesktopList;
