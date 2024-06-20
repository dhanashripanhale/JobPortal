import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import MyModal from "./DistrictAdd";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Row,
} from "reactstrap";
import MyModalUpdate from "./DistrictUpdate";
import Auth from "../AuthUser";

const DistrictList = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    setModalDistrictUpdate(false);
  };
  const [modalDistrictUpdate, setModalDistrictUpdate] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const { http } = Auth();
  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState(null);

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

  const deleteDistrict = async (districtId) => {
    try {
      await http.delete(`/district/delete/${districtId}`);
      setDistricts((prevDistricts) =>
        prevDistricts.filter((district) => district.district_id !== districtId)
      );
    } catch (error) {
      console.error("Error deleting District:", error);
    }
  };

  const updateDistrictList = (updatedDistrict) => {
    setDistricts((prevDistricts) =>
      prevDistricts.map((district) =>
        district.district_id === updatedDistrict.district_id
          ? updatedDistrict
          : district
      )
    );
  };

  return (
    <div className="page-content">
      <Container fluid>
        {showModal && <MyModal fetchDistricts={fetchDistricts} closeModal={closeModal}  />}
        {modalDistrictUpdate && (
          <MyModalUpdate
            closeModal={closeModal}
            district={selectedDistrict}
            fetchDistricts={fetchDistricts}
            updateDistrictList={updateDistrictList}
          />
        )}
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="card-header border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">District List</h5>
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
                      District
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
                      <th>DISTRICT NAME</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {districts.map((district, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{district.district_name}</td>
                        <td>
                          <ul className="list-inline hstack gap-2 mb-0">
                            <li className="list-inline-item edit">
                              <button
                                className="text-primary d-inline-block edit-item-btn border-0 bg-transparent"
                                onClick={() => {
                                  setSelectedDistrict(district);
                                  setModalDistrictUpdate(true);
                                }}
                              >
                                <i className="ri-pencil-fill fs-16" />
                              </button>
                            </li>
                            <li className="list-inline-item">
                              <button
                                className="text-danger d-inline-block remove-item-btn border-0 bg-transparent"
                                onClick={() => deleteDistrict(district.district_id)}
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

export default DistrictList;
