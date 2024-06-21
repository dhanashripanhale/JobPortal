import React, { useState, useEffect,fetchState } from "react";
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

const JobCategoryUpdate = ({ jobCategory, updateJobCategoryList, closeModal,fetchJobCategory }) => {
  const { http } = Auth();
  const [newJobCategory, setNewJobCategory] = useState({ jobcategory_id: "", jobcategory_name: "" });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (jobCategory) {
      setNewJobCategory({ 
        jobcategory_id: jobCategory.jobcategory_id,
        jobcategory_name: jobCategory.jobcategory_name
      });
    }
  }, [jobCategory]);

  const stateUpdateHandler = (e) => {
    setErrorMessage("");
    setNewJobCategory({ ...newJobCategory, jobcategory_name: e.target.value });
  };

  const updateJobCategoryHandler = () => {
    if (!newJobCategory.jobcategory_name.trim()) {
      setErrorMessage("Please fill the Job Category name.");
      return;
    }
    http.put(`/jobcategory/update`, newJobCategory)
      .then(function (response) {
        console.log(response.data);
        updateJobCategoryList(response.data);
        fetchJobCategory();
        closeModal(); // Close the modal on success
       
      })
      .catch(function (error) {
        console.log(error);
        setErrorMessage("Failed to update Job Category. Please try again."); // Improved error handling
      });
  };

  return (
    <div className="page-content">
      <Modal className="rounded shadow" centered isOpen={true} size="lg">
        <ModalHeader className="bg-light p-3">Update Job Category</ModalHeader>
        <ModalBody className="border card-border-success p-3 shadow-lg card">
          <Row>
            <Col className="mb-3">
              <Label htmlFor="categoryname-field" className="form-label">
                Job Category Name
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                name="jobcategory_name"
                className="form-control"
                type="text"
                value={newJobCategory.jobcategory_name}
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
              <Button color="primary" onClick={updateJobCategoryHandler}>
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

export default JobCategoryUpdate ;

