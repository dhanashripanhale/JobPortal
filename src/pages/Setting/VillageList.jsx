import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import MyModal from "./VillageAdd";

import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Row,
} from "reactstrap";
import Auth from "../AuthUser";
import MyModalUpdate from "./VillageUpdate"



const VillageList = () => {

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    setModalVillageUpdate(false);
  };
  const [modalVillageUpdate, setModalVillageUpdate] = useState(false);
  const [selectedVillage, setSelectedVillage] = useState(null);

  const { http } = Auth();
  const [village, setVillage] = useState([]);
  const [error, setError] = useState(null);

  const fetchVillage = async () => {
    try {
        const response = await http.get("/village/list");

        setVillage(response.data);
    } catch (error) {
        console.error('Error fetching Village data:', error);
        setError(error.message);
    }
};

useEffect(() => {
  fetchVillage();
}, []);

const updateVillageList = (updatedVillage) => {
  setVillage((prevvillage) =>
    prevvillage.map((village) =>
      village.villag_id === updatedVillage.village_id
        ? updatedVillage
        : village
    )
  );
};


const deleteVillage = async (villageId) => {
  try {
    await http.delete(`/village/delete/${villageId}`);
    setVillage((prevvillage) =>
      prevvillage.filter((village) => village.village_id !== villageId)
    );
  } catch (error) {
    console.error("Error deleting Village:", error);
  }
};

  return (
    <div className="page-content">
      <Container fluid>
        {/* {showModal && <MyModal closeModal={closeModal} />} */}
        {showModal && <MyModal closeModal={closeModal} fetchVillage={fetchVillage} />}
        {modalVillageUpdate && (
          <MyModalUpdate
            closeModal={closeModal}
            village={selectedVillage}
            fetchVillage={fetchVillage}
            updateVillageList={updateVillageList}

          />
        )}

        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="card-header border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Village List</h5>
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
                      Village
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
                      <th>VILLAGE NAME</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                  {village.map((village, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{village.village_name}</td>

                

                      <td>
                        <ul className="list-inline hstack gap-2 mb-0">
                          <li className="list-inline-item edit">
                            <button className="text-primary d-inline-block edit-item-btn border-0 bg-transparent"
                              onClick={() => {
                                  setSelectedVillage(village);
                                  setModalVillageUpdate(true);
                                }}>
                              <i className="ri-pencil-fill fs-16" />
                            </button>
                          </li>
                          <li className="list-inline-item">
                            <button className="text-danger d-inline-block remove-item-btn  border-0 bg-transparent"
                                onClick={() => deleteVillage(village.village_id)}
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

export default VillageList;
