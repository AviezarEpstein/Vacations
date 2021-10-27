import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IVacation } from "../../interfaces/IVacation";
import { AppState } from "../../redux/AppState";
import { ActionType } from "../../redux/ActionType";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

function AddVacation() {
  const showModal: boolean = useSelector((state: AppState) => state.showModal);
  const serverErrors = useSelector((state: AppState) => state.errors);
  let isError = false;

  const [imageUrl, setImageUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const [isServerErrorDisplayed, setIsServerErrorDisplayed] = useState(false);

  const [isPriceErrorDisplayed, setIsPriceErrorDisplayed] = useState(false);
  const [priceError, setPriceError] = useState("");

  const [isDescriptionErrorDisplayed, setIsDescriptionErrorDisplayed] =
    useState(false);
  const [descriptionError, setDescriptionError] = useState("");

  const [isImageErrorDisplayed, setIsImageErrorDisplayed] = useState(false);
  const [imageError, setImageError] = useState("");

  const [isDateErrorDisplayed, setIsDateErrorDisplayed] = useState(false);
  const [dateErrors, setDateErrors] = useState("");

  const [isLocationErrorDisplayed, setIsLocationErrorDisplayed] =
    useState(false);
  const [locationErrors, setLocationErrors] = useState("");

  const onPriceChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let isError = false;
    setPrice(+event.target.value);
    let currentValue = +event.target.value;

    if (!currentValue || currentValue == 0) {
      setIsPriceErrorDisplayed(true);
      setPriceError("Price filed is required!");
      isError = true;
    } else {
      setIsPriceErrorDisplayed(false);
      setPriceError("");
      isError = false;
    }

    if (currentValue > 500000) {
      setIsPriceErrorDisplayed(true);
      setPriceError("Mmaximum price is $500,000");
    } else {
      if (!isError) {
        setIsPriceErrorDisplayed(false);
        setPriceError("");
      }
    }
  };

  const onStartDateChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
    let currentValue = event.target.value;
    if (endDate) {
      if (endDate < currentValue) {
        setIsDateErrorDisplayed(true);
        setDateErrors("End date must be future or even to the start date");
      } else {
        setIsDateErrorDisplayed(false);
        setDateErrors("");
      }
    }
  };

  const onDesctiptionChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let isError = false;
    setDescription(event.target.value);
    let currentValue = event.target.value;

    if (!currentValue) {
      setIsDescriptionErrorDisplayed(true);
      setDescriptionError("Description filed is required!");
      isError = true;
    } else {
      setIsDescriptionErrorDisplayed(false);
      setDescriptionError("");
    }

    if (currentValue.length > 200) {
      setIsDescriptionErrorDisplayed(true);
      setDescriptionError("Description is limited to 200 charachters");
      isError = true;
    } else {
      if (!isError) {
        setIsDescriptionErrorDisplayed(false);
        setDescriptionError("");
      }
    }
  };

  const onImageUrlChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let isError = false;
    setImageUrl(event.target.value);
    let currentValue = event.target.value;
    if (!currentValue) {
      isError = true;
      setIsImageErrorDisplayed(true);
      setImageError("Image filed is required! Please enter image URL");
    } else {
      setIsImageErrorDisplayed(false);
      setImageError("");
    }

    if (currentValue.length > 500) {
      setIsImageErrorDisplayed(true);
      setImageError("Image URL is limited to 500 charachters");
    } else {
      if (!isError) {
        setIsImageErrorDisplayed(false);
        setImageError("");
      }
    }
  };

  const onEndDateChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
    let currentValue = event.target.value;
    if (startDate) {
      if (currentValue < startDate) {
        setIsDateErrorDisplayed(true);
        setDateErrors("End date must be future or even to the start date");
      } else {
        setIsDateErrorDisplayed(false);
        setDateErrors("");
      }
    }
  };

  const onLocationChanged = (event: ChangeEvent<HTMLInputElement>) => {
    let isError = false;
    setLocation(event.target.value);
    let currentValue = event.target.value;
    if (!currentValue) {
      isError = true;
      setIsLocationErrorDisplayed(true);
      setLocationErrors("Location field is required!");
    } else {
      isError = false;
      setIsLocationErrorDisplayed(false);
      setLocationErrors("");
    }

    if (currentValue.length > 45) {
      setIsLocationErrorDisplayed(true);
      setLocationErrors("Image URL is limited to 45 charachters");
    } else {
      if (!isError) {
        setIsLocationErrorDisplayed(false);
        setLocationErrors("");
      }
    }
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClose = () => {
    dispatch({
      type: ActionType.SetShowModal,
      payload: false,
    });
    setPath();
  };

  const onAddClicked = async () => {
    console.log("Hello");

    let vacation = {
      description: description,
      location: location,
      image: imageUrl,
      startDate: startDate,
      endDate: endDate,
      price: price,
    };

    await axios.post(`http://localhost:3001/vacations`, vacation).then(
      (res) => {
        isError = false;
        let response = res.data;
        console.log(response);
        axios
          .get<IVacation[]>("http://localhost:3001/vacations")
          .then((response) => {
            let vacationsArray = response.data;
            console.log(vacationsArray);
            dispatch({
              type: ActionType.GetAllVacations,
              payload: vacationsArray,
            });
            setPath();
            dispatch({
              type: ActionType.SetShowModal,
              payload: false,
            });
          })
          .catch((e) => {
            console.error(e);
            alert(e.response.data.error);
          });
      },
      (res) => {
        setIsServerErrorDisplayed(true);
        isError = true;
        dispatch({
          type: ActionType.ShowErrors,
          payload: res.response.data.error,
        });
      }
    );
  };

  function setPath() {
    let role = checkRole();
    if (role == "customer") {
      history.push("/customer");
    }
    if (role == "admin") {
      history.push("/admin");
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

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add vacation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                onChange={onPriceChanged}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            {isPriceErrorDisplayed && (
              <Alert variant="danger">{priceError}</Alert>
            )}

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                onChange={onDesctiptionChanged}
              />
            </Form.Group>
            {isDescriptionErrorDisplayed && (
              <Alert variant="danger">{descriptionError}</Alert>
            )}

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                onChange={onImageUrlChanged}
              />
            </Form.Group>
            {isImageErrorDisplayed && (
              <Alert variant="danger">{imageError}</Alert>
            )}

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Start date:</Form.Label>
              <Form.Control
                type="date"
                min={disablePastDate()}
                placeholder="Start Date"
                onChange={onStartDateChanged}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>End date:</Form.Label>
              <Form.Control
                type="date"
                min={disablePastDate()}
                placeholder="End Date"
                onChange={onEndDateChanged}
              />
            </Form.Group>
            {isDateErrorDisplayed && (
              <Alert variant="danger">{dateErrors}</Alert>
            )}

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Location:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                onChange={onLocationChanged}
              />
            </Form.Group>
          </Form>
          {isLocationErrorDisplayed && (
            <Alert variant="danger">{locationErrors}</Alert>
          )}
          {isServerErrorDisplayed && (
            <Alert variant="danger">{serverErrors}</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={onAddClicked}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddVacation;
