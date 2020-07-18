const express = require('express');
const router = express.Router();

const axios = require('axios');

var Server = require('../../server');
const db = Server.db;

//GET POST 

router.get('/', (req, res) => {
    console.log('about to get the songs!');
    let songs = [];
    db.collection('songs').get().then(data => {
        data.forEach(doc => {
            songs.push(doc.data());
        })
        res.status(200).json(songs);
    })
        .catch(error => {

            console.log('error getting data from firestore');
        });
});

// ADD SONG 
router.get('/post', (req, res) => {
    console.log('about to put a song in the database');
    db.collection('songs').add(req.newSong).then(() => {
        res.status(200).json(req.newSong);
    })
        .catch(error => {
            console.log(error);
        })
});

module.exports = router;