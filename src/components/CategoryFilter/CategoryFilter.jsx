import {React,  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCategories, getAllCategories } from "../../redux/actions/indexActions";

import './CategoryFilter.scss';

const CategoryFilter = () => {
    const dispatch = useDispatch();
    
    const allCategories = useSelector((state) => state.allCategories)


    const handleFilterType = (e) => {

        e.preventDefault();
        dispatch(filterByCategories(e.target.value));
    }
    useEffect(() => {
        dispatch(getAllCategories());
      }, [dispatch])



    return (
        <div>
            <ul className="nav-list">
                <li className="nav-item dropdown">
                    Categories
                    <select onChange={(e) => handleFilterType(e)}>
                        {allCategories?.map((f, index) => (
                            <option key={index} value={f.category}>
                                {f.category}
                            </option>
                        ))}
                    </select>
                </li>
            </ul>
        </div>
    )
}

export default CategoryFilter