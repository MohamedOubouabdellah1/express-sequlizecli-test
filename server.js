const express = require('express');
const routes = require('./routes/route.js');
const bodyParser = require('body-parser');
const logger = require('morgan');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json())
app.use(logger('dev'))
app.use('/api', routes);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));


module.exports = app;