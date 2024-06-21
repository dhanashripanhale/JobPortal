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

const TalukaUpdate = ({ closeModal, taluka, updateTalukaList,fetchTaluka }) => {
  const { http } = Auth();
  const [newTaluka, setNewTaluka] = useState({ taluka_name: "", taluka_id: null });
  const [errorMessage, setErrorMessage] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // Handle state change from dropdown
  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    setNewTaluka({ ...newTaluka, district_id: selectedOption.value });
  };

  // Fetch states from the server
  const fetchDistrict = () => {
    http
      .get(`district/list`)
      .then((response) => {
        setDistricts(response.data);
      })
      .catch((error) => {
        console.error("Error Fetching District Data:", error);
      });
  };

  // Fetch states when the component mounts
  useEffect(() => {
    fetchDistrict();
  }, []);

  // Set initial district and state values when district prop changes
  useEffect(() => {
    if (taluka) {
      setNewTaluka({
        taluka_id: taluka.taluka_id,
        taluka_name: taluka.taluka_name,
        district_id: taluka.district_id, // Assuming district object has a state_id property
      });
      setSelectedDistrict({
        label: taluka.district_name, // Assuming district object has a state_name property
        value: taluka.district_id,
      });
    }
  }, [taluka]);

  // Handle district name change
  const TalukaUpdateHandler = (e) => {
    setErrorMessage("");
    setNewTaluka({ ...newTaluka, taluka_name: e.target.value });
  };

  // Handle update button click
  const updateTalukaHandler = async () => {
    if (!newTaluka.taluka_name.trim() || !newTaluka.district_id) {
      setErrorMessage("Please fill the District name and select a State.");
      return;
    }
    try {
      const response = await http.put(`/taluka/update`, newTaluka);
      updateTalukaList(response.data);
      fetchTaluka();
      closeModal();
    } catch (error) {
      console.error("Error updating Taluka:", error);
      setErrorMessage("Failed to update Taluka. Please try again.");
    }
  };
  return (
    <Modal className="rounded shadow" centered isOpen={true} size="lg">
    <ModalHeader className="bg-light p-3">Update Taluka</ModalHeader>
    <ModalBody className="border card-border-success p-3 shadow-lg card">
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
     
        <Col className="mb-3">
          <Label htmlFor="districtname-field" className="form-label">
            Taluka Name
            <span style={{ color: "red" }}> *</span>
          </Label>
          <Input
            id="districtname-field"
            name="district_name"
            className="form-control"
            type="text"
            value={newTaluka.taluka_name}
            onChange={TalukaUpdateHandler}
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
          <Button color="primary" onClick={updateTalukaHandler}>
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
  )
}

export default TalukaUpdate
