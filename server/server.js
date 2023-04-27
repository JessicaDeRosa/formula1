const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const { importDataFromAPI } = require('./importData');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'JohanLiebert24!',
    database: 'mydb'
});

connection.connect(function(error) {
    if (error) {
        console.error('Error connecting to MySQL:', error);
        return;
    }
    console.log('Connected to MySQL database');
});

// importDataFromAPI to trigger API data import
importDataFromAPI(connection);

//cors to connect Frontend and Backend
app.use(cors());

const makeCorsRequest = (url, origin) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject(`CORS request failed with status ${xhr.status}`);
            }
        });

        xhr.addEventListener('error', () => {
            reject('CORS request failed');
        });

        xhr.open('GET', url);
        xhr.setRequestHeader('Access-Control-Allow-Origin', origin);
        xhr.send();
    });
};

//sending data from DB to Frontend
app.get('/api/data', (req, res) => {
    const url = req.query.url; // Get the URL parameter from the user
    const origin = req.headers.origin; // Get the origin header from the request

    makeCorsRequest(url, origin)
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.get('/drivers', (req, res) => {
    console.log('Fetching driver data...');
    const sql = 'SELECT * FROM drivers';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching driver data: ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
        console.log(results);
    });
});
app.listen(3000, () => console.log('Server started on port 3000'));
