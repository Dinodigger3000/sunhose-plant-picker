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
    scores.sort((a, b) => b.matchPercentage - a.matchPercentage); // you can change this to sort by any other criteria!
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

    var matchPercentage = 0;

    //light level

    if (profile.lightLevel === 1 && plantData.data.light_level.localeCompare("low") === 0) {
        matchPercentage = matchPercentage + 20;
    } else if (profile.lightLevel === 2 && plantData.data.light_level.localeCompare("medium") === 0){
        matchPercentage = matchPercentage + 20;
    } else if (profile.lightLevel === 3 && plantData.data.light_level.localeCompare("high") === 0) {
        matchPercentage = matchPercentage + 20;
    } else if (profile.lightLevel === 4 && plantData.data.light_level.localeCompare("very_high") === 0) {
        matchPercentage = matchPercentage + 20;
    }

    //pet safe

    if (profile.hasPet) {
        if (plantData.data.pet_safe) {
            matchPercentage = matchPercentage + 20;
        }
    } else {
        matchPercentage = matchPercentage + 20;
    }

    //budget

    if (plantData.data.avg_cost <= profile.budget) {
        matchPercentage = matchPercentage + 20;
    }

    //care level

    if (plantData.data.care_level <= profile.careLevel) {
        matchPercentage = matchPercentage + 20
    }
    //temp in range

    if (profile.minTemp >= plantData.data.min_temp){
        if (profile.maxTemp <= plantData.data.max_temp) {
            matchPercentage = matchPercentage + 20;
        }
    }

    return matchPercentage;
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