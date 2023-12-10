import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { countUsers, getAllCategories } from "../../../redux/actions/indexActions";

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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <p>Total Users</p>
          {totalUsers}
        </div>
        <div>
          <p>Total Sales</p>
          {totalSales}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' , marginTop: '200px'}}>
        <div>
          <p>Total Products</p>
          {totalProducts.length}
        </div>
        <div>
          <p>Total Categories</p>
          {TotalCategories.length}
        </div>
      </div>
    </div>
  )
}

export default Homedash