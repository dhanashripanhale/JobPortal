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

const VillageUpdate = ({ closeModal, village, updateVillageList, fetchVillage }) => {
    const { http } = Auth();
    const [newVillage, setNewVillage] = useState({ village_name: "", village_id: null });
    const [errorMessage, setErrorMessage] = useState("");
    const [taluka, setTaluka] = useState([]);
    const [selectedTaluka, setSelectedTaluka] = useState(null);

    // Handle state change from dropdown
    const handleTalukaChange = (selectedOption) => {
        setSelectedTaluka(selectedOption);
        setNewVillage({ ...newVillage, taluka_id: selectedOption.value });
    };

    // Fetch states from the server
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

    // Fetch states when the component mounts
    useEffect(() => {
        fetchTaluka();
    }, []);

    // Set initial district and state values when district prop changes
    useEffect(() => {
        if (village) {
            setNewVillage({
                village_id: village.village_id,
                village_name: village.village_name,
                taluka_id: village.taluka_id, // Assuming district object has a state_id property
            });
            setSelectedTaluka({
                label: village.taluka_name, // Assuming district object has a state_name property
                value: village.taluka_id,
            });
        }
    }, [village]);

  

    // Handle update button click
    const updateTalukaHandler = async () => {
        if (!newVillage.village_name.trim() || !newVillage.taluka_id) {
            setErrorMessage("Please fill the Village name and select a Taluka.");
            return;
        }
        try {
            const response = await http.put(`/village/update`, newVillage);
            updateVillageList(response.data);
            fetchVillage();
            closeModal();
        } catch (error) {
            console.error("Error updating Village:", error);
            setErrorMessage("Failed to update Village. Please try again.");
        }
    };

    const VillageUpdateHandler = (e) => {
        setErrorMessage("");
        setNewVillage({ ...newVillage, village_name: e.target.value });
      };


    return (
        <Modal className="rounded shadow" centered isOpen={true} size="lg">
            <ModalHeader className="bg-light p-3">Update Village</ModalHeader>
            <ModalBody className="border card-border-success p-3 shadow-lg card">
                <Row>
                    <Col className="mb-3">
                        <Label htmlFor="state-field" className="form-label">
                            Taluka
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
                            placeholder="Select Taluka"
                        />
                    </Col>

                    <Col className="mb-3">
                        <Label htmlFor="districtname-field" className="form-label">
                            Village Name
                            <span style={{ color: "red" }}> *</span>
                        </Label>
                        <Input
                            id="villagename-field"
                            name="village_name"
                            className="form-control"
                            type="text"
                            value={newVillage.village_name}
                            onChange={VillageUpdateHandler}
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

export default VillageUpdate;

