import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SideBar } from "./Sidebar/Sidebar";
import { Footer } from "../Footer/Footer";
import './Admindash.scss';


export const AdminNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    useEffect(() => {}, [isLoggedIn]);
    return(
        <div className="margin">
            {/*llamada a los 4 componentes que faltan */}
            <h2>Dashboard Hardtek</h2>
            <SideBar/>
            <Footer/>
        </div>
    )
}
