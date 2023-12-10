const initialState = {
  backupProducts: [],
  allProducts: [],
  filteredProducts: [],
  allCategories: [],
  isLoggedIn: false,
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  isAdmin: false,
  userName: "",
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
        userName: userName
      }
    case "LOGOUT":
      return { ...state, isLoggedIn: false };
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
      
      const productIdToRemove = action.payload;
      const updatedCartRemove = state.cart.filter(
        (product) => product.idProduct !== productIdToRemove
      );

      localStorage.setItem("cart", JSON.stringify(updatedCartRemove));

      return {
        ...state,
        cart: updatedCartRemove,
        itemCount: updatedCartRemove.length,
        
      };

      case 'UPDATE_PRODUCT_STOCK':
        const { productId, newStock } = action.payload;
        const updatedProducts = state.allProducts.map(product => {
          if (product.idProduct === productId) {
            return { ...product, productStock: newStock };
          }
          return product;
        });

        return {
          ...state,
          allProducts: updatedProducts,
        };

  
    case "DELETE_CATEGORY":
    const updatedCat = state.allCategories.filter(
      e => e.category !== action.payload
    );
    return {
      ...state,
      allCategories: updatedCat,
    };
    case "CREATE_PRODUCT":{
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload]
      }
    }
    case "DELETE_PRODUCT":
      const updatedProduct = state.allProducts.filter(
        e => e.idProduct !== action.payload
      );
      return {
        ...state,
        allProducts: updatedProduct,
      };
    default:
      return state;
  }
};

export default rootReducer;
