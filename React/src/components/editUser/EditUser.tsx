import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState } from "../../redux/AppState";
import { ActionType } from "../../redux/ActionType";
import { Alert, Button, Card, Form } from "react-bootstrap";
import "./editUser.css";
import jwt_decode from "jwt-decode";

function EditUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isFirstNameErrorDisplayed, setIsFirstNameErrorDisplayed] =
    useState(false);
  const [firstNameError, setFirstNameError] = useState("");

  const [isLastNameErrorDisplayed, setIsLastNameErrorDisplayed] =
    useState(false);
  const [lastNameError, setLastNameError] = useState("");

  const [isServerErrorDisplayed, setIsServerErrorDisplayed] = useState(false);
  const serverErrors = useSelector((state: AppState) => state.errors);

  const onFirstNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let currentValue = event.target.value;
    setFirstName(currentValue);
    let isError = false;
    if (!currentValue) {
      isError = true;
      setIsFirstNameErrorDisplayed(true);
      setFirstNameError("First name field is requierd!");
    } else {
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
    if (!currentValue) {
      isError = true;
      setIsLastNameErrorDisplayed(true);
      setLastNameError("Last name field is requierd!");
    } else {
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

  const onEditClicked = async () => {
    let userData = {
      firstName,
      lastName,
    };

    await axios
      .put("http://localhost:3001/users/editUserDetails", userData)
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

  const history = useHistory();
  const dispatch = useDispatch();

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

  const onExitClicked = ()=>{
    history.push("/home");
    handleUserEntries();
  }

  return (
    <div className="editUser">
      <Card className="editUserCard">
        <Form>
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
  );
}

export default EditUser;
