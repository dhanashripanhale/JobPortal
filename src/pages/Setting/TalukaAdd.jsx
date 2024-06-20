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

const TalukaAdd = ({ closeModal }) => {
  const [talukaName,setTalukaName]=useState("");

  const talukaChange=(e)=>{
    setTalukaName(e.target.value);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("Taluka name:",talukaName);
    setTalukaName("");
  }
  return (
    <div className="page-content">
    
    <Modal
        className=' rounded shadow'
        centered
        isOpen={true}
        size="l"
      >
        <ModalHeader className="bg-light p-3">Create Taluka</ModalHeader>
        <ModalBody className="border card-border-success p-3 shadow-lg card">
          <Row>
            <Col className="mb-3">
              <Label htmlFor="categoryname-field" className="form-label">
              Taluka Name
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                name=" taluka"
                id=" taluka"
                className="form-control"
                placeholder="Taluka Name"
                type="text"
                onChange={talukaChange}
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

export default TalukaAdd;