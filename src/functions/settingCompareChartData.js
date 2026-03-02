import { convertDate } from "./convertDate";

export const settingCompareChartData = (
  setChartData,
  prices1,
  prices2,
  coin1Name,
  coin2Name,
) => {
  setChartData({
    labels: prices1.map((price) => convertDate(price[0])),
    datasets: [
      {
        label: coin1Name,
        data: prices1.map((price) => price[1]),
        borderColor: "#3a80e9",
        borderWidth: 2,
        fill: false,
        tension: 0.25,
        pointRadius: 0,
        yAxisID: "y",
      },
      {
        label: coin2Name,
        data: prices2.map((price) => price[1]),
        borderColor: "#ff9800",
        borderWidth: 2,
        fill: false,
        tension: 0.25,
        pointRadius: 0,
        yAxisID: "crypto2",
      },
    ],
  });
};
