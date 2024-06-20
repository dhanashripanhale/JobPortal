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

const DistrictAdd = ({ fetchDistricts, closeModal }) => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null); // State to hold the selected state
  const [districtName, setDistrictName] = useState(""); // State to hold the district name

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
  };

  const fetchStates = () => {
    http
      .get(`state/list`)
      .then((response) => {
        setStates(response.data);
      })
      .catch((error) => {
        console.error("Error Fetching State Data:", error);
      });
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const { http } = Auth();

  const addDistrict = () => {
    if (!selectedState || !districtName) {
      console.error("State and District Name are required.");
      return;
    }

    const districtData = {
      district_name: districtName,
      district_state: selectedState.value,
    };

    http
      .post("/district/store", districtData)
      .then((response) => {
        console.log("District added successfully:", response.data);
        fetchDistricts();
        closeModal();
      })
      .catch((error) => {
        console.error("Error adding District:", error);
      });
  };

  return (
    <div className="page-content">
      <Modal className="rounded shadow" centered isOpen={true} size="l">
        <ModalHeader className="bg-light p-3">Create District</ModalHeader>
        <ModalBody className="border card-border-success p-3 shadow-lg card">
          <Row>
            <Col className="mb-3">
              <Label htmlFor="state-field" className="form-label">
                State
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Select
                value={selectedState}
                onChange={handleStateChange}
                options={states.map((state) => ({
                  label: state.state_name,
                  value: state.state_id,
                }))}
                className="basic"
                placeholder="Select State"
              />
            </Col>
            <Col className="mb-3">
              <Label htmlFor="districtname-field" className="form-label">
                District Name
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                name="district_name"
                className="form-control"
                placeholder="District Name"
                type="text"
                value={districtName}
                onChange={(e) => setDistrictName(e.target.value)}
              />
            </Col>
          </Row>

          <Row>
            <Col lg={6}></Col>

            <Col style={{ marginTop: "28px" }}>
              <Button onClick={addDistrict} color="primary">
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

export default DistrictAdd;
