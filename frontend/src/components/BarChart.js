import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  return (
    <div
      style={{
        height: "700px",
        width: "81%",
        position: "relative",
        marginBottom: "1%",
        float: "right",
      }}
    >
      <Bar data={chartData} />
    </div>
  );
}

export default BarChart;
