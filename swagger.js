import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0', // OpenAPI version
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for my backend',
    },
    servers: [
      {
        url: 'http://localhost:4000/api', // change based on your base URL
      },
    ],
  },
  apis: ['./routes/*.js'], // path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
