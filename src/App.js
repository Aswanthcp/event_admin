
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useSelector } from "react-redux";
import List from "./pages/list/List";
import { getUsers, getCordinators, getItems } from "./utils/Constants";
import Single from "./pages/single/Single";
import UserList from "./pages/userList/UserList";
import CoordinatorList from "./pages/cordinators/CoordinatorList";
import VenderList from "./pages/venderlist/VenderList";
import CategoryList from "./pages/category/CategoryList";
import CategroySingle from "./pages/category/CategorySingle";
import EventLists from "./pages/events/Eventlist";
import EventSingle from "./pages/events/EventSingle";
import CoordinatorEvents from "./pages/coordinatorEvent/CoordinatorEvent";
import CategoryItemsList from "./pages/itemCategory/ItemCategory";
import CoordinatorClientList from "./pages/coordinatoruserlist/CoordinatorClientList";
import VenderOrderList from "./pages/VenderUserOrders/VenderOrder";
import PaidItemOrdersList from "./pages/paidItemOrders/PaidItemOrders";
import PaidEventsList from "./pages/EventOrderList/EventOrdersList";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const token = useSelector((state) => state.token);

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/">
          <Route index element={token ? <Home /> : <Navigate to="/login" />} />
          <Route path="cordinators">
            <Route
              index
              element={token ? <CoordinatorList /> : <Navigate to="/login" />}
            />
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <Single url={getCordinators} columnsType="cordinators" />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="clients">
            <Route
              index
              element={
                <ProtectedRoute>
                  <UserList />
                </ProtectedRoute>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <Single url={getUsers} columnsType="clients" />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="categories">
            <Route
              index
              element={
                <ProtectedRoute>
                  <CategoryList />
                </ProtectedRoute>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <CategroySingle />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="events">
            <Route
              index
              element={
                <ProtectedRoute>
                  <EventLists />
                </ProtectedRoute>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <EventSingle />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route
          path="/venders"
          element={token ? <VenderList /> : <Navigate to="/login" />}
        />
        <Route
          path="/coordintor-events"
          element={
            <ProtectedRoute>
              <CoordinatorEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coordintor-clients"
          element={
            <ProtectedRoute>
              <CoordinatorClientList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vender-clients"
          element={
            <ProtectedRoute>
              <VenderOrderList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/item-category"
          element={
            <ProtectedRoute>
              <CategoryItemsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/item-orders"
          element={
            <ProtectedRoute>
              <PaidItemOrdersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events-orders"
          element={
            <ProtectedRoute>
              <PaidEventsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/items"
          element={<List title="events" url={getItems} columnsType="items" />}
        />
      </Routes>
    </div>
  );
}

export default App;
