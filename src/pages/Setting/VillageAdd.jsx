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

const VillageAdd = ({ closeModal }) => {
  const [villageName,setVillageName]=useState("");

  const villageChange=(e)=>{
    setVillageName(e.target.value);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("Village name:",villageName);
    setVillageName("");
  }
  return (
    <div className="page-content">
    
    <Modal
        className=' rounded shadow'
        centered
        isOpen={true}
        size="l"
      >
        <ModalHeader className="bg-light p-3">Create Village</ModalHeader>
        <ModalBody className="border card-border-success p-3 shadow-lg card">
          <Row>
            <Col className="mb-3">
              <Label htmlFor="categoryname-field" className="form-label">
              Village Name
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                name="village"
                id="village"
                className="form-control"
                placeholder="Village Name"
                type="text"
                onChange={villageChange}
              />
            </Col>
          </Row>

          <Row>
          <Col lg={6}></Col>

            <Col style={{ marginTop: "28px" }}>
              <Button onClick={handleSubmit} color="primary"> <i className="ri-save-3-line align-bottom me-1" /> Save</Button>
              <Button
                onClick={closeModal}
                color="danger"
                style={{ marginLeft: "7px" }}
              > <i className="ri-close-line me-1 align-middle" />
                Close
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default VillageAdd;
