import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/AppState";
import { ActionType } from "../../redux/ActionType";
import jwt_decode from "jwt-decode";
import"./editUserDetails.css"

function EditUserDetails() {
  const [name, setName] = useState("")

  useEffect(() => {
    const token: any = localStorage.getItem("token");
    let decoded: any = jwt_decode(token);
    setName(decoded.name);
  }, []);

  let history = useHistory();
  const dispatch = useDispatch();

  const onEditUserClicked = () => {
    history.push('/editUserDetails');
  };

  const onChangePasswordClicked = () => {
    history.push('/editPassword');
  };

  const onLogoutClicked = () => {
    localStorage.setItem("token", "");
    dispatch({ type: ActionType.ChangeLoginLogout, payload: false });
    history.push("/login");
  };

  return (
    <div className="userDropDown">
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={onLogoutClicked}>Logout</Dropdown.Item>
          <Dropdown.Item onClick={onEditUserClicked}>Edit user</Dropdown.Item>
          <Dropdown.Item onClick={onChangePasswordClicked}>
            Change Password
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default EditUserDetails;
