import { createSlice, } from "@reduxjs/toolkit"


const initialState = {
    loading : true, 
    userData:null
}


export const authSlice = createSlice({
    name:"auth", 
    initialState ,
    reducers:{
        logIn:(state , action)=>{
            state.loading = false;
            state.userData = action.payload;
            
        }, 
        logOut:(state)=>{
            state.loading = false;
            state.userData = null;
            
        },

    } 

})

export const {logIn , logOut} = authSlice.actions
export default   authSlice.reducer

