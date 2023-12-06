const initialState = {
    backupProducts:[],
    allProducts: [],
    filteredProducts: [],
    allCategories: [],
    isLoggedIn: false,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    isAdmin: false,

}; 

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case "GET_ALL_PRODUCTS": return {
            ...state,
            filteredProducts: action.payload,
            allProducts: action.payload,
            backupProducts: action.payload
        };
        case "FILTER_BY_CATEGORIES": 
            if(action.payload == "all"){
                return {...state, allProducts: state.backupProducts}
            }else{
                const filteredByCategory = state.backupProducts.filter(e=>e.typeCategory.category === action.payload)
                return {...state, allProducts: filteredByCategory}
            }
        case "GET_ALL_CATEGORIES":   
            const updatedCategories = [...action.payload]; 
            updatedCategories.unshift({ idCategory: 0, category: "all", status: true });
            return {
            ...state,
            allCategories: updatedCategories,
            };
        case "GET_PRODUCTS_BY_NAME": return{
            ...state,
            allProducts: action.payload
        }
        case 'LOGIN':    
            const isAdmin = action.payload == 'ADMIN';
            return { ...state, isLoggedIn: true, isAdmin };
        case "LOGOUT": return { ...state, isLoggedIn: false };
        case 'GET_CART':
      return {
        ...state,
        cart: action.payload,
      };
      case 'ADD_TO_CART':
      // Agregar lógica para agregar un producto al carrito
      const addedProduct = action.payload;
      const updatedCartAdd = [...state.cart, addedProduct];
      return {
        ...state,
        cart: updatedCartAdd,
        itemCount: updatedCartAdd.length, // Contar la cantidad de productos en el carrito
      };
      case 'REMOVE_FROM_CART':
      // Agregar lógica para eliminar un producto del carrito
      const productIdToRemove = action.payload;
      const updatedCartRemove = state.cart.filter(product => product.idProduct !== productIdToRemove);
      
      return {
        ...state,
        cart: updatedCartRemove,
        itemCount: updatedCartRemove.length, 
        // Actualizar la cantidad de productos en el carrito
      };

      // Actualizar localStorage con el nuevo estado del carrito
      

      return updatedState = localStorage.setItem('cart', JSON.stringify(updatedCart));
      
        default: return state;
    }
}

export default rootReducer;
