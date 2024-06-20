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

const DistrictUpdate = ({ closeModal, district, updateDistrictList }) => {
  const { http } = Auth();
  const [newDistrict, setNewDistrict] = useState({ district_name: "", state_id: null });
  const [errorMessage, setErrorMessage] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);

  // Handle state change from dropdown
  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setNewDistrict({ ...newDistrict, state_id: selectedOption.value });
  };

  // Fetch states from the server
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

  // Fetch states when the component mounts
  useEffect(() => {
    fetchStates();
  }, []);

  // Set initial district and state values when district prop changes
  useEffect(() => {
    if (district) {
      setNewDistrict({
        district_id: district.district_id,
        district_name: district.district_name,
        state_id: district.state_id, // Assuming district object has a state_id property
      });
      setSelectedState({
        label: district.state_name, // Assuming district object has a state_name property
        value: district.state_id,
      });
    }
  }, [district]);

  // Handle district name change
  const districtUpdateHandler = (e) => {
    setErrorMessage("");
    setNewDistrict({ ...newDistrict, district_name: e.target.value });
  };

  // Handle update button click
  const updateDistrictHandler = async () => {
    if (!newDistrict.district_name.trim() || !newDistrict.state_id) {
      setErrorMessage("Please fill the District name and select a State.");
      return;
    }
    try {
      const response = await http.put(`/district/update`, newDistrict);
      updateDistrictList(response.data);
      closeModal();
    } catch (error) {
      console.error("Error updating district:", error);
      setErrorMessage("Failed to update district. Please try again.");
    }
  };

  return (
    <Modal className="rounded shadow" centered isOpen={true} size="lg">
      <ModalHeader className="bg-light p-3">Update District</ModalHeader>
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
        </Row>
        <Row>
          <Col className="mb-3">
            <Label htmlFor="districtname-field" className="form-label">
              District Name
              <span style={{ color: "red" }}> *</span>
            </Label>
            <Input
              id="districtname-field"
              name="district_name"
              className="form-control"
              type="text"
              value={newDistrict.district_name}
              onChange={districtUpdateHandler}
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
            <Button color="primary" onClick={updateDistrictHandler}>
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

export default DistrictUpdate;
