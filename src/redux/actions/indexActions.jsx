import axios from "axios";
const category_route = 'http://localhost:8080/api/v1/category';
const product_route = 'http://localhost:8080/api/v1/product';

export function getAllProducts() {
    return async function (dispatch) {
        try{
            let response = await axios.get("http://localhost:8080/api/v1/product/list");
            console.log(response.data)
            return dispatch({
            type: "GET_ALL_PRODUCTS",
            payload: response.data,
            });
        }catch(error){
            console.log(error);
        }
    };
}

export function filterByCategories(payload) {
    return {
        type: "FILTER_BY_CATEGORIES",
        payload,
    };
}

export function getAllCategories() {
    return async function (dispatch) {
        try{
            let response = await axios.get(`${category_route}/list`);
            return dispatch({
            type: "GET_ALL_CATEGORIES",
            payload: response.data,
            });
        }catch(error){
            console.log(error);
        }
    };
}

export function getProductsByName(name) {
    return async function (dispatch) {
        try{
            let response = await axios.get(`${product_route}/find/${name}`);
            return dispatch({
            type: "GET_PRODUCTS_BY_NAME",
            payload: response.data,
            });
        }catch(error){
            console.log(error);
        }
    };
}
