import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ActionType } from "../../redux/ActionType";
import { AppState } from "../../redux/AppState";
import { IVacation } from "../../interfaces/IVacation";
import Vacation from "../vacation/vacation";
import { Container } from "react-bootstrap";

function VacationContainer() {
  const vacations = useSelector((state: AppState) => state.vacations);
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    console.log(token);

     axios
      .get<IVacation[]>("http://localhost:3001/vacations")
      .then((response) => {
        let vacationsArray = response.data;
        console.log(vacationsArray);
        dispatch({ type: ActionType.GetAllVacations, payload: vacationsArray });
      })
      .catch((e) => {
        console.error(e);
        alert("Faild");
      });
  }, []);

  return (
      <Container className = "container">
      {vacations.map((vacation: IVacation, index) => (
        <Vacation
          key={index}
          isFollowedByUser={vacation.isFollowedByUser}
          description={vacation.description}
          image={vacation.image}
          price={vacation.price}
          startDate={vacation.startDate}
          endDate={vacation.endDate}
          id={vacation.id}
          numOfFollowers={vacation.numOfFollowers}
          location={vacation.location}
        />
      ))}
      </Container>
  );
}

export default VacationContainer;
