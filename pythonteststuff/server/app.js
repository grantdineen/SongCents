const path = require('path');
const http = require("http");
const fs = require('fs');
var admin = require("firebase-admin");

var serviceAccount = require("./songcents-5a8a1-firebase-adminsdk-t1f49-3ff6dbd122.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://songcents-5a8a1.firebaseio.com"
});

const db = admin.firestore();

http.createServer(function (request, response) {
    // Send the HTTP header 
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    //get list of all files in the data directory
    let songFiles = [];
    const dataFolder = '../data/';
    songFiles = fs.readdirSync(dataFolder);

    //Read all of the song files and get a list of Song objects
    let songs = [];
    songFiles.forEach(songFile => {
        let songJsonString = fs.readFileSync('../data/' + songFile, 'utf8');
        songs.push(JSON.parse(songJsonString));
    });

    //Go through the list of songs and add them to the firestore
    songs.forEach(song => {
        let songDoc = {
            "title": song.title,
            "artist": song.artist,
            "album": song.album,
            "lyrics": song.lyrics,
            "beginsWith": song.beginsWith,
            "date": new Date()
        }

        db.collection('songs').doc(createSongId(songDoc)).set(songDoc).then(() => {
            console.log(songDoc.title + ' was added!');
        });

        //commenting this way out... storing data this way is probably more complicated than it needs to be for my purposes and will make queries harder...
        /*
        let artistDoc = {
            "name": song.artist,
            "beginsWith": song.beginsWith
        }
        let albumDoc = {
            "title": song.album
        }

        let songDoc = {
            "title": song.title,
            "lyrics": song.lyrics
        }

        db.collection('artists').doc(song.artist).set(artistDoc).then(() => {
            db.collection('artists').doc(song.artist).collection('albums').doc(song.album).set(albumDoc).then(() => {
                db.collection('artists').doc(song.artist).collection('albums').doc(song.album).collection('songs').add(songDoc).then(() => {
                    console.log(song.title + ' has been added!');
                })
            })
        })
        */
    });

    // Send the response body as "Hello World"
    response.end('Adding songs...\n');
}).listen(8081);

function createSongId(song) {
    return song.artist.replace(/ /g, '') + "-" + song.title.replace(/ /g, '');
}

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');

