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
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, store } from "./firebase";

export async function fetchPlantData(query, callBack) {
  const plants = await getDocs(query);
  if (plants.empty) {
    console.log("No plants found!");
    return [];
  }
  const plantProfiles = plants.docs.map((plant) => {
    console.log("plant " + plant.data());
    const title = plant.id
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return {
      id: plant.id,
      title: title,
      imageUrl: "/plantPics/" + plant.id + ".png",
      description: plant.data().description,
      scientific_name: plant.data().scientific_name,
      fun_fact: plant.data().fun_fact,
      instructions: plant.data().instructions,
      link: plant.data().link,
      data: plant.data(), // save the raw database values in case we need them later
      match_text: [],
      mismatch_text: [],
    };
  });
  callBack(plantProfiles);
}

export async function updatePlantMatches(userProfile, plantProfiles, callBack) {
  // returns an array that looks like this, feel free to change the structure!
  // [{id: "snake_plant", data: {data}, matchPercentage: 50}, {id: "spider_plant",  data: {data}, matchPercentage: 50}, ...]
  await plantProfiles;
  if (!plantProfiles) {
    console.log("No plants found!");
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
  var matchPercentage = 0;
  //make sure these weights below add to 100
  var weights = [51, 24, 12, 8, 5];
  plantData.match_text = [];
  plantData.mismatch_text = [];


  for (let i = 0; i < 5; i++) {
    if (profile.priorities[i].localeCompare("light") === 0) {
      var profile_light_text;
      if (profile.lightLevel === 1) {
        profile_light_text = "low";
      } else if (profile.lightLevel === 2) {
        profile_light_text = "medium";
      } else if (profile.lightLevel === 3) {
        profile_light_text = "high";
      } else if (profile.lightLevel === 4) {
        profile_light_text = "very high";
      }
      if (plantData.data.light_level.localeCompare(profile_light_text) === 0) {
        matchPercentage = matchPercentage + weights[profile.priorities.indexOf("light")];
        plantData.match_text.push("🌞 The recommended light level for this plant is " + profile_light_text + " light, which is what you selected.");
      } else {
        plantData.mismatch_text.push("🌞 The recommended light level for this plant is " + plantData.data.light_level + " light and you described your space as " + profile_light_text + " light.");
      }
    } else if (profile.priorities[i].localeCompare("pets") === 0) {
      if (profile.petSafe) {
        if (plantData.data.pet_safe) {
          matchPercentage = matchPercentage + weights[profile.priorities.indexOf("pets")];
          plantData.match_text.push("🐾 This plant is pet safe!")
        } else {
          plantData.mismatch_text.push("🐾 This plant is not pet safe!")
        }
      } else {
        matchPercentage = matchPercentage + weights[profile.priorities.indexOf("pets")];
        plantData.match_text.push("🐾 This plant is not pet safe, but you indicated that is something you were not worried about.")
      }
    } else if (profile.priorities[i].localeCompare("budget") === 0) {
      if (plantData.data.avg_cost <= profile.budget) {
        matchPercentage = matchPercentage + weights[profile.priorities.indexOf("budget")];
        plantData.match_text.push("💰 The average cost of this plant is $" + plantData.data.avg_cost + ", which is within your $" + profile.budget + " budget.");
      } else {
        plantData.mismatch_text.push("💰 The average cost of this plant is $" + plantData.data.avg_cost + ", which is outside of your $" + profile.budget + " budget.")
      }
    } else if (profile.priorities[i].localeCompare("care") === 0) {
      var plant_care_text;
      if (plantData.data.care_level === 1) {
        plant_care_text = "low";
      } else if (plantData.data.care_level === 2) {
        plant_care_text = "medium";
      } else if (plantData.data.care_level === 3) {
        plant_care_text = "high";
      }
      if (plantData.data.care_level <= profile.careLevel+1) {
        matchPercentage = matchPercentage + weights[profile.priorities.indexOf("care")];
        plantData.match_text.push("💗 This plant requires a " + plant_care_text + " level of care.")
      } else {
        plantData.mismatch_text.push("💗 This plant requires a " + plant_care_text + " level of care.")
      }
    } else {
      if (profile.minTemp >= plantData.data.min_temp) { //if minimum house temperature is higher than the minimum plant temperature
        if (profile.maxTemp <= plantData.data.max_temp) { //if maximum house temperature is less than the maximum plant temperature
          matchPercentage = matchPercentage + weights[profile.priorities.indexOf("temp")];
          plantData.match_text.push("🌡 The plant's recommended growing temperatures are within your indicated range.")
        } else {
          plantData.mismatch_text.push("🌡 The plant's recommended growing temperatures are outside of your indicated range.")
        }
      } else {
        plantData.mismatch_text.push("🌡 The plant's recommended growing temperatures are outside of your indicated range.")
      }
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
