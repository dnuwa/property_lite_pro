/* eslint-disable prettier/prettier */
const Cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const swaggerDoc = require('./swagger.json');

const app = express();

app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(Cors());

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text());

// use API routes in the app
app.use(routes);

const PORT = process.env.PORT || 5000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
