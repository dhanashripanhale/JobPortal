import React, { useState } from 'react'
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
import Select, { components } from "react-select";


const Register = ({closeModal}) => {
    const [workStatus_id, setWorkStatus_id] = useState("");
    const workStatusChange = (selectedOption) =>
        setWorkStatus_id(selectedOption ? selectedOption.value : "");
  return (
    <div className="page-content">
      <Modal className="rounded shadow" centered isOpen={true} size="l">
        <ModalHeader className="bg-light p-3">Create Your Profile</ModalHeader>
        <ModalBody className="border card-border-success p-3 shadow-lg card">
          <Row>
           
            <Col className="mb-3">
              <Label htmlFor="districtname-field" className="form-label">
                Full Name
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                name="full_name"
                className="form-control"
                placeholder="What is Your Full Name ?"
                type="text"
                // value={jobName}
                // onChange={(e) => setJobName(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
          <Col className="mb-3">
              <Label htmlFor="districtname-field" className="form-label">
               Email Id
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                name="email"
                className="form-control"
                placeholder="Enter Your Email Id"
                type="text"
                // value={jobDes}
                // onChange={(e) => setJobDes(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
          
          <Col className="mb-3">
              <Label htmlFor="districtname-field" className="form-label">
              Password
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                name="passwprd"
                className="form-control"
                placeholder="(Minimum 6 Character)"
                type="password"
                // value={companyName}
                // onChange={(e) => setCompnayName(e.target.value)}
              />
            </Col>
           
            <Row>
            <Col className="mb-3">
              <Label htmlFor="districtname-field" className="form-label">
             Mobile Number
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                name="mobile"
                className="form-control"
                placeholder="Mobile Number"
                type="text"
                // value={companyName}
                // onChange={(e) => setCompnayName(e.target.value)}
              />
            </Col>
            </Row>
            
            
          </Row>
          <Row>
          <Col className="mb-6">
          <label className="font-weight-bold">Work Status</label>
                <Select
                  id="workStatus_id"
                  name="workstatus_id"
                  onChange={workStatusChange}
                  options={[
                    { label: "Experienced", value: "1" },
                    { label: "Fresher", value: "2" },
                 
                  ]}
                ></Select>
             
            </Col>
            </Row>
            <Row>
          
            
            </Row>
           


          <Row>
            <Col lg={6}></Col>

            <Col style={{ marginTop: "28px" }}>
              <Button  color="primary"  onClick={closeModal}>
                <i className="ri-save-3-line align-bottom me-1" />Register Now
              </Button>
              {/* <Button
                onClick={closeModal}
                color="danger"
                style={{ marginLeft: "7px" }}
              >
                <i className="ri-close-line me-1 align-middle" />
                Close
              </Button> */}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default Register
