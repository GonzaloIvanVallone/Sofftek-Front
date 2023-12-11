import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import logo from "../../../assets/hardtv2.png";
import './Sidebar.scss';
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
    const navigate = useNavigate();
    const goHome = () => {
        navigate("/");
      };
    return (
        <Row className="h-100 mb-1">
            <Col xs={3} className="bg-dark p-3 d-flex flex-column">
                <h4 className="text-light mb-4">Admin</h4>
                <div className="flex-grow-1">
                    <Link to="/dashboard/homedash"><button className='text-light btn mb-2'>Home</button></Link>
                    <Link to="/dashboard/userdash"><button className='text-light btn mb-2'>Users</button></Link>
                    <Link to="/dashboard/productdash"><button className='text-light btn mb-2'>Products</button></Link>
                    <Link to="/dashboard/categorydash"><button className='text-light btn mb-2'>Categories</button></Link>
                    <Link to="/dashboard/sales"><button className='text-light btn mb-2'>Sales</button></Link>
                </div>
                <div>
                    <img
                        onClick={goHome}
                        src={logo}
                        width="200"
                        height="250"
                        className="d-inline-block pb-5"
                        alt="Logo"
                    />
                </div>
            </Col>
            <Col xs={9} className="p-4">
                <Outlet />
            </Col>
        </Row>
    )
}

