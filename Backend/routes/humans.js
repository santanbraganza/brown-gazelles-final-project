const express = require('express');
const router = express.Router();

const HumansModel = require('../models/HumansModel')

// ...humans/find
router.get(
    '/find',
    (req, res) => {
        HumansModel
            .find(
                {
                    email: req.body.email
                }
            )
            .then(
                (dbDocument) => {
                    res.send(dbDocument);
                }
            )
            .catch(
                (error) => {
                    console.log("Mongoose error!", error);
                    res.send(error);
                }
            )
    }
);


// ...humans/add
router.post(
    '/add',
    (req, res) => {
        const formData = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            age: req.body.age,
            likes: req.body.likes,
            does_not_like: req.body.does_not_like
        }

        const newHumansModel = new HumansModel(formData);

        newHumansModel
            .save()
            .then(
                (dbDocument) => {
                    res.send(dbDocument);
                }
            )
            .catch(
                (error) => {
                    console.log("Mongoose error!", error);
                    res.send(error);
                }
            )
    }
);

// ...humans/update
router.post(
    '/update',
    (req, res) => {

        HumansModel
            .findOneAndUpdate(
                { email: req.body.email },
                {
                    $set: {
                        email: req.body.email
                    }
                }
            )
            .then(
                (dbDocument) => {
                    res.send(dbDocument);
                }
            )
            .catch(
                (error) => {
                    console.log("Mongoose error!", error);
                    res.send(error);
                }
            );

    }
);

module.exports = router;