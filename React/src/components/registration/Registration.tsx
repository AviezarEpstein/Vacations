import React, { ChangeEvent, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";
import "./registration.css";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/AppState";
import { ActionType } from "../../redux/ActionType";

function Registration() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isUserNameErrorDisplayed, setIsUserNameErrorDisplayed] =
    useState(false);
  const [userNameError, setUserNameError] = useState("");

  const [isPasswordErrorDisplayed, setIsPasswordErrorDisplayed] =
    useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [isFirstNameErrorDisplayed, setIsFirstNameErrorDisplayed] =
    useState(false);
  const [firstNameError, setFirstNameError] = useState("");

  const [isLastNameErrorDisplayed, setIsLastNameErrorDisplayed] =
    useState(false);
  const [lastNameError, setLastNameError] = useState("");

  const [isServerErrorDisplayed, setIsServerErrorDisplayed] = useState(false);
  const serverErrors = useSelector((state: AppState) => state.errors);

  const onUserNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let currentValue = event.target.value;
    setUserName(currentValue);

    let isError = false;
    if(!currentValue){
      isError = true;
      setIsUserNameErrorDisplayed(true);
      setUserNameError("User name field is requierd!");
    }else{
      setIsUserNameErrorDisplayed(false);
    }

    if (currentValue.length > 15) {
      setIsUserNameErrorDisplayed(true);
      setUserNameError("User name is limited to 15 charachters");
      isError = true;
    } else {
      if (!isError) {
        setIsUserNameErrorDisplayed(false);
        setUserNameError("");
      }
    }
  };

  const onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let isError = false;
    let currentValue = event.target.value;
    setPassword(currentValue);

    if(!currentValue){
      isError = true;
      setIsPasswordErrorDisplayed(true);
      setPasswordError("Password field is requierd!");
    }else{
      setIsPasswordErrorDisplayed(false);
    }

    if (currentValue.length > 15) {
      setIsPasswordErrorDisplayed(true);
      setPasswordError("Password is limited to 15 charachters");
      isError = true;
    } else {
      if (!isError) {
        setIsPasswordErrorDisplayed(false);
        setPasswordError("");
      }
    }
  };

  const onFirstNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let currentValue = event.target.value;
    setFirstName(currentValue);
    let isError = false;
    if(!currentValue){
      isError = true;
      setIsFirstNameErrorDisplayed(true);
      setFirstNameError("First name field is requierd!");
    }else{
      setIsFirstNameErrorDisplayed(false);
    }

    if (currentValue.length > 15) {
      setIsFirstNameErrorDisplayed(true);
      setFirstNameError("First name is limited to 15 charachters");
      isError = true;
    } else {
      if (!isError) {
        setIsFirstNameErrorDisplayed(false);
        setFirstNameError("");
      }
    }
  };

  const onLastNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let currentValue = event.target.value;
    setLastName(currentValue);
    let isError = false;
    if(!currentValue){
      isError = true;
      setIsLastNameErrorDisplayed(true);
      setLastNameError("Last name field is requierd!");
    }else{
      setIsLastNameErrorDisplayed(false);
    }

    if (currentValue.length > 15) {
      setIsLastNameErrorDisplayed(true);
      setLastNameError("Last name is limited to 15 charachters");
      isError = true;
    } else {
      if (!isError) {
        setIsLastNameErrorDisplayed(false);
        setLastNameError("");
      }
    }
  };

  const history = useHistory();
  const dispatch = useDispatch();

  const onRegisterClicked = async ()=>{
      let userData:IUser = {
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        userType: "CUSTOMER"
      }
     
        await axios.post("http://localhost:3001/users/", userData)
        .then(
          ()=>{    
            history.push('/login');
          },
          (res)=> {
            setIsServerErrorDisplayed(true);
          dispatch({
            type: ActionType.ShowErrors,
            payload: res.response.data.error,
          });
          } 
        )
  }

  return (
    <div className="registrationForm">
      <Card className="registrationCard">
      <Card.Img 
        className = "registrationImg"
              height="70"
              src={process.env.PUBLIC_URL + "/logo2.png"}
              alt="none"
            />
        <Form className= "registrationLayout">
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

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              onChange={onFirstNameChanged}
            />
          </Form.Group>
          {isFirstNameErrorDisplayed && (
              <Alert variant="danger">{firstNameError}</Alert>
            )}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              onChange={onLastNameChanged}
            />
          </Form.Group>
          {isLastNameErrorDisplayed && (
              <Alert variant="danger">{lastNameError}</Alert>
            )}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Already member? <Link to="/login">Login</Link></Form.Label>           
          </Form.Group>
          
          {isServerErrorDisplayed && (
            <Alert variant="danger">{serverErrors}</Alert>
          )}

          <Button variant="primary" type="button" onClick={onRegisterClicked}>
            Register
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Registration;
