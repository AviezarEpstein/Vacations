import "./App.css";
import Navigation from "./components/navigation/Navigation";
import NavTest from "./components/navigation/NavTest";

import Home from "./components/home/Home";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Registration from "./components/registration/Registration";
import EditVacation from "./components/editVacation/EditVacation";
import AddVacation from "./components/addVacation/AddVacation";
import Chart from "./components/chart/Chart";
import EditUser from "./components/editUser/EditUser";
import ChangePassword from "./components/changePassword/ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./redux/AppState";
import { useEffect } from "react";
import { ActionType } from "./redux/ActionType";

function App() {
  const isLogedIn = useSelector((state: AppState) => state.isLogedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch({ type: ActionType.ChangeLoginLogout, payload: true });
    }
  }, []);

  return (
    <div className="App">
      <Router>
        {isLogedIn && <Navigation />}
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/customer">
            <Home />
          </Route>
          <Route path="/admin">
            <Home />
          </Route>
          <Route path="/register">
            <Registration />
          </Route>
          <Route path="/addVacation">
            <AddVacation />
            <Home />
          </Route>
          <Route path="/editVacation">
            <EditVacation />
            <Home />
          </Route>
          <Route path="/getFollowReport">
            <Chart />
          </Route>
          <Route path="/editUserDetails">
            <EditUser />
          </Route>
          <Route path="/editPassword">
            <ChangePassword />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
