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


const VillageAdd = ({ closeModal, fetchVillage }) => {
  const [villageName,setVillageName]=useState("");
  const [taluka, setTaluka] = useState([]);
  const [selectedTaluka, setSelectedTaluka] = useState(null); // State to hold the selected state
  
  const handleTalukaChange = (selectedOption) => {
    setSelectedTaluka(selectedOption);
  };
  const { http } = Auth();


  const fetchTaluka = () => {
    http
      .get(`taluka/list`)
      .then((response) => {
        setTaluka(response.data);
      })
      .catch((error) => {
        console.error("Error Fetching Taluka Data:", error);
      });
  };

  useEffect(() => {
    fetchTaluka();
  }, []);

 


  

  const addVillage = () => {
    if (!selectedTaluka || !villageName) {
      console.error("Taluka and Village Name are required.");
      return;
    }

    const villageData = {
      village_name: villageName,
      village_taluka: selectedTaluka.value,
    };

    http
      .post("/village/store", villageData)
      .then((response) => {
        console.log("Village added successfully:", response.data);
        fetchVillage();
        closeModal();
      })
      .catch((error) => {
        console.error("Error adding Village:", error);
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
                value={selectedTaluka}
                onChange={handleTalukaChange}
                options={taluka.map((taluka) => ({
                  label: taluka.taluka_name,
                  value: taluka.taluka_id,
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
                name=" village"
                id=" village"
                className="form-control"
                placeholder="Village Name"
                type="text"
                value={villageName}
                onChange={(e) => setVillageName(e.target.value)}

                // onChange={talukaChange}
              />
            </Col>
          </Row>

          <Row>
          <Col lg={6}></Col>

            <Col style={{ marginTop: "28px" }}>
              <Button onClick={addVillage} color="primary"> <i className="ri-save-3-line align-bottom me-1" /> Add</Button>
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

export default VillageAdd;
