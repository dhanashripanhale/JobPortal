import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Row,
} from "reactstrap";
import Auth from "../AuthUser";
import MyModal from "./JobAppAdd"
import MyModalUpdate from "./JobAppUpdate"

const JobAppList = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    // setModalJobCategoryUpdate(false);
    // setSelectedJobCategory(null);
  };

  // const fetchJobCategory = async () => {
  //   try {
  //     const response = await http.get("/jobcategory/list");
  //     setJobCategory(response.data);
  //   } catch (error) {
  //     console.error("Error fetching Job Category data:", error);
  //     setError(error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchJobCategory();
  // }, []);


  return (
    <div className="page-content">
      <Container fluid>
        {showModal && <MyModal closeModal={closeModal}
        // fetchJobCategory={fetchJobCategory} 

        />}

        {/* {modalJobCategoryUpdate && (
          <MyModalUpdate
            closeModal={closeModal}
            jobCategory={selectedJobCategory}
            fetchJobCategory={fetchJobCategory}
            updateJobCategoryList={updateJobCategoryList}
          />
        )} */}

        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="card-header border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Job Category List</h5>
                  </div>
                  <div className="col-sm-auto">
                    <button
                      style={{ marginLeft: "-20px" }}
                      type="button"
                      className="btn btn-success add-btn"
                      id="create-btn"
                      onClick={() => setShowModal(true)}
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Add
                      Category
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
                      <td>SR.NO</td>
                      <td>JOB TITLE</td>
                      <td>NO.OF POST</td>
                      <td>QUALIFICATION</td>
                      <td>EXPERIENCE</td>
                      <td>POSTED DATE</td>
                      <td>COMPANY NAME</td>
                      <td>SALARY</td>
                      <td>JOB TYPE</td>
                      <td>STATE</td>
                      <td>DISTRICT</td>
                      <td>ACTIONS</td>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {jobCategory.map((jobcategory, index) => ( */}
                    {/* <tr key={index}> */}
                    {/* <td>{index + 1}</td> */}
                    {/* <td>{jobcategory.jobcategory_name}</td> */}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>


                    <td>
                      <ul className="list-inline hstack gap-2 mb-0">
                        <li className="list-inline-item edit">
                          <button
                            className="text-primary d-inline-block edit-item-btn border-0 bg-transparent"
                          // onClick={() => {
                          //   setSelectedJobCategory(jobcategory);
                          //   setModalJobCategoryUpdate(true);
                          // }}
                          >
                            <i className="ri-pencil-fill fs-16" />
                          </button>
                        </li>
                        <li className="list-inline-item">
                          <button
                            className="text-danger d-inline-block remove-item-btn  border-0 bg-transparent"
                          // onClick={() => deleteJobCategory(jobcategory.jobcategory_id)}
                          >
                            <i className="ri-delete-bin-5-fill fs-16" />
                          </button>
                        </li>
                      </ul>
                    </td>

                    {/* </tr> */}
                    {/* ))} */}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default JobAppList
