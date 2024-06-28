import React from "react";
import Header from "./Header";
import {
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Input,
    Row,
    Col,
    Button,
    Container,
} from "reactstrap";
import Select, { components } from "react-select";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const JobPortalHome = () => {
    return (
        <>
            <Header />
            <div style={{ marginTop: "40px" }}>
                <Container>
                    <Row>
                        <Col>
                            <Row>
                                <Col
                                    xs="8"
                                    className="mb-4"
                                    style={{
                                        backgroundColor: "#f8f9fa",
                                        border: "1px solid #ccc",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                        padding: "20px",
                                        borderRadius: "5px",
                                    }}
                                >
                                    <Label
                                        htmlFor="state-field"
                                        className="form-label"
                                    //   style={{ color: "#0d6efd" }}
                                    >
                                        On Registering,You Can
                                    </Label>
                                    <p><CheckBoxIcon color="success"/>Build your profile and let recruiters find you</p>
                                    <p><CheckBoxIcon color="success"/>Get job postings deliverd right to your email</p>
                                    <p><CheckBoxIcon color="success"/>Find a job and grow your career</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs="8">
                            <div
                                className="card w-75"
                                style={{
                                    backgroundColor: "#f8f9fa",
                                    border: "1px solid #ccc",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    padding: "20px",
                                    borderRadius: "5px",
                                    marginBottom: "20px",
                                }}
                            >
                                <div className="card-body">
                                    <h6>Create Your Profile</h6>

                                    <Row>
                                        <Col className="mb-3">
                                            <Label htmlFor="districtname-field" className="form-label">
                                                Full Name
                                                <span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                name="full_name"
                                                className="form-control"
                                                placeholder="What is Your Full Name ?"
                                                type="text"
                                            // value={jobName}
                                            // onChange={(e) => setJobName(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="mb-3">
                                            <Label htmlFor="districtname-field" className="form-label">
                                                Email Id
                                                <span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                name="email"
                                                className="form-control"
                                                placeholder="Enter Your Email Id"
                                                type="text"
                                            // value={jobDes}
                                            // onChange={(e) => setJobDes(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="mb-3">
                                            <Label htmlFor="districtname-field" className="form-label">
                                                Password
                                                <span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                name="passwprd"
                                                className="form-control"
                                                placeholder="(Minimum 6 Character)"
                                                type="password"
                                            // value={companyName}
                                            // onChange={(e) => setCompnayName(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="mb-3">
                                            <Label
                                                htmlFor="districtname-field"
                                                className="form-label"
                                            >
                                                Mobile Number
                                                <span style={{ color: "red" }}> *</span>
                                            </Label>
                                            <Input
                                                name="mobile"
                                                className="form-control"
                                                placeholder="Mobile Number"
                                                type="text"
                                            // value={companyName}
                                            // onChange={(e) => setCompnayName(e.target.value)}
                                            />
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col className="mb-6">
                                            <label className="font-weight-bold">Work Status</label>
                                            <Select
                                                id="workStatus_id"
                                                name="workstatus_id"
                                                //  onChange={workStatusChange}
                                                options={[
                                                    { label: "Experienced", value: "1" },
                                                    { label: "Fresher", value: "2" },
                                                ]}
                                            ></Select>
                                        </Col>
                                    </Row>
                                    <Row></Row>

                                    <Row>
                                        <Col lg={6}></Col>

                                        <Col style={{ marginTop: "28px" }}>
                                            <Button
                                                color="primary"
                                            //   onClick={closeModal}
                                            >
                                                <i className="ri-save-3-line align-bottom me-1" />
                                                Register Now
                                            </Button>
                                            {/* <Button
               onClick={closeModal}
               color="danger"
               style={{ marginLeft: "7px" }}
             >
               <i className="ri-close-line me-1 align-middle" />
               Close
             </Button> */}
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default JobPortalHome;
