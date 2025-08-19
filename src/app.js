import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from '../routes/index.js';
import errorHandler from './middelware/error.js';
import { swaggerUi, swaggerSpec } from '../swagger.js';

const app = express();

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use((req, res, next) => {
  req.setTimeout(300000); // 5 minutes
  res.setTimeout(300000); // 5 minutes
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve JSON spec
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use('/api', routes);

app.use(errorHandler);

export default app;
