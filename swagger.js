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
    ],
    components: {
      securitySchemes: {
        basicAuth: {
          type: 'http',
          scheme: 'basic'
        },
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    // legacy Swagger 2.0 style securityDefinitions for tools that expect them (e.g., some IBM parsers)
    securityDefinitions: {
      // alias named 'basic' because some consumers (IBM BAW) expect the scheme to be named 'basic'
      basic: {
        type: 'basic'
      },
      // keep basicAuth as well for backwards compatibility
      basicAuth: {
        type: 'basic'
      },
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    }
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
