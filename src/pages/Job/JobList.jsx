import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardBody, Col, Container, CardHeader, Row } from "reactstrap";
import Auth from "../AuthUser";
import MyModal from "./JobAdd";
import MyModalUpdate from "./JobUpdate";

const JobList = () => {
  const { http } = Auth();
  const [job, setJob] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalJobUpdate, setModalJobUpdate] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const closeModal = () => {
    setShowModal(false);
    setModalJobUpdate(false);
    setSelectedJob(null);
  };

  const updateJobList = (updatedJob) => {
    setJob((prevJob) =>
      prevJob.map((job) => (job.job_id === updatedJob.job_id ? updatedJob : job))
    );
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
    fetchJob();
  }, []);

  const deleteJob = (jobId) => {
    http.delete(`job/delete/${jobId}`)
      .then(() => {
        setJob((prevJob) => prevJob.filter((job) => job.job_id !== jobId));
      })
      .catch((error) => {
        console.error("Error deleting Job:", error);
      });
  };

  return (
    <div className="page-content">
      <Container fluid>
        {showModal && <MyModal closeModal={closeModal} fetchJob={fetchJob} />}
        {modalJobUpdate && (
          <MyModalUpdate
            closeModal={closeModal}
            job={selectedJob}
            fetchJob={fetchJob}
            updateJobList={updateJobList}
          />
        )}

        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="card-header border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Job List</h5>
                  </div>
                  <div className="col-sm-auto">
                    <button
                      style={{ marginLeft: "-20px" }}
                      type="button"
                      className="btn btn-success add-btn"
                      id="create-btn"
                      onClick={() => setShowModal(true)}
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Add Job
                    </button>
                  </div>
                </Row>
              </CardHeader>

              <CardBody className="pt-0">
                <table
                  role="table"
                  className="align-middle table-nowrap table table-hover"
                >
                  <thead className="table-light text-muted text-uppercase">
                    <tr>
                      <th>#</th>
                      <th>JOB TITLE</th>
                      <th>CATEGORY</th>
                      <th>COMPANY LOGO</th>
                      <th>COMPANY NAME</th>
                      <th>EXPERIENCE</th>
                      <th>SALARY</th>
                      <th>Location</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {job.map((job, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{job.job_name}</td>
                        <td>{job.jobcategory_name}</td>
                        <td></td>
                        <td>{job.company_name}</td>
                        <td>{job.job_experience}</td>
                        <td>{job.job_salary}</td>
                        <td>{job.district_name}</td>
                        <td>
                          <ul className="list-inline hstack gap-2 mb-0">
                            <li className="list-inline-item edit">
                              <button
                                className="text-primary d-inline-block edit-item-btn border-0 bg-transparent"
                                onClick={() => {
                                  setSelectedJob(job);
                                  setModalJobUpdate(true);
                                }}
                              >
                                <i className="ri-pencil-fill fs-16" />
                              </button>
                            </li>
                            <li className="list-inline-item">
                              <button
                                className="text-danger d-inline-block remove-item-btn border-0 bg-transparent"
                                onClick={() => deleteJob(job.job_id)}
                              >
                                <i className="ri-delete-bin-5-fill fs-16" />
                              </button>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default JobList;
