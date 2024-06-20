import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Input, Row } from 'reactstrap';

const POSProductRow = ({ product, index, updateTotal }) => {
    const [quantity, setQuantity] = useState(1);
    const countDown = () => {
        if (quantity > 0) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const countUp = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    useEffect(() => {
    }, [quantity, product.id, updateTotal]);


    return (
        <tr className='text-end'>
            <td className='text-start' style={{ width: "50px" }}>
                <Link to="#" className="fw-bold">{`${index + 1}`}</Link>
            </td>
            <td className='text-start'>{product.name}</td>
            <td className='text-end' style={{ width: "100px" }}>
                <Row className="gy-4">
                    <Col sm={12}>
                        <div className="input-step light">
                            <button type="button" className="minus" onClick={countDown}>
                                –
                            </button>
                            <Input
                                type="number"
                                className="product-quantity fw-bold"
                                value={quantity}
                                min="0"
                                max="1000"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <button type="button" className="plus" onClick={countUp}>
                                +
                            </button>
                        </div>
                    </Col>
                </Row>
            </td>
            <td style={{ width: "100px" }}>&#8377; {product.mrp}</td>
            <td style={{ width: "100px" }}>&#8377; {product.salePrice}</td>
            <td style={{ width: "100px" }}>&#8377; {product.salePrice * quantity}</td>
            <td style={{ width: "80px" }}>
                <div className="d-flex justify-content-around">
                    <li className="list-inline-item edit">
                        <Link to="#" className="text-primary d-inline-block edit-item-btn" onClick={() => { }}>
                            <i className="ri-pencil-fill fs-16"></i>
                        </Link>
                    </li>
                    <li className="list-inline-item">
                        <Link to="#" className="text-danger d-inline-block remove-item-btn" onClick={() => { }}>
                            <i className="ri-delete-bin-5-fill fs-16"></i>
                        </Link>
                    </li>
                </div>
            </td>
        </tr>
    );
};

export default POSProductRow;
