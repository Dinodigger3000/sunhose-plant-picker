import {
    collection,
    onSnapshot,
    query,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    orderBy,
    Timestamp,
    runTransaction,
    where,
    getFirestore,
} from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db, store } from './firebase';
import React, { useEffect, useState } from 'react';

// This file contains functions that interact with the Firestore database. They return promises that resolve to the requested data.

/**
 * Fetches all documents from the 'plants' collection in the database.
 *
 * @returns {Promise<QuerySnapshot>} A promise that resolves to a QuerySnapshot containing all plant documents.
 */
export function getAllPlants() {
    return getDocs(collection(db, 'plants'));
};

//   export function getDocumentsInQuery(query, renderer) {
//     query.onSnapshot(function(snapshot) {
//       if (!snapshot.size) return renderer.empty(); // Display "There are no restaurants".

//       snapshot.docChanges().forEach(function(change) {
//         if (change.type === 'removed') {
//           renderer.remove(change.doc);
//         } else {
//           renderer.display(change.doc); // add the renderer
//         }
//       });
//     });
//   };

/**
 * Retrieves plant data from the database based on the provided plant ID.
 *
 * @param {string} id - The unique identifier of the plant.
 * @returns {Promise<Object>} A promise that resolves to the plant data if the document exists.
 * @throws {Error} If no document with the provided ID exists.
 */
export function getPlant(id) {
    const plantRef = doc(db, 'plants', id);
    return getDoc(plantRef).then((docSnap) => {
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            throw new Error('No such document!');
        }
    });
};

export function getPlantImageURL(id) {
    const plantRef = ref(store, `plantPics/${id}.png`);
    return getDownloadURL(plantRef);
}
// function getFilteredPlants(filters, renderer) {
//     var query = collection(db, 'plants');

//     // TODO impliment the filters we want
//     // if (filters.category !== 'Any') {
//     //   query = query.where('category', '==', filters.category);
//     // }

//     // if (filters.city !== 'Any') {
//     //   query = query.where('city', '==', filters.city);
//     // }

//     // if (filters.price !== 'Any') {
//     //   query = query.where('price', '==', filters.price.length);
//     // }

//     // if (filters.sort === 'Rating') {
//     //   query = query.orderBy('avgRating', 'desc');
//     // } else if (filters.sort === 'Reviews') {
//     //   query = query.orderBy('numRatings', 'desc');
//     // }

//     this.getDocumentsInQuery(query, renderer);
// };