import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductsByName } from "../../redux/actions/indexActions";
import "./SearchBar.scss";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");


  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    if(name){
      dispatch(getProductsByName(name));
      let inputs = document.querySelectorAll("input");
      inputs.forEach((input) => (input.value = ""));
      setName("");
    }
  };

  return (
    <div className="searchBar">
      <input
        type="search"
        placeholder=" Product to search..."
        onChange={(e) => handleChange(e)}
      ></input>
      <button
        className="btn"
        type="submit"
        value={name}
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
      <br />
    </div>
  );
};
