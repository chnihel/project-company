"use client"
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from 'react-redux'

import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearCart, removeAllFromCart, removeOneFromListe } from "@/app/store/cartSlice";

export default function Panier() {

   const cart = useSelector((state: RootState) => state.cart)

  const priceTotal = useSelector((state: RootState) => state.cart.totalPrice) 

  const [idClient , setIdClient] = useState()
  const [confirmedItems, setConfirmedItems] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();
const dispatch=useDispatch()

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);

      console.log("Id de l'utilisateur :", userData.user._id);
      setIdClient(userData.user._id)
/*       const GroupByEntreprise = cart.items.reduce((item , index)=> {
        if (!item[index.entrepriseId]){
          item[index.entrepriseId] = []
        }else {
            item[index.entrepriseId].push(index)
        }
      }) */

    } else {
      console.log("Aucun utilisateur trouvé dans le localStorage");
    }


  })
  const Confirmer = async (entrepriseId: string, publicationId: string,titre:string, quantite: number, prix: number, index: number) : Promise<void>=>{
    try{
/*       const cartData = { 
        clientId :idClient ,
        cart:cart.items.map((item)=>({
          publicationId : item.publicationId,
          quantite:item.quantite ,
          prix: item.prix * item.quantite ,
          entrepriseId: entrepriseId
        })) ,
        prixtotal: priceTotal,
        
      } */

      if (!idClient){
        alert ("create account !")

      }
      const cartData = {
        clientId: idClient,
        cart: [{
          publicationId: publicationId,
          titre:titre,
          quantite: quantite,
          prix: prix * quantite,
          entrepriseId: entrepriseId,
          
        }],
        prixtotal: priceTotal,

      }
        const response = await fetch (`http://localhost:3000/panier`,{
          method:'POST',
            headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
        });
        if(response.ok){
          const data = await response.json();
        console.log("Panier  ajouté   avec succès :", data);
          alert("Article confirmé avec succès !");
          // Mettre à jour l'état pour désactiver le bouton
          setConfirmedItems((prevState) => ({ ...prevState, [index]: true }));
        }
    }catch(error) {
  console.error("Erreur lors de lajout au panier :", error);
    }

  }

    const ConfirmerAll = async () : Promise<void>=>{
    try{
      if (!idClient) {
        alert("create account !")
        
      }
      const cartData = { 
        clientId :idClient ,
        cart:cart.items.map((item)=>({
          publicationId : item.publicationId,
          titre:item.titre,
          quantite:item.quantite ,
          prix: item.prix * item.quantite ,
          entrepriseId: item.entrepriseId
        })) ,
        prixtotal: priceTotal,
        
      } 

        const response = await fetch (`http://localhost:3000/panier`,{
          method:'POST',
            headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
        });
        if(response.ok){
          const data = await response.json();
        console.log("panier data ajoutée   avec succès :", data);
          alert("Panier ajoutée avec succès !");
         // router.push("/");

        }
    }catch(error) {
  console.error("Erreur lors de lajout au panier :", error);
    }

  }

  const removeAll=async()  : Promise<void>=>{ 
    dispatch(clearCart())
  }
 



  return (
    <div>
      <div className="container-fluid bg-secondary mb-5">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 300 }}>
          <h1 className="font-weight-semi-bold text-uppercase mb-3">Panier </h1>
          <div className="d-inline-flex">
            <p className="m-0"><a href="">Home</a></p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Panier </p>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5">
        {cart?.items?.length > 0 ? (
          <>
            <table className="table table-bordered text-center shadow-sm rounded">
              <thead className="bg-primary text-white">
                <tr>
                  <th scope="col">Produit</th>
                  <th scope="col">Entreprise</th>
                  <th scope="col">Quantité</th>
                  <th scope="col">Prix Unitaire</th>
                  <th scope="col">Prix Total</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.titre}</td>
                    <td>{item.entrepriseId?.name}</td>
                    <td>{item.quantite}</td>
                    <td>{item.prix.toFixed(2)} €</td>
                    <td>{(item.prix * item.quantite).toFixed(2)} €</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() =>
                          Confirmer(
                            item.entrepriseId.id,
                            item.publicationId,
                            item.titre,
                            item.quantite,
                            item.prix, 
                            index
                          )
                        }
                        disabled={!!confirmedItems[index] } // Désactiver si déjà confirmé

                      >
                        <i className="bi bi-check-circle"></i> Confirmer
                      </button>
                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={()=>dispatch(removeAllFromCart(item))}
                        //onClick={() => SupprimerItem(item.publicationId)}
                      >
                        <i className="bi bi-trash"></i> Supprimer
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={()=>dispatch(removeOneFromListe(item))}
                        //onClick={() => SupprimerItem(item.publicationId)}
                      >
                        <i className="bi bi-plus"></i> Decrement
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center mt-4 p-4 bg-light border rounded shadow-sm">
              <h4>
                Total Panier :{" "}
                <span className="text-success">{priceTotal.toFixed(2)} €</span>
              </h4>
              <button className="btn btn-primary btn-lg" onClick={() =>
                ConfirmerAll(
                )
              }>
                <i className="bi bi-cart-check"></i> Confirm All
              </button>
              <button className="btn btn-primary btn-lg" onClick={() =>
                removeAll(
                )
              }>
                <i className="bi bi-trash"></i> Clear All
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <h3 className="text-secondary">Votre panier est vide</h3>
            <p>Ajoutez des articles pour continuer vos achats.</p>
            <Link href="/" className="btn btn-primary btn-lg">
              <i className="bi bi-arrow-left"></i> Retour à la boutique
            </Link>
          </div>
        )}
      </div>
  

      
    </div>
  )
}
