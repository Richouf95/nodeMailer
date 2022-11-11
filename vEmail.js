// const express = require('express');
// const emailValidatore = require('email-validator');

// const app = express();
// const port= 3000;

// app.get('/', (req,res) => {
//     res.sendFile(__dirname + '/index.html');
// })

// module.exports.verification = async function () {
//     app.get('/emailvalidate', (req,res) => {
//         let email = req.query.email;
    
//         if (emailValidatore.validate(email)) {
//             res.send('Email is valid');
//             console.log('Email is valid');
//         } else {
//             res.send('Email is invalid');
//             console.log('Email is invalid');
//         }
//     })
// }