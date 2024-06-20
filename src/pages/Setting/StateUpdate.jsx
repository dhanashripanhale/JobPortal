import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Row,
  Col,
  Button,
} from "reactstrap";
import Auth from "../AuthUser";

const StateUpdate = ({ state, updateStateList, closeModal }) => {
  const { http } = Auth();
  const [newState, setNewState] = useState({ state_id: "", state_name: "" });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (state) {
      setNewState({ 
        state_id: state.state_id,
        state_name: state.state_name
      });
    }
  }, [state]);

  const stateUpdateHandler = (e) => {
    setErrorMessage("");
    setNewState({ ...newState, state_name: e.target.value });
  };

  const updateStateHandler = () => {
    if (!newState.state_name.trim()) {
      setErrorMessage("Please fill the State name.");
      return;
    }
    http.put(`/state/update`, newState)
      .then(function (response) {
        console.log(response.data);
        updateStateList(response.data);
        closeModal(); // Close the modal on success
      })
      .catch(function (error) {
        console.log(error);
        setErrorMessage("Failed to update state. Please try again."); // Improved error handling
      });
  };

  return (
    <div className="page-content">
      <Modal className="rounded shadow" centered isOpen={true} size="lg">
        <ModalHeader className="bg-light p-3">Update State</ModalHeader>
        <ModalBody className="border card-border-success p-3 shadow-lg card">
          <Row>
            <Col className="mb-3">
              <Label htmlFor="categoryname-field" className="form-label">
                State Name
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                name="state_name"
                className="form-control"
                type="text"
                value={newState.state_name}
                onChange={stateUpdateHandler}
              />
            </Col>
          </Row>
          {errorMessage && (
            <Row>
              <Col>
                <p style={{ color: "red" }}>{errorMessage}</p>
              </Col>
            </Row>
          )}
          <Row>
            <Col lg={6}></Col>
            <Col style={{ marginTop: "28px" }}>
              <Button color="primary" onClick={updateStateHandler}>
                <i className="ri-save-3-line align-bottom me-1" /> Update
              </Button>
              <Button onClick={closeModal} color="danger" style={{ marginLeft: "7px" }}>
                <i className="ri-close-line me-1 align-middle" /> Close
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default StateUpdate;
