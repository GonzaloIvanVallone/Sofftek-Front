import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


export const AdminNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    useEffect(() => {}, [isLoggedIn]);
    return(
        <div>
            {/*llamada a los 4 componentes que faltan */}
        </div>
    )
}