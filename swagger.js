import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for my backend',
    },
    
    servers: [
      { url: process.env.BASE_URL || '/' }
    ]
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
