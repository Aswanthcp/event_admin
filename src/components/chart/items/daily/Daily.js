import React, { useState, useEffect } from "react";
import axios from "../../../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { ResponsiveContainer } from "recharts";
import { getOrdersdate } from "../../../../utils/Constants";

const DailyRevenueGraph = ({ aspect, title }) => {
  const [daily, setDaily] = useState(null);
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });
  const token = useSelector((state) => state.token);
  const date = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    axios
      .get(`${getOrdersdate}/${date}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setDaily(response.data.total_revenue);
      })
      .catch((error) => {
        if (error.response) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      });
  }, [date, token]);

  const chartData = {
    series: [daily || 0],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      title: {
        text: `Revenue for ${date}`,
        align: "center",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },
      labels: ["Combined Revenue"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width={380}
        />
      </ResponsiveContainer>
      <ToastContainer />
    </div>
  );
};

export default DailyRevenueGraph;
