const initialState = {
  backupProducts: [],
  allProducts: [],
  filteredProducts: [],
  allCategories: [],
  isLoggedIn: false,
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  isAdmin: false,
  idPreference: "",
  userName: "",
  allUsers: [],
  totalUsers:0,
  totalSales: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        filteredProducts: action.payload,
        allProducts: action.payload,
        backupProducts: action.payload,
      };
    case "FILTER_BY_CATEGORIES":
      if (action.payload == "all") {
        return { ...state, allProducts: state.backupProducts };
      } else {
        const filteredByCategory = state.backupProducts.filter(
          (e) => e.typeCategory.category === action.payload
        );
        return { ...state, allProducts: filteredByCategory };
      }
    case "GET_ALL_CATEGORIES":
      const updatedCategories = [...action.payload];
      updatedCategories.unshift({
        idCategory: 0,
        category: "all",
        status: true,
      });
      return {
        ...state,
        allCategories: updatedCategories,
      };
    case "GET_PRODUCTS_BY_NAME":
      return {
        ...state,
        allProducts: action.payload,
      };
    case "LOGIN":
      const { role, userName } = action.payload;
      const isAdmin = role === "ADMIN";
      return {
        ...state,
        isLoggedIn: true,
        isAdmin,
        userName: userName,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
      };
    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "ADD_TO_CART":
      // Agregar lógica para agregar un producto al carrito
      const addedProduct = action.payload;
      const updatedCartAdd = [...state.cart, addedProduct];
      return {
        ...state,
        cart: updatedCartAdd,
        itemCount: updatedCartAdd.length, // Contar la cantidad de productos en el carrito
      };
    case "REMOVE_FROM_CART":
      // Agregar lógica para eliminar un producto del carrito
      const productIdToRemove = action.payload;
      const updatedCartRemove = state.cart.filter(
        (product) => product.idProduct !== productIdToRemove
      );

      return {
        ...state,
        cart: updatedCartRemove,
        itemCount: updatedCartRemove.length,
        // Actualizar la cantidad de productos en el carrito
      };

      // Actualizar localStorage con el nuevo estado del carrito

      return (updatedState = localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      ));
    case "CALL_MERCADO_PAGO":
      return { ...state, idPreference: action.payload };
    case "SAVE_BID":
      return {
        ...state,
        filteredProducts: action.payload,
        allProducts: action.payload,
        backupProducts: action.payload,
      };
    case "SET_PREFERENCE_ID":
      return {
        ...state,
        idPreference: action.payload,
      };
    case "SET_LOGGEDIN":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case "DELETE_CATEGORY":
      const updatedCat = state.allCategories.filter(
        (e) => e.category !== action.payload
      );
      return {
        ...state,
        allCategories: updatedCat,
      };
    case "CREATE_PRODUCT": {
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload],
      };
    }
    case "DELETE_PRODUCT":
      const updatedProducts = state.allProducts.filter(
        (e) => e.idProduct !== action.payload
      );
      return {
        ...state,
        allProducts: updatedProducts,
      };
    case "GET_ALL_USERS":
      return {
        ...state,
        allUsers: action.payload
    }
    case "COUNT_USERS": return {
      ...state,
      totalUsers: action.payload
    }
    case "COUNT_SALES": return {
      ...state,
      totalSales: action.payload
    }
    default:
      return state;
  }
};

export default rootReducer;
