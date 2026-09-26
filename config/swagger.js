import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',

        info: {
            title: 'API Floristería',
            version: '1.0.0',
            description: 'API REST para la gestión de una floristería'
        },

        servers: [
            {
                url: 'http://localhost:3000'
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },

    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;