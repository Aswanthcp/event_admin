import "./chart.scss";
import React, { useCallback, useState, useEffect } from "react";
import { ResponsiveContainer } from "recharts";
import LineChart from "react-apexcharts";
import axios from "../../../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { getOrdersWeekly } from "../../../../utils/Constants";

const Weekly = ({ aspect, title }) => {
  const token = useSelector((state) => state.token);
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });
  const [weeklyData, setWeeklyData] = useState([]); // Rename the state variable

  useEffect(() => {
    fetchWeeklyRevenue(); // Rename the function
  }, []);

  const fetchWeeklyRevenue = useCallback(() => {
    axios
      .get(getOrdersWeekly, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setWeeklyData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      });
  }, [token]);

  const daysOfWeek = Object.keys(weeklyData);
  const revenueData = Object.values(weeklyData);

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: daysOfWeek,
    },
  };
  const series = [
    {
      name: "Weekly Revenue",
      data: revenueData,
    },
  ];

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <LineChart options={options} series={series} type="bar" width="500" />
      </ResponsiveContainer>
      <ToastContainer />
    </div>
  );
};

export default Weekly;
