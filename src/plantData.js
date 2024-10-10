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

export async function getPlantProfiles() {
    const plants = await getDocs(collection(db, 'plants'));
    if (plants.empty) {
        console.log('No plants found!');
        return [];
    }
    const plantProfiles = plants.docs.map((plant) => {
        console.log('plant ' + plant.data());
        const title = plant.id.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
        const url = getPlantImageURL(plant.id);
        return {
            id: plant.id,
            title: title,
            imageUrl: url,
            //description: plant.data().description, // add descriptions to the database maybe, this field will be blank for now.
            description: `Very detailed description of Plant ${plant.id}`,
            //matchPercentage: calculateMatch(plant.data()), //can't call this method before initialization.
            data: plant.data(), // save the raw database values in case we need them later
        };
    });
    return plantProfiles;
}

/**
 * Gets plant matches based on the user profile.
 *
 * @param {Object} userProfile - The user's profile object.
 * @returns {Array<Object>} An array of objects representing the plant matches, each containing:
 *   - {string} id - The ID of the plant.
 *   - {Object} data - The plant profile data.
 *   - {number} matchPercentage - The match percentage between the plant and the user profile.
 */
export async function getPlantMatches(userProfile) {
    // returns an array that looks like this, feel free to change the structure!
    // [{id: "snake_plant", data: {data}, matchPercentage: 50}, {id: "spider_plant",  data: {data}, matchPercentage: 50}, ...]
    
    const plantProfiles = await getPlantProfiles();
    return plantProfiles.map((plant) => {
        return {
            id: plant.id,
            data: plant,
            matchPercentage: calculateMatch(plant, userProfile),
        };
    });
}

/**
 * Calculates the match percentage for the given data.
 * 
 * @param {Object} data - The plant data from the database.
 * @param {Object} profile - The user's profile data.
 * @returns {number} - The calculated match percentage.
 */
export const calculateMatch = (plantData, profile) => {
    //put in formula to calculate percent match ! !
    // right now it just returns a random percentage
    //you can use getPlant(id) to get the specific plant data, and 

    return Math.floor(Math.random() * 100);
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

export async function getPlantImageURL(id) {
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