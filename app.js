const express = require('express');
const emailValidatore = require('email-validator');
const nodemailer = require('nodemailer');
const mail = require('./mail');
const fs = require('fs');
const inlineCss = require('inline-css');
const hogan = require('hogan.js');
const axios = require('axios');

const app = express();
const port= 3000;

const fHtml = fs.readFileSync('./index.html');
const fCss = inlineCss(fHtml.toString(), {url: 'file://' + __dirname + '/style'});
const compile = hogan.compile(fCss);
const Render = compile.render({})


    
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/emailvalidate', (req,res) => {
    let Email = req.query.email;
    let nom = req.query.nom;
    let prenom = req.query.prenom;

    const options = {
        method: 'GET',
        url: 'https://mailcheck.p.rapidapi.com/',
        params: {email: Email},
        headers: {
          'X-RapidAPI-Key': 'ef3b0bb68fmsh2aba88aa84ef10ep1cc015jsnb27185c007b4',
          'X-RapidAPI-Host': 'mailcheck.p.rapidapi.com'
        }
      };

      axios.request(options).then(function (response) {
        if (nom === '') {
            console.log("Veuillez renseigner votre nom");
        } else {
            if (prenom === '') {
                console.log("Veuillez renseigner votre prenom");
            } else {
                function envoie() {
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'wourichouf95@gmail.com',
                            pass: 'udxivwfbeneqhhbr'
                        }
                    })
                
                    const mailOption = {
                        from: 'wourichouf95@gmail.com',
                        to: Email,
                        subject: 'Projet nodeMailer',
                        text: `
                    Bonjour ${nom} ${prenom}.
                    Vous recevez ce mail suite à une souscription à notre News Letter.
                    Vous continuerez à recevoir des mail de notre part quand nos dernier produits seront disponible.
        
                    Nos remerciement 😉
                        `
                    }
                
                    transporter.sendMail(mailOption, function(err,info) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.sendFile(__dirname + '/mailSent.html')
                            console.log("Email sent : " + info.response);
                        }
                    })
                };
                envoie();
            }
        }
      }).catch(function (error) {
          //console.error(error);
          console.log('Incorrect');
      });
})

app.listen(port, () => {console.log(`App démarré sur : http://localhost:${port}`);})