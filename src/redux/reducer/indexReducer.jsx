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
  totalUsers: 0,
  totalSales: 0,
  allSales: [],
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
    case "CREATE_CATEGORY":
      return {
        ...state,
        allCategories: [...state.allCategories, action.payload],
      };
    case "UPDATE_CATEGORY":
      const updateCategory = action.payload; // El producto actualizado desde el backend
      const updateCategories = state.allCategories.map((category) =>
        category.idCategory === updateCategory.idCategory
          ? updateCategory
          : category
      );
      return {
        ...state,
        allCategories: updateCategories,
      };
    case "DELETE_CATEGORY":
      const updatedCat = state.allCategories.filter(
        (e) => e.category !== action.payload
      );
      return {
        ...state,
        allCategories: updatedCat,
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
        userName: "",
        isAdmin: false,
        cart:[]
      };
    case "UPDATE_USER":
      const updateUser = action.payload; // El producto actualizado desde el backend
      const updatedUsers = state.allUsers.map((user) =>
        user.id === updateUser.id ? updateUser : user
      );
      return {
        ...state,
        allUsers: updatedUsers,
      };
    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "ADD_TO_CART":
      const addedProduct = action.payload;
      const updatedCartAdd = [...state.cart, addedProduct];
      return {
        ...state,
        cart: updatedCartAdd,
        itemCount: updatedCartAdd.length,
      };
    case "REMOVE_FROM_CART":
      // Agregar lógica para eliminar un producto del carrito
      const productIdToRemove = action.payload;
      const updatedCartRemove = state.cart.filter(
        (product) => product.idProduct !== productIdToRemove
      );
      localStorage.setItem("cart", JSON.stringify(updatedCartRemove));
      return {
        ...state,
        cart: updatedCartRemove,
        itemCount: updatedCartRemove.length,
        // Actualizar la cantidad de productos en el carrito
      };
    case "UPDATE_PRODUCT_STOCK":
      const { productId, newStock } = action.payload;
      const updatedProducts = state.allProducts.map((product) => {
        if (product.idProduct === productId) {
          return { ...product, productStock: newStock };
        }
        return product;
      });
      return {
        ...state,
        allProducts: updatedProducts,
      };
    case "REMOVE_ALL_CART":
      return { ...state, cart: action.payload };
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
    case "CREATE_PRODUCT": {
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload],
      };
    }
    case "UPDATE_PRODUCT": {
      const updateProduct = action.payload; // El producto actualizado desde el backend
      const updateProducts = state.allProducts.map((product) =>
        product.idProduct === updateProduct.idProduct ? updateProduct : product
      );

      return {
        ...state,
        allProducts: updateProducts,
      };
    }
    case "DELETE_PRODUCT":
      const updatedProduct = state.allProducts.filter(
        (e) => e.idProduct !== action.payload
      );
      return {
        ...state,
        allProducts: updatedProduct,
      };
    case "GET_ALL_USERS":
      return {
        ...state,
        allUsers: action.payload,
      };
    case "COUNT_USERS":
      return {
        ...state,
        totalUsers: action.payload,
      };
    case "COUNT_SALES":
      return {
        ...state,
        totalSales: action.payload,
      };
    case "GET_ALL_SALES":
      return {
        ...state,
        allSales: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
