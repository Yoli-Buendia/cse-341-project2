const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    mongodb
    .getDb()
    .db()
    .collection('groupA')
    .find()
    .toArray().then((lists, err) => {
    if(err) {
      res.status(400).json({message: err});
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

/*const getSingle = (req, res) => {
    const userId = new ObjectId(req.params.id);
    if (!ObjectId.isValid(req.params.id)){
       res.status(400).json('Must use a valid user id to find an user.');
    }
      mongodb
      .getDb()
      .db()
      .collection('groupA')
      .find({ _id: userId })
      .toArray().then((result, err) => {
        if (err) {
          res.status (400).json({ message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);  
    });
};*/

const getSingle = (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid user id to find a user.');
        return;  // Return to avoid further execution
    }

    mongodb
      .getDb()
      .db()
      .collection('groupA')
      .find({ _id: req.params.id })
      /*.toArray()
      .then((result) => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result[0]);
      })
      .catch((err) => {
          res.status(500).json({ message: 'Internal Server Error', error: err });
      });*/
      .toArray().then((result, err) => {
        if (err) {
          res.status (400).json({ message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);  
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
    const response = await mongodb.getDb().db().collection('groupA').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    }else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user A.');
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
    const response = await mongodb.getDb().db().collection('groupA').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user A.');
    }
};

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('groupA').deleteOne({ _id: userId });
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    }else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user A.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};