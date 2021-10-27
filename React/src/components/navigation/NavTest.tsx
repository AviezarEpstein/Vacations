import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ActionType } from "../../redux/ActionType";
import { AppState } from "../../redux/AppState";
import "./nav.css";
import EditUserDetails from "../editUserDetails/EditUserDetails";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NavTest() {
  const navStyle = {
    color: "white",
  };

  const isLogedIn = useSelector((state: AppState) => state.isLogedIn);
  const isAdmin = useSelector((state: AppState) => state.isAdmin);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
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
  }, []);

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

  const onAddVacationClicked = () => {
    dispatch({
      type: ActionType.ChangeButtonAddEditVacation,
      payload: true,
    });
    dispatch({
      type: ActionType.SetShowModal,
      payload: true,
    });
  };

  return (
    // <Navbar bg="primary" variant="dark">
    //   <Container>
    //     <Navbar.Brand>
    //       <LinkContainer to="/">
    //         <img
    //           width="70"
    //           height="70"
    //           src={process.env.PUBLIC_URL + "/logo2.png"}
    //           alt="none"
    //         />
    //       </LinkContainer>
    //     </Navbar.Brand>

    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       {isLogedIn && isAdmin && (
    //         <LinkContainer to="/">
    //           <Nav.Link>Home</Nav.Link>
    //         </LinkContainer>
    //       )}
    //       {isLogedIn && isAdmin && (
    //         <LinkContainer to="/addVacation" onClick={onAddVacationClicked}>
    //           <Nav.Link>AddVacation</Nav.Link>
    //         </LinkContainer>
    //       )}
    //       {isLogedIn && isAdmin && (
    //         <LinkContainer to="/getFollowReport">
    //           <Nav.Link>Following report</Nav.Link>
    //         </LinkContainer>
    //       )}
    //       {!isLogedIn && (
    //         <LinkContainer to="/login">
    //           <Nav.Link>Login</Nav.Link>
    //         </LinkContainer>
    //       )}
    //       <Navbar.Text>{isLogedIn && <EditUserDetails />}</Navbar.Text>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    <Nav fill className="navLayout">
      <Nav.Item>

          <LinkContainer to="/">
            <img
              width="70"
              height="70"
              src={process.env.PUBLIC_URL + "/logo2.png"}
              alt="none"
            />
          </LinkContainer>

      </Nav.Item>

      <Nav.Item>
        {isLogedIn && isAdmin && (
          <LinkContainer to="/">
            <Nav.Link ><h5 className="navText">Home</h5></Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>

      <Nav.Item>
        {isLogedIn && isAdmin && (
          <LinkContainer to="/addVacation" onClick={onAddVacationClicked}>
            <Nav.Link><h5 className="navText">AddVacation</h5></Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>

      <Nav.Item>
        {isLogedIn && isAdmin && (
          <LinkContainer to="/getFollowReport" onClick={onAddVacationClicked}>
            <Nav.Link><h5 className="navText">Following report</h5></Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>

      <Nav.Item>
        {isLogedIn && isAdmin && (
          <LinkContainer to="/login" onClick={onAddVacationClicked}>
            <Nav.Link><h5 className="navText">Login</h5></Nav.Link>
          </LinkContainer>
        )}
      </Nav.Item>
      {isLogedIn && <EditUserDetails />}
    </Nav>
  );
}

export default NavTest;
