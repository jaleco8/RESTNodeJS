const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: false}));

const places = [
    {
        'title': 'JALECO',
        'description': 'Lorem Ipsum',
        'address': 'Lorem Ipsum'
    },
    {
        'title': 'JALECO',
        'description': 'Lorem Ipsum',
        'address': 'Lorem Ipsum'
    },
    {
        'title': 'JALECO',
        'description': 'Lorem Ipsum',
        'address': 'Lorem Ipsum'
    }
];

app.get('/', (req, res) => {
    res.json(places);
});

app.post('/', (req, res)=>{
    res.json(req.body);
});

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Estoy listo para recibir peticiones');
});