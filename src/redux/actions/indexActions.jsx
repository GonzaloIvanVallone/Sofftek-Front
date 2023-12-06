import axios from "axios";
const category_route = "http://localhost:8080/api/v1/category";
const product_route = "http://localhost:8080/api/v1/product";
const auth_route = "http://localhost:8080/api/v1/auth";
const user_route = "http://localhost:8080/api/v1/admin/user";
import Swal from 'sweetalert2';

export const getAllProducts = () => async (dispatch) => {
  try{
    let response = await axios.get("http://localhost:8080/api/v1/product/list");
    return dispatch({
      type: "GET_ALL_PRODUCTS",
      payload: response.data,
    });
  }catch(error) {
    if(error.response){
      Swal.fire({
        title: `${error.response.data}`,
        icon: 'error',
        confirmButtonText: 'Continue'
      })
    }else{
      Swal.fire({
        title: 'No response received from the server',
        icon: 'error',
        confirmButtonText: 'Continue'
      });
    }
  }
};

export const filterByCategories = (payload) => {
  return {
    type: "FILTER_BY_CATEGORIES",
    payload,
  };
};

export const getAllCategories = () => async (dispatch) => {
  try {
    let response = await axios.get(`${category_route}/list`);
    return dispatch({
      type: "GET_ALL_CATEGORIES",
      payload: response.data,
    });
  }catch(error){
    if(error.response){
      Swal.fire({
        title: `${error.response.data}`,
        icon: 'error',
        confirmButtonText: 'Continue'
      })
    }
  }
};

export const getProductsByName = (name) => async (dispatch) => {
  try {
    let response = await axios.get(`${product_route}/find/${name}`);
    return dispatch({
      type: "GET_PRODUCTS_BY_NAME",
      payload: response.data,
    });
  }catch(error){
    if(error.response){
      Swal.fire({
        title: `${error.response.data}`,
        icon: 'error',
        confirmButtonText: 'Continue'
      })
    }
  }
};

export const sendEmail = (email) => async (dispatch) => {
  try {
    let response = await axios.get(`${auth_route}/email/${email}`);
    return dispatch({
      type: "",
      payload: response.data,
    });
  }catch(error){
    if(error.response){
      Swal.fire({
        title: `${error.response.data}`,
        icon: 'error',
        confirmButtonText: 'Continue'
      })
    }
  }
};

export const resetPassword = (payload) => async (dispatch) => {
  try {
    let response = await axios.put(`${auth_route}/newpassword`, payload);
    return dispatch({
      type: "",
      payload: response.data,
    });
  }catch(error){
    if(error.response){
      Swal.fire({
        title: `${error.response.data}`,
        icon: 'error',
        confirmButtonText: 'Continue'
      })
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    let response = await axios.post(`${auth_route}/logout`);
    localStorage.removeItem("token");
    return dispatch({
      type: "LOGOUT",
    });
  }catch(error){
    if(error.response){
      Swal.fire({
        title: `${error.response.data}`,
        icon: 'error',
        confirmButtonText: 'Continue'
      })
    }
  }
};

export const login = (payload) => async (dispatch) => {
  try {
    let response = await axios.post(`${auth_route}/login`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    localStorage.setItem("token", response.data.token);
    return dispatch({
      type: "LOGIN",
    });
  }catch(error){
    console.log("error");
  }
};
