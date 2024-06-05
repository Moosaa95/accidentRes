// import { createContext, useReducer } from "react";

// export const EmergencyContext = createContext({
//   emergencies: [],
//   addEmergency: ({ name, email, phone }) => {},
//   setEmergencies: (emergencies) => {},
//   deleteEmergency: (id) => {},
//   updateEmergency: (id, { name, email, phone }) => {},
// });

// function emergencyReducer(state, action) {
//   switch (action.type) {
//     case "ADD":
//       return [action.payload, ...state];

//     case "SET":
//       const invertedArr = action.payload.reverse();
//       console.log("seT", invertedArr);
//       return invertedArr;

//     case "UPDATE":
//       const updateEmergencyIndex = state.findIndex(
//         (emergency) => emergency.id === action.payload.id
//       );
//       const updateEmergencyContact = state[updateEmergencyIndex];
//       const updateItem = { ...updateEmergencyContact, ...action.payload.data };
//       const updateEmergencies = [...state];

//       updateEmergencies[updateEmergencyIndex] = updateItem;
//       return updateEmergencies;

//     case "DELETE":
//       return state.filter((emergency) => emergency.id !== action.payload);
//     default:
//       return state;
//   }
// }

// function EmergencyContextProvider({ children }) {
//   const [emergenciesState, dispatch] = useReducer(emergencyReducer, []);

//   function addEmergency(emergencyData) {
//     console.log('aDDD');
//     dispatch({ type: "ADD", payload: emergencyData });
//   }

//   //   async function setEmergency(emergencies) {
//   //     dispatch({ type: "SET", payload: emergencies });
//   //   }

//   async function setEmergencies(emergencies) {
//     // const emergencies = await fetchEmergencies();
//     console.log("se", emergencies);
//     dispatch({ type: "SET", payload: emergencies });
//   }

//   async function updateEmergencyHandler(id, emergencyData) {
//     // await updateEmergency(id, emergencyData);
//     dispatch({ type: "UPDATE", payload: { id, data: emergencyData } });
//   }

//   async function deleteEmergencyHandler(id) {
//     // await deleteEmergency(id);
//     dispatch({ type: "DELETE", payload: id });
//   }

//   const value = {
//     emergencies: emergenciesState,
//     addEmergency,
//     setEmergencies,
//     updateEmergency: updateEmergencyHandler,
//     deleteEmergency: deleteEmergencyHandler,
//   };

//   return (
//     <EmergencyContext.Provider value={value}>
//       {children}
//     </EmergencyContext.Provider>
//   );
// }

// export default EmergencyContextProvider;
