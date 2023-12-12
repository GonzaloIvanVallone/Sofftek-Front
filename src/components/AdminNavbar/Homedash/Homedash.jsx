import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  countUsers,
  getAllCategories,
} from "../../../redux/actions/indexActions";
import "./Homedash.scss";

const Homedash = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalUsers = useSelector((state) => state.totalUsers);
  const totalSales = useSelector((state) => state.totalSales);
  const totalProducts = useSelector((state) => state.backupProducts);
  const TotalCategories = useSelector((state) => state.allCategories);

  useEffect(() => {
    dispatch(countUsers());
    dispatch(getAllCategories());
  }, []);

  const handleUsers = () => {
    navigate("/dashboard/userdash");
  };
  const handleCategories = () => {
    navigate("/dashboard/categorydash");
  };
  const handleSales = () => {
    navigate("/dashboard/sales");
  };
  const hanldeProducts = () => {
    navigate("/dashboard/productdash");
  };

  return (
    <div className="micontainer">
      <div className=" box card col-md-12  p-5" onClick={handleUsers}>
        <p>Total Users</p>
        <p>{totalUsers}</p>
      </div>
      <div className="box card p-5" onClick={handleSales}>
        <p>Total Sales</p>
        {totalSales}
      </div>

      <div className="box card p-5" onClick={hanldeProducts}>
        <p>Total Products</p>
        {totalProducts.length}
      </div>
      <div className="box card p-5" onClick={handleCategories}>
        <p>Total Categories</p>
        {TotalCategories.length}
      </div>
    </div>
  );
};

export default Homedash;
