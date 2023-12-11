import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { countUsers, getAllCategories } from "../../../redux/actions/indexActions";
import './Homedash.scss';


const Homedash = () => {
  const dispatch = useDispatch();
  const totalUsers = useSelector((state) => state.totalUsers);
  const totalSales = useSelector((state) => state.totalSales);
  const totalProducts = useSelector((state) => state.backupProducts)
  const TotalCategories = useSelector((state) => state.allCategories)

  useEffect(() => {
    dispatch(countUsers())
    dispatch(getAllCategories())
  }, []);

  return (
    <div className="micontainer">
        <div className=" box card col-md-12  p-5">
          <p>Total Users</p>
          <p>{totalUsers}</p>
        </div>
        <div className="box card p-5">
          <p>Total Sales</p>
          {totalSales}
        </div>
      
      <div className="box card p-5">
        <p>Total Products</p>
        {totalProducts.length}
      </div>
      <div className="box card p-5">
        <p>Total Categories</p>
        {TotalCategories.length}
      </div>

    </div>
  )
}

export default Homedash