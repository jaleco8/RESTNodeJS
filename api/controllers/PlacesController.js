const Place = require('../models/Place');
const upload = require('../config/upload');

function find(req, res, next) {
    Place.findById(req.params.id).then(place => {
        req.place = place;
        next();
    }).catch(err => {
        next(err);
    })
}

function index(req, res) {
    Place.paginate({}, { page: req.query.page || 1, limit: 10, sort: { '_id': -1 } }).then(docs => {
        res.json(docs);
    }).catch(err => {
        console.log(err);
        res.json(err);
    })
}

function create(req, res, next) {
    let attributes = ['title', 'description', 'acceptsCrediCard', 'openHour', 'closeHour'];
    let placeParams = {};
    attributes.forEach(attr => {
        if (Object.prototype.hasOwnProperty.call(req.body, attr))
            placeParams[attr] = req.body[attr];
    });

    Place.create(placeParams).then(doc => {
        req.place = doc;
        next();
    }).catch(err => {
        next(err);
    })
}

function show(req, res) {
    res.json(req.place);
}

function update(req, res) {
    let attributes = ['title', 'description', 'acceptsCrediCard', 'openHour', 'closeHour'];
    let placeParams = {};
    attributes.forEach(attr => {
        if (Object.prototype.hasOwnProperty.call(req.body, attr))
            placeParams[attr] = req.body[attr];
    });

    req.place = Object.assign(req.place, placeParams);

    req.place.save().then(doc => {
        res.json(doc);
    }).catch(err => {
        console.log(err);
        res.json(err);
    })
}

function destroy(req, res) {
    req.place.remove().then(doc => {
        res.json({});
    }).catch(err => {
        console.log(err);
        res.json(err);
    })

    req.place.remove()
}

function multerMiddleware() {
    return upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'cover', maxCount: 1 }
    ]);
}

function saveImage(req, res) {
    if (req.place) {
        const files = ['avatar', 'cover'];
        const promises = [];
        files.forEach(imageType => {
            if (req.files && req.files[imageType]) {
                const path = req.files[imageType][0].path;
                promises.push(req.place.updateImage(path, imageType));
            }
        })

        Promise.all(promises).then(results => {
            console.log(results);
            res.json(req.place);
        }).catch(err => {
            console.log(err);
            res.json(err);
        })

    } else {
        res.status(422).json({
            error: req.error || 'No se puede guardar la Imagen'
        })
    }
}

module.exports = { index, create, show, update, destroy, find, multerMiddleware, saveImage }