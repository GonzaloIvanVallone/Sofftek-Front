import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductsByName } from "../../redux/actions/indexActions";


export const SearchBar = () =>{
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (e) =>{
    e.preventDefault();
    setName(e.target.value);
  }

 const handleSubmit = (e) =>{
    e.preventDefault(e);
    if(name){
      dispatch(getProductsByName(name))
      let inputs = document.querySelectorAll("input");
      inputs.forEach((input) => (input.value = ""));
      setName("");
    }else{
      console.log("error")
    }
  }

  return (
    <div className="SearchBar"> 
      <input  type="search" placeholder="Recipe to search..." onChange={(e) => handleChange(e)}></input>
      <button type='submit'  value={name} onClick={(e) => handleSubmit(e)}>Search</button><br />
    </div>
  )
}