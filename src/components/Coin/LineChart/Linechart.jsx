// import React from "react";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";
// import "./LineChart.css";
// import { formatNumber } from "../../../functions/FormatNumber";

// function Linechart({ chartData, multiAxis, chartType }) {
//   const options = {
//     plugins: {
//       legend: {
//         display: multiAxis ? true : false,
//       },
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//     interaction: {
//       mode: "index",
//       intersect: false,
//     },
//     scales: {
//       y: {
//         type: "linear",
//         position: "left",
//         ticks: {
//           callback: function (value) {
//             if (chartType === "prices") return "$" + value.toLocaleString();
//             else {
//               return "$" + formatNumber(value, false, true);
//             }
//           },
//         },
//       },
//       ...(multiAxis && {
//         crypto2: {
//           type: "linear",
//           position: "right",
//           ticks: {
//             callback: function (value) {
//               if (chartType === "prices") return "$" + value.toLocaleString();
//               else {
//                 return "$" + formatNumber(value, false, true);
//               }
//             },
//           },
//           grid: {
//             drawOnChartArea: false, // Only show gridlines for left axis
//           },
//         },
//       }),
//     },
//   };

//   return (
//     <div className="line-chart">
//       <Line data={chartData} options={options} />
//     </div>
//   );
// }

// export default Linechart;

import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import "./LineChart.css";
import { formatNumber } from "../../../functions/FormatNumber";

const formatTick = (value, chartType) => {
  if (chartType === "prices") return "$" + value.toLocaleString();
  return "$" + formatNumber(value, false, true);
};

function Linechart({ chartData, multiAxis, chartType }) {
  const options = {
    plugins: {
      legend: {
        display: multiAxis ? true : false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        type: "linear",
        position: "left",
        ticks: {
          callback: (value) => formatTick(value, chartType),
        },
      },
      ...(multiAxis && {
        crypto2: {
          type: "linear",
          position: "right",
          ticks: {
            callback: (value) => formatTick(value, chartType),
          },
          grid: {
            drawOnChartArea: false,
          },
        },
      }),
    },
  };

  return (
    <div className="line-chart">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default Linechart;
