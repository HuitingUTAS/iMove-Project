// import { useState, useEffect } from "react";
// import { BASE_URL } from "../../../config";

// export default function useCars() {
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     const getCars = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/TrackingPage/GetCars`);
//         if (response.ok) {
//           const data = await response.json();
//           setCars(data);
//         } else {
//           console.error("Failed to fetch car data");
//         }
//       } catch (error) {
//         console.error("Error occurred while fetching car data:", error);
//       }
//     };

//     getCars();
//   }, []);

//   return cars;
// }
