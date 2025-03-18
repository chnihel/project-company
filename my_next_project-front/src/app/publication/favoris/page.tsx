"use client"
import { RootState } from '@/app/store/store'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const FovorisList = () => {
    const favoris=useSelector((state:RootState)=>state.favoris)
  return (
    <div>
    <div className="container-fluid bg-secondary mb-5">
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 300 }}>
        <h1 className="font-weight-semi-bold text-uppercase mb-3">Favoris </h1>
        <div className="d-inline-flex">
          <p className="m-0"><a href="">Home</a></p>
          <p className="m-0 px-2">-</p>
          <p className="m-0">Favoris </p>
        </div>
      </div>
    </div>

    <div className="container-fluid py-5">
      {favoris.favoris.length > 0 ? (
        <>
          <table className="table table-bordered text-center shadow-sm rounded">
            <thead className="bg-primary text-white">
              <tr>
                <th scope="col">Produit</th>
                <th scope="col">Entreprise</th>
                <th scope="col">Titre</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {favoris.favoris.map((item, index) => (
                <tr key={index}>
                  <td>{item.publicationId}</td>
                  <td>{item.entrepriseId}</td>
                  <td>{item.titre}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-2"
                      // Désactiver si déjà confirmé

                    >
                      <i className="bi bi-check-circle"></i> Confirmer
                    </button>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         
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

export default FovorisList
