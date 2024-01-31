const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('groupB').find();
    result.toArray().then((users) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('groupB').find({ _id: userId });
    result.toArray().then((users) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createUser = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        ipaddress: req.body.ipaddress,
        favoriteColor: req.body.favoriteColor
    };
    const response = await mongodb.getDatabase().db().collection('groupB').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    }else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user B.');
    }
};

const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        ipaddress: req.body.ipaddress,
        favoriteColor: req.body.favoriteColor
    };
    const response = await mongodb.getDatabase().db().collection('groupB').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user B.');
    }
};

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('groupB').deleteOne({ _id: userId });
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    }else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user B.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};