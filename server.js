const http = require('http');
const port = process.env.PORT || 4600;
const mysql = require('mysql');
const cros = require('cors');
const path = require('path');
const bodyparser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(cros());
app.use(morgan('dev'));

const config = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'YowApi',
});
config.connect(function(error) {
    if (!!error) {
        console.log('Error');
    } else {
        console.log('mysql Connected to db:YowApi');
    }
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())

app.use(express.static(path.join(__dirname, 'api')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});




const server = http.createServer(app);
server.listen(port, function() {
    console.log('server start on port ' + port);
});