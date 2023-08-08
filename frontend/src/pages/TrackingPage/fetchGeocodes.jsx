// const fetchGeocodes = async (orders, setOrders) => {
//   try {
//     if (!Array.isArray(orders)) {
//       console.error("Invalid orders: orders should be an array");
//       return null;
//     }

//     const newOrders = await Promise.all(
//       orders.map(async (order) => {
//         const response = await fetch(
//           `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
//             order.address
//           )}&key=AIzaSyCNrvo40mebXB_2dB1G-pzEATUil7mLraY`
//         );
//         const data = await response.json();
//         return {
//           ...order,
//           location: data.results[0].geometry.location,
//         };
//       })
//     );
//     console.log("Geocoded orders:", newOrders);
//     setOrders(newOrders);
//     return newOrders;
//   } catch (error) {
//     console.log("Error occurred while fetching geocodes:", error);
//     return null;
//   }
// };

// export default fetchGeocodes;
import axios from "axios";

export default async function fetchGeocodes(addresses) {
  try {
    const responses = await Promise.all(
      addresses.map((address) =>
        axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCNrvo40mebXB_2dB1G-pzEATUil7mLraY`
        )
      )
    );
    const geocodedAddresses = responses.map((response) => {
      if (response.data.status === "OK") {
        return {
          lat: response.data.results[0].geometry.location.lat,
          lng: response.data.results[0].geometry.location.lng,
        };
      } else {
        throw new Error(`Failed to fetch geocode for address: ${address}`);
      }
    });
    return geocodedAddresses;
  } catch (error) {
    console.error(error);
  }
}
