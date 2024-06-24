import React from 'react';
import { Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap';

const CardModal = ({ selectedJob, closeModal }) => {
    return (
        <div className="page-content">
            <Modal className="rounded shadow" centered isOpen={true} size="l">
                <ModalHeader className="bg-light p-3">{ selectedJob.jobcategory_name}</ModalHeader>
                <ModalBody>
                    {selectedJob && (
                        <>
                            <h5>{selectedJob.job_name}</h5>
                            <p><strong>Company:</strong> {selectedJob.company_name}</p>
                            <p><strong>Location:</strong> {selectedJob.district_name}</p>
                            <p><strong>Job-Type:</strong> {selectedJob.job_type}</p>
                            <p><strong>Experience:</strong> {selectedJob.job_experience}</p>
                            <p>{selectedJob.job_des}</p>
                            {/* Add more details as needed */}
                        </>
                    )}
                    <Row>
                        <Col lg={6}></Col>
                        <Col style={{ marginTop: "28px" }}>
                        <Button
                                onClick={closeModal}
                                color="primary"
                                style={{ marginLeft: "7px" }}
                            >
                           
                               Apply
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
    )
}

export default CardModal;
