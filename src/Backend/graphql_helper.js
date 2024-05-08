// Helper functions for GraphQL queries and mutations
import axios from 'axios';

import { getAccessToken, setupAuthHeaders } from './Auth';

const QUERY_URL = "https://api.devii.io/query";

// General helper function for executing GraphQL queries and mutations
async function executeGraphqlQuery(query, variables = {}) {
    const payload = {
        query: query,
        variables: variables
    };
    const headers = await setupAuthHeaders(); // Ensure headers are awaited here
    console.log("Headers for the request:", headers); // Check this log

    try {
        const response = await axios.post(QUERY_URL, payload, {headers} );
        return response.data;
    } catch (error) {
        console.error('Error executing GraphQL query:', error);
        throw error;
    }
}


// Function to retrieve all the list and item data
async function getWeatherData() {
    const WeatherDataQuery = `
    query 
    weather_data{
          weather_data(filter:"stationid = 180075",
          ordering:"ts desc",limit:10){
              station{
              name
            }
            message_timestamp
            temperature
            ts
          }}
      
    `;
    return executeGraphqlQuery(WeatherDataQuery);
}

// // Function to retrieve status data
// async function getStatusName() {
//     const queryStatusName = `
//     {
//         status_value {
//             statusid
//             statusname
//         }
//     }`;
//     return executeGraphqlQuery(queryStatusName);
// }

// // Mutation functions
// async function addItem(itemName, listId, statusId) {
//     const addItemMutation = `
//         mutation ($i: itemInput) {
//             create_item(input: $i) {
//                 itemid
//                 itemname
//                 status_value {
//                     statusname
//                 }
//                 list {
//                     listname
//                 }
//             }
//         }`;
//     const variables = {
//         i: { itemname: itemName, listid: Number(listId), statusid: Number(statusId) }
//     };
//     return executeGraphqlQuery(addItemMutation, variables);
// }

// async function editItem(itemId, newName, listId, statusId) {
//     const editItemMutation = `
//         mutation ($i: itemInput, $j: ID!) {
//             update_item(input: $i, itemid: $j) {
//                 itemid 
//                 itemname
//                 status_value {
//                     statusid
//                     statusname
//                 }
//                 list {
//                     listid
//                     listname
//                 }
//             }
//         }`;
//     const variables = {
//         j: itemId,
//         i: { itemname: newName, listid: Number(listId), statusid: Number(statusId) }
//     };
//     return executeGraphqlQuery(editItemMutation, variables);
// }

// async function deleteItem(itemId) {
//     const deleteItemMutation = `
//         mutation ($i: ID!) {
//             delete_item(itemid: $i) {
//                 itemid
//                 itemname
//             }
//         }`;
//     const variables = { i: itemId };
//     return executeGraphqlQuery(deleteItemMutation, variables);
// }

// Export the functions to be used elsewhere in the project
export { getWeatherData };
