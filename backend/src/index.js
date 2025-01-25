const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const searchRoutes = require('./routes/search');
const pexelsRoutes = require('./routes/pexels');

const organizationForAuthRoutes = require('./routes/organizationLogin');

const openaiRoutes = require('./routes/openai');

const contactFormRoutes = require('./routes/contactForm');

const usersRoutes = require('./routes/users');

const conductoresRoutes = require('./routes/conductores');

const departamentosRoutes = require('./routes/departamentos');

const documentosRoutes = require('./routes/documentos');

const estadisticasRoutes = require('./routes/estadisticas');

const localizacion_taxisRoutes = require('./routes/localizacion_taxis');

const pagos_serviciosRoutes = require('./routes/pagos_servicios');

const servicios_taxiRoutes = require('./routes/servicios_taxi');

const taxisRoutes = require('./routes/taxis');

const taxistasRoutes = require('./routes/taxistas');

const turnosRoutes = require('./routes/turnos');

const usuariosRoutes = require('./routes/usuarios');

const rolesRoutes = require('./routes/roles');

const permissionsRoutes = require('./routes/permissions');

const cooperativadetaxisRoutes = require('./routes/cooperativadetaxis');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Taxi',
      description:
        'Taxi Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/pexels', pexelsRoutes);
app.enable('trust proxy');

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/conductores',
  passport.authenticate('jwt', { session: false }),
  conductoresRoutes,
);

app.use(
  '/api/departamentos',
  passport.authenticate('jwt', { session: false }),
  departamentosRoutes,
);

app.use(
  '/api/documentos',
  passport.authenticate('jwt', { session: false }),
  documentosRoutes,
);

app.use(
  '/api/estadisticas',
  passport.authenticate('jwt', { session: false }),
  estadisticasRoutes,
);

app.use(
  '/api/localizacion_taxis',
  passport.authenticate('jwt', { session: false }),
  localizacion_taxisRoutes,
);

app.use(
  '/api/pagos_servicios',
  passport.authenticate('jwt', { session: false }),
  pagos_serviciosRoutes,
);

app.use(
  '/api/servicios_taxi',
  passport.authenticate('jwt', { session: false }),
  servicios_taxiRoutes,
);

app.use(
  '/api/taxis',
  passport.authenticate('jwt', { session: false }),
  taxisRoutes,
);

app.use(
  '/api/taxistas',
  passport.authenticate('jwt', { session: false }),
  taxistasRoutes,
);

app.use(
  '/api/turnos',
  passport.authenticate('jwt', { session: false }),
  turnosRoutes,
);

app.use(
  '/api/usuarios',
  passport.authenticate('jwt', { session: false }),
  usuariosRoutes,
);

app.use(
  '/api/roles',
  passport.authenticate('jwt', { session: false }),
  rolesRoutes,
);

app.use(
  '/api/permissions',
  passport.authenticate('jwt', { session: false }),
  permissionsRoutes,
);

app.use(
  '/api/cooperativadetaxis',
  passport.authenticate('jwt', { session: false }),
  cooperativadetaxisRoutes,
);

app.use(
  '/api/openai',
  passport.authenticate('jwt', { session: false }),
  openaiRoutes,
);

app.use('/api/contact-form', contactFormRoutes);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes,
);

app.use('/api/org-for-auth', organizationForAuthRoutes);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.NODE_ENV === 'dev_stage' ? 3000 : 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
