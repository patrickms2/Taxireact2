module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'conductores',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'departamentos',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'documentos',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'estadisticas',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'localizacion_taxis',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'pagos_servicios',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'servicios_taxi',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'taxis',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'taxistas',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'turnos',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'usuarios',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'roles',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'permissions',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'cooperativadetaxis',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'firstName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'lastName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'phoneNumber',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'email',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'disabled',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'password',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerified',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'provider',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'conductores',
        'taxistaId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'taxistas',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'conductores',
        'nombre',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'conductores',
        'apellidos',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'conductores',
        'dni',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'conductores',
        'fecha_nacimiento',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'conductores',
        'licencia_conducir',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'departamentos',
        'nombre_departamento',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'documentos',
        'nombre',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'documentos',
        'tipo_documento',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Factura', 'Contrato', 'Permiso', 'Licencia'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'documentos',
        'usuarioId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'usuarios',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'documentos',
        'departamentoId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'departamentos',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'documentos',
        'fecha_creacion',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'estadisticas',
        'tipo_estadistica',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Servicios', 'Documentos'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'estadisticas',
        'fecha',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'estadisticas',
        'usuarioId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'usuarios',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'estadisticas',
        'departamentoId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'departamentos',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'localizacion_taxis',
        'taxiId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'taxis',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'localizacion_taxis',
        'latitud',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'localizacion_taxis',
        'longitud',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'localizacion_taxis',
        'ultima_actualizacion',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pagos_servicios',
        'servicio_taxiId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'servicios_taxi',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pagos_servicios',
        'monto',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pagos_servicios',
        'tipo_pago',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Pagocompleto', 'Depósito', 'Pagoendestino'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pagos_servicios',
        'metodo_pago',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Tarjeta', 'Transferencia', 'Efectivo'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pagos_servicios',
        'fecha_pago',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pagos_servicios',
        'estado_pago',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Pendiente', 'Pagado', 'Reembolsado', 'Cancelado'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'servicios_taxi',
        'taxiId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'taxis',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'servicios_taxi',
        'tipo_servicio',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Traslado', 'ReservaHotel'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'servicios_taxi',
        'fecha_solicitud',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'servicios_taxi',
        'fecha_realizacion',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'servicios_taxi',
        'estado_servicio',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Pendiente', 'Encurso', 'Completado', 'Cancelado'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'servicios_taxi',
        'ubicacion_origen',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'servicios_taxi',
        'ubicacion_destino',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'taxis',
        'taxistaId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'taxistas',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'taxis',
        'matricula',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'taxis',
        'marca',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'taxis',
        'modelo',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'taxis',
        'año',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'taxis',
        'color',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'taxis',
        'estado',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Activo', 'Mantenimiento', 'Baja'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'taxistas',
        'usuarioId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'usuarios',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'taxistas',
        'nombre',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'taxistas',
        'apellidos',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'taxistas',
        'dni',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'taxistas',
        'direccion',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'taxistas',
        'telefono',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'taxistas',
        'fecha_registro',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'taxistas',
        'estado',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Activo', 'Inactivo'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'turnos',
        'usuarioId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'usuarios',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'turnos',
        'fecha',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'turnos',
        'hora_inicio',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'turnos',
        'hora_fin',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'turnos',
        'estado_turno',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Programado', 'Encurso', 'Completado', 'Ausente'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'usuarios',
        'nombre',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'usuarios',
        'apellidos',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'usuarios',
        'email',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'usuarios',
        'password',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'usuarios',
        'tipo_usuario',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Empleado', 'Taxista', 'Cliente', 'Hotel'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'usuarios',
        'fecha_registro',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'permissions',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'role_customization',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'app_roleId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'roles',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'cooperativadetaxis',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'globalAccess',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'cooperativadetaxiId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'cooperativadetaxis',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'conductores',
        'cooperativadetaxiId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'cooperativadetaxis',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'departamentos',
        'cooperativadetaxiId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'cooperativadetaxis',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'documentos',
        'cooperativadetaxiId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'cooperativadetaxis',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'estadisticas',
        'cooperativadetaxiId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'cooperativadetaxis',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'localizacion_taxis',
        'cooperativadetaxiId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'cooperativadetaxis',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pagos_servicios',
        'cooperativadetaxiId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'cooperativadetaxis',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'servicios_taxi',
        'cooperativadetaxiId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'cooperativadetaxis',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'taxis',
        'cooperativadetaxiId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'cooperativadetaxis',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'taxistas',
        'cooperativadetaxiId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'cooperativadetaxis',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'turnos',
        'cooperativadetaxiId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'cooperativadetaxis',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'usuarios',
        'cooperativadetaxiId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'cooperativadetaxis',
            key: 'id',
          },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('usuarios', 'cooperativadetaxiId', {
        transaction,
      });

      await queryInterface.removeColumn('turnos', 'cooperativadetaxiId', {
        transaction,
      });

      await queryInterface.removeColumn('taxistas', 'cooperativadetaxiId', {
        transaction,
      });

      await queryInterface.removeColumn('taxis', 'cooperativadetaxiId', {
        transaction,
      });

      await queryInterface.removeColumn(
        'servicios_taxi',
        'cooperativadetaxiId',
        { transaction },
      );

      await queryInterface.removeColumn(
        'pagos_servicios',
        'cooperativadetaxiId',
        { transaction },
      );

      await queryInterface.removeColumn(
        'localizacion_taxis',
        'cooperativadetaxiId',
        { transaction },
      );

      await queryInterface.removeColumn('estadisticas', 'cooperativadetaxiId', {
        transaction,
      });

      await queryInterface.removeColumn('documentos', 'cooperativadetaxiId', {
        transaction,
      });

      await queryInterface.removeColumn(
        'departamentos',
        'cooperativadetaxiId',
        { transaction },
      );

      await queryInterface.removeColumn('conductores', 'cooperativadetaxiId', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'cooperativadetaxiId', {
        transaction,
      });

      await queryInterface.removeColumn('roles', 'globalAccess', {
        transaction,
      });

      await queryInterface.removeColumn('cooperativadetaxis', 'name', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'app_roleId', { transaction });

      await queryInterface.removeColumn('roles', 'role_customization', {
        transaction,
      });

      await queryInterface.removeColumn('roles', 'name', { transaction });

      await queryInterface.removeColumn('permissions', 'name', { transaction });

      await queryInterface.removeColumn('usuarios', 'fecha_registro', {
        transaction,
      });

      await queryInterface.removeColumn('usuarios', 'tipo_usuario', {
        transaction,
      });

      await queryInterface.removeColumn('usuarios', 'password', {
        transaction,
      });

      await queryInterface.removeColumn('usuarios', 'email', { transaction });

      await queryInterface.removeColumn('usuarios', 'apellidos', {
        transaction,
      });

      await queryInterface.removeColumn('usuarios', 'nombre', { transaction });

      await queryInterface.removeColumn('turnos', 'estado_turno', {
        transaction,
      });

      await queryInterface.removeColumn('turnos', 'hora_fin', { transaction });

      await queryInterface.removeColumn('turnos', 'hora_inicio', {
        transaction,
      });

      await queryInterface.removeColumn('turnos', 'fecha', { transaction });

      await queryInterface.removeColumn('turnos', 'usuarioId', { transaction });

      await queryInterface.removeColumn('taxistas', 'estado', { transaction });

      await queryInterface.removeColumn('taxistas', 'fecha_registro', {
        transaction,
      });

      await queryInterface.removeColumn('taxistas', 'telefono', {
        transaction,
      });

      await queryInterface.removeColumn('taxistas', 'direccion', {
        transaction,
      });

      await queryInterface.removeColumn('taxistas', 'dni', { transaction });

      await queryInterface.removeColumn('taxistas', 'apellidos', {
        transaction,
      });

      await queryInterface.removeColumn('taxistas', 'nombre', { transaction });

      await queryInterface.removeColumn('taxistas', 'usuarioId', {
        transaction,
      });

      await queryInterface.removeColumn('taxis', 'estado', { transaction });

      await queryInterface.removeColumn('taxis', 'color', { transaction });

      await queryInterface.removeColumn('taxis', 'año', { transaction });

      await queryInterface.removeColumn('taxis', 'modelo', { transaction });

      await queryInterface.removeColumn('taxis', 'marca', { transaction });

      await queryInterface.removeColumn('taxis', 'matricula', { transaction });

      await queryInterface.removeColumn('taxis', 'taxistaId', { transaction });

      await queryInterface.removeColumn('servicios_taxi', 'ubicacion_destino', {
        transaction,
      });

      await queryInterface.removeColumn('servicios_taxi', 'ubicacion_origen', {
        transaction,
      });

      await queryInterface.removeColumn('servicios_taxi', 'estado_servicio', {
        transaction,
      });

      await queryInterface.removeColumn('servicios_taxi', 'fecha_realizacion', {
        transaction,
      });

      await queryInterface.removeColumn('servicios_taxi', 'fecha_solicitud', {
        transaction,
      });

      await queryInterface.removeColumn('servicios_taxi', 'tipo_servicio', {
        transaction,
      });

      await queryInterface.removeColumn('servicios_taxi', 'taxiId', {
        transaction,
      });

      await queryInterface.removeColumn('pagos_servicios', 'estado_pago', {
        transaction,
      });

      await queryInterface.removeColumn('pagos_servicios', 'fecha_pago', {
        transaction,
      });

      await queryInterface.removeColumn('pagos_servicios', 'metodo_pago', {
        transaction,
      });

      await queryInterface.removeColumn('pagos_servicios', 'tipo_pago', {
        transaction,
      });

      await queryInterface.removeColumn('pagos_servicios', 'monto', {
        transaction,
      });

      await queryInterface.removeColumn('pagos_servicios', 'servicio_taxiId', {
        transaction,
      });

      await queryInterface.removeColumn(
        'localizacion_taxis',
        'ultima_actualizacion',
        { transaction },
      );

      await queryInterface.removeColumn('localizacion_taxis', 'longitud', {
        transaction,
      });

      await queryInterface.removeColumn('localizacion_taxis', 'latitud', {
        transaction,
      });

      await queryInterface.removeColumn('localizacion_taxis', 'taxiId', {
        transaction,
      });

      await queryInterface.removeColumn('estadisticas', 'departamentoId', {
        transaction,
      });

      await queryInterface.removeColumn('estadisticas', 'usuarioId', {
        transaction,
      });

      await queryInterface.removeColumn('estadisticas', 'fecha', {
        transaction,
      });

      await queryInterface.removeColumn('estadisticas', 'tipo_estadistica', {
        transaction,
      });

      await queryInterface.removeColumn('documentos', 'fecha_creacion', {
        transaction,
      });

      await queryInterface.removeColumn('documentos', 'departamentoId', {
        transaction,
      });

      await queryInterface.removeColumn('documentos', 'usuarioId', {
        transaction,
      });

      await queryInterface.removeColumn('documentos', 'tipo_documento', {
        transaction,
      });

      await queryInterface.removeColumn('documentos', 'nombre', {
        transaction,
      });

      await queryInterface.removeColumn(
        'departamentos',
        'nombre_departamento',
        { transaction },
      );

      await queryInterface.removeColumn('conductores', 'licencia_conducir', {
        transaction,
      });

      await queryInterface.removeColumn('conductores', 'fecha_nacimiento', {
        transaction,
      });

      await queryInterface.removeColumn('conductores', 'dni', { transaction });

      await queryInterface.removeColumn('conductores', 'apellidos', {
        transaction,
      });

      await queryInterface.removeColumn('conductores', 'nombre', {
        transaction,
      });

      await queryInterface.removeColumn('conductores', 'taxistaId', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'provider', { transaction });

      await queryInterface.removeColumn(
        'users',
        'passwordResetTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'passwordResetToken', {
        transaction,
      });

      await queryInterface.removeColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'emailVerificationToken', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'emailVerified', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'password', { transaction });

      await queryInterface.removeColumn('users', 'disabled', { transaction });

      await queryInterface.removeColumn('users', 'email', { transaction });

      await queryInterface.removeColumn('users', 'phoneNumber', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'lastName', { transaction });

      await queryInterface.removeColumn('users', 'firstName', { transaction });

      await queryInterface.dropTable('cooperativadetaxis', { transaction });

      await queryInterface.dropTable('permissions', { transaction });

      await queryInterface.dropTable('roles', { transaction });

      await queryInterface.dropTable('usuarios', { transaction });

      await queryInterface.dropTable('turnos', { transaction });

      await queryInterface.dropTable('taxistas', { transaction });

      await queryInterface.dropTable('taxis', { transaction });

      await queryInterface.dropTable('servicios_taxi', { transaction });

      await queryInterface.dropTable('pagos_servicios', { transaction });

      await queryInterface.dropTable('localizacion_taxis', { transaction });

      await queryInterface.dropTable('estadisticas', { transaction });

      await queryInterface.dropTable('documentos', { transaction });

      await queryInterface.dropTable('departamentos', { transaction });

      await queryInterface.dropTable('conductores', { transaction });

      await queryInterface.dropTable('users', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
