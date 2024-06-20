import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import MyModal from "./TalukaAdd";

import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Row,
} from "reactstrap";
import Auth from "../AuthUser";

const TalukaList = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);


  const { http } = Auth();
  const [taluka, setTaluka] = useState([]);
  const [error, setError] = useState(null);

  const fetchTaluka = async () => {
    try {
        const response = await http.get("/taluka/list");

        setTaluka(response.data);
    } catch (error) {
        console.error('Error fetching Taluka data:', error);
        setError(error.message);
    }
};

useEffect(() => {
  fetchTaluka();
}, []);
  

  return (
    <div className="page-content">
      <Container fluid>
        {showModal && <MyModal closeModal={closeModal} />}

        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="card-header border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Taluka List</h5>
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
                      Taluka
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
                      <th>TALUKA NAME</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                  {taluka.map((taluka, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{taluka.taluka_name}</td>

                

                      <td>
                        <ul className="list-inline hstack gap-2 mb-0">
                          <li className="list-inline-item edit">
                            <button className="text-primary d-inline-block edit-item-btn border-0 bg-transparent">
                              <i className="ri-pencil-fill fs-16" />
                            </button>
                          </li>
                          <li className="list-inline-item">
                            <button className="text-danger d-inline-block remove-item-btn  border-0 bg-transparent">
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

export default TalukaList;
