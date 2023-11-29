const initialState = {
    allProducts: [],
    filteredProducts: [],
    allCategories: [],
}; 

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case "GET_ALL_PRODUCTS": return {
            ...state,
            filteredProducts: action.payload,
            allProducts: action.payload,
        };
        case "FILTER_BY_CATEGORIES": 
            if(action.payload == "all"){
                return {...state, filteredProducts: state.allProducts}
            }else{
                const filteredByCategory = state.allProducts.filter(e=>e.typeCategory.category === action.payload)
                return {...state, filteredProducts: filteredByCategory}
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
            filteredProducts: action.payload
        }
        default: return state;
    }
}

export default rootReducer;