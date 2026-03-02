import React, { useEffect, useState, useMemo } from "react";
import Header from "../components/Common/Header/Header";
import TabsComponent from "../components/Dashboard/Tabs/Tabs";
import Search from "../components/Dashboard/Search/Search";
import PaginationComponent from "../components/Dashboard/Pagination/Pagination";
import Loader from "../components/Common/Loader/Loader";
import { get200Coins } from "../functions/get200Coins";

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const coinsPerPage = 20;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = useMemo(() => {
    return coins.filter(
      (item) =>
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        item.symbol.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [coins, debouncedSearch]);

  const paginatedCoins = useMemo(() => {
    const startIndex = (page - 1) * coinsPerPage;
    const endIndex = startIndex + coinsPerPage;
    return filteredCoins.slice(startIndex, endIndex);
  }, [filteredCoins, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const pageCount = Math.ceil(filteredCoins.length / coinsPerPage);

  useEffect(() => {
    async function fetchCoins() {
      setIsLoading(true);
      const coins = await get200Coins();
      setCoins(coins);
      setIsLoading(false);
    }

    fetchCoins();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponent coins={paginatedCoins} />
          <PaginationComponent
            page={page}
            handlePageChange={handlePageChange}
            count={pageCount}
          />
        </div>
      )}
    </>
  );
}

export default DashboardPage;
