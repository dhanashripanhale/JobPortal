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
import Select from "react-select";
import Auth from "../AuthUser";


const TalukaAdd = ({ closeModal, fetchTaluka }) => {
  const [talukaName,setTalukaName]=useState("");
  const [districts, setDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null); // State to hold the selected state
  
  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
  };
  const { http } = Auth();


  const fetchDistrict = () => {
    http
      .get(`district/list`)
      .then((response) => {
        setDistrict(response.data);
      })
      .catch((error) => {
        console.error("Error Fetching District Data:", error);
      });
  };

  useEffect(() => {
    fetchDistrict();
  }, []);

 


  

  const addTaluka = () => {
    if (!selectedDistrict || !talukaName) {
      console.error("District and Taluka Name are required.");
      return;
    }

    const talukaData = {
      taluka_name: talukaName,
      taluka_district: selectedDistrict.value,
    };

    http
      .post("/taluka/store", talukaData)
      .then((response) => {
        console.log("Taluka added successfully:", response.data);
        fetchTaluka();
        closeModal();
      })
      .catch((error) => {
        console.error("Error adding Taluka:", error);
      });
  };
  return (
    <div className="page-content">
    
    <Modal
        className=' rounded shadow'
        centered
        isOpen={true}
        size="l"
      >
        <ModalHeader className="bg-light p-3">Create Taluka</ModalHeader>
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
              <Label htmlFor="categoryname-field" className="form-label">
              Taluka Name
                <span style={{ color: "red" }}> *</span>
              </Label>
              <Input
                name=" taluka"
                id=" taluka"
                className="form-control"
                placeholder="Taluka Name"
                type="text"
                value={talukaName}
                onChange={(e) => setTalukaName(e.target.value)}

                // onChange={talukaChange}
              />
            </Col>
          </Row>

          <Row>
          <Col lg={6}></Col>

            <Col style={{ marginTop: "28px" }}>
              <Button onClick={addTaluka} color="primary"> <i className="ri-save-3-line align-bottom me-1" /> Add</Button>
              <Button
                onClick={closeModal}
                color="danger"
                style={{ marginLeft: "7px" }}
              > <i className="ri-close-line me-1 align-middle" />
                Close
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TalukaAdd;
