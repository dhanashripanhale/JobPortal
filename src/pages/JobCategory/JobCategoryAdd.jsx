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

const JobCategoryAdd = ({ closeModal, fetchJobCategory }) => {
  const { http } = Auth();
  const [jobCategory, setJobCategory] = useState({
    jobcategory_name: " ",
  });

  const addJobCategory = () => {
    console.log(jobCategory);
    http
      .post("/jobcategory/store", jobCategory) // Send state data in the request
      .then((response) => {
        setJobCategory(response.data);
        closeModal();
        fetchJobCategory();
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error adding Job Category:", error);
      });
  };

  return (
    <div className="page-content">
      <Modal className=" rounded shadow" centered isOpen={true} size="l">
        <ModalHeader className="bg-light p-3">Create Job Category</ModalHeader>
        <ModalBody className="border card-border-success p-3 shadow-lg card">
          <Row>
            <Col className="mb-3">
              <Label htmlFor="categoryname-field" className="form-label">
                Job Category Name
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                name=" jobcategory_name"
                id=" jobcategory_name"
                className="form-control"
                placeholder="Job Category Name"
                type="text"
                //  value={jobCategory}
                // onChange={(e) => setJobCategory(e.target.value)}

                onChange={(e) =>
                  setJobCategory({
                    ...jobCategory,
                    jobcategory_name: e.target.value,
                  })
                }
              />
            </Col>
          </Row>

          <Row>
            <Col lg={6}></Col>

            <Col style={{ marginTop: "28px" }}>
              <Button onClick={addJobCategory} color="primary">
            
                <i className="ri-save-3-line align-bottom me-1" /> Add
              </Button>
              <Button
                onClick={closeModal}
                color="danger"
                style={{ marginLeft: "7px" }}
              >
             
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

export default JobCategoryAdd;
