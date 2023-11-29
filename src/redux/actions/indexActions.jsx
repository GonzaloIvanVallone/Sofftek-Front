import axios from "axios";
const category_route = "http://localhost:8080/api/v1/category";
const product_route = "http://localhost:8080/api/v1/product";

export const getAllProducts = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${product_route}/list`);
      return dispatch({
        type: "GET_ALL_PRODUCTS",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterByCategories = (payload) => {
  return {
    type: "FILTER_BY_CATEGORIES",
    payload,
  };
};

export const getAllCategories = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${category_route}/list`);
      return dispatch({
        type: "GET_ALL_CATEGORIES",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
