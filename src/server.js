const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://othon:othon@omnistack9-6kbmm.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());

app.use(express.json());

app.use('/files', express.static( path.resolve(__dirname, '..', 'storage', 'uploads') ));

app.use(routes);

app.listen(3333);
