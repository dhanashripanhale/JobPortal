import React, { useMemo, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Input, Label, Row, Table } from 'reactstrap';
import Flatpickr from "react-flatpickr";
import POSProductRow from './components/POSProductRow';

const POSCreate = () => {
    const SingleOptions = [
        { value: 'Watches', label: 'Watches' },
        { value: 'Headset', label: 'Headset' },
        { value: 'Sweatshirt', label: 'Sweatshirt' },
        { value: '20% off', label: '20% off' },
        { value: '4 star', label: '4 star' },
    ];


    document.title = "POS Create - Ajspire Technologies";

    const products = [
        { no: 1001, name: 'Product A', mrp: 50, salePrice: 70, qty: 10, sale: true, inStock: true, total: 400 },
        { no: 1002, name: 'Product B', mrp: 30, salePrice: 25, qty: 5, sale: true, inStock: false, total: 125 },
        { no: 1003, name: 'Product C', mrp: 20, salePrice: 15, qty: 20, sale: false, inStock: true, total: 300 },
        { no: 1004, name: 'Product D', mrp: 40, salePrice: 35, qty: 8, sale: true, inStock: true, total: 280 },
        { no: 1005, name: 'Product E', mrp: 60, salePrice: 50, qty: 12, sale: false, inStock: true, total: 600 },
        { no: 1006, name: 'Product F', mrp: 25, salePrice: 20, qty: 15, sale: true, inStock: true, total: 300 },
        { no: 1007, name: 'Product G', mrp: 70, salePrice: 60, qty: 6, sale: false, inStock: true, total: 360 },
        { no: 1008, name: 'Product H', mrp: 35, salePrice: 30, qty: 10, sale: true, inStock: false, total: 300 },
        { no: 1009, name: 'Product I', mrp: 55, salePrice: 45, qty: 18, sale: true, inStock: true, total: 810 },
        { no: 1010, name: 'Product J', mrp: 80, salePrice: 70, qty: 4, sale: false, inStock: true, total: 280 }, { no: 1001, name: 'Product A', mrp: 1000, salePrice: 40, qty: 10, sale: true, inStock: true, total: 400 },
        { no: 1002, name: 'Product B', mrp: 30, salePrice: 25, qty: 5, sale: true, inStock: false, total: 125 },
        { no: 1003, name: 'Product C', mrp: 20, salePrice: 15, qty: 20, sale: false, inStock: true, total: 300 },
        { no: 1004, name: 'Product D', mrp: 40, salePrice: 35, qty: 8, sale: true, inStock: true, total: 280 },
        { no: 1005, name: 'Product E', mrp: 60, salePrice: 50, qty: 12, sale: false, inStock: true, total: 600 },
        { no: 1006, name: 'Product F', mrp: 25, salePrice: 20, qty: 15, sale: true, inStock: true, total: 300 },
        { no: 1007, name: 'Product G', mrp: 70, salePrice: 60, qty: 6, sale: false, inStock: true, total: 360 },
        { no: 1008, name: 'Product H', mrp: 35, salePrice: 30, qty: 10, sale: true, inStock: false, total: 300 },
        { no: 1009, name: 'Product I', mrp: 55, salePrice: 45, qty: 18, sale: true, inStock: true, total: 810 },
        { no: 1010, name: 'Product J', mrp: 80, salePrice: 70, qty: 4, sale: false, inStock: true, total: 280 },
    ];

    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];
    function countDown(id, prev_data_attr) {
        id(prev_data_attr - 1);
    }
    const [defaultCounter, setdefaultCounter] = useState(5);
    function countUP(id, prev_data_attr) {
        id(prev_data_attr + 1);
    }

    return (
        <React.Fragment>
            <div className="page-content" style={{ marginTop: "-90px" }}>
                <Container fluid>
                    {/* <h6 className='text-center fw-bold display-6'>POS</h6> */}
                    <Row>
                        <Col lg={9}>
                            <Card>
                                <CardBody>
                                    <Row className=''>
                                        <Col sm={4}>
                                            <div className="form-icon right">
                                                <Flatpickr
                                                    className="form-control dash-filter-picker shadow fw-bold"
                                                    options={{
                                                        mode: "single",
                                                        dateFormat: "d/m/Y",
                                                        defaultDate: Date.now(),
                                                    }}
                                                />
                                                <i className="ri-calendar-line fs-3"></i>
                                            </div>
                                        </Col>
                                        <Col sm={4}>
                                            <div className="form-icon right">
                                                <Input type="email" className="form-control form-control-icon" id="iconrightInput" placeholder="example@gmail.com" />
                                                <i className="ri-calendar-line fs-3"></i>
                                            </div>
                                        </Col>
                                        <Col sm={4}>
                                            <div className="form-icon right">
                                                <Input type="email" className="form-control form-control-icon" id="iconrightInput" placeholder="example@gmail.com" />
                                                <i className="ri-mail-unread-line fs-3"></i>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="mb-2 my-3">
                                        <div className="form-icon right">
                                            <Input type="text" className="form-control form-control-icon" id="iconrightInput" style={{ backgroundColor: "rgb(248 245 224)" }} placeholder="Search Products by name or Scan Barcode..." />
                                            <i className="ri-barcode-line fs-2"></i>
                                        </div>
                                    </div>
                                    <Row>
                                        <Col sm={12} style={{ height: "530px", overflowY: "auto" }}>
                                            <Table className="align-right table-nowrap mb-0 fs-5 fw-bold text-end table-sm">
                                                <thead className='bg-light'>
                                                    <tr>
                                                        <th scope="col" className='text-start'>No.</th>
                                                        <th scope="col" className='text-start'>Item Name</th>
                                                        <th scope="col" className='text-center'>Qty</th>
                                                        <th scope="col">MRP</th>
                                                        <th scope="col">Sale Price</th>
                                                        <th scope="col">Total</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products.map((item, index) => (
                                                        <POSProductRow key={item.id} product={item} index={index} />
                                                    ))}
                                                </tbody>
                                            </Table>

                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={3}>
                            <Card className='fs-6'>
                                <CardBody className="pt-2">
                                    <h4 className="fw-bold">
                                        Customer Details
                                    </h4>
                                    <hr />
                                    <div className="table-responsive">
                                        <table className="table table-borderless mb-0 table-sm">
                                            <tbody>
                                                <tr className="table-active">
                                                    <th> Name:</th>
                                                    <td className="text-end">John Doe</td>
                                                </tr>
                                                <tr>
                                                    <th> Number:</th>
                                                    <td className="text-end">+1 (123) 456-7890</td>
                                                </tr>
                                                <tr>
                                                    <th> Payment Mode:</th>
                                                    <td className="text-end">Online</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className='fs-6'>

                                <CardBody className="pt-2">
                                    <h3 className="mb-2 fw-bold">
                                        Customer Details
                                    </h3>
                                    <hr />
                                    <div className="table-responsive">

                                        <table className="table table-borderless mb-0">
                                            <tbody>
                                                <tr className="table-active">
                                                    <th> Received Amount: 100</th>
                                                    <td className="text-end">John Doe</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className='fs-6'>
                                <CardBody className="pt-2">
                                    <h4 className="mb-2 fw-bold">
                                        Bill Details
                                    </h4>
                                    <hr />
                                    <div className="table-responsive">
                                        <table className="table table-borderless mb-0 fw-bold table-sm">
                                            <tbody>
                                                <tr>
                                                    <td>MRP Total :</td>
                                                    <td className="text-end" id="cart-subtotal">
                                                        &#8377; 100
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Discount :</td>
                                                    <td className="text-end" id="cart-subtotal">
                                                        - &#8377; 10
                                                    </td>
                                                </tr>

                                                <tr className="table-active bg-danger text-white">
                                                    <th style={{ lineHeight: "300%" }}>Total Amount:</th>
                                                    <td className="text-end">
                                                        <span className="fw-semibold" id="cart-total">
                                                            <h4 className="fw-bold display-6 text-white">&#8377; 200</h4>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card className='fs-6'>
                                <CardBody className="pt-2">
                                    <button className="btn btn-primary">Save Bill</button>
                                    <button className="btn btn-danger">Cancel Bill</button>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                    <div className="container-fluid fixed-bottom">
                        <Row>
                            <Col sm={2} className="bg-dark text-white p-3">Total Price : &#8377; 100 </Col>
                            <Col sm={2} className="bg-primary text-white p-3">Total Price : &#8377; 100 </Col>
                            <Col sm={2} className="bg-secondary text-white p-3">Total Price : &#8377; 100 </Col>
                            <Col sm={2} className="bg-danger text-white p-3">Total Price : &#8377; 100 </Col>
                            <Col sm={2} className="bg-warning text-white p-3">Total Price : &#8377; 100 </Col>
                            <Col sm={2} className="bg-success text-white p-3">Total Price : &#8377; 100 </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default POSCreate;