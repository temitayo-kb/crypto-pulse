import React from "react";
import Header from "../components/Common/Header/Header";
import Loader from "../components/Common/Loader/Loader";
import ErrorBanner from "../components/Common/ErrorBanner/ErrorBanner";
import CoinSelector from "../components/Compare/CoinSelector/CoinSelector";
import Grid from "../components/Dashboard/Grid/Grid";
import SelectDays from "../components/Coin/SelectDays/SelectDays";
import ChartToggle from "../components/Coin/ChartToggle/ChartToggle";
import Linechart from "../components/Coin/LineChart/Linechart";
import { useCoinPrices } from "../hooks/useCoinPrices";

function ComparePage() {
  const {
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
  } = useCoinPrices();

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
        <div className="compare-page-wrapper">
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

          {selectedCoin1 && selectedCoin2 && chartData.datasets?.length > 0 && (
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
