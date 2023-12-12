import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { SideBar } from "./Sidebar/Sidebar";
import { Footer } from "../Footer/Footer";
import './Admindash.scss';



export const AdminNavbar = () => {
 
    const isLoggedIn = useSelector((state) => state.isLoggedIn);


    useEffect(() => {

    }, [isLoggedIn]);
    return(
        <div>
            <h3 className="dash">Dashboard Hardtek</h3>
            <SideBar/>
            <Footer/>
        </div>
    )
}
