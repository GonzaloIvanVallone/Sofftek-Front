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
            const filteredByCategory = state.allProducts.filter(e=>e.typeCategory.category === action.payload)
            return {...state, filteredProducts: filteredByCategory}
        case "GET_ALL_CATEGORIES": return {
            ...state,
            allCategories: action.payload
        }
        default: return state;
    }
}

export default rootReducer;