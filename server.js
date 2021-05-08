const express = require('express');
const mongoose = require('mongoose');

const doggosRoutes = require('./routes/doggos');
const humansRoutes = require('./routes/humans');

const server = express();

const db_connection = process.env.DB_CONNECTION;
const conn_config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

mongoose
    .connect(db_connection, conn_config)
    .then(
        () => {
            console.log("Connection to MongoDB successful!");
        }
    )
    .catch(
        (error) => {
            console.log("MongoDB error!", error);
        }
    )

// all requests that go through .../doggos/
server.use(
    '/doggos',
    doggosRoutes
);

// all requests that go through .../humans/
server.use(
    '/humans',
    humansRoutes
);

// homepage
server.get(
    '/',
    (req, res) => {
        res.send('Hello Word!');
    }
);

// our doggos page
server.get(
    '/doggos',
    (req, res) => {
        res.send('Hello doggos!');
    }
);

// our humans page
server.get(
    '/humans',
    (req, res) => {
        res.send('Hello humans!');
    }
);

// about page
server.get(
    '/about',
    (req, res) => {
        res.send('Welcome to the about page!');
    }
);

// contact page
server.get(
    '/contact',
    (req, res) => {
        res.send('Welcome to the contact page!');
    }
);

server.listen(
    8088,
    () => {
        console.log("Tinder for doggos is live on http://localhost:8088");
    }
)