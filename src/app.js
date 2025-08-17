import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import serverless from 'serverless-http'; // ✅ ES module import

import routes from '../routes/index.js';
import errorHandler from './middelware/error.js';
import { swaggerUi, swaggerSpec } from '../swagger.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve JSON spec
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use('/api', routes);

app.use(errorHandler);

// ✅ Wrap with serverless-http
export const handler = serverless(app);

export default app;
