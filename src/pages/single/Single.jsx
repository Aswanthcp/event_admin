import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";

import { ClientkeyMap, cordkeyMap } from "../../datatablesource";

const columnsMap = {
  clients: ClientkeyMap,
  cordinators: cordkeyMap,
};

const Single = ({ url }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [columnsType, setColumnsType] = useState("clients");

  useEffect(() => {
    axios.get(`${url}${id}`).then((response) => {
      setData(response.data);
      if (url === "getCordinators/") {
        setColumnsType("cordinators");
      } else {
        setColumnsType("clients");
      }
    });
  }, [id, setData]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const column = columnsMap[columnsType];
  console.log(url);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.username}</h1>
                {Object.keys(data).map((key) =>
                  column[key] ? (
                    <div className="detailItem" key={key}>
                      <span className="itemKey">{column[key]}:</span>
                      <span className="itemValue">{data[key]}</span>
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
          </div>

          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
