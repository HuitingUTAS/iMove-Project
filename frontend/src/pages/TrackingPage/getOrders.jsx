// import { useState, useEffect } from "react";
// import { BASE_URL } from "../../../config";

// export default function useOrders(selectedCar) {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const getOrders = async () => {
//       try {
//         const response = await fetch(
//           `${BASE_URL}/TrackingPage/GetOrders/${selectedCar._id}`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           console.log(data);
//           setOrders(data);

//         } else {
//           console.error("Failed to fetch order data");
//         }
//       } catch (error) {
//         console.error("Error occurred while fetching order data:", error);
//       }
//     };

//     if (selectedCar) {
//       getOrders();
//     }
//   }, [selectedCar]);

//   return orders;
// }
