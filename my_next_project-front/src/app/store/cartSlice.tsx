import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface cartItem {
  publicationId: string;
  quantite: number;
  prix: number;
  titre:string
  entrepriseId: {
    id: string;
    name: string;
  };
}

interface cartState {
  items: cartItem []
  totalPrice: number
}

const initialState : cartState = {
  items: [],  
  totalPrice: 0, 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingPub = state.items.find((pub) => {
        return pub.publicationId === action.payload.publicationId

      })
      if (existingPub){
        existingPub.quantite += action.payload.quantite
      }else{
        state.items.push(action.payload)
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.quantite * item.prix, 0)


    
    },
    removeAllFromCart(state, action: PayloadAction<cartItem>) {
      state.items = state.items.filter(item => item.publicationId !== action.payload.publicationId);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.quantite * item.prix, 0);
      console.log('Updated cart state:', state);
  }
      ,
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
  
      console.log('Cart has been cleared:', state);
    
    }, 

    removeOneFromListe(state,action:PayloadAction<cartItem>){
      const pubExist=state.items.find((item)=> {return item.publicationId== action.payload.publicationId})
      if(pubExist){
        if(pubExist.quantite>1){
          pubExist.quantite -=1
        }else{
          state.items==state.items.filter(prod=>prod.publicationId!==action.payload.publicationId)
          console.log('product not found')
        }
      }
      state.totalPrice=state.items.reduce((sum,item)=>sum+item.quantite*item.prix,0)
            console.log('Updated cart state:', state);
    }
  },
});

export const { addToCart ,clearCart,removeAllFromCart,removeOneFromListe} = cartSlice.actions;
export default cartSlice.reducer;
