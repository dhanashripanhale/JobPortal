import React, { useEffect, useState } from "react";
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
import Select from "react-select";

const JobAdd = ({ fetchJob, closeModal }) => {
  const [jobCategory, setJobCategory] = useState([]);
  const [selectedJobCategory, setSelectedJobCategory] = useState(null); // State to hold the selected state
  const [jobName, setJobName] = useState(""); // State to hold the district name
  const [jobDes,setJobDes] = useState("");
  const [companyName,setCompnayName] = useState("");
  const [experience,setExperience] = useState("");
  const [salary,setSalary] = useState("");

  const { http } = Auth();
  const handleJobCategoryChange = (selectedOption) => {
    setSelectedJobCategory(selectedOption);
  };
  const [uploadLogo, setUploadLogo] = useState(null);

  const uploadLogoChange = (event) => setUploadLogo(event.target.files[0]);


  const fetchJobCategory = () => {
    http
      .get(`jobcategory/list`)
      .then((response) => {
        setJobCategory(response.data);
      })
      .catch((error) => {
        console.error("Error Fetching Job category Data:", error);
      });
  };

  useEffect(() => {
    fetchJobCategory();
  }, []);

 

  const addJob = () => {
    if (!selectedJobCategory || !jobName) {
      console.error("Job Category  and Job Name are required.");
      return;
    }

    const JobData = {
      job_name: jobName,
      job_jobcategory: selectedJobCategory.value,
      company_name: companyName,
      job_des:jobDes,
      job_experience:experience,
      job_salary:salary,

    };

    http
      .post("/job/store", JobData)
      .then((response) => {
        console.log("Job added successfully:", response.data);
        fetchJob();
        closeModal();
      })
      .catch((error) => {
        console.error("Error adding Job:", error);
      });
  };

  return (
    <div className="page-content">
      <Modal className="rounded shadow" centered isOpen={true} size="l">
        <ModalHeader className="bg-light p-3">Create Job</ModalHeader>
        <ModalBody className="border card-border-success p-3 shadow-lg card">
          <Row>
            <Col className="mb-3">
              <Label htmlFor="state-field" className="form-label">
                Job Category
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Select
                value={selectedJobCategory}
                onChange={handleJobCategoryChange}
                options={jobCategory.map((jobcategory) => ({
                  label: jobcategory.jobcategory_name,
                  value: jobcategory.jobcategory_id,
                }))}
                className="basic"
                placeholder="Select Job category"
              />
            </Col>
            <Col className="mb-3">
              <Label htmlFor="districtname-field" className="form-label">
                Job Name
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                name="job_name"
                className="form-control"
                placeholder="Job Name"
                type="text"
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
          <Col className="mb-3">
              <Label htmlFor="districtname-field" className="form-label">
                Job Discription
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                name="jobdis_name"
                className="form-control"
                placeholder="Job Distription"
                type="text"
                value={jobDes}
                onChange={(e) => setJobDes(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
          
          <Col className="mb-3">
              <Label htmlFor="districtname-field" className="form-label">
                Company Name
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                name="compnay_name"
                className="form-control"
                placeholder="Company Name"
                type="text"
                value={companyName}
                onChange={(e) => setCompnayName(e.target.value)}
              />
            </Col>
            <Col className="mb-3">
              <Label htmlFor="districtname-field" className="form-label">
              Upload Company LOGO
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                type="file"
                  onChange={uploadLogoChange}
                  style={{ display: "block" }}
                  id="fileInput"
              />
            </Col>
            
            
          </Row>
          <Row>
          <Col className="mb-3">
              <Label htmlFor="districtname-field" className="form-label">
              Experience
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                name="experience"
                className="form-control"
                placeholder="Experience "
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </Col>
          <Col className="mb-6">
              <Label htmlFor="districtname-field" className="form-label">
               Salary
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                name="salary"
                className="form-control"
                placeholder="Salary "
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </Col>
            </Row>
           


          <Row>
            <Col lg={6}></Col>

            <Col style={{ marginTop: "28px" }}>
              <Button onClick={addJob} color="primary">
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

export default JobAdd;
