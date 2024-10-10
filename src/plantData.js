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

export async function fetchPlantData(query, callBack) {
    const plants = await getDocs(query);
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
    callBack(plantProfiles);
}

export async function updatePlantMatches(userProfile, plantProfiles, callBack) {
    // returns an array that looks like this, feel free to change the structure!
    // [{id: "snake_plant", data: {data}, matchPercentage: 50}, {id: "spider_plant",  data: {data}, matchPercentage: 50}, ...]
    await plantProfiles;
    if (!plantProfiles) {
        console.log('No plants found!');
        return [];
    }
    const scores = plantProfiles.map((plant) => {
        return {
            id: plant.id,
            data: plant,
            matchPercentage: calculateMatch(plant, userProfile),
        };
    });
    callBack(scores);
}

/**
 * Calculates the match percentage for the given data.
 * 
 * @param {Object} data - The raw plant data from the database.
 * @param {Object} profile - The user's profile data.
 * @returns {number} - The calculated match percentage.
 */
const calculateMatch = (plantData, profile) => {
    //put in formula to calculate percent match ! !
    // right now it just returns a random percentage
    //you can use getPlant(id) to get the specific plant data, and 

    return Math.floor(Math.random() * 100);
  };


// export function getPlant(id) {
//     const plantRef = doc(db, 'plants', id);
//     return getDoc(plantRef).then((docSnap) => {
//         if (docSnap.exists()) {
//             return docSnap.data();
//         } else {
//             throw new Error('No such document!');
//         }
//     });
// };

async function getPlantImageURL(id) {
    const plantRef = ref(store, `plantPics/${id}.png`);
    return getDownloadURL(plantRef);
}