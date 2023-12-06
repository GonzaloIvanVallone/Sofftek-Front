import axios from "axios";
const category_route = 'http://localhost:8080/api/v1/category';
const product_route = 'http://localhost:8080/api/v1/product';
const auth_route = 'http://localhost:8080/api/v1/auth';
const user_route = 'http://localhost:8080/api/v1/admin/user'


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
        let response = await axios.get(`${auth_route}/email/${email}`);
        return dispatch({
            type: "",
            payload: response.data
        })
    }catch{
        console.log("error")
    }
}

export const resetPassword=(payload)=>async(dispatch)=>{
    try{
        let response = await axios.put(`${auth_route}/newpassword`, payload)
        return dispatch({
            type: "",
            payload: response.data
        })
    }catch{
        console.log("error")
    }
}

export const addToCart = (product) => (dispatch, getState) => {
    // Agregar el producto al estado
    dispatch({
      type: 'ADD_TO_CART',
      payload: product,
    });
    const cart = getState().cart;
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  export const getCart = () => (dispatch) => {
    // Obtener el carrito desde localStorage
    const storedCart = localStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : [];
  
    // Actualizar el estado del carrito
    dispatch({
      type: 'GET_CART',
      payload: cart,
    });
  };


  export const removeFromCart = (productId) => ({
    type: 'REMOVE_FROM_CART',
    payload: productId,
  });