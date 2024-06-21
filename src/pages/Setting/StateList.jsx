import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import MyModal from "./StateAdd";
import MyModalUpdate from "./StateUpdate";

import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Row,
} from "reactstrap";
import Auth from "../AuthUser";

const StateList = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalStatesUpdate, setModalStatesUpdate] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  console.log(selectedState);
  const { http } = Auth();
  const [states, setStates] = useState([]);
  const [error, setError] = useState(null);

  const fetchStates = async () => {
    try {
      const response = await http.get("/state/list");
      setStates(response.data);
    } catch (error) {
      console.error("Error fetching State data:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const deleteState = (stateId) => {
    http.delete(`state/delete/${stateId}`)
      .then(() => {
        setStates(prevStates => prevStates.filter(state => state.state_id !== stateId));
      })
      .catch((error) => {
        console.error("Error deleting State:", error);
      });
  };

  const updateStateList = (updatedState) => {
    setStates(prevStates =>
      prevStates.map(state =>
        state.state_id === updatedState.state_id ? updatedState : state
      )
    );
  };

  const closeModal = () => {
    setShowModal(false);
    setModalStatesUpdate(false);
    setSelectedState(null);
  };

  return (
    <div className="page-content">
      <Container fluid>
        {showModal && <MyModal closeModal={closeModal} fetchState={fetchStates} />}
        {modalStatesUpdate && (
  <MyModalUpdate
    closeModal={closeModal}
    state={selectedState}
    updateStateList={updateStateList}
    fetchState={fetchStates}
  />
)}


        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="card-header border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">State List</h5>
                  </div>

                  <div className="col-sm-auto">
                    <button
                      style={{ marginLeft: "-20px" }}
                      type="button"
                      className="btn btn-success add-btn"
                      id="create-btn"
                      onClick={() => setShowModal(true)}
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Add State
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
                      <th>STATE NAME</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {states.map((state, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{state.state_name}</td>

                        <td>
                          <ul className="list-inline hstack gap-2 mb-0">
                            <li className="list-inline-item edit">
                              <button
                                className="text-primary d-inline-block edit-item-btn border-0 bg-transparent"
                                onClick={() => {
                                  setSelectedState(state);
                                  setModalStatesUpdate(true);
                                }}
                              >
                                <i className="ri-pencil-fill fs-16" />
                              </button>
                            </li>
                            <li className="list-inline-item">
                              <button
                                className="text-danger d-inline-block remove-item-btn border-0 bg-transparent"
                                onClick={() => deleteState(state.state_id)}
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

export default StateList;
