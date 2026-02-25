import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Common/Header/Header";
import Loader from "../components/Common/Loader/Loader";
import { convertCoinObject } from "../functions/ConvertCoinObject";
import List from "../components/Dashboard/List/List";
import CoinInfo from "../components/Coin/CoinInfo/CoinInfo";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices.js";
import Linechart from "../components/Coin/LineChart/Linechart";
import SelectDays from "../components/Coin/SelectDays/SelectDays";
import { settingChartData } from "../functions/settingChartData.js/";
import ChartToggle from "../components/Coin/ChartToggle/ChartToggle.jsx";

function CoinPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState();
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({});
  const [chartType, setChartType] = useState("prices");

  useEffect(() => {
    async function fetchInitialData() {
      if (!id) return;

      const data = await getCoinData(id);
      if (data) {
        convertCoinObject(setCoinData, data);
        const prices = await getCoinPrices(id, 30, "prices");
        if (prices) {
          settingChartData(setChartData, prices);
          setIsLoading(false);
        }
      }
    }

    fetchInitialData();
  }, [id]);

  const handleDaysChange = async (event) => {
    if (!id) return;

    setIsLoading(true);
    setDays(event.target.value);
    const prices = await getCoinPrices(id, event.target.value, chartType);
    if (prices) {
      settingChartData(setChartData, prices);
      setIsLoading(false);
    }
  };

  const handleChartType = async (event, newType) => {
    if (!newType || !id) return;
    setIsLoading(true);
    setChartType(newType);
    const prices = await getCoinPrices(id, days, newType);
    if (prices) {
      settingChartData(setChartData, prices);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : coinData ? (
        <div className="coin-page-wrapper">
          <div className="coin-table-container">
            <table className="list-table">
              <tbody>
                <List coin={coinData} useCompactFormat={false} />
              </tbody>
            </table>
          </div>

          <div className="chart-container">
            <div className="chart-padding">
              <SelectDays days={days} handleDaysChange={handleDaysChange} />
              <ChartToggle
                chartType={chartType}
                handleChartType={handleChartType}
              />
              <Linechart chartData={chartData} chartType={chartType} />
            </div>
          </div>
          <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </div>
      ) : (
        <p style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>
          Error loading coin data. Please try again later.
        </p>
      )}
    </div>
  );
}

export default CoinPage;
