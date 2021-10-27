import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState } from "../../redux/AppState";
import { ActionType } from "../../redux/ActionType";
import { Alert, Button, Card, Form } from "react-bootstrap";
import "./changePassword.css";
import jwt_decode from "jwt-decode";

function ChangePassword() {

  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [oldPasswordError, setOldPasswordError] = useState("");
  const [isOldPasswordErrorDisplayed, setIsOldPasswordErrorDisplayed] =
    useState(false);

    const [newPasswordError, setNewPasswordError] = useState("");
  const [isNewPasswordErrorDisplayed, setIsNewPasswordErrorDisplayed] =
    useState(false);

    const serverErrors = useSelector((state: AppState) => state.errors);
  const [isServerErrorDisplayed, setIsServerErrorDisplayed] = useState(false);

  const onOldPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let currentValue = event.target.value;
    setOldPassword(currentValue);
    let isError = false;
    if (!currentValue) {
      isError = true;
      setIsOldPasswordErrorDisplayed(true);
      setOldPasswordError("Old password field is requierd!");
    } else {
      setIsOldPasswordErrorDisplayed(false);
    }

    if (currentValue.length > 15 ) {
      setIsOldPasswordErrorDisplayed(true);
      setOldPasswordError("Password is limited to 15 charachters");
      isError = true;
    } else {
      if (!isError) {
        setIsOldPasswordErrorDisplayed(false);
        setOldPasswordError("");
      }
    }
  };

  const onNewPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let currentValue = event.target.value;
    setNewPassword(currentValue);
    let isError = false;
    if (!currentValue) {
      isError = true;
      setIsNewPasswordErrorDisplayed(true);
      setNewPasswordError("Password field is requierd!");
    } else {
      setIsNewPasswordErrorDisplayed(false);
    }

    if (currentValue.length > 15) {
      setIsNewPasswordErrorDisplayed(true);
      setNewPasswordError("Password is limited to 15 charachters");
      isError = true;
    } else {
      if (!isError) {
        setIsNewPasswordErrorDisplayed(false);
        setNewPasswordError("");
      }
    }
  };

  const history = useHistory();
  const dispatch = useDispatch();

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

  const onExitClicked = ()=>{
    history.push("/home");
    handleUserEntries();
  }

  const onEditClicked = async () => {
  let passwordData = {
    oldPassword,
    newPassword,
  };

  await axios
    .put("http://localhost:3001/users/editPassword", passwordData)
    .then(
      () => {
        handleUserEntries();
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

  
    return (
        <div className="editPassword">
           <Card className="editPasswordCard">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Old Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Old Password"
              onChange={onOldPasswordChanged}
            />
          </Form.Group>
          {isOldPasswordErrorDisplayed && (
            <Alert variant="danger">{oldPasswordError}</Alert>
          )}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>New Password:</Form.Label>
            <Form.Control
              type="Password"
              placeholder="New Password"
              onChange={onNewPasswordChanged}
            />
          </Form.Group>
          {isNewPasswordErrorDisplayed && (
            <Alert variant="danger">{newPasswordError}</Alert>
          )}

          {isServerErrorDisplayed && (
            <Alert variant="danger">{serverErrors}</Alert>
          )}
          <div className="buttons-layout">
            <Button variant="primary" type="button" onClick={onEditClicked}>
              Save
            </Button>
            <Button variant="secondary" type="button" onClick={onExitClicked}>
              Exit
            </Button>
          </div>
        </Form>
      </Card> 
        </div>
    )
}

export default ChangePassword
