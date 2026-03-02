import { useState, useEffect } from "react";
import { get200Coins } from "../functions/get200Coins";
import { getCoinPrices } from "../functions/getCoinPrices";
import { settingCompareChartData } from "../functions/settingCompareChartData";

export const useCoinPrices = () => {
  const [coinList, setCoinList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedCoin1, setSelectedCoin1] = useState(null);
  const [coin1Data, setCoin1Data] = useState(null);
  const [coin1Loading, setCoin1Loading] = useState(false);

  const [selectedCoin2, setSelectedCoin2] = useState(null);
  const [coin2Data, setCoin2Data] = useState(null);
  const [coin2Loading, setCoin2Loading] = useState(false);

  const [chartData, setChartData] = useState({});
  const [days, setDays] = useState(30);
  const [chartType, setChartType] = useState("prices");

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 5000);
  };

  useEffect(() => {
    async function fetchCoinList() {
      const coins = await get200Coins();
      setCoinList(coins);

      const bitcoin = coins.find((coin) => coin.id === "bitcoin");
      const ethereum = coins.find((coin) => coin.id === "ethereum");

      if (bitcoin) {
        setSelectedCoin1(bitcoin);
        setCoin1Data(bitcoin);
      }
      if (ethereum) {
        setSelectedCoin2(ethereum);
        setCoin2Data(ethereum);
      }
    }
    fetchCoinList();
  }, []);

  useEffect(() => {
    async function fetchChartData() {
      if (!selectedCoin1 || !selectedCoin2) return;

      setIsLoading(true);
      let errorCount = 0;

      try {
        const prices1 = await getCoinPrices(selectedCoin1.id, days, chartType);
        const prices2 = await getCoinPrices(selectedCoin2.id, days, chartType);

        if (prices1 && prices2) {
          settingCompareChartData(
            setChartData,
            prices1,
            prices2,
            selectedCoin1.symbol.toUpperCase(),
            selectedCoin2.symbol.toUpperCase(),
          );
        }
      } catch (error) {
        errorCount++;
        console.error("Error fetching prices:", error);
      }

      setIsLoading(false);
      if (errorCount > 0)
        showError("Rate limit reached. Please wait a moment and try again.");
    }

    fetchChartData();
  }, [selectedCoin1, selectedCoin2, days, chartType]);

  const handleCoin1Select = async (newCoin) => {
    if (!newCoin) return;

    const previousCoin = selectedCoin1;
    setSelectedCoin1(newCoin);
    setCoin1Data(newCoin);
    setCoin1Loading(true);
    let errorCount = 0;

    try {
      const prices1 = await getCoinPrices(newCoin.id, days, chartType);
      const prices2 = await getCoinPrices(selectedCoin2.id, days, chartType);

      if (prices1 && prices2) {
        settingCompareChartData(
          setChartData,
          prices1,
          prices2,
          newCoin.symbol.toUpperCase(),
          selectedCoin2.symbol.toUpperCase(),
        );
      }
    } catch (error) {
      errorCount++;
      console.error("Error fetching prices:", error);
    }

    setCoin1Loading(false);
    if (errorCount > 0) {
      setSelectedCoin1(previousCoin);
      setCoin1Data(previousCoin);
      showError("Rate limit reached. Please wait a moment and try again.");
    }
  };

  const handleCoin2Select = async (newCoin) => {
    if (!newCoin) return;

    const previousCoin = selectedCoin2;
    setSelectedCoin2(newCoin);
    setCoin2Data(newCoin);
    setCoin2Loading(true);
    let errorCount = 0;

    try {
      const prices1 = await getCoinPrices(selectedCoin1.id, days, chartType);
      const prices2 = await getCoinPrices(newCoin.id, days, chartType);

      if (prices1 && prices2) {
        settingCompareChartData(
          setChartData,
          prices1,
          prices2,
          selectedCoin1.symbol.toUpperCase(),
          newCoin.symbol.toUpperCase(),
        );
      }
    } catch (error) {
      errorCount++;
      console.error("Error fetching prices:", error);
    }

    setCoin2Loading(false);
    if (errorCount > 0) {
      setSelectedCoin2(previousCoin);
      setCoin2Data(previousCoin);
      showError("Rate limit reached. Please wait a moment and try again.");
    }
  };

  const handleDaysChange = async (event) => {
    if (!selectedCoin1 || !selectedCoin2) return;

    const previousDays = days;
    setIsLoading(true);
    setDays(event.target.value);
    let errorCount = 0;

    try {
      const prices1 = await getCoinPrices(
        selectedCoin1.id,
        event.target.value,
        chartType,
      );
      const prices2 = await getCoinPrices(
        selectedCoin2.id,
        event.target.value,
        chartType,
      );

      if (prices1 && prices2) {
        settingCompareChartData(
          setChartData,
          prices1,
          prices2,
          selectedCoin1.symbol.toUpperCase(),
          selectedCoin2.symbol.toUpperCase(),
        );
      }
    } catch (error) {
      errorCount++;
      console.error("Error fetching prices:", error);
    }

    setIsLoading(false);
    if (errorCount > 0) {
      setDays(previousDays);
      showError("Rate limit reached. Please wait a moment and try again.");
    }
  };

  const handleChartType = async (event, newType) => {
    if (!newType || !selectedCoin1 || !selectedCoin2) return;

    const previousType = chartType;
    setIsLoading(true);
    setChartType(newType);
    let errorCount = 0;

    try {
      const prices1 = await getCoinPrices(selectedCoin1.id, days, newType);
      const prices2 = await getCoinPrices(selectedCoin2.id, days, newType);

      if (prices1 && prices2) {
        settingCompareChartData(
          setChartData,
          prices1,
          prices2,
          selectedCoin1.symbol.toUpperCase(),
          selectedCoin2.symbol.toUpperCase(),
        );
      }
    } catch (error) {
      errorCount++;
      console.error("Error fetching prices:", error);
    }

    setIsLoading(false);
    if (errorCount > 0) {
      setChartType(previousType);
      showError("Rate limit reached. Please wait a moment and try again.");
    }
  };

  return {
    coinList,
    isLoading,
    errorMessage,
    setErrorMessage,
    selectedCoin1,
    selectedCoin2,
    coin1Data,
    coin2Data,
    coin1Loading,
    coin2Loading,
    chartData,
    days,
    chartType,
    handleCoin1Select,
    handleCoin2Select,
    handleDaysChange,
    handleChartType,
  };
};
