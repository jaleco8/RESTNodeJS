const Place = require('../models/Place');

function index(req, res) {
    Place.find({}).then(docs => {
        res.json(docs);
    }).catch(err => {
        console.log(err);
        res.json(err);
    })
}

function create(req, res) {
    let attributes = ['title', 'description', 'acceptsCrediCard', 'openHour', 'closeHour'];
    let placeParams = {};
    attributes.forEach(attr => {
        if (Object.prototype.hasOwnProperty.call(req.body, attr))
            placeParams[attr] = req.body[attr];
    });

    Place.create(placeParams).then(doc => {
        res.json(doc);
    }).catch(err => {
        console.log(err);
        res.json(err);
    })
}

function show(req, res) {
    Place.findById(req.params.id).then(doc => {
        res.json(doc);
    }).catch(err => {
        console.log(err);
        res.json(err);
    })
}

function update(req, res) {
    let attributes = ['title', 'description', 'acceptsCrediCard', 'openHour', 'closeHour'];
    let placeParams = {};
    attributes.forEach(attr => {
        if (Object.prototype.hasOwnProperty.call(req.body, attr))
            placeParams[attr] = req.body[attr];
    });

    Place.findOneAndUpdate({ '_id': req.params.id }, placeParams, { new: true }).then(doc => {
        res.json(doc);
    }).catch(err => {
        console.log(err);
        res.json(err);
    })
}

function destroy(req, res) {
    Place.findByIdAndRemove(req.params.id).then(doc => {
        res.json({});
    }).catch(err => {
        console.log(err);
        res.json(err);
    })
}

module.exports = { index, create, show, update, destroy }