import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
  },
};


const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['.**/*.js'],
  };
  
export  const swaggerSpec = swaggerJSDoc(options);