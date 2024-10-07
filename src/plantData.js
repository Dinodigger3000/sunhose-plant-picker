import { collection, getDocs } from 'firebase/firestore';
import {db} from '../index';
import React, { useEffect, useState } from 'react';

// const [plantNames, setPlantNames] = useState([]);

// const fetchPlantNames = async () => {
//     await getDocs(collection(db), "plants").then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             setPlantNames([...plantNames, doc.data().scientific_name]);
//         })});
//     }
// useEffect(() => {
//     fetchPlantNames();
// }, []);
import { doc, getDoc } from "firebase/firestore";

const docRef = doc(db, "plants");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}