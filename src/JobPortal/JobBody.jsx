import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Label } from 'reactstrap';
import Select from "react-select";
import Auth from "../pages/AuthUser";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

const JobBody = () => {
    const theme = useTheme(); // Get the current theme
    const [jobCategory, setJobCategory] = useState([]);
    const [selectedJobCategory, setSelectedJobCategory] = useState(null);
    const { http } = Auth();
    const [states, setStates] = useState([]);
    const [job, setJob] = useState([]);
    const [error, setError] = useState(null);

    const handleJobCategoryChange = (selectedOption) => {
        setSelectedJobCategory(selectedOption);
    };
    const buttonStyle = {
        backgroundColor: theme.palette.primary.main, // Set background color to primary color
        color: 'white', // Set text color to white or any contrasting color
        border: 'none', // Optionally remove border
        padding: '4px 8px', // Adjust padding to decrease button size
        fontSize: '10px', // Adjust font size to decrease button size
        borderRadius: '4px', // Optional: Add border radius for rounded corners
        display: 'inline-block', // Ensure button behaves like an inline element
        textDecoration: 'none', // Remove underline from anchor tag
        cursor: 'pointer', // Change cursor to pointer on hover
        // Add more styles as needed
    };
    const fetchJobCategory = () => {
        http
            .get(`jobcategory/list`)
            .then((response) => {
                setJobCategory(response.data);
            })
            .catch((error) => {
                console.error("Error Fetching Job category Data:", error);
            });
    };

    const fetchStates = async () => {
        try {
            const response = await http.get("/state/list");
            setStates(response.data);
        } catch (error) {
            console.error("Error fetching State data:", error);
            setError(error.message);
        }
    };

    const fetchJob = async () => {
        try {
            const response = await http.get("/job/list");
            setJob(response.data);
        } catch (error) {
            console.error("Error fetching Job data:", error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchJobCategory();
        fetchStates();
        fetchJob();
    }, []); // Fetch data on component mount

    return (
        <Container>
            <Row>
                <Col>
                <Row>
                <Col
                 xs="8"
                    className="mb-4"
                    style={{
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #ccc',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        borderRadius: '5px',
                    }}>
                    <Label htmlFor="state-field" className="form-label" style={{ color: '#0d6efd' }}>
                        Filter By Job Category
                    </Label>
                    <Select
                        value={selectedJobCategory}
                        onChange={handleJobCategoryChange}
                        options={jobCategory.map((jobcategory) => ({
                            label: jobcategory.jobcategory_name,
                            value: jobcategory.jobcategory_id,
                        }))}
                        className="basic"
                        placeholder="Select Job category"
                    />
                    </Col>
                    </Row>
                    <Row>
                    <Col
                    xs="8"
                    className="mb-4"
                    style={{
                        backgroundColor: '#f8f9fa',
                        border: '1px solid #ccc',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        borderRadius: '5px',
                    }}>
                    <Label htmlFor="state-field" className="form-label" style={{ color: '#0d6efd' }}>
                        Filter Job By Location
                    </Label>
                    <table>
                        <tbody>
                            {job.map((job, index) => (
                                <tr key={index}>
                                    <td> <LocationOnIcon style={{ color: theme.palette.primary.main, fontSize: 18 }} /></td>
                                    <td>{job.job_location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
                    </Row>
                </Col>
                {/* <Col xs="1"></Col> */}
                <Col xs="8">
                {job.map((job) => (
    <div key={job.job_id} className="card w-75"
        style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #ccc',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            borderRadius: '5px',
        }}>
        <div className="card-body">
            <h6  ><LocationOnIcon style={{ color: theme.palette.primary.main, fontSize: 20 }} />
            <span style={{ color: theme.palette.primary.main }}>{job.job_location}</span></h6>
            <h5 className="card-title" style={{ fontSize: 20 }}>
                {job.job_name}
            </h5>
            <h6 className="card-text" style={{ marginTop:"-10px",color:"2F4F4F" }}>{job.company_name}</h6>
            <p className="card-text">{job.job_des}</p>
            <a href="#a" className="btn" style={buttonStyle}>
            <AddIcon /> MORE DETAILS
        </a>
        </div>
    </div>
))}
                </Col>
            </Row>
          
        </Container>
    );
};

export default JobBody;
