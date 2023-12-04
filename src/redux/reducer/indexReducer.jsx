const initialState = {
    backupProducts:[],
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
        default: return state;
    }
}

export default rootReducer;
