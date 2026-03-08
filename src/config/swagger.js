import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import env from './env.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API con Express',
      version: '1.0.0',
      description: 'Documentación de la API (Swagger + Express)',
    },
    servers: [
      {
        url: env.db_use_ssl === 'true' ? 'https://roberto-olguin.onrender.com/' : 'http://localhost:3000',
      },
    ],
  },
  apis: [
    './src/docs/project.swagger.yaml',
    './src/controllers/*.js',
    './src/routes/*.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};