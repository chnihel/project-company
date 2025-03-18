import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface favorisItem{
  publicationId: string;
  titre:string
  entrepriseId: string;

}
interface favorisState{
    favoris:favorisItem[]
}
const initialState:favorisState={
    favoris:[]

}

const favorisSlice=createSlice({
    name:"favoris",
    initialState,
    reducers:{
        addToFavoris: (state, action: PayloadAction<favorisItem>) => {
            state.favoris.push(action.payload);
          },
          removeFromFavoris: (state, action: PayloadAction<string>) => {
            state.favoris = state.favoris.filter(item => item.publicationId !== action.payload);
          },
    }
})
export const {addToFavoris}=favorisSlice.actions
export default favorisSlice.reducer