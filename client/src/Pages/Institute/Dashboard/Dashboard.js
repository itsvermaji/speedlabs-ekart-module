import React from "react";
import { useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router";
import NavBar from "../../../components/Navbar/Navbar";
import Login from "../Login/Login";
import Register from "../Register/Register";

const Dashboard = () => {
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    fetch("/admin/dashboard")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
        setInitialState(jsonResponse.name);
      });
  }, []);

  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/admin/register" component={Register} />
          {/* <Route path="/admin/login" component={Login} /> */}
        </Switch>

        {/* <h1>Hi this is Dashboard Page.</h1> */}
        {/* {initialState.length > 0 && initialState.map((data) => <li>{data}</li>)} */}
      </div>
    </Router>
  );
};

export default Dashboard;
