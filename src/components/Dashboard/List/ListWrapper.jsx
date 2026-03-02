import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import MobileList from "./MobileList";
import DesktopList from "./DesktopList";

function ListWrapper({ coins }) {
  const isMobile = useMediaQuery("(max-width: 650px)");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
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

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const sortedCoins = getSortedCoins();

  return isMobile ? (
    <MobileList
      coins={sortedCoins}
      sortConfig={sortConfig}
      onSort={handleSort}
    />
  ) : (
    <DesktopList
      coins={sortedCoins}
      sortConfig={sortConfig}
      onSort={handleSort}
    />
  );
}

export default ListWrapper;
