import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header/Header";
import Loader from "../components/Common/Loader/Loader";
import ErrorBanner from "../components/Common/ErrorBanner/ErrorBanner";
import CoinSelector from "../components/Compare/CoinSelector/CoinSelector";
import Grid from "../components/Dashboard/Grid/Grid";
import SelectDays from "../components/Coin/SelectDays/SelectDays";
import ChartToggle from "../components/Coin/ChartToggle/ChartToggle";
import Linechart from "../components/Coin/LineChart/Linechart";
import { get200Coins } from "../functions/get200Coins";
import { getCoinPrices } from "../functions/getCoinPrices";
import { settingCompareChartData } from "../functions/settingCompareChartData";

function ComparePage() {
  const [coinList, setCoinList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Coin 1 state
  const [selectedCoin1, setSelectedCoin1] = useState(null);
  const [coin1Data, setCoin1Data] = useState(null);
  const [coin1Loading, setCoin1Loading] = useState(false);

  // Coin 2 state
  const [selectedCoin2, setSelectedCoin2] = useState(null);
  const [coin2Data, setCoin2Data] = useState(null);
  const [coin2Loading, setCoin2Loading] = useState(false);

  // Chart state
  const [chartData, setChartData] = useState({});
  const [days, setDays] = useState(30);
  const [chartType, setChartType] = useState("prices");

  // Fetch coin list on mount
  useEffect(() => {
    async function fetchCoinList() {
      const coins = await get200Coins();

      setCoinList(coins);

      // Set default selections
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

  // Fetch chart data when coins are selected
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

      if (errorCount > 0) {
        setErrorMessage(
          "Rate limit reached. Please wait a moment and try again.",
        );
        setTimeout(() => setErrorMessage(""), 5000);
      }
    }

    fetchChartData();
  }, [selectedCoin1, selectedCoin2, days, chartType]);

  // Handle coin 1 selection change
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
      setErrorMessage(
        "Rate limit reached. Please wait a moment and try again.",
      );
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  // Handle coin 2 selection change
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
      setErrorMessage(
        "Rate limit reached. Please wait a moment and try again.",
      );
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  // Handle days change
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
      setErrorMessage(
        "Rate limit reached. Please wait a moment and try again.",
      );
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  // Handle chart type change
  const handleChartType = async (event, newType) => {
    if (!newType || !selectedCoin1 || !selectedCoin2) return;

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
      setErrorMessage(
        "Rate limit reached. Please wait a moment and try again.",
      );
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  return (
    <div>
      <Header />
      <ErrorBanner
        message={errorMessage}
        onDismiss={() => setErrorMessage("")}
      />
      {isLoading && !coin1Data && !coin2Data ? (
        <Loader />
      ) : (
        // <div style={{ padding: "0 2rem" }}>
        <div className="compare-page-wrapper">
          {/* Coin Selectors */}
          <div className="compare-selectors-container">
            <CoinSelector
              coins={coinList}
              selectedCoin={selectedCoin1}
              onCoinSelect={handleCoin1Select}
              excludeCoinId={selectedCoin2?.id}
            />
            <CoinSelector
              coins={coinList}
              selectedCoin={selectedCoin2}
              onCoinSelect={handleCoin2Select}
              excludeCoinId={selectedCoin1?.id}
            />
          </div>

          {/* Grid Display */}
          <div className="compare-grids-container">
            <Grid
              coin={coin1Data}
              isLoading={coin1Loading}
              isEmpty={!selectedCoin1}
            />
            <Grid
              coin={coin2Data}
              isLoading={coin2Loading}
              isEmpty={!selectedCoin2}
            />
          </div>

          {/* Chart Section */}
          {selectedCoin1 &&
            selectedCoin2 &&
            chartData.datasets &&
            chartData.datasets.length > 0 && (
              <div className="chart-container">
                <div className="chart-padding">
                  <SelectDays days={days} handleDaysChange={handleDaysChange} />
                  <ChartToggle
                    chartType={chartType}
                    handleChartType={handleChartType}
                  />
                  {isLoading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "450px",
                      }}
                    >
                      <Loader />
                    </div>
                  ) : (
                    <Linechart
                      chartData={chartData}
                      multiAxis={true}
                      chartType={chartType}
                    />
                  )}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
}

export default ComparePage;
