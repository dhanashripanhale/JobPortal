import React, { useEffect, useState } from "react";
import { Row, Col, Container, Label } from "reactstrap";
import Select from "react-select";
import Auth from "../pages/AuthUser";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import MyModal from "./CardModal";
import { Link } from "react-router-dom";
// import { useTheme } from "@material-ui/core/styles";

const JobBody = () => {
    
  const theme = useTheme(); // Get the current theme
  const [jobCategory, setJobCategory] = useState([]);
  const [selectedJobCategory, setSelectedJobCategory] = useState(null);
  const { http } = Auth();
  const [job, setJob] = useState([]);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null); // State to store the selected job
  const [districts, setDistricts] = useState([]);

  const handleJobCategoryChange = (selectedOption) => {
    setSelectedJobCategory(selectedOption);
  };

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  const buttonStyle = {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    border: "none",
    padding: "4px 8px",
    fontSize: "10px",
    borderRadius: "4px",
    display: "inline-block",
    textDecoration: "none",
    cursor: "pointer",
  };

  const fetchDistricts = async () => {
    try {
      const response = await http.get("/district/list");
      setDistricts(response.data);
    } catch (error) {
      console.error("Error fetching District data:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

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

  const fetchJob = async () => {
    try {
      const response = await http.get("/job/list");
      setJob(response.data);
    } catch (error) {
      console.error("Error fetching Job data:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchJobCategory();

    fetchJob();
  }, []); // Fetch data on component mount

  const openJobDetailsModal = (job) => {
    setSelectedJob(job); // Set the selected job when "MORE DETAILS" button is clicked
    setShowModal(true); // Open the modal
  };

  return (
    <Container>
      {showModal && (
        <MyModal selectedJob={selectedJob} closeModal={closeModal} />
      )}
      <Row>
        <Col>
          <Row>
            <Col
              xs="8"
              className="mb-4"
              style={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #ccc",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <Label
                htmlFor="state-field"
                className="form-label"
                style={{ color: "#0d6efd" }}
              >
                Filter By Job Category
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
          </Row>
          <Row>
            <Col
              xs="8"
              className="mb-4"
              style={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #ccc",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <Label
                htmlFor="state-field"
                className="form-label"
                style={{ color: "#0d6efd" }}
              >
                Filter Job By Location
              </Label>
              <table>
                <tbody>
                  {districts.map((district, index) => (
                    <tr key={index}>
                      <td>
                    
                        <LocationOnIcon
                          style={{
                            color: theme.palette.primary.main,
                            fontSize: 18,
                          }}
                        />
                      </td>
                      <td>{district.district_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
        </Col>
        <Col xs="8">
          {job.map((job) => (
            <div
              key={job.job_id}
              className="card w-75"
              style={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #ccc",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                borderRadius: "5px",
                marginBottom: "20px",
              }}
            >
              <div className="card-body">
                <h6>
                  <LocationOnIcon
                    style={{ color: theme.palette.primary.main, fontSize: 20 }}
                  />
                  <span style={{ color: theme.palette.primary.main }}>
                    {job.district_name}
                  </span>
                </h6>
                <h5 className="card-title" style={{ fontSize: 20 }}>
                  {job.job_name}
                </h5>
                <h6
                  className="card-text"
                  style={{ marginTop: "-10px", color: "2F4F4F", fontSize: 14 }}
                >
                  {job.company_name}
                </h6>
                <h6
                  className="card-text"
                  style={{ marginTop: "-5px", color: "2F4F4F", fontSize: 12 }}
                >
                  
                  {job.job_type} | {job.job_experience}
                </h6>
                <p className="card-text">{job.job_des}</p>
                <a
                  href="#a"
                  className="btn"
                  style={buttonStyle}
                  onClick={() => openJobDetailsModal(job)}
                >
                  <AddIcon /> MORE DETAILS
                </a>
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default JobBody;
