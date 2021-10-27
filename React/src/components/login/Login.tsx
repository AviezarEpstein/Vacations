import React, { ChangeEvent, useEffect, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../redux/ActionType";
import { IVacation } from "../../interfaces/IVacation";
import { AppState } from "../../redux/AppState";

function Login() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      createTokenInterceptor();
    }
    handleUserEntries();
  }, []);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [isUserNameErrorDisplayed, setIsUserNameErrorDisplayed] =
    useState(false);
  const [userNameError, setUserNameError] = useState("");

  const [isPasswordErrorDisplayed, setIsPasswordErrorDisplayed] =
    useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [isServerErrorDisplayed, setIsServerErrorDisplayed] = useState(false);
  const serverErrors = useSelector((state: AppState) => state.errors);

  const dispatch = useDispatch();
  const history = useHistory();

  const onUserNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let currentValue = event.target.value;
    setUserName(currentValue);

    if(!currentValue){
      setIsUserNameErrorDisplayed(true);
      setUserNameError("User name field is requierd!");
    }else{
      setIsUserNameErrorDisplayed(false);
    }
  };

  const onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let currentValue = event.target.value;
    setPassword(currentValue);

    if(!currentValue){
      setIsPasswordErrorDisplayed(true);
      setPasswordError("Password field is requierd!");
    }else{
      setIsPasswordErrorDisplayed(false);
    }
  };

  const onLoginClicked = async () => {
    await axios
      .post("http://localhost:3001/users/login", {
        userName,
        password,
      })
      .then(
        (res) => {
          let token = res.data;
          console.log(token);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          localStorage.setItem("token", token);
          let decoded: any = jwt_decode(token);
          let role = decoded.role;
          if (role == "CUSTOMER") {
            history.push("/customer");
            dispatch({ type: ActionType.HandleDeleteEdit, payload: false });
          }
          if (role == "Admin") {
            history.push("/admin");
            dispatch({ type: ActionType.HandleDeleteEdit, payload: true });
          }
          console.log(decoded);
          dispatch({ type: ActionType.ChangeLoginLogout, payload: true });
          dispatch({ type: ActionType.GetCurrentUserName, payload: userName });
          // setServerErrors('');
          setIsServerErrorDisplayed(false);
        },

        (res) => {
          setIsServerErrorDisplayed(true);
          dispatch({
            type: ActionType.ShowErrors,
            payload: res.response.data.error,
          });
        }
      );
  };

  function createTokenInterceptor() {
    let token: any = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  function handleUserEntries() {
    if (localStorage.getItem("token")) {
      let role = checkRole();
      if (role == "customer") {
        history.push("/customer");
        dispatch({ type: ActionType.HandleDeleteEdit, payload: false });
      }
      if (role == "admin") {
        history.push("/admin");
        dispatch({ type: ActionType.HandleDeleteEdit, payload: true });
      }
      dispatch({ type: ActionType.ChangeLoginLogout, payload: true });
    }
  }

  function checkRole() {
    let token: any = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    let decoded: any = jwt_decode(token);
    let role = decoded.role;
    if (role == "CUSTOMER") {
      return "customer";
    }
    if (role == "Admin") {
      return "admin";
    }
  }

  return (
    <div className="login">
      <Card className="loginCard">
        <Card.Img 
        className = "loginImg"
              height="70"
              src={process.env.PUBLIC_URL + "/logo2.png"}
              alt="none"
            />
        <Form className="loginLayout">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Name"
              onChange={onUserNameChanged}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          {isUserNameErrorDisplayed && (
              <Alert variant="danger">{userNameError}</Alert>
            )}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={onPasswordChanged}
            />
          </Form.Group>

          {isPasswordErrorDisplayed && (
              <Alert variant="danger">{passwordError}</Alert>
            )}

          {isServerErrorDisplayed && (
            <Alert variant="danger">{serverErrors}</Alert>
          )}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Not a member? <Link to="/register">Register</Link>
            </Form.Label>
          </Form.Group>

          <Button variant="primary" type="button" onClick={onLoginClicked}>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
