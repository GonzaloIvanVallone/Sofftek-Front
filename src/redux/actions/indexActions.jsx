import axios from "axios";
const category_route = 'http://localhost:8080/api/v1/category';

export function getAllProducts() {
    return async function (dispatch) {
        try{
            var json = await axios.get(``);
            return dispatch({
            type: "GET_ALL_PRODUCTS",
            payload: json.data,
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
            var json = await axios.get(`${category_route}/list`);
            return dispatch({
            type: "GET_ALL_CATEGORIES",
            payload: json.data,
            });
        }catch(error){
            console.log(error);
        }
    };
}