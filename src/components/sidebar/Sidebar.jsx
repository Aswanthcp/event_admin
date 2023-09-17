import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { setLogout } from "../../Redux/store";
import { useDispatch } from "react-redux";
import Groups3Icon from "@mui/icons-material/Groups3";
import CategoryIcon from "@mui/icons-material/Category";
import EventIcon from '@mui/icons-material/Event';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const dispatchs = useDispatch();
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Eventdmin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <Link to="/" style={{ textDecoration: "none" }}>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <hr />
          <p className="title">CLIENT MANAGEMENT</p>
          <Link to="/clients" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Client </span>
            </li>
          </Link>
          <hr />

          <p className="title">EVENTS MANAGEMENT</p>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Category </span>
            </li>
          </Link>
          <Link to="/events" style={{ textDecoration: "none" }}>
            <li>
              <Diversity3Icon className="icon" />
              <span>Events </span>
            </li>
          </Link>
          <Link to="/cordinators" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Cordinator </span>
            </li>
          </Link>
          <Link to="/coordintor-events" style={{ textDecoration: "none" }}>
            <li>
              <EventIcon className="icon" />
              <span>Cordinator Events</span>
            </li>
          </Link>
          <Link to="/coordintor-clients" style={{ textDecoration: "none" }}>
            <li>
              <AssignmentIndIcon className="icon" />
              <span>Events Orders</span>
            </li>
          </Link>
          <hr />
          <p className="title">ITEMS MANAGEMENT</p>
          <Link to="/item-category" style={{ textDecoration: "none" }}>
            <li>
              <Groups3Icon className="icon" />
              <span>Items Category </span>
            </li>
          </Link>
          <Link to="/venders" style={{ textDecoration: "none" }}>
            <li>
              <Groups3Icon className="icon" />
              <span>Vender </span>
            </li>
          </Link>
          <Link to="/items" style={{ textDecoration: "none" }}>
            <li>
              <Diversity3Icon className="icon" />
              <span>Vender Items </span>
            </li>
          </Link>
          <Link to="/vender-clients" style={{ textDecoration: "none" }}>
            <li>
              <AssignmentIndIcon className="icon" />
              <span>Items Orders</span>
            </li>
          </Link>
          <hr />
          <p className="title">FINANCE MANAGEMENT</p>
          <Link to="/item-orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Item Finances </span>
            </li>
          </Link>
          <hr />
          <Link to="/events-orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Event Finances </span>
            </li>
          </Link>
          <hr />
          
          <p className="title">USER</p>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={() => dispatchs(setLogout())}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
