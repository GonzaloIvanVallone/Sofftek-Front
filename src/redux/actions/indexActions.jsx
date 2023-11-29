import axios from "axios";
const category_route = 'http://localhost:8080/api/v1/category';
const product_route = 'http://localhost:8080/api/v1/product';

export const getAllProducts=()=> async  (dispatch)=> {
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


export const filterByCategories=(payload)=> {
    return {
        type: "FILTER_BY_CATEGORIES",
        payload,
    };
}

export const getAllCategories=() =>async (dispatch)=>{
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

export const getProductsByName=(name) =>async (dispatch)=>{
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

export const sendEmail=(email) =>async(dispatch)=>{
    try{
        let response = await axios.get(`${email}`);
        return dispatch({
            type: "",
            payload: response.data
        })
    }catch{
        console.log(error)
    }
}
