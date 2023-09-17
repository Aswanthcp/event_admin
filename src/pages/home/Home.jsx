import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Year from "../../components/chart/items/yearly/yearly";
import Month from "../../components/chart/items/monthly/Monthly";
import Weekly from "../../components/chart/items/weakly/weekly";
import DailyRevenueGraph from "../../components/chart/items/daily/Daily";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <DailyRevenueGraph title="DAILY  BOOKING" aspect={2 / 1} />
          <Weekly title="WEEKLY  BOOKING" aspect={2 / 1} />
        </div>
        <div className="charts">
          <Month title="MONTHLY BOOKING" aspect={2 / 1} />
          <Year title="YEARLY BOOKNIG" aspect={2 / 1} />
        </div>

        
      </div>
    </div>
  );
};

export default Home;
