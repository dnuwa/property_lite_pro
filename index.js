/* eslint-disable prettier/prettier */
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
routes.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text());

// use API routes in the app
app.use('/api/v1', routes);

const PORT = process.env.PORT || 5000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
