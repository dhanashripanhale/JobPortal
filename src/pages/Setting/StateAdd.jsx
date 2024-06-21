import React, { useState } from "react";

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

const StateAdd = ({ closeModal, fetchState }) => {
  const { http } = Auth();
  const [state, setState] = useState({
    state_name: " ",
  });

  const addState = () => {
    console.log(state);
    http
      .post("/state/store", state) // Send state data in the request
      .then((response) => {
        setState(response.data);
        closeModal();
        fetchState();
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error adding State:", error);
      });
  };

  return (
    <div className="page-content">
      <Modal className=" rounded shadow" centered isOpen={true} size="l">
        <ModalHeader className="bg-light p-3">Create State</ModalHeader>
        <ModalBody className="border card-border-success p-3 shadow-lg card">
          <Row>
            <Col className="mb-3">
              <Label htmlFor="categoryname-field" className="form-label">
                State Name
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                name=" state_name"
                // id=" state"
                className="form-control"
                placeholder="State Name"
                type="text"
                onChange={(e) =>
                  setState({
                    ...state,
                    state_name: e.target.value,
                  })
                }
              />
            </Col>
          </Row>

          <Row>
            <Col lg={6}></Col>

            <Col style={{ marginTop: "28px" }}>
              <Button onClick={addState} color="primary">
                {" "}
                <i className="ri-save-3-line align-bottom me-1" /> Add
              </Button>
              <Button
                onClick={closeModal}
                color="danger"
                style={{ marginLeft: "7px" }}
              >
                {" "}
                <i className="ri-close-line me-1 align-middle" />
                Close
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default StateAdd;
