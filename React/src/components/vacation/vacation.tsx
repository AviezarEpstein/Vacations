import React, { useEffect, useState } from "react";
import { IVacation } from "../../interfaces/IVacation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Collapse } from "react-bootstrap";
import "./vacation.css";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/AppState";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import axios from "axios";
import { ActionType } from "../../redux/ActionType";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import socketClient from "socket.io-client";
const SERVER = "http://localhost:3002";
var socket = socketClient(SERVER);

function Vacation(props: IVacation) {
  const [open, setOpen] = useState(false);
  const isAdmin = useSelector((state: AppState) => state.isAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    let token: any = localStorage.getItem("token");
    socket.emit("user-details", token);
    socket.on("update-vacation", (vacations) => {
      console.log("SOCKET: ", vacations);

      dispatch({
        type: ActionType.GetAllVacations,
        payload: vacations,
      });
    });
    return () => {
      socket.emit("cutHandShake", token);
    };
  }, []);

  useEffect(() => {
    setOpen(!open);
  }, []);

  const onDeleteClicked = async () => {
    const id = props.id;
    try {
      await axios.delete<IVacation[]>(`http://localhost:3001/vacations/${id}`);
      axios
        .get<IVacation[]>("http://localhost:3001/vacations")
        .then((response) => {
          let vacationsArray = response.data;
          console.log(vacationsArray);
          dispatch({
            type: ActionType.GetAllVacations,
            payload: vacationsArray,
          });
        })
        .catch((e) => {
          console.error(e);
          alert("Faild");
        });
    } catch (e) {
      console.error(e);
      alert("failed to get products");
    }
  };

  const history = useHistory();

  const onEditClicked = () => {
    history.push("/editVacation");
    const vacation = {
      id: props.id,
      description: props.description,
      location: props.location,
      image: props.image,
      startDate: props.startDate,
      endDate: props.endDate,
      price: props.price,
      numOfFollowers: props.numOfFollowers,
    };
    dispatch({
      type: ActionType.SetShowModal,
      payload: true,
    });
    dispatch({
      type: ActionType.GetVacationById,
      payload: vacation,
    });
  };

  async function handleFollow(isAdd: boolean) {
    if (isAdd) {
      try {
        await axios.post(
          `http://localhost:3001/followers/addFollow/${props.id}`
        );
        axios
          .get<IVacation[]>("http://localhost:3001/vacations")
          .then((response) => {
            let vacationsArray = response.data;
            console.log(vacationsArray);
              dispatch({
                type: ActionType.GetAllVacations,
                payload: vacationsArray,
              });
          })
          .catch((e) => {
            console.error(e);
            alert("Faild");
          });
      } catch (e) {
        alert("faild");
      }
    } else {
      try {
        await axios.delete(
          `http://localhost:3001/followers/deleteFollow/${props.id}`
        );
        axios
          .get<IVacation[]>("http://localhost:3001/vacations")
          .then((response) => {
            let vacationsArray = response.data;
            console.log(vacationsArray);
              dispatch({
                type: ActionType.GetAllVacations,
                payload: vacationsArray,
              });
          })
          .catch((e) => {
            console.error(e);
            alert("Faild");
          });
      } catch (e) {
        alert("faild");
      }
    }
  }

  const onFollowClicked = () => {
    try {
      let isAdd = true;
      handleFollow(isAdd);
    } catch (e) {
      console.log(e);
    }
  };

  const onUnFollowClicked = () => {
    try {
      let isAdd = false;
      handleFollow(isAdd);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Card className="vacationCard">
        <Card.Img className="image" src={props.image} />
        <Card.Body
          className="cardBody"
          aria-controls="collapse-erea"
          aria-expanded={open}
          id="collapse-erea"
        >
          <Collapse in={open}>
            <Card.Title>{props.location}</Card.Title>
          </Collapse>
          <Collapse in={open}>
            <Card.Title className="description">{props.description}</Card.Title>
          </Collapse>
          <div className="leftRightContainer">
            <span className="left">
              <div className="insideCard">
                <div className="price">Only ${props.price}</div>
                <div className="followers">
                  {props.numOfFollowers} Followers
                </div>
              </div>
            </span>

            <span className="right">
              <div className="insideCard">
                <div className="date">
                  Start Date: {props.startDate}
                </div>
                <div className="date">
                  End Date: {props.endDate}
                </div>
              </div>
            </span>
          </div>
        </Card.Body>

        {isAdmin && (
          <div className="delete-edit">
            <Card.Body>
              <BsFillTrashFill
                className="delete"
                size={"30px"}
                onClick={onDeleteClicked}
              />

              <BsPencil
                className="edit"
                size={"30px"}
                onClick={onEditClicked}
              />
            </Card.Body>
          </div>
        )}
        {!isAdmin && !props.isFollowedByUser && (
          <Card.Body className="followUnfollow">
            <AiOutlineLike size={"30px"} onClick={onFollowClicked} />
            <br />
            <p>
              <span className="headlines"></span>
              {props.numOfFollowers}
            </p>
          </Card.Body>
        )}
        {!isAdmin && props.isFollowedByUser && (
          <Card.Body className="followUnfollow">
            <AiTwotoneLike size={"30px"} onClick={onUnFollowClicked} />
            <br />
            <p>
              <span className="headlines"></span>
              {props.numOfFollowers}
            </p>
          </Card.Body>
        )}
      </Card>
    </>
  );
}

export default Vacation;
