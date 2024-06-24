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
import Select from "react-select";
import Auth from "../AuthUser";

const JobUpdate = ({ closeModal, job, updateJobList, fetchJob }) => {
  const { http } = Auth();
  const [newJob, setNewJob] = useState({
    job_name: "",
    jobcategory_id: null,
    job_des: "",
    company_name: "",
    job_experience: "",
    job_salary: "",
    district_id: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [jobCategory, setJobCategory] = useState([]);
  const [selectedJobCategory, setSelectedJobCategory] = useState(null);
  const [uploadLogo, setUploadLogo] = useState(null);
  const [districts, setDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    setNewJob({ ...newJob, district_id: selectedOption.value });
  };

  const uploadLogoChange = (event) => setUploadLogo(event.target.files[0]);

  const handleJobCategoryChange = (selectedOption) => {
    setSelectedJobCategory(selectedOption);
    setNewJob({ ...newJob, jobcategory_id: selectedOption.value });
  };

  const fetchDistrict = () => {
    http
      .get(`district/list`)
      .then((response) => {
        setDistrict(response.data);
      })
      .catch((error) => {
        console.error("Error Fetching District Data:", error);
      });
  };

  useEffect(() => {
    fetchDistrict();
  }, []);

  const fetchJobCategory = () => {
    http
      .get(`jobcategory/list`)
      .then((response) => {
        setJobCategory(response.data);
      })
      .catch((error) => {
        console.error("Error Fetching Job Category Data:", error);
      });
  };

  useEffect(() => {
    fetchJobCategory();
  }, []);

  useEffect(() => {
    if (job) {
      setNewJob({
        job_id: job.job_id,
        job_name: job.job_name,
        job_des: job.job_des,
        company_name: job.company_name,
        job_experience: job.job_experience,
        job_salary: job.job_salary,
        jobcategory_id: job.jobcategory_id,
        district_id: job.district_id,
      });
      setSelectedJobCategory({
        label: job.jobcategory_name,
        value: job.jobcategory_id,
      });
      setSelectedDistrict({
        label: job.district_name,
        value: job.district_id,
      });
    }
  }, [job]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const updateJobHandler = async () => {
    if (!newJob.job_name.trim() || !newJob.jobcategory_id || !newJob.district_id) {
      setErrorMessage("Please fill all required fields.");
      return;
    }
    try {
      const formData = new FormData();
      Object.keys(newJob).forEach(key => {
        formData.append(key, newJob[key]);
      });
      if (uploadLogo) {
        formData.append("company_logo", uploadLogo);
      }

      const response = await http.put(`/job/update`, formData);
      updateJobList(response.data);
      fetchJob();
      closeModal();
    } catch (error) {
      console.error("Error updating Job:", error);
      setErrorMessage("Failed to update Job. Please try again.");
    }
  };

  return (
    <Modal className="rounded shadow" centered isOpen={true} size="lg">
     
      <ModalHeader className="bg-light p-3">Update Job</ModalHeader>
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
            <Label htmlFor="jobname-field" className="form-label">
              Job Name
              <span style={{ color: "red" }}> *</span>
            </Label>
            <Input
              id="jobname-field"
              name="job_name"
              className="form-control"
              type="text"
              value={newJob.job_name}
              onChange={handleInputChange}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-3">
            <Label htmlFor="jobdes-field" className="form-label">
              Job Description
              <span style={{ color: "red" }}> *</span>
            </Label>
            <Input
              name="job_des"
              className="form-control"
              placeholder="Job Description"
              type="text"
              value={newJob.job_des}
              onChange={handleInputChange}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-3">
            <Label htmlFor="companyname-field" className="form-label">
              Company Name
              <span style={{ color: "red" }}> *</span>
            </Label>
            <Input
              name="company_name"
              className="form-control"
              placeholder="Company Name"
              type="text"
              value={newJob.company_name}
              onChange={handleInputChange}
            />
          </Col>
          <Col className="mb-3">
            <Label htmlFor="logo-field" className="form-label">
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
            <Label htmlFor="state-field" className="form-label">
              District
              <span style={{ color: "red" }}> *</span>
            </Label>
            <Select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              options={districts.map((district) => ({
                label: district.district_name,
                value: district.district_id,
              }))}
              className="basic"
              placeholder="Select State"
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-3">
            <Label htmlFor="experience-field" className="form-label">
              Experience
              <span style={{ color: "red" }}> *</span>
            </Label>
            <Input
              name="job_experience"
              className="form-control"
              placeholder="Experience"
              type="text"
              value={newJob.job_experience}
              onChange={handleInputChange}
            />
          </Col>
          <Col className="mb-3">
            <Label htmlFor="salary-field" className="form-label">
              Salary
              <span style={{ color: "red" }}> *</span>
            </Label>
            <Input
              name="job_salary"
              className="form-control"
              placeholder="Salary"
              type="text"
              value={newJob.job_salary}
              onChange={handleInputChange}
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
            <Button color="primary" onClick={updateJobHandler}>
              <i className="ri-save-3-line align-bottom me-1" /> Update
            </Button>
            <Button
              onClick={closeModal}
              color="danger"
              style={{ marginLeft: "7px" }}
            >
              <i className="ri-close-line me-1 align-middle" /> Close
            </Button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default JobUpdate;
