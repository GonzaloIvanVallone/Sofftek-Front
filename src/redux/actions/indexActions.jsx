import axios from "axios";
const category_route =
  "https://softtekecommerce-production.up.railway.app/api/v1/category";
const product_route =
  "https://softtekecommerce-production.up.railway.app/api/v1/product";
const auth_route =
  "https://softtekecommerce-production.up.railway.app/api/v1/auth";
const user_route =
  "https://softtekecommerce-production.up.railway.app/api/v1/admin/user";
const bill_route =
  "https://softtekecommerce-production.up.railway.app/api/v1/bid";

import Swal from "sweetalert2";

export const getAllProducts = () => async (dispatch) => {
  try {
    let response = await axios.get(`${product_route}/list`);
    return dispatch({
      type: "GET_ALL_PRODUCTS",
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    } else {
      Swal.fire({
        title: "No response received from the server",
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};

export const createProduct = (payload) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let response = await axios.post(`${product_route}/new`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: "CREATE_PRODUCT",
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    } else {
      Swal.fire({
        title: "No response received from the server",
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};

export const updateProduct = (payload) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let response = await axios.post(`${product_route}/update`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: "UPDATE_PRODUCT",
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    } else {
      Swal.fire({
        title: "No response received from the server",
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let response = await axios.delete(`${product_route}/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: "DELETE_PRODUCT",
      payload: id,
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    } else {
      Swal.fire({
        title: "No response received from the server",
        icon: "error",
        confirmButtonText: "Continue",
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
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};

export const newCategory = (payload) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let response = await axios.post(`${category_route}/new`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: "CREATE_CATEGORY",
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};
export const updateCategory = (payload) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let response = await axios.put(`${category_route}/update`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: "UPDATE_CATEGORY",
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};
export const deleteCategory = (id, category) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let response = await axios.delete(`${category_route}/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: "DELETE_CATEGORY",
      payload: category,
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
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
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
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
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};

export const updateProductStock = (productId, newStock) => ({
  type: "UPDATE_PRODUCT_STOCK",
  payload: { productId, newStock },
});

export const addToCart = (product) => async (dispatch, getState) => {
  // Agregar el producto al estado
  dispatch({
    type: "ADD_TO_CART",
    payload: product,
  });
  const cart = getState().cart;
  localStorage.setItem("cart", JSON.stringify(cart));

  // Actualizar el carrito en el localStorage
  const updatedCart = getState().cart;
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const getCart = () => (dispatch) => {
  // Obtener el carrito desde localStorage
  const storedCart = localStorage.getItem("cart");
  const cart = storedCart ? JSON.parse(storedCart) : [];

  // Actualizar el estado del carrito
  dispatch({
    type: "GET_CART",
    payload: cart,
  });
};

export const removeFromCart = (productId) => ({
  type: "REMOVE_FROM_CART",
  payload: productId,
});

export const removeAllCart = () => ({
  type: "REMOVE_ALL_CART",
  payload: [],
});

export const resetPassword = (payload) => async (dispatch) => {
  try {
    let response = await axios.put(`${auth_route}/newpassword`, payload);
    return dispatch({
      type: "",
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    let response = await axios.post(`${auth_route}/logout`);
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    return dispatch({
      type: "LOGOUT",
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};

export const login = (payload) => async (dispatch) => {
  try {
    let response = await axios.post(`${auth_route}/login`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    localStorage.setItem("token", response.data.token);
    Swal.fire({
      title: "User Logged successfully!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
    return dispatch({
      type: "LOGIN",
      payload: {
        role: response.data.user.roles[0],
        userName: response.data.user.userName,
      },
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};

export const register = (payload) => async (dispatch) => {
  try {
    let response = await axios.post(`${auth_route}/register`, payload);
    localStorage.setItem("token", response.data.token);
    Swal.fire({
      title: "User registered",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
    return dispatch({
      type: "LOGIN",
      payload: {
        role: response.data.user.roles[0],
        userName: response.data.user.userName,
      },
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    } else {
      Swal.fire({
        title: "No response received from the server",
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};

export const createPreference = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${product_route}/mercadoPago/compra`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return dispatch({
      type: "CALL_MERCADO_PAGO",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const billSave = (bill) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${product_route}/mercadoPago/newBill`,
      bill,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return dispatch({
      type: "SAVE_BID",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setPreferenceId = (newId) => ({
  type: "SET_PREFERENCE_ID",
  payload: newId,
});

export const setLoggedIn = () => ({
  type: "SET_LOGGEDIN",
  payload: true,
});

export const getAllUsers = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let response = await axios.get(`${user_route}/list`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: "GET_ALL_USERS",
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    } else {
      Swal.fire({
        title: "No response received from the server",
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};

export const newUser = (payload) => async (dispatch) => {
  try {
    let response = await axios.post(`${auth_route}/register`, payload);
    Swal.fire({
      title: "User registered",
      icon: "success",
      confirmButtonText: "Continue",
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    } else {
      Swal.fire({
        title: "No response received from the server",
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};

export const updateUser = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    const token = localStorage.getItem("token");
    let response = await axios.put(`${user_route}/update`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    Swal.fire({
      title: "User Updated",
      icon: "success",
      confirmButtonText: "Continue",
    });
    return dispatch({
      type: "UPDATE_USER",
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    } else {
      Swal.fire({
        title: "No response received from the server",
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};

export const upDownUser = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    const token = localStorage.getItem("token");
    let response = await axios.put(`${user_route}/changeRole`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    Swal.fire({
      title: "User Updated",
      icon: "success",
      confirmButtonText: "Continue",
    });
    return dispatch({
      type: "UPDATE_USER",
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    } else {
      Swal.fire({
        title: "No response received from the server",
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};

export const countUsers = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let response = await axios.get(`${user_route}/count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: "COUNT_USERS",
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    } else {
      Swal.fire({
        title: "No response received from the server",
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};

export const countSales = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let response = await axios.get(`${bill_route}/count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: "COUNT_SALES",
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    } else {
      Swal.fire({
        title: "No response received from the server",
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};
export const getAllSales = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let response = await axios.get(`${bill_route}/list`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return dispatch({
      type: "GET_ALL_SALES",
      payload: response.data,
    });
  } catch (error) {
    if (error.response) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        confirmButtonText: "Continue",
      });
    } else {
      Swal.fire({
        title: "No response received from the server",
        icon: "error",
        confirmButtonText: "Continue",
      });
    }
  }
};
