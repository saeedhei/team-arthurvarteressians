"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TS
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET users listing. */
router.get('/', (req, res, next) => {
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            // Use optional chaining to check if response exists and is okay
            if (response?.ok) {
                const data = await response.json();
                return data;
            }
            else {
                throw new Error(`Error: ${response ? response.status : 'Unknown error'}`);
            }
        }
        catch (error) {
            console.error('Failed to fetch data:', error.message);
            throw error; // Re-throw the error after logging
        }
    };
    fetchData('https://jsonplaceholder.typicode.com/posts')
        .then(data => {
        const responseData = JSON.stringify(data, null, 2); // 2 for pretty print
        res.send(responseData);
    })
        .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});
exports.default = router;
// var express = require('express');
// var router = express.Router();
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// module.exports = router;
// ESNext Version (With Optional Chaining)
// const fetchData = async (url) => {
//   try {
//     const response = await fetch(url);
//     // If response.ok is true, return the parsed JSON, otherwise throw an error
//     if (response?.ok) {
//       const data = await response.json();
//       return data;
//     } else {
//       throw new Error(`Error: ${response.status}`);
//     }
//   } catch (error) {
//     console.error('Failed to fetch data:', error.message);
//   }
// };
// // Example usage
// fetchData('https://api.example.com/data')
//   .then(data => console.log(data))
//   .catch(err => console.error(err));
// Pre-ESNext Version (Without Optional Chaining)
// const fetchData = async (url) => {
//   try {
//     const response = await fetch(url);
//     // Manually check if response exists and if response.ok is true
//     if (response && response.ok) {
//       const data = await response.json();
//       return data;
//     } else {
//       throw new Error(`Error: ${response ? response.status : 'Unknown error'}`);
//     }
//   } catch (error) {
//     console.error('Failed to fetch data:', error.message);
//   }
// };
// // Example usage
// fetchData('https://api.example.com/data')
//   .then(data => console.log(data))
//   .catch(err => console.error(err));
