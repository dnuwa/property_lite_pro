/* eslint-disable prettier/prettier */

import Cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';
import swaggerDoc from './swagger.json';

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

app.use(morgan('dev'));

// use API routes in the app
app.use(routes);

app.use((req, res, next) => {
  const error = new Error('NOT FOUND');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 5000;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
